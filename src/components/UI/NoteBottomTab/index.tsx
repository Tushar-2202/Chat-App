import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../../../utils'

const NoteBottomTab = () => {
  return (
    <View style={styles.bottomTab}>
      <AntDesign name="clockcircleo" size={20} color={Colors.NOTE_ICON_LITE_2}/>
      <FoundationIcon name="bold" size={28} color={Colors.NOTE_ICON_LITE}/>
      <MaterialCommunityIcons name='slash-forward' size={23} color={Colors.NOTE_ICON_LITE_2}/>
      <Ionicons name='text' size={23} color={Colors.NOTE_ICON_LITE_2}/>
      <Feather name='image' size={24} color={Colors.NOTE_ICON_LITE_2}/>
    </View>
  )
}

export default NoteBottomTab