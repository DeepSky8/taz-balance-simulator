import { signInAnonymously } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const ChooseMode = () => {
    let navigate = useNavigate()

    const playAnonymously = () => {
        if (!auth.currentUser.isAnonymous) {
            signInAnonymously(auth)
        }
        navigate('/gameSetup')
    }

    const signIn = () => {
        navigate('/signIn')
    }

    return (
        <div>
            <div>
                <button
                    onClick={() => { playAnonymously() }}>
                    Join a game without an account
                </button>
            </div>
            <div>
                <button
                    onClick={() => { signIn() }}>
                    Sign in to join and host games, and save characters
                </button>
            </div>


        </div>
    )
}

export { ChooseMode as default }

// <Link to='/gameSetup'>Join a game without an account</Link>
// <Link to='/signIn'>Sign in to host or join a game</Link>