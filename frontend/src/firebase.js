
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYWjxyLppeL3dVmO_sQOHqNKMNFG_3-Js",
    authDomain: "ecommerce-uploads.firebaseapp.com",
    databaseURL: "https://ecommerce-uploads.firebaseio.com",
    projectId: "ecommerce-uploads",
    storageBucket: "ecommerce-uploads.appspot.com",
    messagingSenderId: "843056343336",
    appId: "1:843056343336:web:1d700d1cf2514e661b081d"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

