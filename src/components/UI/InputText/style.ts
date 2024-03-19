import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1.5,
        borderColor: Colors.BORDER,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_BLACK,
        marginTop: 20,
    },
    errorText: {
        color: Colors.DARK_TOMATO,
        marginTop: 5,
        fontFamily: Fonts.medium,
        fontSize: 12
    }
})

export default styles