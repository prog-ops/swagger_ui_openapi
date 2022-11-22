import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";

export default function AppButton({title, onPress}){
    return(
      <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.greenc,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: '50%'
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "capitalize",
        fontWeight: 'bold'
    }
})
