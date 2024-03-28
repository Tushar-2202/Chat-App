import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'

interface CustomButtonProps {
  onPress: () => void,
  title: string,
  mt?: number,
  mb?: number,
  backgroundColor?: string,
  borderColor?: string,
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    title,
    mt = 20,
    mb = 0,
    backgroundColor,
    borderColor,
  } = props

  return (
    <TouchableOpacity
      style={[styles.button,
      { marginTop: mt, marginBottom: mb, backgroundColor: backgroundColor, borderColor: borderColor }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton