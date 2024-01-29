// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwYduTq7WSuBMz_N5ifNglxViW2QGmU5A",
    authDomain: "foody-project-4611e.firebaseapp.com",
    databaseURL: "https://foody-project-4611e-default-rtdb.firebaseio.com",
    projectId: "foody-project-4611e",
    storageBucket: "foody-project-4611e.appspot.com",
    messagingSenderId: "282915645606",
    appId: "1:282915645606:web:3f46d3908e7f1a6525ec67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fileStorage = getStorage(app);
