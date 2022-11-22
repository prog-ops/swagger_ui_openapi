import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PetItem(
  {
      masterId,
      categoryId,
      name,
      dob,

      onPress,
      renderRightActions
  }) {
    const calculateAge = (dob) => {
        const date = new Date(dob)
        const currentDate = new Date()
        return (currentDate.getFullYear() - date.getFullYear())+' years '
          +(currentDate.getMonth() - date.getMonth() + 1)+' months'
    }

    return (
      <GestureHandlerRootView>
          <TouchableWithoutFeedback underlayColor={colors.select_color} onPress={onPress}>
              <View style={styles.container}>
                  <View style={styles.detailContainer}>
                      <Text style={styles.petName}>{name}</Text>
                      <Text style={styles.petAge}>Age: {calculateAge(dob)}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name='chevron-right'
                    size={24}
                    color={colors.grey1}
                  />
              </View>
          </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 8,
        paddingEnd: 8,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 10,
        marginStart: 20,
        marginEnd: 20,
        elevation: 5,
        height: 60,
        alignItems: "center"
    },
    detailContainer: {
        flex: 4,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    petName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5
    },
    petAge: {
        fontWeight: 'bold',
        color: '#b2afaf',
    }
})
