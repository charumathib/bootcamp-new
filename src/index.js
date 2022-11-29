import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtuMbOHVLxh606Gy08CVZD4EaAz3Wv1S0",
  authDomain: "bootcamp-charu.firebaseapp.com",
  databaseURL: "https://bootcamp-charu-default-rtdb.firebaseio.com",
  projectId: "bootcamp-charu",
  storageBucket: "bootcamp-charu.appspot.com",
  messagingSenderId: "872802402730",
  appId: "1:872802402730:web:ea493610c0ddfd9b26abd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.functions().useFunctionsEmulator('http://localhost:5001');

console.log(app)
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  preserveOnLogout: ['homepage'],
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
