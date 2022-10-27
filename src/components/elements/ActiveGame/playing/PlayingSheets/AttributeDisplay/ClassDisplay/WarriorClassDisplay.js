import React from "react"
import { raceTitles } from "../../../../../CharacterSheet/classes/charInfo"


const WarriorClassDisplay = ({ charState }) => {
  const imA = "I'm a "
  const iWasRaisedBy = "       I was raised by "
  const i = '     I '
  const lift = ' lift'
  const myBeard = 'My beard'


  return (
    <span>

      {charState.raceCode === raceTitles.indexOf('Human') &&
        ` ${imA} ${charState.humanWarriorOrigin1}. ${iWasRaisedBy} ${charState.humanWarriorOrigin2}. ${i} ${charState.humanWarriorOrigin3} ${lift}.`
      }
      {charState.raceCode === raceTitles.indexOf('Dwarf') &&
        ` ${myBeard} ${charState.dwarfWarriorBeard}.`
      }

    </span>
  )
}



export default WarriorClassDisplay