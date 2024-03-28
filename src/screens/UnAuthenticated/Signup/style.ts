import { StyleSheet } from "react-native";
import { Colors, Fonts, width, height } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: width - 130,
        marginTop: height * 0.18
    },
    header: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 36,
        fontFamily: Fonts.regular,
        color: Colors.NOTE_HEADER
    },
    inputContainer: {
        marginTop: height * 0.02
    },
    orText: {
        textAlign: 'center',
        marginTop: 30,
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: Colors.TEXT_GRAY_LITE
    },
    buttonSignup: {
        textAlign: 'center',
        marginTop: 30,
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: Colors.TEXT_GRAY_LITE,
        marginBottom: 20
    },
})

export default styles