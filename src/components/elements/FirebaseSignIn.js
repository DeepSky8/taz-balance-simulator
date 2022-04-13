import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ui } from '../../firebase/firebase';
import { uiConfig } from '../../firebase/uiConfig';


const FirebaseSignIn = () => {

    useEffect(() => {
        if (ui.isPendingRedirect()) {
            ui.start('#firebaseui-auth-container', uiConfig);
        } else {
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    }, [])

    return (
        <div>
            Firebase UI Sign In Page
            <Link to="/gameSetup">Back</Link>

            <div id="firebaseui-auth-container">

            </div>
        </div>

    )
}
export { FirebaseSignIn as default } 