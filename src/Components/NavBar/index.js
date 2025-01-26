import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper'; //Library from the native-paper open source matrial

//Import our screens for connection
import AccountsScreen from '../../Screens/Accounts';
import HomeScreen from '../../Screens/Home';
import PlannerScreen from '../../Screens/Planner';
import TransactionsScreen from '../../Screens/Transactions';

const Navigation = () => { // Base function from the BottomNavigation api on native-paper
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard', focusedIcon: 'apps', unfocusedIcon: 'apps'}, //Home page
    { key: 'transactions', title: 'Transactions', focusedIcon: 'calculator', unfocusedIcon: 'calculator' },
    { key: 'accounts', title: 'Accounts', focusedIcon: 'account',unfocusedIcon: 'account'}, //Account page
    { key: 'planner', title: 'Planner', focusedIcon: 'map', unfocusedIcon: 'map' } //Planner Page
  ]);

  const renderScene = BottomNavigation.SceneMap({
    accounts: AccountsScreen,
    dashboard: HomeScreen,
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