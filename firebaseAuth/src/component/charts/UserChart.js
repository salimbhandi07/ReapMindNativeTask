import React from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Heading from '../../component/Heading';
import {months, usersCount} from '../../../utils/contants/constants';

const UserChart = ({userCountMonth}) => {
  const data = {
    labels: months,
    datasets: [
      {
        data: userCountMonth || usersCount,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <Heading title="Monthly User Bar Char" />

      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={screenWidth}
          height={300}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withInnerLines={false}
          flatColor={true}
          chartConfig={{
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#f5f5f5',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
          }}
          verticalLabelRotation={-45}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    marginLeft: -30,
  },
});

export default UserChart;
