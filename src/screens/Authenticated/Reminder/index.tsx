import React, { useEffect, useState } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import notifee from '@notifee/react-native';
import styles from './style';
import CustomLoader from '../../../components/View/CustomLoader';
import { Colors, String, triggerNotification } from '../../../utils';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticatedNavigatorType } from '../../../Routes/Authenticated';
import { Routes } from '../../../Routes/Routes';
import CustomModal, { ModalType } from '../../../components/View/CustomModal';
import moment from 'moment';

export interface ReminderTypes {
  id: string; // firebase id
  title: string;
  description: string;
  datetime: Date;
  reminderOn: boolean;
  dateselecteButton?: string;
  timeselectedButton?: string;
}

interface ReminderProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>;
}

const Reminder = ({ navigation }: ReminderProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [reminderData, setReminderData] = useState<ReminderTypes[]>([]);
  const [selectedReminderId, setSelectedReminderId] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(String.alert);
  const [message, setMessage] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(ModalType.ALERT);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const fetchReminder = async () => {
    setLoader(true);
    try {
      const remindersRef = database().ref('/reminders');
      remindersRef.on('value', (snapshot) => {
        const reminders = snapshot.val();
        const data: ReminderTypes[] = [];
        for (let id in reminders) {
          if (reminders[id].userId === userInfo.uuid) {
            const reminder: ReminderTypes = {
              id,
              title: reminders[id].title,
              description: reminders[id].description,
              datetime: new Date(reminders[id].datetime),
              reminderOn: reminders[id].reminderOn,
              dateselecteButton: reminders[id].dateselecteButton,
              timeselectedButton: reminders[id].timeselectedButton,
            };
            data.push(reminder);
          }
        }
        setReminderData(data);
        setLoader(false);
      });
    } catch (error) {
      console.log('error while fetching : ', error);
      setLoader(false);
    }
  };

  const handledReminderOn = async (value: boolean, id: string) => {
    try {
      await database().ref(`/reminders/${id}`).update({
        reminderOn: value,
      });

      if (!value) {
        await notifee.cancelNotification(id);
      }
      else {
        const reminder = reminderData.find((reminder) => reminder.id === id);
        if (reminder) {
          triggerNotification(reminder, id, userInfo?.uuid);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteSelectedReminder = async () => {
    try {
      for (const id of selectedReminderId) {
        await database().ref(`/reminders/${id}`).remove();
        await notifee.cancelNotification(id);
      }
      setSelectedReminderId([]);
      setModal(false);
      Toast.show({
        type: 'success',
        text1: String.reminderDeleted,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledLongPress = (id: string) => {
    const isSelected = selectedReminderId.includes(id);
    if (isSelected) {
      setSelectedReminderId(selectedReminderId.filter((noteId) => noteId !== id));
    } else {
      setSelectedReminderId([...selectedReminderId, id]);
    }
  };

  const handleSinglePress = (id: string) => {
    if (selectedReminderId.length > 0) {
      handledLongPress(id);
    } else {
      navigation.navigate(Routes.AddReminder, { reminderId: id });
    }
  };

  const openModal = (type: ModalType, message: string) => {
    setTitle(type);
    setMessage(message);
    setModal(true);
  }

  const EmptyReminder = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{String.noRemindersFound}</Text>
      </View>
    );
  };

  const selecteMultipleReminders = () => {
    if (selectedReminderId.length === reminderData.length) {
      setSelectedReminderId([]);
    } else {
      const allReminderId = reminderData.map((reminder) => reminder.id);
      setSelectedReminderId(allReminderId);
    }
  }

  const headerRight = () => (
    <View style={styles.iconContainer}>
      <Octicons name="multi-select" size={25} color={Colors.WHITE}
        onPress={selecteMultipleReminders}
      />
      <Feather
        name="trash-2"
        size={25}
        color={Colors.WHITE}
        onPress={() => openModal(ModalType.ALERT, String.deleteReminderMessage)}
      />
    </View>
  );

  const renderReminders = ({ item }: { item: ReminderTypes }) => (
    <TouchableOpacity
      style={[
        styles.reminderBox,
        {
          borderWidth: selectedReminderId.includes(item.id) ? 2 : 0,
        },
      ]}
      activeOpacity={0.7}
      onPress={() => handleSinglePress(item.id)}
      onLongPress={() => handledLongPress(item.id)}
    >
      <View style={styles.reminderContent}>
        <Text style={styles.dateStatus}>
          {
            item.dateselecteButton === String.choose ? moment(item.datetime).format('DD MMMM YYYY')
            : item.dateselecteButton
          }
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {moment(item.datetime).format('hh:mm')}
          </Text>
          <Text style={styles.amPm}>
            {moment(item.datetime).format('A')}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
      <Switch
        style={styles.switch}
        trackColor={{ false: Colors.BOTTOM_BAR_TEXT, true: Colors.DARK_YELLOW }}
        thumbColor={item.reminderOn ? Colors.LITE_YELLOW : Colors.TEXT_GRAY_DARK}
        value={item.reminderOn}
        onValueChange={(value) => handledReminderOn(value, item.id)}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchReminder();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: selectedReminderId.length > 0 ? headerRight : undefined,
    });
  }, [selectedReminderId]);

  return (
    <Pressable style={styles.container}
      onPress={() => {
        if (selectedReminderId.length > 0) {
          setSelectedReminderId([]);
        }
      }}
    >
      <CustomModal
        modal={modal}
        setModal={setModal}
        title={title}
        type={modalType}
        message={message}
        button1Text={String.ok}
        button1Action={deleteSelectedReminder}
        button2Text={String.cancle}
        button2Action={() => setModal(false)}
      />

      <CustomLoader loader={loader} setLoader={setLoader} />

      <FlatList
        data={reminderData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderReminders}
        ListEmptyComponent={() => <EmptyReminder />}
      />
    </Pressable>
  );
};

export default Reminder;