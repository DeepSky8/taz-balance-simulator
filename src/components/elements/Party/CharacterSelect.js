import React, { useReducer } from "react";
import { defaultCharState, charReducer } from "../../../reducers/charReducer";
import { startSetCurrentCharacter, toggleCharDisplay } from "../../../actions/charActions";
import { CharactersList } from "./CharactersList";
import { auth } from "../../../firebase/firebase";
import classTransformer from "../../functions/classTransformer";
import { charClasses } from "../../classes/default";

const CharacterSelect = ({ userState, gameState, charState, dispatchCharState, charArray }) => {

    const charDispatch = (charID) => {
        startSetCurrentCharacter(auth.currentUser.uid, charID)
    }

    const viewEdit = (charID) => {

    }


    return (
        <div>
            <button onClick={() => { dispatchCharState(toggleCharDisplay()) }}>
                {userState.currentCharacterID ?
                    charState.charName + ": " + charState.questCount + " quests completed (click to pick new character)"
                    :
                    'Please select a character'}
            </button>

            {charState.displayChars &&
                <CharactersList
                    charDispatch={charDispatch}
                    charArray={charArray}
                    viewEdit={viewEdit}
                />
            }
        </div>

    )
}

export default CharacterSelect  