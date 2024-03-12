// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, serverTimestamp} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {

};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);