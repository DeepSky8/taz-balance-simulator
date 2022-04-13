import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { history } from "../../routers/AppRouter";


const LoginLink = () => (
    <div>
        <Link to="/signIn">
            Login
        </Link>
    </div>
)

const onLogoutClick = () => {
    console.log('clicked')
    signOut(auth)
        .then(history.push('/'))
        .catch((error) => {
            console.log("error thrown on logout:", error)
        })
}

const LogoutLink = () => (
    <div>
        <button onClick={onLogoutClick}>Logout</button>
    </div>
)

export const AuthWrapper = ({ children }) => {
    return (
        <div>
            {auth.currentUser.isAnonymous ?
                <LoginLink />
                :
                <LogoutLink />}
            {children}
        </div>
    )
}

export { AuthWrapper as default }