import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Navigation from './Components/NavBar';
import { PaperProvider } from 'react-native-paper';
import { initializeDatabase } from './Database/database';
import { UserService } from './Services/databaseService';
import { AccountService } from './Services/databaseService';

export default function Preload() {
  const [loading, setLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(1));
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize the database
        await initializeDatabase();
        
        console.log('Database initialized');

        // Check if the test user already exists
        const testEmail = `testuser${Math.floor(Math.random() * 1000)}@email.com`;
        let userId;

        const existingUser = await UserService.getUserByEmail(testEmail);
        if (existingUser) {
          console.log('Test user already exists, using existing user ID:', existingUser.id);
          userId = existingUser.id;
        } else {
          // Create a new test user if it doesn't exist
          userId = await UserService.createUser('Test User', testEmail);
          console.log('New user created with ID:', userId);
        }

        // Fetch the user to verify
        const user = await UserService.getUser(userId);
        console.log('Fetched user:', user);

        // Fetch accounts for the user
        const accounts = await AccountService.getAccounts(userId);
        console.log('User accounts:', accounts);
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