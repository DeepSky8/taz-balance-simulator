import React, { useReducer } from "react";
import { defaultCharState, charReducer } from "../../../reducers/charReducer";
import { startSetCurrentCharacter, toggleCharDisplay } from "../../../actions/charActions";
import { CharactersList } from "./CharactersList";
import { auth } from "../../../firebase/firebase";
// import classTransformer from "../../functions/classTransformer";
// import { charClasses } from "../../classes/default";
import { useNavigate } from "react-router-dom";

const CharacterSelect = ({ userState, charState, dispatchCharState, charArray }) => {
    let navigate = useNavigate()

    const charDispatch = (charID) => {
        startSetCurrentCharacter(auth.currentUser.uid, charID)
    }

    const viewEdit = (charID) => {
        navigate(`/viewEditCharacter/${charID}`)
    }


    return (
        <div>
            <button onClick={() => { dispatchCharState(toggleCharDisplay()) }}>
                {userState.currentCharacterID ?
                    charState.charName + ": " + charState.questCount + " quests completed (click to pick new character)"
                    :
                    'Please create a character'}
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