import React from "react";
import { Link, Outlet } from "react-router-dom";
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

// const linkSwitch = () => {
//     if (auth.currentUser.isAnonymous === false) {
//         return <LogoutLink />
//     } else {
//         return <LoginLink />
//     }
// }

export const AuthWrapper = (props) => {
console.log('props.uidState from AuthWrapper', props.uidState)
console.log('props from AuthWrapper', props)
    // if (auth.currentUser === null) {
    //     const credential = signInAnonymously(auth)
    //     console.log('credential created on joiningHosting: ', credential)
    // }
    return (
        <div>
            {props.uidState !== '' ?
                <LogoutLink />
                :
                <LoginLink />
            }
            <Outlet />
            {props.children}
        </div>
    )
}

export { AuthWrapper as default }



// <LoginLink />
// <LogoutLink />