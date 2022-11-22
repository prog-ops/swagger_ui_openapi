import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MasterItem(
  { fN, lN, f, onPress, renderRightActions }) {
    return (
      <GestureHandlerRootView>
          <Swipeable renderRightActions={renderRightActions}>
              <TouchableHighlight underlayColor={colors.white1} onPress={onPress}>
                  <View style={styles.container}>
                      <View style={styles.masterCircle}>
                          <Text style={{color:colors.white}}>{fN.toString().substring(0,1)}{lN.toString().substring(0,1)}</Text>
                      </View>
                      <View style={styles.detailContainer}>
                          <Text style={styles.masterText}>{fN} {lN}</Text>

                      </View>
                      <MaterialCommunityIcons
                        name='star'
                        size={24}
                        color={f ? colors.greenc : colors.white1}
                      />
                      <MaterialCommunityIcons
                        name='chevron-right'
                        size={24}
                        color={colors.grey1}
                      />
                  </View>
              </TouchableHighlight>
          </Swipeable>
      </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 15,
        paddingEnd: 15,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 15,
        marginStart: 20,
        marginEnd: 20,
        elevation: 5,
        height: 60,
        alignItems: "center"
    },
    detailContainer: {
        flex: 6,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    favorite: {
        flex: 1,
    },
    masterText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black
    },
    masterCircle: {
        backgroundColor: "#6f6c6c",
        width: 36,
        height: 36,
        borderRadius: 36/2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
