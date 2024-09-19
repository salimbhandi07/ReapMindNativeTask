import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {globalFonts} from '../../utils/globalFonts';
import {globalColors} from '../../utils/globalColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  button: {
    backgroundColor: '#003384',
    height: RFValue(45),
    width: '100%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  imageBack: {height: RFPercentage(55)},
  imageBackView: {flex: 1, alignItems: 'center', marginTop: RFValue(70)},
  logoImage: {height: RFPercentage(28), width: RFPercentage(28)},
  bottomView: {
    flex: 2,
    backgroundColor: '#ffffff',
    bottom: RFValue(80),
    borderTopStartRadius: RFValue(40),
    borderTopEndRadius: RFValue(40),
  },
  signInText: {
    fontSize: RFValue(32),
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
  },
  inputStyles: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginTop: RFValue(15),
    borderWidth: 0,
    fontFamily: globalFonts.regular,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    color: '#023e98',
    marginTop: RFValue(10),
    fontFamily: globalFonts.regular,
    fontSize: RFValue(16),
  },
  buttonText: {
    fontSize: RFValue(18),
    color: globalColors.white,
    fontFamily: globalFonts.medium,
  },
  accountText: {
    color: globalColors.grey,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
  },
  signUpText: {color: '#023e98', fontSize: RFValue(14)},
  textInputView: {marginHorizontal: RFValue(35), paddingVertical: RFValue(15)},
  signUpView: {
    flexDirection: 'row',
    marginTop: RFValue(15),
    alignSelf: 'center',
  },

  input: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    borderWidth: 0,
    borderTopRightRadius: RFValue(10),
    borderTopLeftRadius: RFValue(10),
    backgroundColor: globalColors.whiteGrey,
    paddingLeft: RFPercentage(2),
  },
  errorText: {
    color: 'red',
    fontSize: RFValue(12),
    marginTop: RFValue(2),
    fontFamily: globalFonts.regular,
  },
});
