import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../../Components/Header'

export default function Home() {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  const addAccountPressed = () => {// BUTTON FUNCTION RIGHT HERE
    console.log('KOBE');
};

  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={settingsPressed}
        onRightPress={profilePressed}
      />
      <Button icon="camera" mode="contained" onPress={addAccountPressed}>
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});