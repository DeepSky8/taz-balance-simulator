import React, { useReducer } from "react";
import { defaultCharState, charReducer } from "../../../reducers/charReducer";
import { toggleCharDisplay } from "../../../actions/charActions";
import { CharactersList } from "./CharactersList";

const CharacterSelect = ({ userState, gameState }) => {
    const [characterState, dispatchCharState] = useReducer(charReducer, defaultCharState)

    const charDispatch = (key) => {

    }

    const charCreate = () => { 
        
    }

    return (
        <div>
            <button onClick={() => { dispatchCharState(toggleCharDisplay()) }}>
                {userState.currentCharacter ?
                    userState.currentCharacter.charName + " (click to change)"
                    :
                    'Please select a character'}
            </button>

            {characterState.displayChars &&
                <div>
                    <CharactersList
                        userState={userState}
                        charDispatch={charDispatch}
                    />
                </div>


            }
        </div>

    )
}

export default CharacterSelect  