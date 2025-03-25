import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useTheme } from '../../Components/Theming';

export default function ViewAccount({ navigation, route }) {
  const { theme } = useTheme();
  const { accountData } = route.params || {};

  // Utility to convert RGB to HEX
  const rgbStringToHex = (rgbString) => {
    const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = rgbString.match(rgbRegex);
    if (!match) throw new Error('Invalid RGB string format.');
    return `#${parseInt(match[1], 10).toString(16).padStart(2, '0')}${parseInt(match[2], 10)
      .toString(16)
      .padStart(2, '0')}${parseInt(match[3], 10).toString(16).padStart(2, '0')}`;
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: rgbStringToHex(theme.colors.elevation.level5),
    backgroundGradientTo: rgbStringToHex(theme.colors.elevation.level5),
    color: () => theme.colors.primary,
    strokeWidth: 2,
    barPercentage: 0.7,
  };

  // Data for charts
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      { 
        data: [200, 450, 300, 550, 700, 400, 500, 600, 700, 750, 800, 850], 
        color: () => theme.colors.secondary, 
        strokeWidth: 2 
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Balance */}
      <InfoCard title="Balance" value={`$${accountData?.balance || 0}`} />

      {/* Line Chart: Monthly Trends */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.heading}>
            Monthly Trends
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={data}
              width={1200} // Enough width for all months to fit
              height={220}
              chartConfig={chartConfig}
              bezier
              withDots
              withInnerLines={false}
              withVerticalLabels
              withHorizontalLabels
            />
          </ScrollView>
          <Divider style={{ marginVertical: 10 }} />
          <Text variant="bodySmall" style={styles.footer}>
            Trend data based on the entire year
          </Text>
        </Card.Content>
      </Card>

      {/* Bar Chart: Spending Breakdown */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.heading}>
            Spending Breakdown
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={data}
              width={1200} // Enough width for all months to fit
              height={220}
              chartConfig={chartConfig}
              fromZero
              verticalLabelRotation={30}
            />
          </ScrollView>
          <Divider style={{ marginVertical: 10 }} />
          <Text variant="bodySmall" style={styles.footer}>
            Spending data categorized by month
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// Reusable component for account information
const InfoCard = ({ title, value }) => (
  <Card style={styles.card}>
    <Card.Content style={styles.row}>
      <Text variant="titleMedium">{title}</Text>
      <Text variant="titleMedium">{value}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 10,
  },
  footer: {
    textAlign: 'center',
    color: '#666',
  },
});
