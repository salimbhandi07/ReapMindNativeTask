import {Provider, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import AppContainer from './navigator';
import store from './redux/store';
import Toast from 'react-native-toast-message';
import {io} from 'socket.io-client';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  io('http://10.0.2.2:5000');
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {});

    return unsubscribe;
  }, []);

  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
      <Toast />
    </>
  );
};

export default App;
