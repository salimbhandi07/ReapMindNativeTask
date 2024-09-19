import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Heading = ({title}) => {
  return (
    <View>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        paddingBottom: 5,
        borderRadius: 8,  },
    
});
