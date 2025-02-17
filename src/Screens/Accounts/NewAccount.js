import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

export default function NewAccount({ navigation, route }) {
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  const handleAddAccount = () => {
    const newAccount = {
      name: accountName,
      balance: parseFloat(accountBalance),
    };
    route.params.addAccount(newAccount);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Account Name"
        value={accountName}
        onChangeText={setAccountName}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Balance"
        value={accountBalance}
        onChangeText={setAccountBalance}
        keyboardType="numeric"
      />
      <Button title="Add Account" onPress={handleAddAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});