import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import CryptoES from 'crypto-es';

export default function CadastrarConta({ navigation }) {
  const [contas, setContas] = useState("");
  const [usuarios, setUsuarios] = useState("");
  const [senhas, setSenhas] = useState("");
  const [form, setForm] = useState([]);

  useEffect(() => {
    busca();
  }, []);

  function cadastrar() {
    const encrypted = CryptoES.AES.encrypt(senhas, form.password);
    form.data.push({
      conta: contas,
      usuario: usuarios,
      senha: encrypted.toString(),
    });
    AsyncStorage.setItem("@ProjetoLogin:login", JSON.stringify(form));
    alert("Conta cadastrada com sucesso!")
    navigation.navigate('Home');
  }

  const busca = async () => {
    let val = await AsyncStorage.getItem("@ProjetoLogin:login");
    let dados = JSON.parse(val);
    setForm(dados);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Cadastrar nova conta</Text>
          <Text style={styles.txt}>Digite sua conta:</Text>
          <TextInput
            placeholder="Conta"
            style={styles.input}
            value={contas}
            onChangeText={setContas}
          />
          <Text style={styles.txt}>Digite seu usuário:</Text>
          <TextInput
            placeholder="Usuário"
            style={styles.input}
            value={usuarios}
            onChangeText={setUsuarios}
          />
          <Text style={styles.txt}>Digite sua senha:</Text>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            value={senhas}
            onChangeText={setSenhas}
          />
        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
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
