import { charClassTitles } from "../../CharacterSheet/classes/charInfo"

export const CharacterObject = ({ charObject, selectChar, viewEdit, deleteChar }) => {
    const classTitle = charClassTitles[charObject.classCode]

    return (
        <div>
            {<button onClick={selectChar}>
                Play as {charObject.charName} the {classTitle}: {charObject.questCount} quests completed
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


