import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigation/Routes';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, String } from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { logOut } from '../../../redux-toolkit/userSlice';
import database from '@react-native-firebase/database'
import CustomModal, { ModalType } from '../../View/CustomModal';

interface DrawerProps {
    label: string;
    value?: string;
    onPress: () => void;
}

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const navigation = useNavigation<any>();
    const user = useSelector((state: any) => state.userReducer.userInfo);
    const [noOfNotes, setNoOfNotes] = useState<string>('0');
    const [noOfReminders, setNoOfReminders] = useState<string>('0');
    const [modal, setModal] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(String.alert);
    const [message, setMessage] = useState<string>('');
    const [modalType, setModalType] = useState<ModalType>(ModalType.ALERT);
    const dispatch = useDispatch()

    const openModal = (title: ModalType, message: string) => {
        setModal(true)
        setTitle(title)
        setMessage(message)
        navigation.dispatch(DrawerActions.closeDrawer())
    }

    const handleLogout = async () => {
        try {
            if (user?.provider === 'google') {
                await GoogleSignin.signOut();
            }
            await auth().signOut();
            dispatch(logOut())
            navigation.dispatch(DrawerActions.closeDrawer())
            Toast.show({
                type: 'success',
                text1: String.logOutSuccess,
            });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: Routes.UnAuthenticated }
                    ]
                })
            )
        } catch (error: any) {
            console.log('error', error)
        }
    }

    const handleClick = () => {
        navigation.dispatch(DrawerActions.closeDrawer())
    }

    const DrawerItem = ({ label, value, onPress }: DrawerProps) => {
        return (
            <TouchableOpacity style={styles.drawerItem} activeOpacity={0.7} onPress={onPress}>
                <Text style={styles.label}>{label}</Text>
                {value && <Text style={styles.values}>{value}</Text>}
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const notesRef = database().ref('/notes');
        notesRef.on('value', (snapshot) => {
            const notes = snapshot.val();
            const data: any[] = [];
            for (let id in notes) {
                if (notes[id].userId === user?.uuid) {
                    data.push(notes[id]);
                }
            }
            setNoOfNotes(data.length.toString());
        });

        const remindersRef = database().ref('/reminders');
        remindersRef.on('value', (snapshot) => {
            const reminders = snapshot.val();
            const data: any[] = [];
            for (let id in reminders) {
                if (reminders[id].userId === user?.uuid) {
                    data.push(reminders[id]);
                }
            }
            setNoOfReminders(data.length.toString());
        });
    }, [])

    return (
        <View style={styles.container}>

            <CustomModal
                modal={modal}
                setModal={setModal}
                title={title}
                type={modalType}
                message={message}
                button1Text={String.ok}
                button1Action={handleLogout}
                button2Text={String.cancle}
                button2Action={() => setModal(false)}
            />

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Icon name='keyboard-backspace' size={30} color={Colors.WHITE} onPress={() =>
                        navigation.dispatch(DrawerActions.closeDrawer())
                    } />
                    <Text style={styles.headerText}>{user?.userName}</Text>
                </View>
            </View>

            <DrawerContentScrollView {...props}
                style={styles.contentContainer}
            >
                <DrawerItem label={String.notes} value={noOfNotes} onPress={() => navigation.navigate(Routes.Notebook)} />
                <DrawerItem label={String.reminders} value={noOfReminders} onPress={() => navigation.navigate(Routes.Reminder)} />
                <DrawerItem label={String.deleted} value="0" onPress={handleClick} />
                <DrawerItem label={String.archives} value="24" onPress={handleClick} />

                <View style={styles.line} />

                <DrawerItem label={String.rateOurApp} onPress={handleClick} />
                <DrawerItem label={String.shareOurApp} onPress={handleClick} />
                <DrawerItem label={String.giveUsFeedback} onPress={handleClick} />

                <View style={styles.line2} />

                <DrawerItem label={String.logOut} onPress={() =>
                    openModal(ModalType.ALERT, String.logOutMessage)
                } />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer