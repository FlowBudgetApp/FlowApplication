import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../Components/Header'
import { Searchbar } from 'react-native-paper';
import TransactionCard from '../../Components/TransactionCard';

export default function Transactions({navigation}) {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  // Sample transaction data - replace with your actual data source
  const transactions = [
    {
      id: '1',
      payee: 'Netflix',
      category: 'Entertainment',
      cost: '14.99',
      date: 'Feb 16, 2025'
    },
    {
      id: '2',
      payee: 'Walmart',
      category: 'Shopping',
      cost: '56.78',
      date: 'Feb 15, 2025'
    },
    {
      id: '3',
      payee: 'Uber',
      category: 'Transportation',
      cost: '24.50',
      date: 'Feb 15, 2025'
    },
  ];

  const renderTransaction = ({ item }) => (
    <TransactionCard
      payee={item.payee}
      category={item.category}
      cost={item.cost}
      date={item.date}
      onPress={() => navigation.navigate('TransactionExtra',{item})}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        title="Transactions"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={profilePressed}
        onRightPress={settingsPressed}
      />
      <Searchbar style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={transactions}
        renderItem={({ item }) => renderTransaction({ item, navigation })}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  searchBar: {
    marginHorizontal: 12,
    borderRadius: 12
  }
});