import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function SettingsScreen({}) {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>

      {/* Notifications Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setDarkMode(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
  },
  button: {
    marginTop: 30,
  },
});
