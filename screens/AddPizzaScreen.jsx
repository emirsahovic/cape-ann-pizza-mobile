import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import apiService from "../service/apiService";

const pizzaValidationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  price: yup
    .string()
    .matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, "Enter your price")
    .required("Required"),
  picture: yup.string().required("Required"),
  description: yup.string().required("Required"),
  ingredients: yup.string().required("Required"),
  rating: yup.number("Number").typeError("Rating must be a number").min(1, "Minimum rating is 1").max(5, "Maximum rating is 5").required("Required"),
});

const AddPizzaScreen = () => {
  const [category, setCategory] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async (values, { resetForm }) => {
    const { description, name, picture, price, ingredients, rating } = values;
    const newData = {
      name,
      price: parseFloat(price),
      picture,
      description,
      category,
      ingredients,
      rating: parseInt(rating),
    };

    await apiService.post("/pizza", newData);

    resetForm();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://images.pexels.com/photos/3581878/pexels-photo-3581878.jpeg?auto=compress&cs=tinysrgb&w=1600" }}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 17, left: 5 }}>
        <Feather name="chevron-left" size={45} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={{ position: "absolute", top: 20, right: 12 }} onPress={() => navigation.openDrawer()}>
        <FontAwesome size={35} color="#fff" name="bars" style={{ marginBottom: 30 }} />
      </TouchableOpacity>
      <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 60 }}>
        <Formik
          validationSchema={pizzaValidationSchema}
          initialValues={{ name: "", price: "", picture: "", description: "", ingredients: "", rating: "" }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <>
              <TextInput
                name="name"
                placeholder="Name"
                style={styles.textInput}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholderTextColor="#ccc"
              />
              {errors.name && touched.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              <TextInput
                name="price"
                placeholder="Price"
                style={styles.textInput}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                placeholderTextColor="#ccc"
              />
              {errors.price && touched.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
              <TextInput
                name="picture"
                placeholder="Picture Url"
                style={styles.textInput}
                onChangeText={handleChange("picture")}
                onBlur={handleBlur("picture")}
                value={values.picture}
                placeholderTextColor="#ccc"
              />
              {errors.picture && touched.picture ? <Text style={styles.errorText}>{errors.picture}</Text> : null}
              <TextInput
                name="description"
                placeholder="Description"
                style={[styles.textArea, { textAlignVertical: "top" }, { marginTop: 30 }]}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
                numberOfLines={3}
                placeholderTextColor="#ccc"
              />
              {errors.description && touched.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
              <TextInput
                name="ingredients"
                placeholder="Ingredients"
                style={[styles.textInput, { marginTop: 15 }]}
                onChangeText={handleChange("ingredients")}
                onBlur={handleBlur("ingredients")}
                value={values.ingredients}
                placeholderTextColor="#ccc"
              />
              {errors.ingredients && touched.ingredients ? <Text style={styles.errorText}>{errors.ingredients}</Text> : null}
              <TextInput
                name="rating"
                placeholder="Rating (1-5)"
                style={styles.textInput}
                onChangeText={handleChange("rating")}
                onBlur={handleBlur("rating")}
                value={values.rating}
                placeholderTextColor="#ccc"
              />
              {errors.rating && touched.rating ? <Text style={styles.errorText}>{errors.rating}</Text> : null}
              <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold", paddingLeft: 6, marginTop: 20 }}>Category</Text>
              <Picker
                mode="dropdown"
                dropdownIconColor="#fff"
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                <Picker.Item label="Veg" value="Veg" style={{ color: "#bbb", backgroundColor: "#272629" }} />
                <Picker.Item label="Non-Veg" value="Non-Veg" style={{ color: "#bbb", backgroundColor: "#272629" }} />
              </Picker>
              <Text style={{ width: "100%", backgroundColor: "#888", height: 1, marginTop: -4 }}></Text>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.button}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddPizzaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272629",
  },
  image: {
    height: "30%",
    resizeMode: "cover",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "#272629",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    marginTop: -75,
  },
  textInput: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    padding: 6,
    marginTop: 23,
    color: "#fff",
  },
  textArea: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#888",
    padding: 10,
    borderRadius: 10,
    marginTop: 18,
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 6,
    paddingLeft: 3,
  },
  button: {
    marginTop: 35,
    alignSelf: "center",
    backgroundColor: "#d53010",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
