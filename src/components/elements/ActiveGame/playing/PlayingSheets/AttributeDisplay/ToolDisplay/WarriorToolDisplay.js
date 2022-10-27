import React from "react";
import { warriorToolArmor, warriorToolBattlecry } from "../../../../../CharacterSheet/classes/warriorInfo";

const WarriorToolDisplay = ({ charState }) => (
  <span>
    {charState.toolCode === warriorToolArmor &&
      ` My armor looks like ${charState.warriorToolArmor}.`
    }

    {charState.toolCode === warriorToolBattlecry &&
      ` My armor looks like ${charState.warriorToolBattlecry}.`
    }
  </span>
)

export default WarriorToolDisplay