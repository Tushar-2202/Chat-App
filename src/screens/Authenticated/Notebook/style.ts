import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";
import { height } from "../../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        backgroundColor: Colors.SECONDARY,
    },
    noteContainer: {
        // width: (width - 35) / 2,
        width: '47.5%',
        height: height / 4,
        margin: 5,
        borderColor: Colors.BORDER,
        overflow: 'hidden',
        padding: 7,
        shadowColor: Colors.TEXT_BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        flex: 3
    },
    footer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 3,
    },
    title: {
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        padding: 7,
        width: '80%',
    },
    contentText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        lineHeight: 17,
        textAlign: 'justify',
        paddingHorizontal: 7,
    },
    dateText: {
        color: Colors.BOTTOM_BAR_TEXT,
        fontFamily: Fonts.regular,
        fontSize: 10,
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
    iconContainer: {
        flexDirection: 'row',
        marginRight: 30,
        gap: 16,
    },
});

export default styles;
