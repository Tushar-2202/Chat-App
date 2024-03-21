import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigatorType } from '../../Routes/Navigate'
import { Routes } from '../../Routes/Routes'
import SplashScreen from 'react-native-splash-screen'

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorType,'Splash'>
}

const Splash = ({navigation}:Props) => {

  const user = useSelector((state: any) => state.userReducer.userInfo)

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
      if (user) {
        navigation.replace(Routes.Authentication)
      }else{
        navigation.replace(Routes.UnAuthenticated)
      }
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Images/SplashLogo.png')}
        style={styles.logo}
      />
    </View>
  )
}

export default Splash