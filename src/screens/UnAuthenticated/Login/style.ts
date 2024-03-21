import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";
import { width, height } from "../../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: width - 130,
        marginTop: height * 0.18,
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
    input: {
        borderBottomWidth: 1.5,
        borderColor: Colors.BORDER,
        borderRadius: 5,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_BLACK,
        marginTop: 20,
    },
    orText: {
        textAlign: 'center',
        marginTop: 35,
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: Colors.TEXT_GRAY_LITE
    },
    buttonSignup: {
        textAlign: 'center',
        marginTop: 25,
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: Colors.TEXT_GRAY_LITE
    },
    forgotPassword: {
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 20,
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.TEXT_LITE
    }
})

export default styles