import { charClasses } from "../../classes/default"
import classTransformer from "../../functions/classTransformer"




export const CharacterObject = ({ charObject, selectChar, viewEdit, deleteChar }) => {
    const className = classTransformer(charClasses, charObject.charClassCode)

    return (
        <div>
            {<button onClick={selectChar}>
                Play as {charObject.charName} the {className}: {charObject.questCount} quests completed
            </button>}
            {<button onClick={viewEdit}>View/edit {charObject.charName}</button>}
            <div>
                {<button onClick={deleteChar}>
                    Retire {charObject.charName} permanently
                </button>}
            </div>

        </div>
    )
}


