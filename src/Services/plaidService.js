import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Hardcoded Plaid credentials
const PLAID_CLIENT_ID = '67bca24e63b0fe0026e4054a';
const PLAID_SECRET = '2c361b85e59a882b3813cf1350a4fa';
const PLAID_ENV = 'sandbox'; // Use 'sandbox' for testing

// Configure Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14'
    }
  }
});

const plaidClient = new PlaidApi(configuration);

export const PlaidService = {
  /**
   * Create a Link token for Plaid Link
   */
  createLinkToken: async (userId) => {
    try {
      const response = await plaidClient.linkTokenCreate({
        user: { client_user_id: userId.toString() },
        client_name: 'Budget App',
        products: ['auth', 'transactions'], // Include both Auth and Transactions
        country_codes: ['US'],
        language: 'en',
      });
      return response.data.link_token;
    } catch (error) {
      console.error('Plaid link token error:', error.response.data);
      throw error;
    }
  },

  /**
   * Exchange a public token for an access token
   */
  exchangePublicToken: async (publicToken) => {
    try {
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return response.data;
    } catch (error) {
      console.error('Plaid token exchange error:', error.response.data);
      throw error;
    }
  },

  /**
   * Fetch Auth data (routing and account numbers)
   */
  getAuthData: async (accessToken) => {
    try {
      const response = await plaidClient.authGet({
        access_token: accessToken,
      });
      return response.data;
    } catch (error) {
      console.error('Plaid auth data error:', error.response.data);
      throw error;
    }
  },

  /**
   * Fetch transactions for an account
   */
  getTransactions: async (accessToken, startDate, endDate) => {
    try {
      const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      });
      return response.data;
    } catch (error) {
      console.error('Plaid transactions error:', error.response.data);
      throw error;
    }
  },

  /**
   * Sync transactions for an account
   */
  syncTransactions: async (accessToken, cursor = null) => {
    try {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor: cursor,
      });
      return response.data;
    } catch (error) {
      console.error('Plaid transactions sync error:', error.response.data);
      throw error;
    }
  }
};