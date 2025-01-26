import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../Components/Header'

export default function Planner() {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  return (
    <View style={styles.container}>
      <Header
        title="Planner"
        leftIcon="cog"
        rightIcon="account"
        onLeftPress={settingsPressed}
        onRightPress={profilePressed}
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