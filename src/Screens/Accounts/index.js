import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import Header from '../../Components/Header';

export default function Accounts({ navigation }) {
  const [accounts, setAccounts] = useState([
    { name: 'Account 1', balance: 0 }
  ]);

  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  const addAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  const calculateTotalNetWorth = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Accounts"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={profilePressed}
        onRightPress={settingsPressed}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Net Worth</Text>
          <Text style={styles.totalNetWorth}>
            Total Net Worth: ${calculateTotalNetWorth().toFixed(2)}
          </Text>
          {accounts.map((account, index) => (
            <View key={index} style={styles.accountCard}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountBalance}>
                ${account.balance.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <Button
          title="Add New Account"
          onPress={() => navigation.navigate('NewAccount', { addAccount })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalNetWorth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 16,
  },
  accountCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountBalance: {
    fontSize: 16,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    fontSize: 16,
    color: '#888',
  },
});
