import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MasterItemDelete({ onPress }) {
    return(
      <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
              <MaterialCommunityIcons name='trash-can' color='red' size={35}/>
          </View>
      </TouchableWithoutFeedback>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.delete_color,
        width: 70,
        justifyContent: "center",
        alignItems: "center"
    }
})
