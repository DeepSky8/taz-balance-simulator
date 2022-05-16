import { Link } from "react-router-dom"
import { CharacterObject } from "./CharacterObject"

export const CharactersList = ({ charDispatch, charArray, viewEdit }) => (
        <div>
            {charArray.map(character => {
                return <CharacterObject
                    key={character.charID}
                    charObject={character}
                    selectChar={() => { charDispatch(character.charID) }}
                    viewEdit={() => { viewEdit(character.charID) }}
                />
            })}
            <div><Link to="/createNewCharacter">Create new character</Link></div>
        </div>
)


