import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {globalColors} from '../../../utils/globalColors';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={require('../../assets/logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.primaryTheme,
  },
  logoImage: {
    width: '70%',
    height: '100%',
  },
});
