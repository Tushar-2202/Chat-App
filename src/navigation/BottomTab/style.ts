import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils";
import { height, width } from "../../utils/Constant";

const styles = StyleSheet.create({
    menuIcon: {
        marginLeft: 15,
        color: Colors.WHITE,
    },
    headerTitle: {
        flexDirection: 'row',
        marginLeft: -10,
    },
    title1: {
        fontSize: 23,
        color: Colors.WHITE,
        fontFamily: Fonts.regular,
    },
    title2: {
        fontSize: 23,
        color: Colors.WHITE,
        fontFamily: Fonts.semiBold,
    },
    icons: {
        width: width * 0.06,
        height: width * 0.06,
    },
});

export default styles;