import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

let db; // Database instance

// Function to initialize the database
async function initializeDatabase() {
    try {
        // Open the database
        db = await SQLite.openDatabaseAsync('budgetApp.db');
        const dbPath = FileSystem.documentDirectory + 'SQLite/budgetApp.db';
        console.log('Database path:', dbPath);
        
        // Enable foreign key support
        await db.execAsync('PRAGMA foreign_keys = ON;');

        // Create tables if they don't exist
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                account_name TEXT NOT NULL,
                balance REAL NOT NULL,
                plaid_access_token TEXT NOT NULL,
                plaid_item_id TEXT NOT NULL,
                routing_number TEXT,
                account_number TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS budgets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                category TEXT NOT NULL,
                limit_amount REAL NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                account_id INTEGER NOT NULL,
                amount REAL NOT NULL,
                description TEXT,
                category TEXT NOT NULL,
                date TEXT NOT NULL,
                FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
            );
        `);

        // Create indexes for better performance
        await db.execAsync(`
            CREATE INDEX IF NOT EXISTS idx_accounts_user ON accounts(user_id);
            CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
        `);

        // Check if we need to migrate the accounts table
        const hasColumns = await db.getFirstAsync(
            "SELECT COUNT(*) AS count FROM pragma_table_info('accounts') WHERE name IN ('plaid_access_token', 'plaid_item_id')"
        );
        
        if (hasColumns.count < 2) {
            await migrateDatabase();
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
}

// Function to migrate the database schema
async function migrateDatabase() {
    console.log('Running database migrations...');
    
    try {
        // Create temporary table with the new schema
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS accounts_new (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                account_name TEXT NOT NULL,
                balance REAL NOT NULL,
                plaid_access_token TEXT NOT NULL,
                plaid_item_id TEXT NOT NULL,
                routing_number TEXT,
                account_number TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
        `);
        
        // Copy data from the old table to the new table
        await db.execAsync(`
            INSERT INTO accounts_new (id, user_id, account_name, balance)
            SELECT id, user_id, account_name, balance FROM accounts;
        `);
        
        // Drop the old table
        await db.execAsync('DROP TABLE accounts;');
        
        // Rename the new table to the original name
        await db.execAsync('ALTER TABLE accounts_new RENAME TO accounts;');
        
        console.log('Database migration completed successfully');
    } catch (error) {
        console.error('Database migration error:', error);
        throw error;
    }
}

// Function to run INSERT, UPDATE, or DELETE queries
async function runAsync(sql, params = []) {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    try {
        const result = await db.runAsync(sql, ...params);
        return { lastInsertRowId: result.lastInsertRowId, changes: result.changes };
    } catch (error) {
        console.error('Database run error:', error);
        throw error;
    }
}

// Function to fetch a single row
async function getAsync(sql, params = []) {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    try {
        const result = await db.getFirstAsync(sql, ...params);
        return result;
    } catch (error) {
        console.error('Database get error:', error);
        throw error;
    }
}

// Function to fetch multiple rows
async function getAllAsync(sql, params = []) {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    try {
        const result = await db.getAllAsync(sql, ...params);
        return result;
    } catch (error) {
        console.error('Database getAll error:', error);
        throw error;
    }
}

// Function to execute raw SQL commands
async function execAsync(sql) {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    try {
        await db.execAsync(sql);
    } catch (error) {
        console.error('Database exec error:', error);
        throw error;
    }
}

// Function to get the database instance
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    return db;
}

export { 
    initializeDatabase, 
    getDatabase,
    runAsync,
    getAsync,
    getAllAsync,
    execAsync
};