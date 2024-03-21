import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { Colors, String } from '../../../utils'
import CustomButton from '../../../components/UI/CustomButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Routes } from '../../../Routes/Routes'
import { useForm, Controller } from "react-hook-form"
import { REGEX } from '../../../utils/Constant'
import InputText from '../../../components/UI/InputText'
import { UnAuthenticatedNavigatorType } from '../../../Routes/UnAuthenticated'
import { RootNavigatorType } from '../../../Routes/Navigate'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { UserInfo, addUser } from '../../../redux-toolkit/userSlice'
import { useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import CustomLoader from '../../../components/View/CustomLoader'

interface SignupProps {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  [String.userName]: string
  [String.emailID]: string
  [String.password]: string
  [String.confiremPassword]: string
}

const Signup = ({ navigation }: SignupProps) => {

  const [loader, setLoader] = useState<boolean>(false)
  const { control, handleSubmit, reset, formState: { errors }, watch, setError } = useForm<FormValues>()
  const dispatch = useDispatch()

  const onSubmit = async (data: FormValues) => {
    setLoader(true)
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
      const userInfo: UserInfo = {
        uuid: user?.uid,
        userName: data.userName,
        email: data.email,
        password: data.password,
        provider: String.emailPassword
      };
      database().ref(`users/${user?.uid}`).set(userInfo).then(() => {
        dispatch(addUser(userInfo));
        reset();
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: String.signUpSuccess,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.Authentication }],
          }),
        );

      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError(String.emailID, { type: 'manual', message: String.emailExitLogin });
        setLoader(false);
      } else if (error.code === 'auth/weak-password') {
        setError(String.password, { type: 'manual', message: String.weakPassword });
        setLoader(false);
      } else {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: String.signupError,
          text2: error.message
        });
      }
    }
  }

  return (
    <ScrollView>
      <CustomLoader
        loader={loader}
        setLoader={setLoader}
      />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{String.signUp}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  placeholder={String.emailIDPlaceholder}
                  keyboardType='email-address'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors[String.emailID]?.message}
                />
              )}
              name={String.emailID}
              rules={{
                required: { value: true, message: String.emailIDRequired },
                pattern: { value: REGEX.EMAIL, message: String.emailIDInvalid }
              }}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  placeholder={String.userName}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors[String.userName]?.message}
                />
              )}
              name={String.userName}
              rules={{ required: String.userNameRequired }}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  placeholder={String.password}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors[String.password]?.message}
                />
              )}
              name={String.password}
              rules={{
                required: { value: true, message: String.passwordRequired },
                minLength: { value: 4, message: String.passwordMinLength },
                pattern: { value: REGEX.PASSWORD, message: String.passwordmustBeStrong }
              }}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  placeholder={String.confiremPasswordPlaceolder}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors[String.confiremPassword]?.message}
                />
              )}
              name={String.confiremPassword}
              rules={{
                required: { value: true, message: String.confirmPasswordRequired },
                pattern: { value: REGEX.PASSWORD, message: String.passwordmustBeStrong },
                validate: value => value === watch(String.password) || String.confirmPasswordMatch
              }}
            />

          </View>

          <CustomButton
            title={String.signUp}
            onPress={handleSubmit(onSubmit)}
            mt={40}
            backgroundColor={Colors.LITE_YELLOW}
            borderColor={Colors.DARK_YELLOW}
          />

          <Text style={styles.orText}>{String.or}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(Routes.Login)}
          >
            <Text style={styles.buttonSignup}>{String.signInHere}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup