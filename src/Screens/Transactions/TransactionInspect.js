import React, { useState } from 'react';
import { Text, StyleSheet, View} from 'react-native';

export default function ExtraScreen({ navigation, route }) {
  const { item } = route.params || {};

  return (
    <View>
      <Text>Transaction Details</Text>
      <Text>Payee: {item?.payee}</Text>
      <Text>Category: {item?.category}</Text>
      <Text>Cost: {item?.cost}</Text>
      <Text>Date: {item?.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});