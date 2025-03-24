import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import Header from '../../Components/Header';
import { useTheme } from "../../Components/Theming";
import { Pressable } from "react-native";
import HARDdata from '../../Components/HardData';

export default function Accounts({ navigation }) {
  const theme = useTheme();

  //Accounts Info
  const [accounts, setAccounts] = useState(HARDdata.AccountsInfo || []);
  const addAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  //Get the grouped data
  const data = HARDdata.groupAccountsByType();

  const renderItem = ({ item }) => {
    if (item.type === "NetWorth") {
      return (
        <View style={{ marginHorizontal: 20 }}>
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
    return (
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <View style={styles.row}>
          <Text variant="headlineSmall">{item.type}</Text>
          <Text variant="headlineSmall">${totalAmount}</Text>
        </View>
        <FlatList
          data={item.accounts}
          keyExtractor={(account) => account.name}
          renderItem={({ item: account }) => (
            <Pressable onPress={() => navigation.navigate('ViewAccount', {
              accountData: {
                name: account.name,
                balance: account.balance,
              }
            })}>
              <Card style={{ marginTop: 10 }}>
                <Card.Content style={styles.row}>
                  <Text variant="titleMedium">{account.name}</Text>
                  <Text variant="titleMedium">${account.balance}</Text>
                </Card.Content>
              </Card>
            </Pressable>
          )}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Accounts"
        leftIcon="cog"
        rightIcon="plus"
        onLeftPress={() => navigation.navigate('SettingsScreen', {})}
        onRightPress={() => navigation.navigate('NewAccount', { addAccount })}
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
    elevation: 3,
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
});