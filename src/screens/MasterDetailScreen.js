import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthhContext } from "../AuthhContext";
import PetItem from "../components/PetItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CURRENT_MASTER } from "../consts";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from '../config/colors'
import { BASE_URL } from "../config/config";
import OwnerCard from "../components/OwnerCard";

export default function MasterDetailScreen({route}){
    const { userInfo } = useContext(AuthhContext);
    const [masters, setMasters] = useState([])
    const {mFirstN, mLastN, mId, mFav, ...mPets/*.., ..,*/} = route.params

    const [currentMaster, setCurrentMaster] = useState('')

    async function fetchAPI() {
        try {
            let response = await fetch(BASE_URL + "/master/"+mId, {
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

    async function getData() {
        try {
            fetchAPI().then(list => {
                console.log(list);
                setMasters(list.pets);
            });
        } catch (e) {

        }
    }

    const LoadCurrentMaster = async () => {
        setCurrentMaster(await AsyncStorage.getItem(CURRENT_MASTER))
    }
    const SaveCurrentMaster = async (m)=> {
        setCurrentMaster(await AsyncStorage.setItem(CURRENT_MASTER, m))
        if (mFirstN !== null && mLastN !== null) {
            await AsyncStorage.setItem('first', mFirstN)
            await AsyncStorage.setItem('last', mLastN)
        }
    }

    useEffect(() => {
        getData()

        LoadCurrentMaster()
    }, [])

    return(<Screen>
        {
            // currentMaster ? <Text>Master: {route.params.cm}</Text> :
              // <Text>Master: {currentMaster}</Text> :
              // <Text>Reload app</Text>
        }

        <Text style={styles.label}>Owner Card</Text>
        <OwnerCard mFirstN={mFirstN} mLastN={mLastN}/>

        {
            mPets ?
              <Text style={styles.label}>Cats</Text> :
              <Text style={styles.label}>This owner has no cat</Text>
        }

        {masters ?
          <FlatList
            data={masters}
            renderItem={({ item }) =>
              <PetItem
                // onPress={() => {
                //     console.log(`Item: ${item.masterId}`)
                // }}
                name={item.name}
                dob={item.dob}
                Category={item.Category}
              />
            }
          /> :
          <Text>No data</Text>
        }
        <View style={styles.makeMaster}>
            <AppButton title='Make Master' onPress={()=> {
                alert(`${mFirstN} ${mLastN} with id ${mId} set as master`)
                SaveCurrentMaster(mFirstN.toString().substring(0, 1) + mLastN.toString().substring(0, 1))
            }}/>
        </View>
    </Screen>)
}

const styles = StyleSheet.create({
    currentMasterCircle: {
        backgroundColor: colors.white,
        width: 36,
        height: 36,
        borderRadius: 36/2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20
    },
    label : {
        marginTop: 20,
        marginBottom: 10,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#b2afaf',
    },
    makeMaster: {
        justifyContent: "center",
        alignItems: "center",
    }
})
