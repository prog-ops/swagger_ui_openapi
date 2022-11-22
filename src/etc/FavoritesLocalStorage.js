import AsyncStorage from "@react-native-async-storage/async-storage";

export default class FavoritesLocalStorage {
    async saveIntoDb(m) {
        const masters = this.getFromDb()
        masters.push(m)
        return await AsyncStorage.setItem('masters', JSON.stringify(masters))
    }

    getFromDb() {
        let masters;
        if (AsyncStorage.getItem("masters") === null) {
            masters = [];
        } else {
            AsyncStorage.getItem('masters')
              .then(data => {
                  masters = JSON.parse(data)
              })
        }
        return masters
    }
}
