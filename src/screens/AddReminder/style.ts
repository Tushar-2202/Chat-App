import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils";
import { width, height } from "../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notePad: {
        height: height * 0.6,
        paddingHorizontal: width * 0.08,
        paddingVertical: 15,
        backgroundColor: Colors.WHITE
    },
    colorPalette: {
        position: 'absolute',
        bottom: height * 0.11,
        paddingHorizontal: width * 0.1,
    },
    colorPick: {
        flexDirection: 'row',
        gap: 12,
    },
    colorBox: {
        width: width * 0.10,
        height: width * 0.10,
        borderRadius: 15,
        backgroundColor: Colors.PRIMARY,
        borderColor: Colors.TEXT_GRAY_LITE,
    },
    noteContent: {
        flex: 1
    },
    noteTitle: {
        fontSize: width * 0.039,
        fontFamily: Fonts.semiBold,
        color: Colors.TEXT_GRAY,
    },
    noteDescription: {
        fontSize: width * 0.044,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_BLACK,
    },
    iconContainer: {
        flexDirection: 'row',
        marginBottom: -5,
    },
    headerIcons: {
        marginRight: 10,
        padding: 4,
    },

    reminderTimeContainer: {
        backgroundColor: Colors.SECONDARY,
        padding: 12,
    },
    reminderDate: {
        backgroundColor: Colors.WHITE,
        padding: 17,
        margin: 5,
        overflow: 'hidden',
    },
    reminderChooseButtons: {
        marginTop: 10,
    },
    on: {
        fontSize: width * 0.035,
        fontFamily: Fonts.medium,
        color: Colors.TEXT_LITE,
    },
    date: {
        fontSize: width * 0.055,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_GRAY,
        marginTop: 5,
    },
    chooseButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginRight: 5,
    },
    chooseText: {
        fontSize: width * 0.038,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_LITE,
    },
})

export default styles