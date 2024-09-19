import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/dataNotFound.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Data Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E384D',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#7D879C',
    textAlign: 'center',
  },
});

export default NoDataFound;
