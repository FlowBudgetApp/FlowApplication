import { Plaid } from 'react-native-plaid-link-sdk';
import { AccountService, TransactionService } from './databaseService';

export const configurePlaid = {
  clientID: '67bca24e63b0fe0026e4054a',
  secret: '2c361b85e59a882b3813cf1350a4fa',
  env: 'sandbox'
};

export const handlePlaidLink = async (userId) => {
  return new Promise((resolve, reject) => {
    Plaid.create({
      clientID: configurePlaid.clientID,
      secret: configurePlaid.secret,
      env: configurePlaid.env,
      product: ['transactions'],
      countryCodes: ['US'],
      language: 'en',
      userEmail: 'user@example.com',
      userLegalName: 'Test User',
      onSuccess: async (success) => {
        try {
          // Store account
          await AccountService.linkAccount({
            userId,
            name: success.metadata.institution.name,
            balance: 0, // Initial balance
            accessToken: success.metadata.public_token,
            itemId: success.metadata.item_id
          });

          // Store transactions
          success.metadata.transactions.forEach(async transaction => {
            await TransactionService.addTransaction({
              accountId: success.metadata.account.id,
              amount: transaction.amount,
              description: transaction.name,
              category: transaction.category[0],
              date: transaction.date
            });
          });

          resolve();
        } catch (error) {
          reject(error);
        }
      },
      onExit: (error) => {
        if (error) reject(error);
      }
    });
  });
};