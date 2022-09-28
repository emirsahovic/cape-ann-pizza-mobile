import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import MyDrawer from "./navigator/MyDrawer";

export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <MyDrawer />
    </>
  );
}
