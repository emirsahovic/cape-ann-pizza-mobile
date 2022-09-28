import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import PizzaDetailScreen from "../screens/PizzaDetailScreen";
import AddPizzaScreen from "../screens/AddPizzaScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PizzaDetail" component={PizzaDetailScreen} />
        <Drawer.Screen name="AddPizza" component={AddPizzaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
