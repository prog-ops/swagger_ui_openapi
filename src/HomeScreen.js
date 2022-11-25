import { useContext, useEffect, useState } from "react";
import { AuthhContext } from "./AuthhContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MasterItem from "./components/MasterItem";
import MasterItemDelete from "./components/MasterItemDelete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "./components/Screen";
import AppButton from "./components/AppButton";
import { BASE_URL } from "./config/config";
import colors from "./config/colors";
import { CURRENT_MASTER } from "./consts";

export default function HomeScreen({navigation, route}) {
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
                //v console.log(data);
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

    //v Post a master example
    /*const save = () => {
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
    };*/


    const deleteItem = (item) => {
        setMasters(masters
          .filter((i) =>
            i.firstName !== item.firstName,
          ),
        );
    };

    const LoadCurrentMaster = async () => {
        setCurrentMaster(await AsyncStorage.getItem(CURRENT_MASTER))
    }

    useEffect(() => {
        LoadCurrentMaster()

        getMaster()
    }, [])

    return (<Screen>
        <View>
            <Text>Master (should be navbar): {currentMaster ? currentMaster : ''}</Text>
        </View>
        <Text style={{
            justifyContent: "center",
            alignItems: "center",
            marginStart: 20,
            marginBottom: 20,
            fontWeight: 'bold',
            color: colors.grey1
        }}>Owners List</Text>
        {masters ?
          <FlatList
            data={masters}
            renderItem={({ item }) =>
              <MasterItem
                onPress={() => {
                    console.log(`Item: ${item.firstName}`)
                    navigation.navigate('MasterDetail', {
                        mId: item.id,
                        mFirstN: item.firstName,
                        mLastN: item.lastName,
                        mFav: item.favorites,
                        mPets: item.pets,
                        cm: currentMaster,
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
