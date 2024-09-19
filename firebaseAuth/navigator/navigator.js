import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeNavigator} from './HomeNavigator';
import ContactDetail from '../src/screen/contactInfo/ContactDetail';
import ChatScreen from '../src/screen/chat/ChatScreen';

const Stack = createStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{title: 'Contact Details'}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainNav;
