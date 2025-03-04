import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../Components/Header'
import { Divider, Button, Text, Card, } from 'react-native-paper';
import CategoryItem from '../../Components/PlannerComp';

const info = [
  {
    title: 'Vacation', categories: [
      { name: "Airplane Ticket", totalCost: 900, currentAmount: 90 },
      { name: "Clothes", totalCost: 500, currentAmount: 125 }
    ]
  },
  {
    title: 'New Car', categories: [
      { name: "DownPayment", totalCost: 4000, currentAmount: 1234 },
      { name: "Attachments", totalCost: 500, currentAmount: 100 }
    ]
  },
];
const sortedInfo = [...info].sort((a, b) => a.title.localeCompare(b.title));

export default function Planner({ navigation }) {
  const settingsPressed = () => {
    // Menu handling logic
  };

  const profilePressed = () => {
    // Add handling logic
  };

  const ButtonText = (data) => (
    <Button onPress={() => navigation.navigate(data.pageName)}>
      {data.text}
    </Button>
  );


  const PlannerCard = ({ data }) => {
    const totalCost = data.categories.reduce((sum, cat) => sum + cat.totalCost, 0);
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardRow}>
            <Text variant="titleMedium">{data.title}</Text>
            <Text>${totalCost}</Text>
          </View>
          <Text style={{fontSize: 8}} variant="labelSmall">in the last 30 days</Text>
          {data.categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Planner"
        leftIcon="account"
        rightIcon="cog"
        onLeftPress={profilePressed}
        onRightPress={settingsPressed}
      />
      <View style={styles.row}>
        <ButtonText pageName='PlannerPlanScreen' text='Plans'></ButtonText>
        <ButtonText pageName='PlannerCatScreen' text='Categories'></ButtonText>
      </View>
      <Divider />
      <FlatList
        data={sortedInfo}
        renderItem={({ item }) => <PlannerCard data={item} />}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTitle: {
    alignItems: 'center'
  },
  contentText: {
    color: '#050606',
    fontWeight: '500',
  },
  card: {
    marginHorizontal: 32,
    marginVertical: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    elevation: 3, // Shadow effect
  },
});