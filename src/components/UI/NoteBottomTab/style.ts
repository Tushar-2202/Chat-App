import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Constant";
import { Colors } from "../../../utils";

const styles = StyleSheet.create({
    bottomTab: {
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: height * 0.09,
        paddingHorizontal: 25,
        position: 'absolute',
        width: width,
        bottom: 0,
    },
    icons: {
    },
})

export default styles
