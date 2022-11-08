import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Components/Login";
import Home from "./Components/Home";
import CadastrarLogin from "./Components/CadastrarLogin";
import CadastrarConta from "./Components/CadastrarConta";
const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastrar login" component={CadastrarLogin} />
        <Stack.Screen name="Cadastrar conta" component={CadastrarConta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
