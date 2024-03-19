import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";

const styles = StyleSheet.create({
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.WHITE,
    },
    button: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontFamily:Fonts.semiBold
    },
    plusButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 25,
    },
});

export default styles;