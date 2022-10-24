import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

// Custom navigation menu
function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#222" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingTop: 10 }}>
        <Image source={require("../assets/img/logo.png")} style={{ width: 40, height: 40 }} />
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <FontAwesome name="close" size={25} color="#ddd" />
        </TouchableOpacity>
      </View>
      <View style={[styles.optionsContainer, { marginTop: 45 }]}>
        <FontAwesome name="home" size={30} color="#ddd" />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.optionsContainer, { marginTop: 20 }]}>
        <AntDesign name="pluscircle" size={26} color="#ddd" />
        <TouchableOpacity onPress={() => navigation.navigate("AddPizza")}>
          <Text style={styles.menuText}>Add Pizza</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  menuText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 18,
  },
});
