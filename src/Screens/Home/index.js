import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { ProgressBar, Text, Divider } from 'react-native-paper';
import Header from '../../Components/Header'
import HARDdata from '../../Components/HardData';
import TransactionCard from '../../Components/TransactionCard';
import CategoryHandle from '../../Components/PlannerComp/catHandler';
import { useTheme } from '../../Components/Theming';

export default function Home(navigation) {
  const { theme } = useTheme();
  const accountData = HARDdata.groupAccountsByType();
  const transactionsData = HARDdata.transactions.slice(0, 3);
  const catData = HARDdata.groupCategoriesByType();

  const renderAccounts = ({ item }) => {
    if (item.type === "NetWorth") {
      return (
        <View>
          <View style={styles.row}>
            <Text variant="headlineSmall">Net Worth</Text>
            <Text variant="titleMedium">${item.totalBalance}</Text>
          </View>
          <Divider></Divider>
        </View>
      );
    }
    const totalAmount = item.accounts.reduce((sum, account) => sum + account.balance, 0)
    return (
      <View>
        {item.accounts.map(account => (
          <View key={account.name}>
            <View style={styles.row}>
              <Text variant="titleMedium">{account.name}</Text>
              <Text variant="titleMedium">${account.balance}</Text>
            </View>
            <ProgressBar
              style={{ borderRadius: 50, width: 275 }}
              progress={account.balance / totalAmount}
              color={theme.colors.primary}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderTransaction = ({ item }) => (
    <TransactionCard
      payee={item.payee}
      category={item.category}
      cost={item.cost}
      date={item.date}
    />
  );

  const sorted = [{ who: "Account", data: accountData }, { who: "Catergories", data: catData }, { who: "Transactions", data: transactionsData }]
  const expressHomePage = ({ item }) => {
    if (item.who == "Account") {
      return (
        <View>
          {item.data.map((dataItem, index) => (
            <View key={index.toString()}>
              {renderAccounts({ item: dataItem, index })}
            </View>
          ))}
        </View>
      )
    } else if (item.who == "Catergories") {
      return (
        <View style={{ marginTop: 15 }}>
          <Text variant='headlineSmall'>Category Spending</Text>
          <Divider></Divider>
          {catData.map(item => (
            <CategoryHandle
              key={item.type}
              data={item}
            />
          ))}
        </View>
      )
    } else if (item.who == "Transactions") {
      return (
        <View style={{ marginTop: 15 }}>
          <Text variant='headlineSmall'>Transactions in past 3 days</Text>
          <Divider></Divider>
          {item.data.map(dataItem => (
            <View key={dataItem.id}>
              {renderTransaction({ item: dataItem, navigation })}
            </View>
          ))}
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Dashboard"
        leftIcon="cog"
        rightIcon="bell"
        onLeftPress={() => navigation.navigate('SettingsScreen', {})}
      />
      <FlatList 
        style={{ 
          marginTop: 10, 
          marginHorizontal: 20,
        }}
        contentContainerStyle={{ 
          paddingBottom: 80 // Add significant bottom padding
        }}
        data={sorted}
        renderItem={expressHomePage}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});