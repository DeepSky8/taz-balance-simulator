import { charClasses } from "../../classes/default";
import classTransformer from "../../functions/classTransformer";

export const CharacterObject = ({ charObject, selectChar, viewEdit }) => (
    <div>
        {<h4>{charObject.charName} - {classTransformer(charClasses, charObject.charClassCode)}</h4>}
        {<button onClick={viewEdit}>View/edit character</button>}
        {<button onClick={selectChar}>Select this character</button>}
    </div>
)
