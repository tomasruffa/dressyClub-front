import { StyleSheet } from "react-native";
import { defaultColors } from "../../global/global-styles";

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
    },
    itemContainer: {
        marginBottom: 20,
    },
    buttonSubmit: {
        height: 48,
        borderRadius: 8,
        backgroundColor: defaultColors.darkRed,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    buttomSubmitText: {
        color: defaultColors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;