import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet} from 'react-native';
import {Text, Card,} from 'react-native-paper';
import CategoryItem from '../../Components/PlannerComp';
import { useTheme } from '../Theming';

export default function CategoryHandle({data}) {
  const { theme } = useTheme();
  // Calculate the total cost and current amount for all items in this category type
  const totalCost = data.items.reduce((sum, item) => sum + item.amount.totalCost, 0);

  return (
    <SafeAreaView style={{ marginTop: 15, marginBottom: 15, marginHorizontal: 5 }}>
      <Card style={[styles.catCard, { backgroundColor: theme.colors.elevation.level1 }]}>
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
}

const styles = StyleSheet.create({
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
  catCard: {
    backgroundColor: '#fff',
    elevation: 3, // Shadow effect
  }
});