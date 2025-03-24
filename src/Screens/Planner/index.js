import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '../../Components/Header'
import { Divider, Button, Text, Card, SegmentedButtons } from 'react-native-paper';
import CategoryItem from '../../Components/PlannerComp';
import CategoryHandle from '../../Components/PlannerComp/catHandler';
import { useTheme } from "../../Components/Theming";
import HARDdata from '../../Components/HardData';

const sortedPlan = [...HARDdata.PlannerInfo].sort((a, b) => a.title.localeCompare(b.title));

// Group the items by type
const CatRankings = {
  'Bills': 0,
  'Streaming Services': 1
}
const listOfLists = HARDdata.groupCategoriesByType();

export default function Planner({ navigation }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('plans'); // Default to Plans tab
  const [value, setValue] = React.useState('0');

  //PLANNER SECTION
  const PlannerCard = ({ data }) => {
    const totalCost = data.categories.reduce((sum, cat) => sum + cat.totalCost, 0);
    return (
      <Card style={[styles.card, {backgroundColor: theme.colors.elevation.level1}]}>
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
          renderItem={({ item }) => <CategoryHandle data={item} />}
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