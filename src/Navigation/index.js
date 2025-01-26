import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper'; //Library from the native-paper open source matrial

//Import our screens for connection
import AccountsScreen from '../screens/Accounts';
import HomeScreen from '../screens/Home';
import PlannerScreen from '../screens/Planner';
import TransactionsScreen from '../screens/Transactions';

const Navigation = () => { // Base function from the BottomNavigation api on native-paper
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'accounts', title: 'Accounts', focusedIcon: 'account',unfocusedIcon: 'account'}, //Account page
    { key: 'home', title: 'Home', focusedIcon: 'apps', unfocusedIcon: 'apps'}, //Home page
    { key: 'planner', title: 'Planner', focusedIcon: 'map', unfocusedIcon: 'map' }, //Planner Page
    { key: 'transactions', title: 'Transactions', focusedIcon: 'calculator', unfocusedIcon: 'calculator' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    accounts: AccountsScreen,
    home: HomeScreen,
    planner: PlannerScreen,
    transactions: TransactionsScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ffffff' }}
      activeColor="#007AFF"
      inactiveColor="#999999"
      shifting={false}
      labeled={true}
    />
  );
};

export default Navigation;