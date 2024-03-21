import { StyleSheet } from "react-native";
import {Colors,Fonts,String} from "../../../utils";
import { width,height } from "../../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notePad: {
        flex: 1,
        padding: width * 0.08,
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
        fontSize: width * 0.042,
        fontFamily: Fonts.semiBold,
        color: Colors.TEXT_GRAY,
    },
    noteDescription: {
        fontSize: width * 0.046,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_BLACK,
        marginTop: 3,
    },
    iconContainer: {
        flexDirection: 'row',
        marginBottom: -5,
    },
    headerIcons: {
        marginRight: 10,
        padding: 4,
    }
})

export default styles