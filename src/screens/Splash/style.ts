import { StyleSheet } from "react-native";
import { Colors } from "../../utils";
import { width,height } from "../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.PRIMARY
    },
    logo: {
        width: width * 0.5,
        height: height * 0.5,
        resizeMode: 'contain'
    }
})

export default styles