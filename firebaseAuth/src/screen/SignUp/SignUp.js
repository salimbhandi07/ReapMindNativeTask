import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../../redux/slice/authSlice';
import {Button} from '../../component/Button';
import {RFValue} from 'react-native-responsive-fontsize';
import {globalColors} from '../../../utils/globalColors';
import {globalFonts} from '../../../utils/globalFonts';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.auth?.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(''); // New state for address
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validateEmail = input => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(input)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = input => {
    if (input.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = input => {
    if (input !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validatePhoneNumber = input => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(input)) {
      setPhoneNumberError('Invalid phone number');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSignUp = async () => {
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      phoneNumberError
    ) {
      Alert.alert(
        'Validation Error',
        'Please fix the errors before submitting',
      );
      return;
    }

    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      dispatch(signUpUser({name, email, password, phoneNumber, address}));
    } catch (error) {
      Alert.alert('Sign-Up Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <Text style={styles.header}>Create an Account</Text>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.textInput}
        placeholderTextColor={'gray'}
      />

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          validateEmail(text);
        }}
        style={styles.textInput}
        placeholderTextColor={'gray'}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text);
          validatePhoneNumber(text);
        }}
        style={styles.textInput}
        placeholderTextColor={'gray'}
        keyboardType="phone-pad"
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}

      <TextInput
        placeholder="Enter Address"
        value={address}
        onChangeText={text => setAddress(text)}
        style={styles.textInput}
        placeholderTextColor={'gray'}
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          validatePassword(text);
        }}
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor={'gray'}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          validateConfirmPassword(text);
        }}
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor={'gray'}
      />
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      <Button
        onPress={handleSignUp}
        textStyle={styles.buttonText}
        title={'Sign Up'}
        isLoading={isLoading}
        disabled={isLoading}
      />
      <View style={styles.signUpView}>
        <Text style={styles.accountText}>Already have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003384',
  },
  textInput: {
    backgroundColor: '#e0e0e0',
    color: 'black',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#003384',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  signUpView: {
    flexDirection: 'row',
    marginTop: RFValue(15),
    alignSelf: 'center',
  },
  accountText: {
    color: globalColors.grey,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
  },
  signUpText: {color: '#023e98', fontSize: RFValue(14)},
});

export default SignUp;
