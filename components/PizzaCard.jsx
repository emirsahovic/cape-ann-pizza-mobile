import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { deletePizza } from "../redux/pizza/actions/actionCreators";

const PizzaCard = ({ item, index, lastIndex }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.pizza);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("PizzaDetail", { id: item.id })}>
      <View style={[styles.pizzaCard, index === lastIndex ? { marginRight: 0 } : { marginRight: 20 }]}>
        <Image style={styles.image} source={{ uri: item.picture }} />
        <AntDesign
          name="closecircle"
          size={24}
          style={{ color: "red", position: "absolute", top: -1, right: -1 }}
          onPress={() => dispatch(deletePizza(item.id))}
        />
        <Text style={styles.pizzaName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="dollar-sign" color="#ed9753" size={20} />
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{item.price}</Text>
          </View>
          <TouchableOpacity>
            <FontAwesome
              name="plus"
              color="#fff"
              size={15}
              style={{ backgroundColor: "#f09954", paddingVertical: 5, paddingHorizontal: 7, borderRadius: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PizzaCard;

const styles = StyleSheet.create({
  pizzaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  pizzaCard: {
    borderWidth: 1,
    borderColor: "#5e524c",
    borderRadius: 10,
    padding: 10,
    width: 210,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 135,
    resizeMode: "cover",
    borderRadius: 10,
  },
  pizzaName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 8,
  },
  pizzaCategory: {
    color: "#646365",
    fontSize: 11,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loading: {
    backgroundColor: "#272629",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
