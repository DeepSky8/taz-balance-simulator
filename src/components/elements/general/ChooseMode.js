import React from "react";
import { Link } from "react-router-dom";

const ChooseMode = () => {

    return (
        <div>
            <div><Link to='/gameSetup'>Join a game without an account</Link></div>
            <div><Link to='/signIn'>Sign in to host or join a game</Link></div>

        </div>
    )
}

export { ChooseMode as default }