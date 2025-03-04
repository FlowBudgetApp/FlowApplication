import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';

//Import our screens for connection
import AccountsScreen from '../../Screens/Accounts';
import HomeScreen from '../../Screens/Home';
import PlannerScreen from '../../Screens/Planner';
import PlannerPlanScreen from '../../Screens/Planner/PlanScreen';
import PlannerCatScreen from '../../Screens/Planner/CatScreen';
import TransactionsScreen from '../../Screens/Transactions';

const Stack = createStackNavigator();

const BottomTabNavigation = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard', focusedIcon: 'apps', unfocusedIcon: 'apps' },
    { key: 'transactions', title: 'Transactions', focusedIcon: 'calculator', unfocusedIcon: 'calculator' },
    { key: 'accounts', title: 'Accounts', focusedIcon: 'account', unfocusedIcon: 'account' },
    { key: 'planner', title: 'Planner', focusedIcon: 'map', unfocusedIcon: 'map' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: HomeScreen,
    transactions: TransactionsScreen,
    accounts: AccountsScreen,
    planner: () => <PlannerScreen navigation={navigation} />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ffffff' }}
      activeColor="#005D5F"
      inactiveColor="#999999"
      shifting={false}
      labeled={true}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabs">
        <Stack.Screen name="BottomTabs" component={BottomTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="PlannerCatScreen" component={PlannerCatScreen} />
        <Stack.Screen name="PlannerPlanScreen" component={PlannerPlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
