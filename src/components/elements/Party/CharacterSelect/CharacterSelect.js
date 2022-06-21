import React from "react";
import { startRemoveCharacter, startSetCurrentCharacter, toggleCharDisplay } from "../../../../actions/charActions";
import { CharactersList } from "./CharactersList";
import { auth } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { charClassTitles } from "../../../classes/charInfo";
import { startJoinActiveGame } from "../../../../actions/gameActions";

const CharacterSelect = ({ userState, charState, dispatchCharState, charArray }) => {
    let navigate = useNavigate()
    let className = charClassTitles[userState.classCode]
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
        <CharactersList
            charDispatch={charDispatch}
            charArray={charArray}
            viewEdit={viewEdit}
            deleteChar={deleteChar}
        />
    )
}

export default CharacterSelect


// <button onClick={() => {
//     charArray.length > 0 ? dispatchCharState(toggleCharDisplay())
//         :
//         navigate('/characterSheet/newCharacter')
// }}>
//     {charArray.length > 0 ?
//         'Your Saved Characters'
//         :
//         'Create a character'}
// </button>



// {charState.displayChars &&
//     <CharactersList
//         charDispatch={charDispatch}
//         charArray={charArray}
//         viewEdit={viewEdit}
//         deleteChar={deleteChar}
//     />
// }