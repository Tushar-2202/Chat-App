import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";
import { height, width } from "../../../utils/Constant";

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
        flex: 1,
        backgroundColor:Colors.SECONDARY,
        paddingHorizontal: width * 0.04,
    },
    drawerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.016,
        paddingHorizontal: width * 0.08,
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
    }
})

export default styles;