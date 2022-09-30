import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import MyDrawer from "./navigator/MyDrawer";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={"light-content"} />
      <MyDrawer />
    </Provider>
  );
}
