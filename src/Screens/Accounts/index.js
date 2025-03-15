import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text, Card, ProgressBar, IconButton, MD3Colors } from "react-native-paper";
import Header from '../../Components/Header';
import { useTheme } from "../../Components/Theming";

export default function Accounts({ navigation }) {
  const theme = useTheme();

  const [accounts, setAccounts] = useState([
    { name: "Account 1", balance: 500, type: "Debit" },
    { name: "Account 2", balance: 1000, type: "Credit" },
    { name: "Account 3", balance: 750, type: "Debit" },
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

  // Group accounts by type
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.type]) acc[account.type] = [];
    acc[account.type].push(account);
    return acc;
  }, {});
  

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const data = [
    { type: "NetWorth", totalBalance, groupedAccounts }, // Net worth block
    ...Object.keys(groupedAccounts).map((type) => ({ type, accounts: groupedAccounts[type] })), // Account types
  ];

  const renderItem = ({ item }) => {
    if (item.type === "NetWorth") { //NET WORTH HERE
      return (
        <View style={{marginHorizontal: 20}}>
          <Text variant="headlineSmall">Net Worth</Text>
          <Card>
            <Card.Content style={styles.row}>
              <Text variant="titleMedium">Total</Text>
              <Text variant="titleMedium">${item.totalBalance} </Text>
            </Card.Content>
          </Card>
        </View>
      );
    }
    const totalAmount = item.accounts.reduce((sum, account) => sum + account.balance, 0)
    return ( // ACCOUNT WORK
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <View style={styles.row}>
          <Text variant="headlineSmall">{item.type}</Text>
          <Text variant="headlineSmall">${totalAmount}</Text>
        </View>
        <FlatList

          data={item.accounts}
          keyExtractor={(account) => account.name}
          renderItem={({ item: account }) => (
            <Card style={{ marginTop: 10 }}>
              <Card.Content style={styles.row}>
                <Text variant="titleMedium">{account.name}</Text>
                <Text variant="titleMedium">${account.balance}</Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    );
  };

  return ( // PROGRAM START
    <View style={{flex: 1}}>
      <Header
        title="Accounts"
        leftIcon="cog"
        rightIcon="plus"
        onLeftPress={() => navigation.navigate('SettingsScreen', {})}
        onRightPress={() => navigation.navigate('NewAccount', { addAccount})}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 32,
    marginVertical: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    elevation: 3, // Shadow effect
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
