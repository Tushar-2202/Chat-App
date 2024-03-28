import { StyleSheet } from "react-native";
import { Colors, Fonts, height, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.PRIMARY,
        paddingTop: height * 0.06,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.01,
    },
    headerText: {
        color: Colors.WHITE,
        fontSize: 21,
        marginLeft: 10,
        fontFamily: Fonts.semiBold
    },
    contentContainer: {
        backgroundColor: Colors.SECONDARY,
        paddingHorizontal: width * 0.04,
    },
    drawerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.016,
        paddingHorizontal: width * 0.06,
    },
    label: {
        fontSize: 13.5,
        fontFamily: Fonts.medium,
        color: Colors.TEXT_GRAY_LITE
    },
    values: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.TEXT_GRAY_DARK
    },
    line: {
        height: 1,
        backgroundColor: Colors.TEXT_LITE,
        marginTop: 5,
        marginBottom: 15,
    },
    line2: {
        height: 1,
        backgroundColor: Colors.TEXT_LITE,
        marginTop: 15,
        marginBottom: 15,
    },
    firstDrawerItem: {
        marginTop: -height * 0.02,
    }
})

export default styles;