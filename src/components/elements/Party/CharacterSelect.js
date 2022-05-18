import React from "react";
import { startRemoveCharacter, startSetCurrentCharacter, toggleCharDisplay } from "../../../actions/charActions";
import { CharactersList } from "./CharactersList";
import { auth } from "../../../firebase/firebase";
import classTransformer from "../../functions/classTransformer";
import { charClasses } from "../../classes/default";
import { useNavigate } from "react-router-dom";

const CharacterSelect = ({ userState, gameState, charState, dispatchCharState, charArray }) => {
    let navigate = useNavigate()
    let className = classTransformer(charClasses, charState.charClassCode)
    const charDispatch = (charID) => {
        startSetCurrentCharacter(auth.currentUser.uid, charID)
    }

    const viewEdit = (charID) => {
        navigate(`/characterSheet/${className}/${charID}`)
    }

    const deleteChar = (charID) => {
        startRemoveCharacter(auth.currentUser.uid, charID)
        navigate('/gameSetup')
    }

    return (
        <div>
            {userState.currentCharacterID ?
                charState.charName + ", " + charState.charTitle
                :
                ''
            }
            <div>
                <button onClick={() => {
                    charArray.length > 0 ? dispatchCharState(toggleCharDisplay())
                        :
                        navigate('/characterSheet/newCharacter')
                }}>
                    {charArray.length > 0 ?
                        'View all characters'
                        :
                        'Create a character'}
                </button>
            </div>

            {charState.displayChars &&
                <CharactersList
                    charDispatch={charDispatch}
                    charArray={charArray}
                    viewEdit={viewEdit}
                    deleteChar={deleteChar}
                />
            }
        </div>

    )
}

export default CharacterSelect  