import { Link } from "react-router-dom"
import { CharacterObject } from "./CharacterObject"

export const CharactersList = ({ userState, charDispatch }) => {


    return (
        <div>
            Character List element
            {userState.characterList.map((character) => {
                return <CharacterObject
                    key={character.charCode}
                    charObject={character}
                    selectChar={() => { charDispatch(character.charCode) }}
                />
            })}
            <div><Link to="/createNewCharacter">Create new character</Link></div>

        </div>
    )
}
