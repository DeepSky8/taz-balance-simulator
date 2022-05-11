
// defaultCharStats = {
//     charID: '',
//     charName: '',
//     charClass: '',
//     charRace: '',
//     charTool: '',
//     charAttribute: '',
//     charNotes: '',
//     charKostco: [{}]
// }

export const CharacterObject = ({ charObject, selectChar }) => (
    <div>
        Character Object element
        {charObject.charName && 
            <h4>{charObject.charName} - {charObject.charClass}</h4>}
        {charObject.charName && 
            <button>View full character sheet</button>}
        {charObject.charName && 
            <button onClick={selectChar}>Select this character</button>}
    </div>
)
