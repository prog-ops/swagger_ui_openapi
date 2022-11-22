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

export default function MasterDetailScreen({route}){
    const { userInfo } = useContext(AuthhContext);
    const [master, setMaster] = useState([])
    const {mFirstName, mLastName, mId, mFav, ...mPets/*.., ..,*/} = route.params

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
            fetchAPI().then(listOfMaster => {
                console.log(listOfMaster);
                setMaster(listOfMaster.pets);
            });
        } catch (e) {

        }
    }

    const getCurrentMaster = async () => {
        setCurrentMaster(await AsyncStorage.getItem(CURRENT_MASTER))
    }
    const SetCurrentMaster = async (m)=> {
        setCurrentMaster(await AsyncStorage.setItem(CURRENT_MASTER, m))
        if (mFirstName !== null && mLastName !== null) {
            await AsyncStorage.setItem('first', mFirstName)
            await AsyncStorage.setItem('last', mLastName)
        }
    }

    useEffect(() => {
        getData()

        getCurrentMaster()
    }, [])

    return(<Screen>
        {currentMaster ?
          <Text>Master: {currentMaster}</Text> :
          <Text>No master selected yet</Text>
        }
        <Text style={{
            marginBottom: 10,
            marginStart: 20,
            fontWeight: 'bold',
            color: '#b2afaf',
        }}>Owner Card</Text>
        <View style={styles.master}>
            <View style={styles.masterCircle}>
                <Text style={{color:colors.white}}>{mFirstName.toString().substring(0,1)}{mLastName.toString().substring(0,1)}</Text>
            </View>
            <View style={styles.firstAndLastNameStyle}>
                <Text>First Name</Text>
                <Text>{mFirstName}</Text>
                <Text>Last Name</Text>
                <Text>{mLastName}</Text>
            </View>
            <View style={styles.icon}>
                <MaterialCommunityIcons
                  name='star'
                  size={24}
                  color={mFav ? colors.greenc : colors.white1}
                />
            </View>
        </View>
        <Text style={{
            marginTop: 20,
            marginBottom: 10,
            marginStart: 20,
            fontWeight: 'bold',
            color: '#b2afaf',
        }}>Cats</Text>
        {master ?
          <FlatList
            data={master}
            renderItem={({ item }) =>
              <PetItem
                onPress={() => {
                    console.log(`Item: ${item.masterId}`)
                }}
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
                alert(`${mFirstName} ${mLastName} ${mId} set as master`)
                SetCurrentMaster(mFirstName+' '+mLastName)
            }}/>
        </View>
    </Screen>)
}
const styles = StyleSheet.create({
    master: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 8,
        paddingEnd: 8,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 10,
        marginStart: 20,
        marginEnd: 20,
        elevation: 5,
        height: 100,
        justifyContent: "space-between",
        alignItems: "center"
    },
    masterCircle: {
        backgroundColor: "#6f6c6c",
        width: 36,
        height: 36,
        borderRadius: 36/2,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20
    },
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
    firstAndLastNameStyle: {
        flex: 2,
        flexDirection: 'column'
    },
    icon: {
        flex: 1,
    },
    makeMaster: {
        justifyContent: "center",
        alignItems: "center",
    }
})
