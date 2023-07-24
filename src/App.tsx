import "./App.scss";
import React from "react";
import { HashRouter } from "react-router-dom";
import Main from "./Main";
import firebase from "firebase/app";
import * as firestore from "firebase/firestore";

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <div className="app">
      <div className="background-image" id="background-image" />

      <HashRouter>
        <Main />
      </HashRouter>
    </div>
  );
}

export default App;
