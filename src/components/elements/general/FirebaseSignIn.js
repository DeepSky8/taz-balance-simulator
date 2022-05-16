import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, ui } from '../../../firebase/firebase';
import { uiConfig } from '../../../firebase/uiConfig';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';


const FirebaseSignIn = () => {

    // useEffect(() => {
    //     if (ui.isPendingRedirect()) {
    //         ui.start('#firebaseui-auth-container', uiConfig);
    //     } else {
    //         ui.start('#firebaseui-auth-container', uiConfig);
    //     }
    // }, [])

    return (
        <div>
            Hosting a game and saving your character require an account.
            Please sign in to proceed, or click the back button to return to the game.
            <Link to="/gameSetup">Back</Link>

            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>

    )
}
export { FirebaseSignIn as default }

// <div id="firebaseui-auth-container">

// </div>