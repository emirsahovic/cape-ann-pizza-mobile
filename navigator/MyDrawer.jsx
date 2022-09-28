import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import PizzaDetailScreen from "../screens/PizzaDetailScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PizzaDetail" component={PizzaDetailScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
