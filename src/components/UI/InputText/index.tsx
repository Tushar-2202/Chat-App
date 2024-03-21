import { Text, TextInput } from 'react-native'
import React from 'react'
import styles from './style'
import { Colors } from '../../../utils'

interface InputProps {
  placeholder: string,
  keyboardType?: 'email-address' | 'default' | 'numeric' | 'phone-pad',
  onChangeText: () => void,
  onBlur: () => void,
  value: string,
  error: any,
  secureTextEntry?: boolean
}

const InputText = (props: InputProps) => {

  const {
    placeholder,
    keyboardType = 'default',
    onChangeText,
    onBlur,
    value,
    error,
    secureTextEntry = false
  } = props

  return (
    <>
      <TextInput
        style={[styles.input, { borderColor: error ? Colors.DARK_TOMATO : Colors.BORDER }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.PLACEHOLDER}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  )
}

export default InputText