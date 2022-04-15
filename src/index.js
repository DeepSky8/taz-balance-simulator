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

  if (user === null) {
    console.log('signing in anonymously')
    signInAnonymously(auth)
      .then(() => { renderApp() })
      .catch((error) => {
        console.log('error was: ', error)
      })
  } else {
    console.log('signing in as auth user is anonymous', user.isAnonymous, user.email)
    renderApp();
  }


  // switch (user) {
  //   case user === null:
  //     console.log('case of null')
  //     signInAnonymously(auth).then(() => { renderApp() });
  //     break
  //   case user.isAnonymous === false:
  //     console.log('case of false');
  //     renderApp();
  //     break
  //   case user.isAnonymous === true:
  //     console.log('case of true')
  //     renderApp();
  //     break
  //   default:
  //     console.log('case of default')
  //     renderApp();
  // }


  // if (!user.isAnonymous) {
  //   console.log('Auth State Changed with result of User')
  //   renderApp();
  //   console.log('user is: ', user)

  // } else {
  //   console.log('auth state changed with result of anonymous')
  //   signInAnonymously(auth)
  //     .catch((error) => {
  //       console.log(
  //         'Error when signing in anonymously from index.js:',
  //         auth.currentUser,
  //         error
  //       )
  //     })
  // }

})

// ReactDOM.render(
//   jsx,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
