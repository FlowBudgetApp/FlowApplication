import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

let db; // Database instance

// Function to initialize the database
async function initializeDatabase() {
    try {
        db = await SQLite.openDatabaseAsync('budgetApp.db');
        //console.log('Database initialized:', db);

        const dbPath = FileSystem.documentDirectory + 'SQLite/budgetApp.db';
        console.log('Database path:', dbPath);

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
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// Function to get the database instance
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    return db;
}

export { initializeDatabase, getDatabase };