import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import {spacing, globalColors} from '@/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.xs,
    paddingTop: spacing.m,
    marginBottom: spacing.s,
  },
  input: {
    paddingHorizontal: spacing.xs,
  },
  label: {
    color: 'gray',
    position: 'absolute',
    top: 0,
    left: spacing.xs,
  },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  inputStyle: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    borderWidth: 0,
    borderTopRightRadius: RFValue(10),
    borderTopLeftRadius: RFValue(10),
    backgroundColor: globalColors.whiteGrey,
  },
  input: {
    height: RFValue(50),
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export function TextField({
  label,
  value,
  onChangeText,
  image,
  icon,
  secure = false,
  keyboardType = 'default',
  customStyle,
  multiline = false,
  disabled = false,
  autoCapitalize,
  maxLength,
  onSubmitEditing,
  forwardedRef,
  placeholder,
  ...rest
}) {
  return (
    <TextInput style={styles.input} onChangeText={onChangeText} value={value} />
    // <TextInput
    //   maxLength={maxLength}
    //   onSubmitEditing={onSubmitEditing}
    //   ref={forwardedRef}
    //   label={label}
    //   value={value}
    //   placeholder={placeholder}
    //   underlineColor={'transparent'}
    //   onChangeText={onChangeText}
    //   selectionColor={'#000'}
    //   autoCapitalize={autoCapitalize}
    //   theme={{
    //     colors: {
    //       primary: globalColors.primaryTheme,
    //       text: globalColors.blacktext,
    //       placeholder: globalColors.black,
    //       disabled: globalColors.black,
    //     },
    //   }}
    //   secureTextEntry={secure}
    //   disabled={disabled}
    //   multiline={multiline}
    //   keyboardType={keyboardType}
    //   numberOfLines={multiline ? 4 : 1}
    //   // left={
    //   //   icon ? (
    //   //     <TextInput.Icon
    //   //       name={() => {
    //   //         return (
    //   //           <Image
    //   //             style={styles.icons}
    //   //             source={image}
    //   //             resizeMode={'contain'}
    //   //           />
    //   //         );
    //   //       }}
    //   //     />
    //   //   ) : null
    //   // }
    //   style={[styles.inputStyle, customStyle]}
    // />
  );
}

TextField.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
