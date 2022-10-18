import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";



const LoginLink = () => (

    <Link to="/signIn">
        Login
    </Link>

)

const onLogoutClick = (navigate) => {

    signOut(auth)
        .then(navigate("/"))
        .catch((error) => {
            console.log("error thrown on logout:", error)
        })
}

const LogoutLink = () => {
    const navigate = useNavigate()
    return (

        <button onClick={() => {onLogoutClick(navigate) }}> Logout</button >

    )
}

export const AuthWrapper = () => {


    return (
        <div>
            <Link to="/gameSetup/gameInstructions">Game Setup</Link>
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