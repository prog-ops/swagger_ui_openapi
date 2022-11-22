import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { AuthhContext } from "./AuthhContext";
import AppButton from "./components/AppButton";

export default function LoginScreen() {
    const [username, setUsername] = useState("yourname");
    const [password, setPassword] = useState("yourpassword");

    const { login } = useContext(AuthhContext);

    return (
      <View style={styles.container}>
          <AppButton title="Login" onPress={() => {
              login(username, password);
          }} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    bg: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: 'center'
    },
    registerBtn: {
        width: '100%',
        height: 70,
        backgroundColor: '#4ecdc4'
    },
})
