import React from "react";
// import { auth, db } from "../../firebase/firebase";
// import {
//     off,
//     onValue,
//     ref,
// } from "firebase/database";
// import {
//     clearChallengesObject,
//     updateChallengesObject
// } from "../../actions/gameActions";
// import { startRemoveGameID } from "../../actions/userActions";


export const GameSetup = ({
    children
}) => {

 

    return (
        <div>
            <p>Game Setup page</p>
            {children}
        </div>
    )

}

export { GameSetup as default }



