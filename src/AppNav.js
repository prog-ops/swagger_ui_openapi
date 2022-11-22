import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthhContext } from "./AuthhContext";
import { ActivityIndicator, View } from "react-native";
import LoginNav from "./LoginNav";
import HomeNav from "./HomeNav";

export default function AppNav() {
    const {isLoading, userToken} = useContext(AuthhContext)
    if (isLoading) {
        return (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large'/>
        </View>)
    }

    return(
      <NavigationContainer>
          {userToken !== null ? <HomeNav /> : <LoginNav />}
      </NavigationContainer>
    )
};
