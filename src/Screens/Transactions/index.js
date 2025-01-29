import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../Components/Header'

export default function Transactions() {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  return (
    <View style={styles.container}>
      <Header
        title="Transactions"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={profilePressed}
        onRightPress={settingsPressed}
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