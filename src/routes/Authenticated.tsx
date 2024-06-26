import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Authenticated/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import SearchUser from '../screens/Authenticated/SearchUser';
import Profile from '../screens/Authenticated/Profile';
import Conversation from '../screens/Authenticated/Conversation';
import Creategroup from '../screens/Authenticated/Creategroup';
import { Colors } from '../utils';
import GroupDetailes from '../screens/Authenticated/GroupDetailes';

export type AuthenticatedNavigatorType = {
  [Routes.Home]: undefined,
  [Routes.SearchUser]: undefined,
  [Routes.Profile]: undefined,
  [Routes.Conversation]: { id: string, type?: string },
  [Routes.Creategroup]: undefined
  [Routes.GroupDetailes]: { id: string, groupImage: string, groupName: string }
};

const Stack = createNativeStackNavigator<AuthenticatedNavigatorType>();

const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.PRIMARY }
      }}
    >
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.SearchUser} component={SearchUser} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
      <Stack.Screen name={Routes.Conversation} component={Conversation} />
      <Stack.Screen name={Routes.Creategroup} component={Creategroup} />
      <Stack.Screen name={Routes.GroupDetailes} component={GroupDetailes} />
    </Stack.Navigator>
  )
}

export default Authenticated