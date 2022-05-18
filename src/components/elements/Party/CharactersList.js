import { Link } from "react-router-dom"
import { CharacterObject } from "./CharacterObject"

export const CharactersList = ({ charDispatch, charArray, viewEdit, deleteChar }) => (
    <div>
        {charArray.map(character => {
            return <CharacterObject
                key={character.charID}
                charObject={character}
                selectChar={() => { charDispatch(character.charID) }}
                viewEdit={() => { viewEdit(character.charID) }}
                deleteChar={() => { deleteChar(character.charID) }}
            />
        })}
        <div><Link to="/characterSheet/newCharacter">Create new character</Link></div>
    </div>
)


