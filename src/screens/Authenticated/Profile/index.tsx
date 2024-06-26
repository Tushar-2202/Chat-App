import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedNavigatorType} from '../../../routes/Authenticated';
import {logOut} from '../../../redux-toolkit/userSlice';
import {CommonActions} from '@react-navigation/native';
import {Routes} from '../../../routes/Routes';
import Toast from 'react-native-toast-message';
import styles from './style';
import AppBackground from '../../../components/view/AppBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, String} from '../../../utils';
import CustomButton from '../../../components/ui/CustomButton';
import CustomModal, {ModalType} from '../../../components/view/CustomModal';

interface ProfileProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>;
}

const Profile = ({navigation}: ProfileProps) => {
  const user = useSelector((state: any) => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(ModalType.ALERT);

  const handleLogout = async () => {
    try {
      if (user?.provider === 'Google') {
        await GoogleSignin.signOut();
      }
      await auth().signOut();
      dispatch(logOut());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.UnAuthenticated}],
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged out successfully',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const openModal = (title: string, type: ModalType, message: string) => {
    setModal(true);
    setTitle(title);
    setModalType(type);
    setMessage(message);
  };

  const socialPanel = () => (
    <View style={styles.socialPanel}>
      <View style={styles.socialPanelItem}>
        <AntDesign name="message1" size={24} color={Colors.PRIMARY} />
      </View>
      <View style={styles.socialPanelItem}>
        <Icon name="videocam-outline" size={25} color={Colors.PRIMARY} />
      </View>
      <View style={styles.socialPanelItem}>
        <Icon name="call-outline" size={25} color={Colors.PRIMARY} />
      </View>
      <View style={styles.socialPanelItem}>
        <Icon
          name="ellipsis-horizontal-sharp"
          size={25}
          color={Colors.PRIMARY}
        />
      </View>
    </View>
  );

  return (
    <AppBackground>
      <CustomModal
        modal={modal}
        setModal={setModal}
        type={modalType}
        title={title}
        message={message}
        button1Text={String.ok}
        button1Action={handleLogout}
        button2Text={String.cancel}
        button2Action={() => setModal(false)}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>

        <View style={styles.userDetailed}>
          <Image
            source={
              user?.profilePicture
                ? {uri: user?.profilePicture}
                : require('../../../assets/Images/user.jpg')
            }
            style={styles.profilePicture}
          />

          <Text style={styles.userName}>{user?.userName}</Text>
        </View>
        {socialPanel()}
      </View>

      <View style={styles.container}>
        <View style={styles.textDetailItem}>
          <Text style={styles.textLable}>{String.displayname}</Text>
          <Text style={styles.textDetail}>{user?.userName}</Text>
        </View>
        <View style={styles.textDetailItem}>
          <Text style={styles.textLable}>{String.emailAddress}</Text>
          <Text style={styles.textDetail}>{user?.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={String.logout}
            onPress={() =>
              openModal(String.logout, ModalType.ALERT, String.logoutMessage)
            }
            gradient={[Colors.ERROR_TEXT, Colors.ERROR_TEXT]}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Profile;
