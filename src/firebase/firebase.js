import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';


const firebaseConfig = {
    apiKey: "AIzaSyDYV-nZDBT0TTmSqPX71aehUUIWIvmrW5I",
    authDomain: "taz-bureau-of-balance.firebaseapp.com",
    projectId: "taz-bureau-of-balance",
    storageBucket: "taz-bureau-of-balance.appspot.com",
    messagingSenderId: "383877815321",
    appId: "1:383877815321:web:eca6f333a8cd5b07461e88"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
const auth = getAuth();



// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(auth);

export { auth, db }