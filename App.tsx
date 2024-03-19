import 'react-native-gesture-handler';
import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigate from './src/navigation/Navigate';
import { Colors } from './src/utils';
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux-toolkit/store';
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '275820671215-i4gpb12g21sbjo3q1lfbubna3akq8ov6.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={Colors.TRANSPARENT}
          barStyle='dark-content'
          translucent
        />
        <NavigationContainer>
          <Navigate />
          <Toast
            position='bottom'
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App