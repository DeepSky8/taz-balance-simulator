import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routers/AppRouter';
import { auth } from './firebase/firebase';


const jsx = (
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}



onAuthStateChanged(auth, (user) => {

  if (user) {
console.log('Auth State Changed with result of User')
    renderApp();

  } else {
    console.log('auth state changed with result of non user')
    signInAnonymously(auth)
      .catch((error) => {
        console.log(
          'Error when signing in anonymously from index.js:',
          auth.currentUser,
          error
        )
      })
  }

})

// ReactDOM.render(
//   jsx,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
