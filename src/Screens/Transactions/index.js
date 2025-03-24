import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../Components/Header'
import { Searchbar } from 'react-native-paper';
import TransactionCard from '../../Components/TransactionCard';
import HARDdata from '../../Components/HardData';

export default function Transactions({ navigation }) {
  const filterTransactions = () => {
    // Add handling logic
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const renderTransaction = ({ item }) => (
    <TransactionCard
      payee={item.payee}
      category={item.category}
      cost={item.cost}
      date={item.date}
      onPress={() => navigation.navigate('TransactionExtra', { item })}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        title="Transactions"
        leftIcon="cog"
        rightIcon="menu"
        onLeftPress={() => navigation.navigate('SettingsScreen', {})}
        onRightPress={filterTransactions}
      />
      <Searchbar style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList style={{marginHorizontal: 16}}
          data={HARDdata.transactions}
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
    borderRadius: 24
  }
});