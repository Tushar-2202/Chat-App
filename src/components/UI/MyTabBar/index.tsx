import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, String } from '../../../utils';
import { Routes } from '../../../Routes/Routes';
import styles from './style';

const MyTabBar = ({ state, navigation }:any) => {

    const handleNavigation = () => {
        if (state.index === 0) {
            navigation.navigate(Routes.AddNotebook);
        } else {
            navigation.navigate(Routes.AddReminder);
        }
    }

    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(Routes.Notebook)}
                activeOpacity={0.8}
            >
                <Text style={[styles.buttonText, { color: state.index === 0 ? Colors.PRIMARY : Colors.BOTTOM_BAR_TEXT }]}>{String.notebook}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.plusButton}
                onPress={handleNavigation}
                activeOpacity={0.8}
            >
                <Icon name="add" size={45} color={Colors.WHITE} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(Routes.Reminder)}
                activeOpacity={0.8}
            >
                <Text style={[styles.buttonText, { color: state.index === 1 ? Colors.PRIMARY : Colors.BOTTOM_BAR_TEXT }]}>{String.reminder}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MyTabBar;
