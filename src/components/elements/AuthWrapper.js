import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { history } from "../../routers/AppRouter";
import { setIsAnonymous, setState, setUID } from "../../actions/setupActions";
import { get, off, onValue, ref, remove, update } from "firebase/database";



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

export const AuthWrapper = ({ setupState, dispatchSetupState }) => {

    useEffect(() => {
        dispatchSetupState(setUID(auth.currentUser.uid))
        dispatchSetupState(setIsAnonymous(auth.currentUser.isAnonymous))
    }, [auth.currentUser])

    useEffect(() => {
        const authUID = auth.currentUser.uid
        onValue(ref(db, 'users/' + authUID), (snapshot) => {
            
            if (snapshot.exists()) {
                const anonymousUID = snapshot.val().anonymousUID
                if (anonymousUID) {
                    get(ref(db, 'users/' + anonymousUID))
                        .then((snapshot) => {
                            update(ref(db, 'users/' + authUID), { ...snapshot.val(), anonymousUID: null })
                        })
                        .then(() => {
                            remove(ref(db, 'users/' + anonymousUID))
                        })
                }
                dispatchSetupState(setState(snapshot.val()))
            }
        })


        return () => {
            off(ref(db, 'users/' + authUID))
        }
    }, [])

    // onAuthStateChanged(auth, (user) => { 

    // })

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