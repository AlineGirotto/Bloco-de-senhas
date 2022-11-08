import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import CryptoES from "crypto-es";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    user: "",
    password: "",
    data: [],
  });
  const [internet, setInternet] = useState(false);

  NetInfo.fetch().then((state) => {
    setInternet(state.isConnected);
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const getData = async () => {
    const hash = CryptoES.SHA256(form.password);
    if (internet) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, form.user, hash.toString())
        .then((userCredential) => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Erro no login");
        });
    } else {
      const valor = await AsyncStorage.getItem("@ProjetoLogin:login");
      const dados = JSON.parse(valor);
      if (valor !== null) {
        if (dados.user == form.user && dados.password == hash.toString()) {
          navigation.navigate("Home");
        } else {
          alert("Erro no login");
        }
      }
    }
    setForm({
      user: "",
      password: "",
      data: [],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Bloco de senhas</Text>
        <Text style={styles.txt}>Digite seu e-mail:</Text>
        <TextInput
          placeholder="E-mail"
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
        <TouchableOpacity
          style={styles.cad}
          onPress={() => navigation.navigate("Cadastrar login")}
        >
          <Text>Cadastrar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={getData}>
          <Text
            style={{
              color: "white",
            }}
          >
            Acessar
          </Text>
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
  cad: {
    alignSelf: "flex-end",
    marginEnd: "10%",
    marginTop: 10,
  },
});
