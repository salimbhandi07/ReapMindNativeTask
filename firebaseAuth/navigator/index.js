import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import MainNav from './navigator';
import AuthNavigator from './authNavigator';
import auth from '@react-native-firebase/auth';
import {fetchProfile, fetchUserProfile} from '../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {setDeviceToken} from '../redux/slice/userSlice';

const AppContainer = () => {
  const dispatch = useDispatch();

  const [initalzing, setInitizing] = useState(false);
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    try {
      if (user) {
        dispatch(fetchUserProfile(user?.uid));
        dispatch(fetchProfile(user?.uid));
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const onAuthStateChange = user => {
    setUser(user);
    if (initalzing) setInitizing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  });
  if (initalzing) return null;

  useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken();
      dispatch(setDeviceToken(token));
    };
    getToken();
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      {user ? <MainNav /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppContainer;
