import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";

const Stack = createStackNavigator();
const LoginNav = () => (
  <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
            headerShown: false,
        }}
      />
  </Stack.Navigator>
);
export default LoginNav;
