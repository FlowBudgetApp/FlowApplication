import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '../../Components/Header'
import { Divider, Button, Text, Card, SegmentedButtons } from 'react-native-paper';
import CategoryItem from '../../Components/PlannerComp';
import { useTheme } from "../../Components/Theming";

const Planinfo = [
  {
    title: 'Vacation',
    categories: [
      { name: "Airplane Ticket", totalCost: 900, currentAmount: 90 },
      { name: "Clothes", totalCost: 500, currentAmount: 125 }
    ]
  },
  {
    title: 'New Car',
    categories: [
      { name: "Down Payment", totalCost: 2000, currentAmount: 500 },
      { name: "Insurance", totalCost: 1000, currentAmount: 250 }
    ]
  },
  {
    title: 'Home Renovation',
    categories: [
      { name: "Kitchen", totalCost: 5000, currentAmount: 1500 },
      { name: "Bathroom", totalCost: 3000, currentAmount: 800 }
    ]
  },
  {
    title: 'Gaming Setup',
    categories: [
      { name: "PC", totalCost: 2500, currentAmount: 1000 },
      { name: "Monitor", totalCost: 800, currentAmount: 300 }
    ]
  },
  {
    title: 'Fitness Equipment',
    categories: [
      { name: "Treadmill", totalCost: 1200, currentAmount: 400 },
      { name: "Weights", totalCost: 600, currentAmount: 200 }
    ]
  }
];
const sortedPlan = [...Planinfo].sort((a, b) => a.title.localeCompare(b.title));

const CatRankings = {
  'Bills': 0,
  'Streaming Services': 1
}
const CatInfo = [
  {
    name: 'Water Bill',
    type: 'Bills',
    amount: { totalCost: 2000, currentAmount: 523 }
  },
  {
    name: 'Electricity Bill',
    type: 'Bills',
    amount: { totalCost: 1800, currentAmount: 412 }
  },
  {
    name: 'Gas Bill',
    type: 'Bills',
    amount: { totalCost: 1200, currentAmount: 289 }
  },
  {
    name: 'Internet Bill',
    type: 'Bills',
    amount: { totalCost: 960, currentAmount: 80 }
  },
  {
    name: 'Netflix',
    type: 'Streaming Services',
    amount: { totalCost: 40, currentAmount: 23 }
  },
  {
    name: 'Disney+',
    type: 'Streaming Services',
    amount: { totalCost: 35, currentAmount: 10 }
  },
  {
    name: 'Hulu',
    type: 'Streaming Services',
    amount: { totalCost: 30, currentAmount: 15 }
  }
]
// Group the items by type
const groupedByType = {};
for (const item of CatInfo) {
  const type = item.type;
  if (!groupedByType[type]) {
    groupedByType[type] = [];
  }

  groupedByType[type].push(item);
}
const listOfLists = Object.entries(groupedByType).map(([type, items]) => ({
  type,
  items
}));

export default function Planner({ navigation }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('plans'); // Default to Plans tab
  const [value, setValue] = React.useState('0');

  //PLANNER SECTION
  const PlannerCard = ({ data }) => {
    const totalCost = data.categories.reduce((sum, cat) => sum + cat.totalCost, 0);
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardRow}>
            <Text variant="titleMedium">{data.title}</Text>
            <Text>${totalCost}</Text>
          </View>
          <Text style={{ fontSize: 8, marginBottom: 5 }} variant="labelSmall">in the last 30 days</Text>
          {data.categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </Card.Content>
      </Card>
    );
  };

  //CATEGORIES SECTION
  const CategoryTypeCard = ({ data }) => {
    // Calculate the total cost and current amount for all items in this category type
    const totalCost = data.items.reduce((sum, item) => sum + item.amount.totalCost, 0);

    return (
      <SafeAreaView style={{ marginTop: 15, marginBottom: 15, marginHorizontal: 5 }}>
        <Card style={styles.catCard}>
          <Card.Content>
            <View style={styles.cardRow}>
              <Text variant="titleMedium">{data.type}</Text>
              <Text>${totalCost}</Text>
            </View>
            {data.items.map((item, index) => (
              <CategoryItem
                key={index}
                category={{
                  name: item.name,
                  totalCost: item.amount.totalCost,
                  currentAmount: item.amount.currentAmount
                }}
              />
            ))}
          </Card.Content>
        </Card>
      </SafeAreaView>
    );
  };

  const renderCategoriesContent = () => {
    return (
      <View style={{ padding: 16 }}>
        <SafeAreaView style={{ marginTop: 15, marginBottom: 15}}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              { value: '0', label: '7D' },
              { value: '1', label: '1M' },
              { value: '2', label: '6M' },
              { value: '3', label: '1Y' },
              { value: '4', label: 'Max' },
            ]}
          />
        </SafeAreaView>

        <FlatList
          data={listOfLists}
          renderItem={({ item }) => <CategoryTypeCard data={item} />}
          keyExtractor={(item) => item.type}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    );
  };

  //Based on active tab
  const renderContent = () => {
    if (activeTab === 'plans') {
      return (
        <FlatList
          data={sortedPlan}
          renderItem={({ item }) => <PlannerCard data={item} />}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      );
    } else {
      return renderCategoriesContent();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Planner"
        leftIcon="cog"
        rightIcon="plus"
        onLeftPress={() => navigation.navigate('SettingsScreen', {})}
      //onRightPress={}
      />
      <View style={styles.row}>
        <View>
          <Button onPress={() => setActiveTab('plans')} style={{ backgroundColor: 'transparent' }}>
            <Text style={{ color: activeTab === 'plans' ? theme.colors.primary : 'gray' }}>
              Plans
            </Text>
          </Button>
          <Divider style={[{ backgroundColor: activeTab === 'plans' ? theme.colors.primary : 'transparent' }, { height: 3 }]} bold={true} />
        </View>
        <View>
          <Button onPress={() => setActiveTab('categories')} style={{ backgroundColor: 'transparent' }}>
            <Text style={{ color: activeTab === 'categories' ? theme.colors.primary : 'gray' }}>
              Categories
            </Text>
          </Button>
          <Divider style={[{ backgroundColor: activeTab === 'categories' ? theme.colors.primary : 'transparent' }, { height: 3 }]} bold={true} />
        </View>
      </View>
      <Divider />
      {renderContent()}
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
    alignItems: 'center',
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
  catCard: {
    backgroundColor: '#fff',
    elevation: 3, // Shadow effect
  }
});