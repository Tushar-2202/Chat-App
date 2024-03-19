import React from 'react'
import { Routes } from './Routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/UI/CustomDrawer';
import BottomTab from './BottomTab';

export type DashboardType = {
  [Routes.BottomTab]: undefined
}

const Drawer = createDrawerNavigator<DashboardType>();

const Dashboard = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Routes.BottomTab}
      screenOptions={{
        headerShown:false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name={Routes.BottomTab} component={BottomTab}
      />
    </Drawer.Navigator>
  )
}

export default Dashboard