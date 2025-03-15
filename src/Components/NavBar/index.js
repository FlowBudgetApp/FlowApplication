import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';

import HomeScreen from '../../Screens/Home';
import TransactionsScreen from '../../Screens/Transactions';
import TransactionsExtra from '../../Screens/Transactions/TransactionInspect'
import AccountsScreen from '../../Screens/Accounts';
import NewAccountScreen from '../../Screens/Accounts/NewAccount';
import PlannerScreen from '../../Screens/Planner';
import PlannerPlanScreen from '../../Screens/Planner/PlanScreen';
import PlannerCatScreen from '../../Screens/Planner/CatScreen';
import SettingsScreen from '../../Screens/Settings'

const subScreens = { //ADD THE NEW SCREENS HERE PLEASE
  "TransactionExtra": TransactionsExtra,
  "NewAccount": NewAccountScreen,
  "PlannerCatScreen": PlannerCatScreen,
  "PlannerPlanScreen": PlannerPlanScreen,
  "SettingsScreen": SettingsScreen
}

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
    dashboard: () => <HomeScreen navigation={navigation} />,
    transactions: () => <TransactionsScreen navigation={navigation} />,
    accounts: () => <AccountsScreen navigation={navigation} />,
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
        {Object.entries(subScreens).map(([name, component]) => ( // Any Extra Screens
          <Stack.Screen 
            key={name}
            name={name} 
            component={component} 
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
