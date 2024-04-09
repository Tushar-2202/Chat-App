import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, String } from '../../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated'
import database from '@react-native-firebase/database'
import CustomButton from '../../../components/ui/CustomButton'
import Feather from 'react-native-vector-icons/Feather'
import Toast from 'react-native-toast-message'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import { Routes } from '../../../routes/Routes'

interface CreategroupProps {
    navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

interface User {
    email: string;
    userName: string;
    profilePicture: string;
    uuid: string;
}

interface Group {
    content: string;
    groupName: string;
    profilePicture: string;
    conversationKey: string | null;
    type: string;
    timestamp: string;
}

const Creategroup = ({ navigation }: CreategroupProps) => {
    const [groupName, setGroupName] = useState<string>('');
    const [fetchUsers, setFetchUsers] = useState<User[]>([]);
    const [groupSelectedUsers, setGroupSelectedUsers] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<string>('');

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        const ref = database().ref('users');
        ref.on('value', snapshot => {
            const data = snapshot.val();
            const users: User[] = [];
            for (let key in data) {
                users.push(data[key]);
            }
            setFetchUsers(users);
        });
    }

    const selectedGroupUser = (uuid: string) => {
        if (groupSelectedUsers.includes(uuid)) {
            const index = groupSelectedUsers.indexOf(uuid);
            groupSelectedUsers.splice(index, 1);
        } else {
            groupSelectedUsers.push(uuid);
        }
        setGroupSelectedUsers([...groupSelectedUsers]);
    }

    const selectedprofileImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, async (response: any) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode) {
                return;
            } else {
                const uploadUri = response.assets[0].uri;
                const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                const storageRef = storage().ref(`profilePictures/${filename}`);
                const task = storageRef.putFile(uploadUri);
                task.then(async () => {
                    const url = await storageRef.getDownloadURL();
                    setProfileImage(url);

                    console.log(url);
                });
            }
        });
    }

    const header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackIcon}>
                    <Icon name="arrow-back" size={17} color="black"
                    />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{String.createGroup}</Text>
                </View>
            </View>
        )
    }

    const createGroup = () => {
        try {
            if (groupName === '') {
                Toast.show({
                    type: 'error',
                    text1: String.groupName,
                });
                return;
            }

            if (groupSelectedUsers.length < 1) {
                Toast.show({
                    type: 'error',
                    text1: String.selctedGroupMemebers,
                });
                return;
            }

            const ref = database().ref('conversations');
            const newConversation = ref.push({
                groupName: groupName,
                allUsers: groupSelectedUsers,
            });
            const conversationKey = newConversation.key;

            if (!conversationKey) {
                return;
            }

            const data: Group = {
                content: '',
                groupName: groupName,
                profilePicture: profileImage ? profileImage : '',
                conversationKey: conversationKey,
                type: 'group',
                timestamp: new Date().toISOString(),
            }

            groupSelectedUsers.map(async (uuid) => {
                const userRef = database().ref(`users/${uuid}/conversation/${conversationKey}`);
                await userRef.set(data);
            });

            Toast.show({
                type: 'success',
                text1: String.groupCreatedSuccess,
            });

            setGroupSelectedUsers([]);
            setGroupName('');
            navigation.navigate(Routes.Home);
        } catch (error: any) {
            console.log('error', error);
        }
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView style={styles.groupContainer}>
                <View style={styles.groupInputField}>
                    <Text style={styles.groupDesc}>{String.groupDesc}</Text>
                    <Text style={styles.groupSubLine}>{String.groupSubLine}</Text>
                    <View style={styles.profilePictureSelected}>
                        <TouchableOpacity style={styles.pictureSelected}
                            onPress={() => selectedprofileImage()}
                        >
                            <Image source={profileImage ? { uri: profileImage } : require('../../../assets/Images/user.jpg')} style={styles.profilePicture} />
                            <View style={styles.cameraIconContainer}>
                                <Feather name="camera" size={20} color={Colors.DARK} style={styles.cameraIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.groupName}
                        placeholder="Group Name"
                        value={groupName}
                        onChangeText={(text) => setGroupName(text)}
                    />
                </View>

                <View style={styles.groupUserContainer}>
                    <Text style={styles.invitedMember}>{String.invitedMembers}</Text>
                    <View style={styles.groupUserList}>
                        {
                            fetchUsers.map((user, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.groupUserItem} onPress={
                                        () => selectedGroupUser(user.uuid)
                                    }>
                                        <Image source={user.profilePicture ? { uri: user.profilePicture } : require('../../../assets/Images/user.jpg')
                                        } style={styles.groupUserImage} />
                                        <View style={styles.plusIcon}>
                                            <Feather name={
                                                groupSelectedUsers.includes(user.uuid) ? 'check' : 'plus'
                                            } size={20} color={Colors.DARK} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>

            <View style={styles.createButton}>
                <CustomButton
                    title={String.create}
                    onPress={createGroup}
                    gradient={[Colors.TITLE_TEXT, Colors.TITLE_TEXT]}
                />
            </View>
        </View>
    )
}

export default Creategroup