import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useTheme } from "../../Components/Theming";


export default function ViewAccount({ navigation, route }) {
  const { theme } = useTheme();
  const { accountData } = route.params || {};

  //For Charts
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
    backgroundGradientFrom: rgbStringToHex(theme.colors.elevation.level1),
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: rgbStringToHex(theme.colors.elevation.level1),
    backgroundGradientToOpacity: 1,
    color: () => theme.colors.primary,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => theme.colors.secondary, // optional
        strokeWidth: 2 // optional
      }
    ],
  };
  const div = Math.floor(chartData.datasets[0].data[chartData.labels.length - 1] / chartData.datasets[0].data[chartData.labels.length - 2] * 100)

  console.log(accountData)
 
  return (
    <View onLayout={handleLayout} style={{ marginTop: 10, marginHorizontal: 20, backgroundColor: theme.colors.elevation.level1 }}>
      <Card style={{ marginTop: 5, marginBottom: 10}}>
        <Card.Content style={styles.row}>
          <Text variant="titleMedium">Balance</Text>
          <Text variant="titleMedium">${accountData.balance}</Text>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: 10, marginBottom: 5 }}>
        <LineChart
          data={chartData}
          withShadow={false}
          withDots={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          fromZero={false}
          width={cardWidth}
          height={100}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          withInnerLines={false}
          bezier
        />
        <Card.Content>
          <View style={[styles.row, {marginBottom: 7}]}>
            <Text variant="titleSmall">{chartData.labels[0]}</Text>
            <Text variant="titleSmall">{chartData.labels[chartData.labels.length - 1]}</Text>
          </View>
          <Divider></Divider>
          <View style={styles.row}>
            <Text variant="titleMedium">{chartData.labels[0]}-{chartData.labels[chartData.labels.length - 1]}</Text>
            <Text variant="titleMedium">Changed by {div}% from last month </Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: 10, marginBottom: 5 }}>
        <BarChart
          data={chartData}
          fromZero={true}
          width={cardWidth}
          withHorizontalLabels={false}
          withInnerLines={false}
          height={200}
          showValuesOnTopOfBars={true}
          withHorizontalLines={false}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
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