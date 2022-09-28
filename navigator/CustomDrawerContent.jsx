import { Button, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#222" }}>
      <TouchableOpacity onPress={() => navigation.closeDrawer()}>
        <FontAwesome style={{ alignSelf: "flex-end", marginRight: 12, marginTop: 15 }} name="close" size={25} color="#ddd" />
      </TouchableOpacity>
      <View style={[styles.optionsContainer, { marginTop: 35 }]}>
        <FontAwesome name="home" size={30} color="#ddd" />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.optionsContainer, { marginTop: 15 }]}>
        <AntDesign name="pluscircle" size={26} color="#ddd" />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
