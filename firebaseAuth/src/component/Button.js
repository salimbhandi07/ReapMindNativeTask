import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { globalFonts } from '../../utils/globalFonts';
import { globalColors } from '../../utils/globalColors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#003384',
    height: RFValue(45),
    width: '100%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  buttonText: {
    fontSize: RFValue(18),
    color: globalColors.white,
    fontFamily: globalFonts.medium,
  },
});

export function Button({
  style,
  textStyle,
  title,
  isLoading,
  loaderColor,
  ...rest
}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={loaderColor ? loaderColor : 'white'}
        />
      ) : (
        <Text style={[{color: colors.text}, styles.buttonText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
