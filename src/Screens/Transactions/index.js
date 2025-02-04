import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../Components/Header'
import { Searchbar } from 'react-native-paper';

export default function Transactions() {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Header
        title="Transactions"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={profilePressed}
        onRightPress={settingsPressed}
      />
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});