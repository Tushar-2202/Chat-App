import { Dimensions } from "react-native";
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
}

export const toUpperCase = (str: string) => {
    return str.toUpperCase();
}

export const formatDate = (date: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    return `${day}${getOrdinalSuffix(day)} ${month}`;
}

export const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours < 10 ? '0' : ''}${formattedHours} : ${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

export const getFullDate = (date: Date) => {
    return `${formatTime(date)}, ${formatDate(date)}`;
}

const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export { width, height }