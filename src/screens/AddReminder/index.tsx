import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { Colors, String, triggerNotification } from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import CustomLoader from '../../components/View/CustomLoader';
import NoteBottomTab from '../../components/UI/NoteBottomTab';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticatedNavigatorType } from '../../navigation/Authenticated';
import { formatDate, formatTime } from '../../utils/Constant';
import database from '@react-native-firebase/database';
import styles from './style';
import Toast from 'react-native-toast-message';

export interface ReminderType {
  userId: string // user id
  title: string
  description: string
  datetime: string,
  reminderOn?: boolean,
  dateselecteButton?: string,
  timeselectedButton?: string,
}

type AddReminderProps = NativeStackScreenProps<AuthenticatedNavigatorType, 'AddReminder'>;

const AddReminder = ({ navigation, route }: AddReminderProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [datetime, setDateTime] = useState<Date>(new Date());
  const [dateopen, setDateOpen] = useState<boolean>(false);
  const [timeopen, setTimeOpen] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [dateselecteButton, setDateselecteButton] = useState<string>(String.today);
  const [timeselectedButton, setTimeSelectedButton] = useState<string>();
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  const dateButton: string[] = [String.today, String.tomorrow, String.everyday, String.choose];
  const timeButton: string[] = [String.tenMin, String.thirtyMin, String.oneHour, String.choose];

  useEffect(() => {
    navigation.setOptions({
      headerRight: title === '' ? undefined : headerRight,
    });
  }, [title, description, datetime]);

  useEffect(() => {
    if (route.params?.reminderId) {
      setLoader(true);
      database().ref(`/reminders/${route.params?.reminderId}`).once('value', (snapshot) => {
        const reminder = snapshot.val();
        setTitle(reminder.title);
        setDescription(reminder.description);
        setDateTime(new Date(reminder.datetime));
        setDateselecteButton(reminder.dateselecteButton);
        setTimeSelectedButton(reminder.timeselectedButton);
        setLoader(false);
      });
    }
  }, []);

  const headerRight = () => (
    <View style={styles.iconContainer}>
      <MaterialIcons name="close" size={30} color={Colors.WHITE} style={styles.headerIcons}
        onPress={() => navigation.goBack()}
      />
      <Feather
        name="check"
        size={30}
        color={Colors.WHITE}
        style={styles.headerIcons}
        onPress={() => route.params?.reminderId ? updateReminder() : addReminder()}
      />
    </View>
  );

  const addReminder = async () => {
    setLoader(true);
    try {
      if (title.trim() === '') {
        setLoader(false);
        return;
      }
      
      const reminder: ReminderType = {
        userId: userInfo.uuid,
        title: title.trim(),
        description: description.trim(),
        datetime: datetime.toISOString(),
        dateselecteButton,
        timeselectedButton,
        reminderOn: true,
      };
      const addReminder = await database().ref('/reminders').push(reminder);

      triggerNotification(reminder, addReminder.key?.toString() || '', userInfo?.uuid);

      Toast.show({
        type: 'success',
        text1: String.reminderAdded,
      });
      setLoader(false);
      navigation.goBack();
    } catch (error) {
      setLoader(false);
      console.log('Error', error);
    }
  };

  const updateReminder = async () => {
    setLoader(true);
    try {
      if (title.trim() === '') {
        setLoader(false);
        return;
      }
      const reminder: ReminderType = {
        userId: userInfo.uuid,
        title: title.trim(),
        description: description.trim(),
        datetime: datetime.toISOString(),
        dateselecteButton,
        timeselectedButton,
        reminderOn: true,
      };
      await database().ref(`/reminders/${route.params?.reminderId}`).update(reminder);

      triggerNotification(reminder, route.params?.reminderId || '', userInfo?.uuid);

      Toast.show({
        type: 'success',
        text1: String.reminderUpdated,
      });
      setLoader(false);
      navigation.goBack();

    } catch (error) {
      setLoader(false);
      console.log('Error', error);
    }
  }

  const colorBox = (color: string) => (
    <TouchableOpacity
      key={color}
      activeOpacity={0.7}
      style={[
        styles.colorBox,
        { backgroundColor: color },
      ]}
    />
  );

  const handledChooseDate = (item: string) => {
    switch (item) {
      case String.choose:
        setDateOpen(true);
        setDateselecteButton(item);
        break;
      case String.today:
        setDateTime(new Date());
        setDateselecteButton(item);
        break;
      case String.tomorrow:
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDateTime(tomorrow);
        setDateselecteButton(item);
        break;
      case String.everyday:
        setDateTime(new Date());
        setDateselecteButton(item);
        break;
      default:
        break;
    }
  }

  const handledChooseTime = (item: string) => {
    switch (item) {
      case String.choose:
        setTimeOpen(true);
        setTimeSelectedButton(item);
        break;
      case String.tenMin:
        const tenMin = new Date();
        tenMin.setMinutes(tenMin.getMinutes() + 10);
        setDateTime(tenMin);
        setTimeSelectedButton(item);
        break;
      case String.thirtyMin:
        const thirtyMin = new Date();
        thirtyMin.setMinutes(thirtyMin.getMinutes() + 30);
        setDateTime(thirtyMin);
        setTimeSelectedButton(item);
        break;
      case String.oneHour:
        const oneHour = new Date();
        oneHour.setHours(oneHour.getHours() + 1);
        setDateTime(oneHour);
        setTimeSelectedButton(item);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <CustomLoader loader={loader} setLoader={setLoader} />
        <DatePicker
          modal
          mode={dateopen ? 'date' : 'time'}
          open={dateopen || timeopen}
          date={datetime}
          onConfirm={(date) => {
            if (dateopen) setDateOpen(false);
            else setTimeOpen(false);

            if (date.getTime() < new Date().getTime()) {
              Toast.show({
                type: 'error',
                text1: String.selectedTimePassed,
              });
              return;
            }
            setDateTime(date);
          }}
          onCancel={() => {
            if (dateopen) setDateOpen(false);
            else setTimeOpen(false);
          }}
        />

        <View style={styles.reminderTimeContainer}>
          <View style={styles.reminderDate}>
            <Text style={styles.on}>{String.on}</Text>
            <Text style={styles.date}>{formatDate(datetime)}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reminderChooseButtons}>
              {dateButton.map((item, index) => (
                <TouchableOpacity key={index} style={[styles.chooseButton,
                {
                  backgroundColor: item === dateselecteButton ? Colors.PRIMARY : Colors.WHITE,
                }
                ]}
                  activeOpacity={0.7}
                  onPress={() => handledChooseDate(item)}
                >
                  <Text style={[styles.chooseText, {
                    color: item === dateselecteButton ? Colors.WHITE : Colors.TEXT_LITE,
                  }]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.reminderDate}>
            <Text style={styles.on}>{String.time}</Text>
            <Text style={styles.date}>{formatTime(datetime)}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reminderChooseButtons}>
              {timeButton.map((item, index) => (
                <TouchableOpacity key={index} style={[styles.chooseButton,
                {
                  backgroundColor: item === timeselectedButton ? Colors.PRIMARY : Colors.WHITE,
                }
                ]} activeOpacity={0.7}
                  onPress={() => handledChooseTime(item)}
                >
                  <Text style={[styles.chooseText
                    , { color: item === timeselectedButton ? Colors.WHITE : Colors.TEXT_LITE }
                  ]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.notePad}>
          <View style={styles.noteContent}>
            <TextInput
              style={styles.noteTitle}
              placeholder={String.addNote}
              placeholderTextColor={Colors.TEXT_LITE}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.noteDescription}
              placeholder={String.typeHere}
              placeholderTextColor={Colors.TEXT_GRAY_DARK}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
          </View>
        </View>

      </ScrollView>

      <View style={styles.colorPalette}>
        <View style={styles.colorPick}>
          {colorBox(Colors.WHITE)}
          {colorBox(Colors.PRIMARY)}
          {colorBox(Colors.LITE_RED)}
          {colorBox(Colors.LITE_GREEN)}
        </View>
      </View>
      <NoteBottomTab />
    </>
  );
};

export default AddReminder;
