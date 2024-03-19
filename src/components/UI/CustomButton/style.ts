import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderBottomWidth: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontFamily: Fonts.bold,
        fontSize: 15
    }
});

export default styles;