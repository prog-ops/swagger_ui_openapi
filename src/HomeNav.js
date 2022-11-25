import HomeScreen from "./HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenMasterTitle from "./components/ScreenMasterTitle";
import MasterDetailScreen from "./screens/MasterDetailScreen";

const Stack = createStackNavigator();
const HomeNav = () => (
  <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={20} />,
            headerTitle: (p) =>
              <ScreenMasterTitle
                {...p}
              />,
            headerTitleAlign: "center",
        })} />
      <Stack.Screen
        name="MasterDetail"
        component={MasterDetailScreen}
        options={({ route }) => ({
            headerTitle: (p) =>
              <ScreenMasterTitle
                {...p}
                initialInCircle={route.params.cm}
                firstN={route.params.mFirstN}
                lastN={route.params.mLastN}
              />,
            headerTitleAlign: "center",
        })}
      />
  </Stack.Navigator>
);
export default HomeNav;
