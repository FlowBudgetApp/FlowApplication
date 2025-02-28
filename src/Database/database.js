import * as SQLite from 'expo-sqlite';

let db; // Database instance

// Function to initialize the database
async function initializeDatabase() {
    try {
        db = await SQLite.openDatabaseAsync('budgetApp.db');
        
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
                plaid_access_token TEXT,
                plaid_item_id TEXT,
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

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
}

// Function to run INSERT, UPDATE, or DELETE queries
async function runAsync(sql, params = []) {
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