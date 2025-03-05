import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Navigation from './Components/NavBar';
import { PaperProvider } from 'react-native-paper';
import { initializeDatabase } from './Database/database';
import { UserService, AccountService, BudgetService, TransactionService } from './Services/databaseService';

export default function Preload() {
  const [loading, setLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(1));
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeDatabase();
        console.log('Database initialized');

        // Create or fetch the test user
        const testEmail = `testuser${Math.floor(Math.random() * 1000)}@email.com`;
        let userId;

        const existingUser = await UserService.getUserByEmail(testEmail);
        if (existingUser) {
          console.log('Test user already exists, using existing user ID:', existingUser.id);
          userId = existingUser.id;
        } else {
          userId = await UserService.createUser('Test User', testEmail);
          console.log('New user created with ID:', userId);
        }

        // Fetch the user to verify
        const user = await UserService.getUser(userId);
        console.log('Fetched user:', user);

        // Link a test account
        await AccountService.linkAccount(userId, {
          name: 'Checking Account',
          balance: 1000.00,
          accessToken: 'plaid_access_token',
          itemId: 'plaid_item_id'
        });

        // Fetch accounts for the user
        const accounts = await AccountService.getAccounts(userId);
        console.log('User accounts:', accounts);

        // Create a test budget
        await BudgetService.createBudget(userId, 'Groceries', 500.00);

        // Fetch budgets for the user
        const budgets = await BudgetService.getBudgets(userId);
        console.log('User budgets:', budgets);

        // Add a test transaction
        await TransactionService.addTransaction({
          accountId: accounts[0].id,
          amount: -50.00,
          description: 'Grocery Store',
          category: 'Food',
          date: '2023-10-15'
        });

        // Fetch transactions for the account
        const transactions = await TransactionService.getTransactions(accounts[0].id);
        console.log('Account transactions:', transactions);
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimationComplete(true);
    });
  }, []);

  if (loading || !animationComplete) {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/Launch/loading.png')}
          style={[styles.logo, { opacity }]}
        />
      </View>
    );
  }

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});