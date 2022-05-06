import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routers/AppRouter';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { registerUser } from './actions/userActions';

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
    registerUser(user.uid, user.isAnonymous, {}=true)
    renderApp()
  } else {
    console.log('signing in anonymously')
    signInAnonymously(auth)
      // .then(() => { renderApp() })
      .catch((error) => {
        console.log('error was: ', error)
      })
  }
})



// if (user !== null) {
//   console.log('signing in as auth user isAnonymous: ', user.isAnonymous, user.email)
//   // history.push('/gameSetup')
//   renderApp();
// } else {
//   console.log('signing in anonymously')
//   signInAnonymously(auth)
//     .then(() => { renderApp() })
//     .catch((error) => {
//       console.log('error was: ', error)
//     })
// }


// switch (user.isAnonymous) {
//   case null:
//     console.log('isAnonymouse is null')
//     signInAnonymously(auth).then(() => { renderApp() });
//     break
//   case false:
//     console.log('isAnonymouse is false');
//     renderApp();
//     break
//   case true:
//     console.log('isAnonymouse is true')
//     renderApp();
//     break
//   case user === null:
//     console.log('case of user is null')
//     signInAnonymously(auth).then(() => { renderApp() });
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



// ReactDOM.render(
//   jsx,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
