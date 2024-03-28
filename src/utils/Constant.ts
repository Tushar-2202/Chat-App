import { Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const GOOGLE_WEB_API_KEY = '275820671215-i4gpb12g21sbjo3q1lfbubna3akq8ov6.apps.googleusercontent.com'

export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
}

export const toUpperCase = (str: string) => {
    return str.toUpperCase();
}

export { width, height }