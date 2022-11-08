import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGCpAzBUD2Uc6iZetbx9vD5iay_eTGJyQ",
  authDomain: "projetologin-b96c3.firebaseapp.com",
  projectId: "projetologin-b96c3",
  storageBucket: "projetologin-b96c3.appspot.com",
  messagingSenderId: "1089508446378",
  appId: "1:1089508446378:web:ed47532f139be2b23a80d3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);