import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, ui } from '../../firebase/firebase';
import { uiConfig } from '../../firebase/uiConfig';
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
            Firebase UI Sign In Page
            <Link to="/gameSetup">Back</Link>

            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>

    )
}
export { FirebaseSignIn as default }

// <div id="firebaseui-auth-container">

// </div>