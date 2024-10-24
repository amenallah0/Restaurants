import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBVSuvU_eoZm_-I1wUGbyOUgn6dbqHRU34",
  authDomain: "restoapp-7a8d5.firebaseapp.com",
  projectId: "restoapp-7a8d5",
  storageBucket: "restoapp-7a8d5.appspot.com",
  messagingSenderId: "172148061717",
  appId: "1:172148061717:web:0770f1ed094d5d3b77001c",
  measurementId: "G-VFKVRLJWDB"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
