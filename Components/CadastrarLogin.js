import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import CryptoES from "crypto-es";

export default function CadastrarLogin({ navigation }) {
  const [form, setForm] = useState({
    user: "",
    password: "",
    data: [],
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const cadastro = async () => {
    const hash = CryptoES.SHA256(form.password);
    setForm((form.password = hash.toString()));
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.user, hash.toString())
      .then((userCredential) => {
        AsyncStorage.setItem("@ProjetoLogin:login", JSON.stringify(form));
        alert("Cadastro realizado");
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Cadastre um login e senha</Text>
        <Text style={styles.txt}>Digite seu login:</Text>
        <TextInput
          placeholder="Login"
          style={styles.input}
          value={form.user}
          onChange={(e) => updateForm({ user: e.target.value })}
        />
        <Text style={styles.txt}>Digite sua senha:</Text>
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={cadastro}>
        <Text style={{
    color:"white"}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container2: {
    flex: 1,
    backgroundColor: "#E5E6EB",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxHeight: "90%",
    borderRadius: 10,
  },
  titulo: {
    fontSize: 25,
    margin: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#2370eb",
    borderRadius: 10,
    padding: 10,
    minWidth: "80%",
  },
  txt: {
    alignSelf: "flex-start",
    fontSize: 20,
    margin: 10,
    marginLeft: "10%"
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#1F4E80",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    minWidth: "20%",
    margin: 10,
  },
});
