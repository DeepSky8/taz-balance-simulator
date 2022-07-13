import React from "react";
import { startRemoveCharacter, startSetCurrentCharacter } from "../../../../actions/charActions";
import { CharactersList } from "./CharactersList";
import { auth } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { charClassTitles } from "../../../classes/charInfo";

const CharacterSelect = ({ charState, charArray }) => {
    let navigate = useNavigate()

    // I believe this should actually be charState.classCode
    let className = charClassTitles[charState.classCode]
    const charDispatch = (charID) => {
        startSetCurrentCharacter(auth.currentUser.uid, charID)
    }

    const viewEdit = (charID) => {
        navigate(`/characterSheet/${className}/${charID}`)
    }

    const deleteChar = (charID) => {
        startRemoveCharacter(auth.currentUser.uid, charID)
        navigate('/gameSetup/gameInstructions')
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