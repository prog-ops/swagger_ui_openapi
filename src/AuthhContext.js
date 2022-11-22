import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthhContext = createContext();

export const AuthhProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null)//res.data
    const login = (username, password) => {
        setIsLoading(true);

        axios.post(BASE_URL + "/auth/login", { username, password })
          .then(res => {
              console.log(res.data);
              let usrInfo = res.data
              setUserInfo(usrInfo)
              setUserToken(usrInfo.token)

              AsyncStorage.setItem('userinfo', JSON.stringify(usrInfo))
              AsyncStorage.setItem('usertoken', usrInfo.token)

              console.log(usrInfo.token)
          })
          .catch(e => console.log(`Login error ${e}`));

        setIsLoading(false);
    };
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userinfo");
        AsyncStorage.removeItem("usertoken");
        setIsLoading(false);
    };
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let usrInfo = await AsyncStorage.getItem("userinfo");
            let usrToken = await AsyncStorage.getItem("usertoken");
            usrInfo = JSON.parse(usrInfo)

            if (usrInfo) {
                setUserToken(usrToken)
                setUserInfo(usrInfo)
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
      <AuthhContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
          {children}
      </AuthhContext.Provider>
    );
};
