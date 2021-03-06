import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {API_HOST} from '../env';

const config = {
  apiKey: "AIzaSyAqrMBxbK-1ByBNoJhi-G1KLdLo0bpZAQY",
  authDomain: "palatable-pizza.firebaseapp.com",
  databaseURL: "https://palatable-pizza.firebaseio.com",
  projectId: "palatable-pizza",
  storageBucket: "",
  messagingSenderId: "1003833334107",
  appId: "1:1003833334107:web:ecbff291730fe8755f627e"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;
  const response = await fetch(`${API_HOST}/api/users/${userAuth.email}`, {
    method: 'GET'
  });

  if (response.status === 404) {
    const body = JSON.stringify({
      display_name: userAuth.displayName,
      email: userAuth.email
    });
    const newUserResp = await fetch(`${API_HOST}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body
    });
    const newUserBody = await newUserResp.json();
    return newUserBody.data;
  }
  const existingUserBody = await response.json();
  return existingUserBody.data;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
