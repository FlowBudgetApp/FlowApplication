import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, MD3Colors, Text} from 'react-native-paper';
import { useTheme } from "../../Components/Theming";

const CategoryItem = ({ category }) => {
  const { theme, toggleTheme, updateColors } = useTheme();
  
  return (
    <View style={{marginBottom: 5}}>
      <View style={styles.row}>
        <Text variant='titleSmall'>{category.name}</Text>
        <Text variant='titleSmall'>${category.totalCost}</Text>
      </View>
      <View style={styles.newRow}>
        <ProgressBar style={{borderRadius: 50, width: 275}} progress={category.currentAmount / category.totalCost} color={theme.colors.primary} />
        <Text variant='bodySmall'>Left ${category.totalCost - category.currentAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progRow: {flexDirection: 'row',alignItems: 'center'},
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  newRow:{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginTop: -3},
  leftText: {marginLeft: 10,},
});

export default CategoryItem;
