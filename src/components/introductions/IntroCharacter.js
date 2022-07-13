import { onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { db } from "../../firebase/firebase";

const IntroCharacter = ({ gameState, charState, dispatchCharState }) => {

    useEffect(() => {
        const uid = gameState.activePlayer.uid
        const currentCharacterID = gameState.activePlayer.currentCharacterID
        if (gameState.activePlayer) {
            onValue(ref(db, 'characters/' + gameState.activePlayer.uid + '/' + gameState.activePlayer.currentCharacterID), (snapshot) => {
                if (snapshot.exists()) {

                }
            })
        }


    }, [gameState.activePlayer])

    return (
        <div>
            My character is named { }
        </div>
    )
}

export default IntroCharacter