import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import CryptoES from "crypto-es";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Home({ route, navigation }) {
  const [form, setForm] = useState({
    user: "",
    password: "",
    data: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      const valor = await AsyncStorage.getItem("@ProjetoLogin:login");
      if (valor !== null) {
        const dados = JSON.parse(valor);
        setForm(dados);
      } else {
        alert("Erro na busca");
      }
    } catch (e) {
      console.log("Deu erro:" + e);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
      <Text style={{ color: "#000000", fontSize: 25 }}>
        {"Conta: " + item.conta}
      </Text>
      <Text style={{ color: "#000000", fontSize: 15 }}>
        {"Usuário: " + item.usuario}
      </Text>
      <Text style={{ color: "#000000", fontSize: 15 }}>
        {"Senha: " +
          CryptoES.AES.decrypt(item.senha, form.password).toString(
            CryptoES.enc.Utf8
          )}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => ExcluirItem(item.conta)}
      >
        <Text style={{
    color:"white"}}>Excluir</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ExcluirItem = (conta) => {
    let filtro = form.data.filter((val, i) => {
      if (val.conta !== conta) {
        return val;
      }
    });
    setForm((form.data = filtro));
    salvaAlteração();
  };

  const salvaAlteração = async () => {
    AsyncStorage.setItem("@ProjetoLogin:login", JSON.stringify(form));
    alert("Alteração realizada!");
  };

  async function enviar() {
    try {
      await setDoc(doc(db, "backup", "CKUjdswSwsHmhUgImPlI"), {
        user: form.user,
        password: form.password,
        data: form.data,
      });
      alert("Backup enviado!");
    } catch (e) {
      alert("Erro no backup enviado!");
    }
  }

  async function baixa() {
    const docRef = doc(db, "backup", "CKUjdswSwsHmhUgImPlI");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setForm({
        user: docSnap.data().user,
        password: docSnap.data().password,
        data: docSnap.data().data,
      });
      await salvaAlteração();
    } else {
      alert("Documento não encontrado.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Contas salvas</Text>
        <FlatList
          style={styles.flatList}
          data={form.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.conta}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Cadastrar conta")}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Cadastrar conta
          </Text>
        </TouchableOpacity>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={() => enviar()}>
            <Text
              style={{
                color: "white",
              }}
            >
              Upload do backup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => baixa()}>
            <Text
              style={{
                color: "white",
              }}
            >
              Download do backup
            </Text>
          </TouchableOpacity>
        </View>
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
    borderWidth: 2,
  },
  titulo: {
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
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
    minWidth: "10%",
    margin: 10,
  },
  flatList: {
    minWidth: "80%",
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
