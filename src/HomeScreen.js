import { useContext, useEffect, useState } from "react";
import { AuthhContext } from "./AuthhContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MasterItem from "./components/MasterItem";
import MasterItemDelete from "./components/MasterItemDelete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "./components/Screen";
import AppButton from "./components/AppButton";
import { BASE_URL } from "./config/config";

export default function HomeScreen({navigation}) {
    const { logout } = useContext(AuthhContext);
    const { userInfo } = useContext(AuthhContext);
    const [masters, setMasters] = useState([])
    const [currentMaster, setCurrentMaster] = useState('')

    async function beforegetMaster() {
        try {
            console.log(userInfo.token);
            let response = await fetch(BASE_URL + "/master", {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + userInfo.token,
                },
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function getMaster() {
        try {
            beforegetMaster().then(data => {
                console.log(data);
                setMasters(data);
            });
        } catch (e) {}
    }

    const [masterById, setMasterById] = useState()
    const GetMasterById = async (id) => {
        await fetch(BASE_URL+'/master/'+id, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Authorization": "Bearer " + userInfo.token,
            },
        }).then(response => response.json())
          .then(data => setMasterById(data))
    }

    // Post a master example
    const save = () => {
        var mheaders = new Headers();
        mheaders.append("Authorization", "Bearer " + userInfo.token);
        mheaders.append("Content-Type", "application/json");
        fetch(BASE_URL + "/master", {
            method: "POST",
            headers: mheaders,
            body: JSON.stringify({
                "firstName": "Not john",
                "lastName": "Doe",
                "description": "user",
                "favorites": true,
            }),
        })
          .then((response) => {
              response.text();
          })
          .then((result) => console.log(result))
          .catch((e) => console.log(e));
    };


    const deleteItem = (item) => {
        setMasters(masters
          .filter((i) =>
            i.firstName !== item.firstName,
          ),
        );
    };

    const getCurrentMaster = async () => {
        setCurrentMaster(await AsyncStorage.getItem('currentMaster'))
    }

    useEffect(() => {
        getCurrentMaster()

        getMaster()
    }, [])

    return (<Screen>
        <View>
            <Text>Master: {currentMaster ? currentMaster : ''}</Text>
        </View>
        {masters ?
          <FlatList
            data={masters}
            renderItem={({ item }) =>
              <MasterItem
                onPress={() => {
                    console.log(`Item: ${item.firstName}`)
                    navigation.navigate('MasterDetail', {
                        mFirstName: item.firstName,
                        mLastName: item.lastName,
                        mId: item.id,
                        mFav: item.favorites,
                        mPets: item.pets
                    })

                    GetMasterById(item.id)
                }}
                fN={item.firstName}
                lN={item.lastName}
                d={item.description}
                f={item.favorites}
                renderRightActions={() =>
                  <MasterItemDelete onPress={() => deleteItem(item)} />}
              />
            }
          /> :
          <Text>No data</Text>
        }

        <View style={styles.logoutBtn}>
            <AppButton title="Logout" onPress={() => {
                logout();
            }} />
        </View>
    </Screen>);
}
const styles = StyleSheet.create({
    logoutBtn: {
        justifyContent: "center",
        alignItems: "center",
    }
})
