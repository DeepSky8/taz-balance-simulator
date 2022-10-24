import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './styles/styles.scss';
import reportWebVitals from './reportWebVitals';
// import AppRouter from './routers/AppRouter';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { startRegisterUser } from './actions/userActions';
import NotFoundPage from './components/Authentication/NotFoundPage';
import Home from './components/elements/Home/Home';
import GameSetup from './components/elements/GameSetup/GameSetup';
import ActiveGame from './components/elements/ActiveGame/ActiveGame';
import Welcome from './components/Authentication/Welcome';
import ChooseMode from './components/Authentication/ChooseMode';
import FirebaseSignIn from './components/Authentication/FirebaseSignIn';
import Tos from './components/Authentication/Tos';
import PrivacyPolicy from './components/Authentication/PrivacyPolicy';
import CharacterSheet from './components/elements/CharacterSheet/CharacterSheet';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/chooseMode",
        element: <ChooseMode />,
      },
      {
        path: "/gameSetup/*",
        element: <GameSetup />,
      },
      {
        path: "/characterSheet/*",
        element: <CharacterSheet />,
      },
      {
        path: "/activeGame/*",
        element: <ActiveGame />
      },
      {
        path: "/signIn",
        element: <FirebaseSignIn />
      },
      {
        path: "/termsofservice",
        element: <Tos />
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />
      },
    ],
  },

]);


const jsx = (
  // <React.StrictMode>
  //   <AppRouter />
  // </React.StrictMode>
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)


let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    // ReactDOM.createRoot(document.getElementById("root")).render(
    //   <React.StrictMode>
    //     <RouterProvider router={router} />
    //   </React.StrictMode>
    // );

    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log('user: ', user)
    startRegisterUser(user.uid, user.isAnonymous)
    renderApp()
  } else {

    signInAnonymously(auth)
      .catch((error) => {
        console.log('error was: ', error)
      })
  }
})

// renderApp()


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
