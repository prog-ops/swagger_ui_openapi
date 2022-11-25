import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function OwnerCard({ mFirstN, mLastN, mFav }) {
  return (
    <View style={styles.ownerCard}>
      <View style={styles.ownerCardCircle}>
        <Text
          style={styles.ownerCardCircleText}>
          {mFirstN.toString().substring(0, 1)}{mLastN.toString().substring(0, 1)}
        </Text>
      </View>

      <View style={styles.firstAndLastNameStyle}>
        <Text>First Name</Text>
        <Text style={styles.firstAndLastNameText}>{mFirstN}</Text>
        <Text>Last Name</Text>
        <Text style={styles.firstAndLastNameText}>{mLastN}</Text>
      </View>

      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="star"
          size={24}
          color={mFav ? colors.greenc : colors.white1}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ownerCard: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 10,
    marginStart: 20,
    marginEnd: 20,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownerCardCircle: {
    backgroundColor: "#6f6c6c",
    width: 64,
    height: 64,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 20,
  },
  ownerCardCircleText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold'
  },
  firstAndLastNameStyle: {
    flex: 4,
    flexDirection: "column",
  },
  firstAndLastNameText: {
    marginTop: 4,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.black
  },
  icon: {
    flex: 1,
  },
});
