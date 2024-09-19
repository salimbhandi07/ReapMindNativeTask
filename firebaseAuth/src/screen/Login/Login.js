import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import logo from '../../assets/images/login/logo.png';
import gradient from '../../assets/images/login/gradient.jpg';
import {styles} from '../Login.styles';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../redux/slice/authSlice';
import {Button} from '../../component/Button';
import {
  validateEmail,
  validatePassword,
} from '../../../utils/validators/validators';
import {validatePasswordMessage} from '../../../utils/contants/constants';
import {fetchUserCountMonth} from '../../../redux/slice/userSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.auth?.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
    setErrorEmail(!validateEmail(text));
  };

  const handlePasswordChange = text => {
    setPassword(text);
    setErrorPassword(!validatePassword(text));
  };

  const submitLogin = async () => {
    try {
      dispatch(loginUser({email, password}));
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };
  useEffect(() => {
    dispatch(fetchUserCountMonth());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground style={styles.imageBack} source={gradient}>
          <View style={styles.imageBackView}>
            <Image
              source={logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>

        <View style={styles.bottomView}>
          <View style={styles.textInputView}>
            <Text style={styles.signInText}>Sign in</Text>

            <TextInput
              style={[styles.input, errorEmail && {borderColor: 'red'}]}
              onChangeText={handleEmailChange}
              value={email}
              placeholder="Email"
              placeholderTextColor={'gray'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errorEmail && email !== '' && (
              <Text style={styles.errorText}>Please enter a valid email</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, errorPassword && {borderColor: 'red'}]}
                onChangeText={handlePasswordChange}
                value={password}
                placeholder="Password"
                placeholderTextColor={'gray'}
                secureTextEntry={!passwordVisible}
              />
            </View>
            {errorPassword && password !== '' && (
              <Text style={styles.errorText}>{validatePasswordMessage}</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              onPress={submitLogin}
              style={styles.button}
              textStyle={styles.buttonText}
              title={'Sign In'}
              isLoading={isLoading}
              disabled={isLoading}
            />

            <View style={styles.signUpView}>
              <Text style={styles.accountText}>Don't have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
