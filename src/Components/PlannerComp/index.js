import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar, MD3Colors} from 'react-native-paper';

const CategoryItem = ({ category }) => (
  <View style={{marginBottom: 15}}>
    <View style={styles.row}>
      <Text variant='titleSmall'>{category.name}</Text>
      <Text>${category.totalCost}</Text>
    </View>
    <ProgressBar style={{borderRadius: 50}} progress={category.currentAmount / category.totalCost} color={MD3Colors.error50} />
  </View>
);

const styles = StyleSheet.create({
  progRow: {flexDirection: 'row',alignItems: 'center'},
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  leftText: {marginLeft: 10,},
});

export default CategoryItem;
