import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Pressable, ScrollView } from "react-native";
import { Feather, FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import apiService from "../service/apiService";
import { useEffect, useState, useReducer } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ACTION_TYPES } from "../pizza/pizzaActionTypes";
import { INITIAL_STATE, pizzaReducer } from "../pizza/pizzaReducer";

const PizzaDetailScreen = () => {
  const [readMore, setReadMore] = useState(false);
  const [active, setActive] = useState("S");

  const [state, dispatch] = useReducer(pizzaReducer, INITIAL_STATE);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params.id;
  let ingredientsArr;

  useEffect(() => {
    fetchPizza(id);
  }, [id]);

  const fetchPizza = async (id) => {
    try {
      dispatch({ type: ACTION_TYPES.GET_PIZZA_REQUEST });
      const res = await apiService.get(`/pizza/${id}`);
      dispatch({ type: ACTION_TYPES.GET_PIZZA_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.GET_PIZZA_ERROR, payload: error.message });
    }
  };

  if (state.loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.pizza?.ingredients !== "") {
    ingredientsArr = state.pizza?.ingredients?.split(", ");
  }

  const toggleReadMore = () => {
    setReadMore((current) => !current);
  };

  return (
    <>
      {state.pizza && (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
          <Image source={{ uri: state.pizza.picture }} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 17, left: 5 }}>
            <Feather name="chevron-left" size={45} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", top: 20, right: 12 }} onPress={() => navigation.openDrawer()}>
            <FontAwesome size={35} color="#fff" name="bars" style={{ marginBottom: 30 }} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.pizzaHeading}>{state.pizza.name}</Text>
              <Text style={styles.categoryText}>{state.pizza.category}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                <Entypo name="star" size={28} color={`${state.pizza.rating >= 1 ? "#ffd600" : "#555"}`} />
                <Entypo name="star" size={28} color={`${state.pizza.rating >= 2 ? "#ffd600" : "#555"}`} />
                <Entypo name="star" size={28} color={`${state.pizza.rating >= 3 ? "#ffd600" : "#555"}`} />
                <Entypo name="star" size={28} color={`${state.pizza.rating >= 4 ? "#ffd600" : "#555"}`} />
                <Entypo name="star" size={28} color={`${state.pizza.rating >= 5 ? "#ffd600" : "#555"}`} />
              </View>
            </View>
            <View>
              {state.pizza &&
                ingredientsArr &&
                ingredientsArr.map((ingr, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      color: "#fff",
                      borderWidth: 1,
                      borderColor: "#cd854d",
                      borderRadius: 5,
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 5,
                    }}
                  >
                    <MaterialCommunityIcons name="food-variant" size={16} color="#fff" style={{ marginRight: 7 }} />
                    <Text style={{ color: "#fff" }}>{ingr.charAt(0).toUpperCase() + ingr.slice(1)}</Text>
                  </View>
                ))}
            </View>
          </View>
          <View style={{ backgroundColor: "#0c0f14" }}></View>
          <View style={styles.descriptionSection}>
            <Text style={styles.descHeading}>Description</Text>
            {state.pizza?.description?.length < 200 && <Text style={styles.descText}>{state.pizza?.description}</Text>}
            {state.pizza?.description?.length > 200 && (
              <>
                {readMore ? (
                  <Text style={styles.descText}>{state.pizza?.description}</Text>
                ) : (
                  <Text style={styles.descText}>{state.pizza?.description?.slice(0, 100)}...</Text>
                )}
                <TouchableOpacity onPress={toggleReadMore}>
                  <Text style={styles.readMore}>{readMore ? "Show Less" : "Read More"}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.sizeSection}>
            <Text style={styles.descHeading}>Size</Text>
            <FlatList
              horizontal
              keyExtractor={(item, index) => index}
              data={[{ category: "S" }, { category: "M" }, { category: "L" }]}
              renderItem={({ item }) => (
                <Pressable onPress={() => setActive(item.category)}>
                  <Text style={[styles.sizeText, active === item.category && styles.activeCategory]}>{item.category}</Text>
                </Pressable>
              )}
            />
          </View>
          <Text style={styles.priceHeading}>Price</Text>
          <View style={styles.priceContainer}>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
              <Feather name="dollar-sign" color="#ed9753" size={25} />
              {active === "S" ? state.pizza.price : active === "M" ? Math.round(state.pizza.price * 1.25 * 100) / 100 : state.pizza.price * 1.5}
            </Text>
            <TouchableOpacity>
              <Text style={styles.button}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default PizzaDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f14",
  },
  image: {
    height: 250,
    resizeMode: "cover",
    position: "relative",
  },
  infoContainer: {
    backgroundColor: "rgba(24,26,29,0.75)",
    paddingHorizontal: 20,
    paddingVertical: 35,
    marginTop: -70,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    borderWidth: 2,
    borderColor: "#cd854d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 130,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 15,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 15,
  },
  pizzaHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionSection: {
    marginVertical: 30,
    paddingHorizontal: 15,
  },
  descHeading: {
    letterSpacing: 2.5,
    color: "#828383",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 15,
  },
  sizeSection: {
    paddingHorizontal: 15,
  },
  descText: {
    color: "#bdbbb9",
    fontSize: 14,
  },
  sizeText: {
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 10,
    backgroundColor: "#141921",
    color: "#8b8a8a",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
    fontWeight: "bold",
  },
  activeCategory: {
    color: "#e28f4e",
    borderWidth: 1,
    borderColor: "#b27342",
    backgroundColor: "#0c0f14",
  },
  readMore: {
    color: "#e78745",
    marginTop: 3,
  },
  priceContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceHeading: {
    letterSpacing: 2.5,
    color: "#828383",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 30,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#f09954",
    color: "#fff",
    letterSpacing: 2,
    fontWeight: "bold",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textTransform: "uppercase",
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
