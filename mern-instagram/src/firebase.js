import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVykHLRj2xT9ZDl7-ZJzVZvgP9mmIeDTQ",
  authDomain: "instagram-clone-fa68e.firebaseapp.com",
  projectId: "instagram-clone-fa68e",
  storageBucket: "instagram-clone-fa68e.appspot.com",
  messagingSenderId: "528949024814",
  appId: "1:528949024814:web:dacb62731d587fae0c67bf",
  measurementId: "G-DFP4TCZ61H"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
