import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useTheme } from "../../Components/Theming";


export default function ViewAccount({ navigation, route }) {
  const { theme } = useTheme();
  const { accountData } = route.params || {};

  //For Charts
  console.log(theme.colors.elevation.level5)
  const rgbStringToHex = (rgbString) => {
    // Extract the RGB values from the string
    const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = rgbString.match(rgbRegex);

    if (!match) {
      throw new Error('Invalid RGB string format. Expected format: rgb(r, g, b)');
    }

    // Parse the RGB values
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);

    // Convert to hex and pad with zeros if needed
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Return the combined hex code
    return `#${hexR}${hexG}${hexB}`;
  };

  const [cardWidth, setCardWidth] = useState(0);
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setCardWidth(width);
  };
  const chartConfig = {
    backgroundGradientFrom: rgbStringToHex(theme.colors.elevation.level5),
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: rgbStringToHex(theme.colors.elevation.level5),
    backgroundGradientToOpacity: 1,
    color: () => theme.colors.primary,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => theme.colors.secondary, // optional
        strokeWidth: 2 // optional
      }
    ],
  };

  console.log(accountData)

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <Card style={{ marginTop: 10, marginBottom: 5 }}>
        <Card.Content style={styles.row}>
          <Text variant="titleMedium">Balance</Text>
          <Text variant="titleMedium">${accountData.balance}</Text>
        </Card.Content>
      </Card>
      <Card onLayout={handleLayout} style={{ marginTop: 10, marginBottom: 5 }}>
        <LineChart
          data={data}
          withShadow={false}
          withDots={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          width={cardWidth}
          height={150}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          withInnerLines={false}
          bezier
        />
        <Card.Content style={[styles.row, { backgroundColor: theme.colors.elevation.level5 }]}>
          <Text variant="titleSmall">Month</Text>
          <Text variant="titleSmall">Month</Text>
        </Card.Content>
        <Divider></Divider>
        <Card.Content style={[styles.row, { backgroundColor: theme.colors.elevation.level5 }]}>
          <Text variant="titleMedium">Month-Month</Text>
          <Text variant="titleMedium">Up ##% from last month</Text>
        </Card.Content>
      </Card>

      <Card onLayout={handleLayout} style={{ marginTop: 10, marginBottom: 5 }}>
        <BarChart
          data={data}
          width={cardWidth}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withInnerLines={false}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});