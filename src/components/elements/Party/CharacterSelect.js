import React, { useReducer } from "react";
import { defaultCharState, charReducer } from "../../../reducers/charReducer";
import { toggleCharDisplay } from "../../../actions/charActions";
import { CharactersList } from "./CharactersList";

const CharacterSelect = ({ userState, gameState }) => {
    const [characterState, setCharacterState] = useReducer(charReducer, defaultCharState)


    return (
        <div>
            <button onClick={() => { toggleCharDisplay() }}>
                {userState.currentCharacter ?
                    userState.currentCharacter.charName
                    :
                    'Please select a character'}
            </button>

            {characterState.displayChars &&
                <CharactersList />

            }
        </div>

    )
}

export default CharacterSelect  