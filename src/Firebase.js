import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA2r_wC4N_9oWJrOXnIkHcX8DAH8gYfdLQ",
    authDomain: "dashboard-78733.firebaseapp.com",
    databaseURL: "https://dashboard-78733-default-rtdb.firebaseio.com",
    projectId: "dashboard-78733",
    storageBucket: "dashboard-78733.appspot.com",
    messagingSenderId: "999858310264",
    appId: "1:999858310264:web:de9fc7e5d496797747f18d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()