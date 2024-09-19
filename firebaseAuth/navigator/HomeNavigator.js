import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactForm from '../src/screen/contactInfo/ContactForm';
import ContactCard from '../src/screen/contactInfo/CardComponent';
import Profile from '../src/screen/profile/Profile';
import Home from '../src/screen/Dashboad/Home';
import User from '../src/screen/register/User';


const Tab = createBottomTabNavigator();

export function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          } else if (route.name === 'Register User') {
            iconName = focused ? 'supervised-user-circle' : 'supervised-user-circle';
          } else if (route.name === 'ContactForm') {
            iconName = focused ? 'perm-contact-cal' : 'perm-contact-cal';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#003384',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Main" component={Home} />
      <Tab.Screen name="Register User" component={User} />
      <Tab.Screen name="ContactForm" component={ContactForm} />
      <Tab.Screen name="List" component={ContactCard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
