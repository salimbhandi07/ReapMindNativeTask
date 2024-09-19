import React from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Heading from '../Heading';

const UserPieChart = ({ userCountMonth }) => {
  const defaultData = Array(12).fill(0);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const colors = [
    '#ff6347', '#3cb371', '#4682b4', '#ffd700', '#808080', '#000000',
    '#800080', '#cd9127', '#ffc0cb', '#ff4500', '#00fa9a', '#1e90ff'
  ];

  const getColorForMonth = index => colors[index];

  // Use default data if userCountMonth is not provided or empty
  const data = (userCountMonth || defaultData).map((population, index) => ({
    name: months[index],
    population: population,
    color: getColorForMonth(index),
    legendFontColor: '#575554',
    legendFontSize: 15,
  }));

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <Heading title="Monthly User Pie Chart" />
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 0]}
          absolute
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default UserPieChart;
