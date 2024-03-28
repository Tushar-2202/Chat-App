import { StyleSheet } from "react-native";
import { Colors, Fonts, height, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    reminderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.WHITE,
        marginVertical: 5,
        borderColor: Colors.BORDER,
    },
    reminderContent: {
        flex: 1,
    },
    dateStatus: {
        fontSize: width * 0.035,
        color: Colors.NOTE_HEADER,
        fontFamily: Fonts.regular
    },
    time: {
        fontSize: width * 0.095,
        color: Colors.TEXT_GRAY,
        fontFamily: Fonts.regular
    },
    description: {
        fontSize: 13,
        color: Colors.NOTE_TEXT,
        marginTop: 7,
        paddingLeft: width * 0.05,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    iconContainer: {
        flexDirection: 'row',
        marginRight: 30,
        gap: 16,
    },
    emptyContainer: {
        height: height - 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.TEXT_GRAY,
        fontFamily: Fonts.medium,
        fontSize: 15,
        textAlign: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
    },
    amPm: {
        fontSize: width * 0.04,
        marginBottom: 5,
        fontFamily: Fonts.medium
    }
})

export default styles