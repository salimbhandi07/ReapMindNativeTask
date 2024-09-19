import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { globalColors } from '../../utils/globalColors';

const Loader = ({ visible, message = "Please wait..." }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={globalColors.primaryTheme} />
      <Text style={styles.message}>{"Please wait..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: globalColors.primaryTheme,
  },
});

export default Loader;
