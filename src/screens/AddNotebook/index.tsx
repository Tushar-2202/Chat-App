import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';
import NoteBottomTab from '../../components/UI/NoteBottomTab';
import { Colors, String } from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import { formatDate, getFullDate } from '../../utils/Constant';
import Toast from 'react-native-toast-message';
import { AuthenticatedNavigatorType } from '../../navigation/Authenticated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import CustomLoader from '../../components/View/CustomLoader';

interface NoteType {
  userId: string;
  title: string;
  description: string;
  color: string;
  date: string;
}

type AddNotebookProps = NativeStackScreenProps<AuthenticatedNavigatorType, 'AddNotebook'>;

const AddNotebook = ({ navigation, route }: AddNotebookProps) => {

  const [selectedColor, setSelectedColor] = useState<string>(Colors.WHITE);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  useEffect(() => {
    navigation.setOptions({
      headerRight: title.trim() === '' || description.trim() === '' ? undefined : headerRight,
    })
  }, [title, description, selectedColor]);

  useEffect(() => {
    if (route.params?.notebookId) {
      setLoader(true);
      database().ref(`/notes/${route.params?.notebookId}`).once('value', (snapshot) => {
        const note = snapshot.val();
        setTitle(note.title);
        setDescription(note.description);
        setSelectedColor(note.color);
        setLoader(false);
      });
    }
  }, []);

  const addNotes = async () => {
    setLoader(true);
    try {
      if (title.trim() === '' || description.trim() === '') {
        Toast.show({
          type: 'error',
          text1: String.titledescIsRequired
        });
      } else {
        const note: NoteType = {
          userId: userInfo.uuid,
          title: title.trim(),
          description: description.trim(),
          color: selectedColor,
          date: getFullDate(new Date()),
        };
        await database().ref('/notes').push(note);
        setTitle('');
        setDescription('')
        setLoader(false);
        navigation.goBack();
        Toast.show({
          type: 'success',
          text1: String.noteAdded,
          position: 'bottom',
        });
      }
    } catch (error) {
      console.log('error', error);
      setLoader(false);
    }
  }

  const updateNote = async () => {
    setLoader(true);
    try {
      if (title.trim() === '' || description.trim() === '') {
        Toast.show({
          type: 'error',
          text1: String.titledescIsRequired
        });
      } else {
        const note: NoteType = {
          userId: userInfo.uuid,
          title: title.trim(),
          description: description.trim(),
          color: selectedColor,
          date: formatDate(new Date()),
        };
        await database().ref(`/notes/${route.params?.notebookId}`).update(note);
        Toast.show({
          type: 'success',
          text1: String.noteUpdated,
          position: 'bottom',
        });
        setTitle('');
        setDescription('')
        setLoader(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log('error', error);
      setLoader(false);
    }
  }

  const handledUndo = () => {
    setTitle('');
    setDescription('');
    setSelectedColor(Colors.WHITE);
  }

  const colorBox = (color: string) => (
    <TouchableOpacity
      key={color}
      activeOpacity={0.7}
      style={[
        styles.colorBox,
        { backgroundColor: color, borderWidth: color === selectedColor ? 2 : 0 },
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const headerRight = () => (
    <View style={styles.iconContainer}>
      <MaterialIcons name="undo" size={30} color={Colors.WHITE} style={styles.headerIcons}
        onPress={handledUndo}
      />
      <Feather
        name="check"
        size={30}
        color={Colors.WHITE}
        style={styles.headerIcons}
        onPress={() => route.params?.notebookId ? updateNote() : addNotes()}
      />
    </View>
  );

  return (
    <View style={styles.container}>

      <CustomLoader
        loader={loader}
        setLoader={setLoader}
      />

      <View style={styles.notePad}>
        <View style={styles.noteContent}>
          <TextInput
            style={styles.noteTitle}
            placeholder={String.unTitle}
            placeholderTextColor={Colors.NOTE_HEADER}
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

      <View style={styles.colorPalette}>
        <View style={styles.colorPick}>
          {colorBox(Colors.WHITE)}
          {colorBox(Colors.PRIMARY)}
          {colorBox(Colors.LITE_RED)}
          {colorBox(Colors.LITE_GREEN)}
        </View>
      </View>
      <NoteBottomTab />
    </View>
  );
};

export default AddNotebook;