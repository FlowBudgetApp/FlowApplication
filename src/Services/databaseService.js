import { 
  runAsync, 
  getAsync, 
  getAllAsync,
  getDatabase
} from '../Database/database';

export const UserService = {
  createUser: async (name, email) => {
    try {
      const result = await runAsync(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('User creation error:', error);
      throw error;
    }
  },

  getUser: async (userId) => {
    try {
      return await getAsync(
        'SELECT * FROM users WHERE id = ?', 
        [userId]
      );
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      return await getAsync(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },
};

export const AccountService = {
  linkAccount: async (userId, accountData) => {
      try {
          await runAsync(
              `INSERT INTO accounts 
              (user_id, account_name, balance, plaid_access_token, plaid_item_id)
              VALUES (?, ?, ?, ?, ?)`,
              [
                  userId, 
                  accountData.name, 
                  accountData.balance, 
                  accountData.accessToken, 
                  accountData.itemId
              ]
          );
      } catch (error) {
          console.error('Account linking error:', error);
          throw error;
      }
  },

  getAccounts: async (userId) => {
      try {
          return await getAllAsync(
              'SELECT * FROM accounts WHERE user_id = ?', 
              [userId]
          );
      } catch (error) {
          console.error('Error fetching accounts:', error);
          throw error;
      }
  },
};

export const BudgetService = {
  createBudget: async (userId, category, limit) => {
      try {
          await runAsync(
              'INSERT INTO budgets (user_id, category, limit_amount) VALUES (?, ?, ?)',
              [userId, category, limit]
          );
      } catch (error) {
          console.error('Budget creation error:', error);
          throw error;
      }
  },

  getBudgets: async (userId) => {
      try {
          return await getAllAsync(
              'SELECT * FROM budgets WHERE user_id = ?',
              [userId]
          );
      } catch (error) {
          console.error('Error fetching budgets:', error);
          throw error;
      }
  },
};

export const TransactionService = {
  addTransaction: async (transactionData) => {
      try {
          await runAsync(
              `INSERT INTO transactions 
              (account_id, amount, description, category, date)
              VALUES (?, ?, ?, ?, ?)`,
              [
                  transactionData.accountId, 
                  transactionData.amount,
                  transactionData.description, 
                  transactionData.category,
                  transactionData.date
              ]
          );
      } catch (error) {
          console.error('Transaction addition error:', error);
          throw error;
      }
  },

  getTransactions: async (accountId) => {
      try {
          return await getAllAsync(
              'SELECT * FROM transactions WHERE account_id = ? ORDER BY date DESC',
              [accountId]
          );
      } catch (error) {
          console.error('Error fetching transactions:', error);
          throw error;
      }
  },
};