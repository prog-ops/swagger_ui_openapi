import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScreenMasterTitle({ tl }) {
    const firstName = AsyncStorage.getItem('first')
    const lastName = AsyncStorage.getItem('last')

    useEffect(() => {

    }, []);

    return (
      <View style={styles.container}>
          <View style={styles.currentMasterCircle}>
              <Text style={{ color: colors.greenc }}>{tl}</Text>
          </View>
          <Text style={{ color: colors.black }}>Master: {tl}</Text>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    currentMasterCircle: {
        backgroundColor: colors.white,
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        borderWidth: 1,
        borderColor: colors.greenc,
        justifyContent: "center",
        alignItems: "center",
        marginEnd: 20,
    },
});
