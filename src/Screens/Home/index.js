import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import Header from '../../Components/Header';

export default function Home({ navigation }) {
  const profilePressed = () => {
    console.log('Profile button pressed');
  };

  const addAccountPressed = () => {
    console.log('Add account button pressed');
  };

  // Data for FlatList
  const data = [
    {
      id: '1',
      type: 'header',
    },
    {
      id: '2',
      type: 'updates',
      updates: [
        'Your account balance is running low.',
        'Consider transferring funds to avoid overdrafts.',
      ],
    },
    {
      id: '3',
      type: 'spending',
      spendingData: [
        { name: 'Food', amount: 56.78, color: '#FF6384' },
        { name: 'Transport', amount: 24.50, color: '#36A2EB' },
        { name: 'Entertain', amount: 14.99, color: '#FFCE56' },
      ],
    },
    {
      id: '4',
      type: 'transactions',
      transactions: [
        { id: '1', title: 'Netflix', amount: '$14.99', date: '02/16/2025' },
        { id: '2', title: 'Walmart', amount: '$56.78', date: '02/15/2025' },
        { id: '3', title: 'Uber', amount: '$24.50', date: '02/15/2025' },
      ],
    },
  ];

  // Render FlatList Items
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <Header
            title="Dashboard"
            leftIcon="cog"
            rightIcon="account"
            onLeftPress={() => navigation.navigate('SettingsScreen')}
            onRightPress={profilePressed}
          />
        );

      case 'updates':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.heading}>
                Important Updates
              </Text>
              {item.updates.map((update, index) => (
                <Text key={index} variant="bodyMedium" style={styles.text}>
                  - {update}
                </Text>
              ))}
            </Card.Content>
          </Card>
        );

      case 'spending':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.heading}>
                Spending Categories
              </Text>
              <PieChart
                data={item.spendingData.map(({ name, amount, color }) => ({
                  name,
                  amount,
                  color,
                }))}
                width={300}
                height={200}
                chartConfig={{
                  color: () => `#333`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </Card.Content>
          </Card>
        );

      case 'transactions':
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.heading}>
                Recent Transactions
              </Text>
              {item.transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionRow}>
                  <Text variant="bodyMedium">{transaction.title}</Text>
                  <Text variant="bodySmall" style={styles.date}>{transaction.date}</Text>
                  <Text variant="bodyMedium">{transaction.amount}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  heading: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 4,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addButton: {
    marginTop: 16,
  },
  date: {
    color: '#666', // A lighter gray color to make the date subtler
    fontSize: 12,
  },
});
