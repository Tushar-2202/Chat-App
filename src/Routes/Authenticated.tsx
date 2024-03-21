import React from 'react'
import { Routes } from './Routes';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import AddNotebook from '../screens/Authenticated/AddNotebook';
import AddReminder from '../screens/Authenticated/AddReminder';
import { Colors, Fonts, String } from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';

export type AuthenticatedNavigatorType = {
  [Routes.Dashboard]: undefined
  [Routes.AddNotebook]: { notebookId?: string }
  [Routes.AddReminder]: { reminderId?: string }
};

interface AuthenticatedProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

const Stack = createNativeStackNavigator<AuthenticatedNavigatorType>();

const Authenticated = ({ navigation }: AuthenticatedProps) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Dashboard}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontFamily: Fonts.medium,
          fontSize: 19.5,
        },
        headerLeft: () => (
          <Icon
            name="arrowleft"
            size={28}
            color={Colors.WHITE}
            style={{ marginRight: 20 }}
            onPress={() =>
              navigation.goBack()
            }
          />
        )
      }}
    >
      <Stack.Screen name={Routes.Dashboard} component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.AddNotebook} component={AddNotebook}
        options={{
          title: String.createNoteHeader
        }}
      />
      <Stack.Screen name={Routes.AddReminder} component={AddReminder}
        options={{
          title: String.addReminder
        }}
      />
    </Stack.Navigator>
  )
}

export default Authenticated