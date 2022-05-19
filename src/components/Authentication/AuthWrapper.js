import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { history } from "../../routers/AppRouter";

const LoginLink = () => (

    <Link to="/signIn">
        Login
    </Link>

)

const onLogoutClick = () => {
    signOut(auth)
        .then(history.push('/'))
        .catch((error) => {
            console.log("error thrown on logout:", error)
        })
}

const LogoutLink = () => (

    <button onClick={onLogoutClick}>Logout</button>

)

export const AuthWrapper = () => {

    return (
        <div>
            
            {auth.currentUser.isAnonymous === false
                ?
                <LogoutLink />
                :
                <LoginLink />
            }
        </div>
    )
}

export { AuthWrapper as default }