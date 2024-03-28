import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { Colors, String, REGEX, toUpperCase } from '../../../utils'
import CustomButton from '../../../components/UI/CustomButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedNavigatorType } from '../../../Routes/UnAuthenticated'
import { Routes } from '../../../Routes/Routes'
import { Controller, useForm } from 'react-hook-form'
import InputText from '../../../components/UI/InputText'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import Toast from 'react-native-toast-message'
import auth from '@react-native-firebase/auth';
import { RootNavigatorType } from '../../../Routes/Navigate'
import { addUser, UserInfo } from '../../../redux-toolkit/userSlice'
import { useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import CustomLoader from '../../../components/View/CustomLoader'

interface LoginProps {
    navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
    [String.emailID]: string
    [String.password]: string
}

const Login = ({ navigation }: LoginProps) => {

    const [loader, setLoader] = useState<boolean>(false)
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
    const dispatch = useDispatch()

    const onSubmit = async (data: FormValues) => {
        setLoader(true)
        try {
            const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
            const user = userCredential.user;

            const userRef = database().ref(`users/${user?.uid}`);
            userRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const userInfo: UserInfo = {
                        uuid: user?.uid,
                        userName: snapshot.val().userName,
                        email: snapshot.val().email,
                        password: data?.password,
                        provider: String.emailPassword,
                    };
                    dispatch(addUser(userInfo));
                    reset();
                    setLoader(false);
                    Toast.show({
                        type: 'success',
                        text1: String.logInSuccess,
                    });
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: Routes.Authentication }],
                        }),
                    );
                } else {
                    setLoader(false);
                    Toast.show({
                        type: 'error',
                        text1: String.userNotFound,
                    });
                }
            });
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.invalidCredentials,
                });
            } else {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.logInFailed,
                });
            }
        }
    };

    const onGoogleLogin = async () => {
        setLoader(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            const user = userCredential.user;

            const userObj: UserInfo = {
                email: user?.email,
                userName: user?.displayName,
                uuid: user?.uid,
                provider: String.google
            }
            database().ref(`users/${user.uid}`).set(userObj).then(() => {
                dispatch(addUser(userObj));
                reset();
                setLoader(false);
                Toast.show({
                    type: 'success',
                    text1: String.logInSuccess,
                });
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: Routes.Authentication }],
                    }),
                );
                GoogleSignin.revokeAccess();
            });
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.invalidCredentials,
                });
            } else {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.logInFailed
                });
            }
        }
    }

    const facebookLogin = () => {
        Toast.show({
            type: 'success',
            text1: String.loginWithFacebook
        })
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
                        <Text style={styles.headerText}>{toUpperCase(String.logIn)}</Text>
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
                            }}
                        />
                    </View>

                    <CustomButton
                        title={String.logIn}
                        onPress={handleSubmit(onSubmit)}
                        mt={40}
                        backgroundColor={Colors.LITE_YELLOW}
                        borderColor={Colors.DARK_YELLOW}
                    />

                    <Text style={styles.orText}>{String.or}</Text>

                    <CustomButton
                        title={String.loginWithGoogle}
                        onPress={onGoogleLogin}
                        backgroundColor={Colors.DARK_TOMATO}
                        borderColor={Colors.TOMATO}
                    />
                    <CustomButton
                        title={String.loginWithFacebook}
                        onPress={facebookLogin}
                        backgroundColor={Colors.BLUE}
                        borderColor={Colors.DARK_BLUE}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate(Routes.Signup)}
                    >
                        <Text style={styles.buttonSignup}>{String.signupWithEmail}</Text>
                    </TouchableOpacity>

                    <Text style={styles.forgotPassword}>{String.forgotPassword}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login