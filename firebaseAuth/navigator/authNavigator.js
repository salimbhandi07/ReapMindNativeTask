import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../src/screen/SignUp/SignUp';
import Login from '../src/screen/Login/Login';
import SplashScreen from '../src/screen/splashScreen/SplashScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
