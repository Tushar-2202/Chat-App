import { BackHandler, FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, String } from '../../../utils'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import database from '@react-native-firebase/database'
import { Routes } from '../../../Routes/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../../Routes/Authenticated'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import CustomLoader from '../../../components/View/CustomLoader'
import CustomModal, { ModalType } from '../../../components/View/CustomModal'
import { useIsFocused } from '@react-navigation/native';

interface NotebookType {
  userId: string,
  id: string,
  title: string,
  description?: string,
  date: string,
  color: string
}

interface NotebookProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

const Notebook = ({ navigation }: NotebookProps) => {
  const [Data, setData] = useState<NotebookType[]>([])
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(String.alert);
  const [message, setMessage] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(ModalType.ALERT);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo)
  const isFocusedScreen = useIsFocused();

  const fetchNotes = async () => {
    setLoader(true)
    try {
      database().ref('/notes').on('value', snapshot => {
        const notes = snapshot.val()
        const data = []
        for (let id in notes) {
          if (notes[id].userId === userInfo.uuid) {
            data.push({
              id,
              userId: notes[id].userId,
              title: notes[id].title,
              description: notes[id].description,
              date: notes[id].date,
              color: notes[id].color
            })
          }
        }
        setData(data)
        setLoader(false)
      })
    } catch (error) {
      console.log('error', error)
      setLoader(false);
    }
  }

  const selecteMultipleNotes = () => {
    if (selectedNoteIds.length === Data.length) {
      setSelectedNoteIds([])
    } else {
      const ids = Data.map(note => note.id)
      setSelectedNoteIds(ids)
    }
  }

  const headerRight = () => (
    <View style={styles.iconContainer}>
      <Feather name="edit-2" size={25} color={Colors.WHITE} />
      <Octicons name="multi-select" size={25} color={Colors.WHITE}
        onPress={selecteMultipleNotes}
      />
      <Feather name="trash-2" size={25} color={Colors.WHITE}
        onPress={() => openModal(String.alert, ModalType.ALERT, String.deleteNoteMessage)}
      />
    </View>
  )

  const deleteSelectedNotes = () => {
    setLoader(true)
    try {
      if (selectedNoteIds.length === 0) {
        Toast.show({
          type: 'info',
          text1: String.noNoteSelected,
        })
      } else {
        database().ref('/notes').on('value', snapshot => {
          const notes = snapshot.val()
          for (let noteId of selectedNoteIds) {
            database().ref(`/notes/${noteId}`).remove()
          }
          Toast.show({
            type: 'success',
            text1: String.noteDeleted,
          })
          setSelectedNoteIds([])
          setModal(false)
          setLoader(false)
        })
      }
    } catch (error) {
      console.log('error', error)
      setLoader(false);
      setModal(false)
    }
  }

  const handledLongPress = (id: string) => {
    const isSelected = selectedNoteIds.includes(id)
    if (isSelected) {
      setSelectedNoteIds(selectedNoteIds.filter(noteId => noteId !== id))
    } else {
      setSelectedNoteIds([...selectedNoteIds, id])
    }
  }

  const handleSinglePress = (id: string) => {
    if (selectedNoteIds.length > 0) {
      handledLongPress(id)
    } else {
      navigation.navigate(Routes.AddNotebook, { notebookId: id })
    }
  }

  const EmptyNotes = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{String.noNoteFound}</Text>
      </View>
    )
  }

  const openModal = (title: string, type: ModalType, message: string) => {
    setModal(true)
    setTitle(title)
    setModalType(type)
    setMessage(message)
  }

  const renderNotes = ({ item }: { item: NotebookType }) => (
    <TouchableOpacity
      style={[
        styles.noteContainer,
        {
          backgroundColor: item.color ? item.color : Colors.WHITE,
          borderWidth: selectedNoteIds.includes(item.id) ? 2 : 0,
          elevation: selectedNoteIds.includes(item.id) ? 5 : 0
        }]}
      activeOpacity={0.7}
      onPress={() => handleSinglePress(item.id)}
      onLongPress={() => handledLongPress(item.id)}
    >
      <View style={styles.header}>
        <Text
          style={[styles.title, {
            color: item.color === Colors.WHITE ? Colors.NOTE_HEADER : Colors.WHITE
          }]}
          numberOfLines={1}
        >{item.title}</Text>
        {selectedNoteIds.includes(item.id) ? (
          <Icon
            name='checkmark-circle-sharp'
            size={20}
            color={item.color === Colors.PRIMARY ? Colors.WHITE : Colors.PRIMARY}
          />
        ) : null}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.contentText, {
            color: item.color === Colors.WHITE ? Colors.NOTE_TEXT : Colors.WHITE
          }]}
          numberOfLines={6}
          ellipsizeMode='tail'
        >{item.description}</Text>
      </View>

      <View style={styles.footer}>
        <Icon
          name='time-outline'
          size={11}
          color={Colors.BOTTOM_BAR_TEXT}
        />
        <Text
          style={styles.dateText}
        >
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  )

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: selectedNoteIds.length > 0 ? headerRight : undefined,
    })
  }, [selectedNoteIds])

  useEffect(() => {
    const backAction = () => {
      openModal(String.alert, ModalType.BACKHANDLER, String.backActionMessage)
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocusedScreen) {
        return backAction();
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocusedScreen]);

  return (
    <Pressable style={styles.container}
      onPress={() => setSelectedNoteIds([])}
    >
      <CustomModal
        modal={modal}
        setModal={setModal}
        type={modalType}
        title={title}
        message={message}
        button1Text={String.ok}
        button1Action={() => {
          if (modalType === ModalType.BACKHANDLER) {
            BackHandler.exitApp();
          } else {
            deleteSelectedNotes()
          }
        }}
        button2Text={String.cancle}
        button2Action={() => setModal(false)}
      />

      <CustomLoader
        loader={loader}
        setLoader={setLoader}
      />

      <FlatList
        data={Data}
        renderItem={renderNotes}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => <EmptyNotes />}
      />
    </Pressable>
  )
}

export default Notebook