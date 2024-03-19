import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";
import { width } from "../../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.MODAL_BACKGROUND
    },
    modalContainer: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 10,
        width: width - 60,
    },
    title: {
        fontSize: width * 0.05,
        color: Colors.TEXT_BLACK,
        fontFamily: Fonts.semiBold
    },
    message: {
        fontSize: width * 0.04,
        color: Colors.TEXT_GRAY,
        fontFamily: Fonts.medium,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20
    },
    button: {
        width: width * 0.2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.PRIMARY
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: Fonts.semiBold
    }
});

export default styles;