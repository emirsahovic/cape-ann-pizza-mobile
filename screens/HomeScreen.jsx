import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import PizzaCard from "../components/PizzaCard";
import RecommendedCard from "../components/RecommendedCard";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { getPizzas, getPizzasByCat, getPizzasBySearch } from "../redux/pizza/actions/actionCreators";

const HomeScreen = () => {
  const navigation = useNavigation(); // useNavigation hook for navigating between screens

  const dispatch = useDispatch(); // Using useDispatch hook you can dispatch actions to your initial state
  const { pizzas, loading, error, message, success } = useSelector((state) => state.pizza); // Get states from the redux store using useSelector hook

  const [active, setActive] = useState("All");
  const [name, setName] = useState("");
  const [pizzasClone, setPizzasClone] = useState([]);

  useEffect(() => {
    dispatch(getPizzas()); // Dispatch getPizzas() action to populate your "pizzas" array that you are importing from redux store using useSelector
    if (success) {
      setPizzasClone(pizzas); // Pizzas for recommended section
    }
  }, [dispatch, success]);

  const handleCategory = (item) => {
    // If selected category is "All", get all pizzas
    if (item === "All") {
      dispatch(getPizzas());
      setActive(item);
    } else {
      // If selected category is "Veg" or "Non Veg", get pizzas that are in that category
      setActive(item);
      dispatch(getPizzasByCat(item));
    }
  };

  const searchPizzaByName = async (name) => {
    setName("");
    if (name !== "") {
      // Get pizzas whose name contains entered value
      dispatch(getPizzasBySearch(name));
    } else {
      // If nothing is entered in the search input get all pizzas
      dispatch(getPizzas());
    }
  };

  if (loading) {
    // If data is loading, show loading spinner (ActivityIndicator)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    // If there is an error, show an error message
    return (
      <View style={styles.loading}>
        <Text style={{ color: "#fff", fontSize: 26 }}>{message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 35 }}>
        <Image source={require("../assets/img/logo.png")} style={{ width: 40, height: 40 }} />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome size={35} color="#fff" name="bars" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Find the world</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.text}>best </Text>
        <Text style={[styles.text, { color: "#ed9754" }]}>Pizza </Text>
        <Text style={styles.text}>for you</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for pizza..."
          style={styles.input}
          value={name}
          onChangeText={(newName) => setName(newName)}
          onEndEditing={() => searchPizzaByName(name)}
          placeholderTextColor="#555759"
        />
        <FontAwesome name="search" size={20} color="#555759" />
      </View>
      <View style={{ marginTop: 35, marginBottom: 20 }}>
        {pizzas && (
          <FlatList
            horizontal
            keyExtractor={(item, index) => index}
            data={[{ category: "All" }, { category: "Veg" }, { category: "Non-Veg" }]}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleCategory(item.category)}>
                <Text style={[styles.categoryText, active === item.category && styles.activeCategory]}>{item.category}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
      <View>
        {pizzas && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item.id}
            data={pizzas}
            renderItem={({ item, index }) => {
              return <PizzaCard item={item} lastIndex={pizzas.indexOf(pizzas[pizzas.length - 1])} index={index} />;
            }}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        {pizzas?.length > 0 ? (
          <Text style={styles.recommendedHeading}>Recommended</Text>
        ) : (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Entypo name="magnifying-glass" color="#fff" size={50} />
            <Text style={{ marginTop: 15, fontSize: 18, color: "#fff" }}>Sorry, we couldn't find any results...</Text>
          </View>
        )}
        {pizzas?.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>
            <FlatList
              style={{ width: Dimensions.get("window").width }}
              keyExtractor={(item) => item.id}
              data={pizzasClone.slice(1, 3)}
              renderItem={({ item }) => {
                return <RecommendedCard item={item} />;
              }}
            />
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272629",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 39,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#141921",
    borderRadius: 15,
    marginTop: 30,
  },
  input: {
    color: "#fff",
    width: "95%",
  },
  categoryText: {
    color: "#757474",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    fontSize: 16,
    marginRight: 20,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    paddingBottom: 10,
  },
  activeCategory: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    color: "#c97642",
    borderBottomColor: "#cf7943",
  },
  recommendedHeading: {
    fontSize: 18,
    color: "#7f7d7e",
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 10,
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
