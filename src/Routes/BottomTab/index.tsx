import { View, Text } from 'react-native'
import React from 'react'
import { Routes } from '../Routes'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Notebook from '../../screens/Authenticated/Notebook'
import Reminder from '../../screens/Authenticated/Reminder'
import styles from './style'
import { Colors, String } from '../../utils'
import Icon from 'react-native-vector-icons/Feather'
import { DrawerActions } from '@react-navigation/native'
import MyTabBar from '../../components/UI/MyTabBar'

export type BottomTabType = {
  [Routes.Notebook]: undefined,
  [Routes.Reminder]: undefined,
}

interface BottomTabProps {
  navigation: BottomTabNavigationProp<BottomTabType>
}

const Tab = createBottomTabNavigator<BottomTabType>()

const BottomTab = ({ navigation }: BottomTabProps) => {

  const headerTitle = () => (
    <View style={styles.headerTitle}>
      <Text style={styles.title1}>{String.moon}</Text>
      <Text style={styles.title2}>{String.note}</Text>
    </View>
  )

  const headerLeft = () => (
    <Icon
      name="menu"
      size={30}
      style={styles.menuIcon}
      onPress={() =>
        navigation.dispatch(DrawerActions.toggleDrawer())
      }
    />
  )

  return (
    <Tab.Navigator
      initialRouteName={Routes.Notebook}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY
        },
        headerLeft,
        headerTitle
      }}
    >
      <Tab.Screen name={Routes.Notebook} component={Notebook} />
      <Tab.Screen name={Routes.Reminder} component={Reminder} />
    </Tab.Navigator>
  )
}

export default BottomTab