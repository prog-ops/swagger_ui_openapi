import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScreenMasterTitle({ initialInCircle, firstN, lastN }) {
    // const firstName = AsyncStorage.getItem('first')
    // const lastName = AsyncStorage.getItem('last')

    useEffect(() => {

    }, []);

    return (
      <View style={styles.container}>
          <View style={styles.currentMasterCircle}>
              <Text style={styles.textInCircle}>{initialInCircle}</Text>
          </View>
          <Text style={styles.textBeside}>Master: {firstN} {lastN}</Text>
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
    textInCircle: {
        fontSize: 18,
        color: colors.greenc
    },
    textBeside: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 'bold'
    }
});
