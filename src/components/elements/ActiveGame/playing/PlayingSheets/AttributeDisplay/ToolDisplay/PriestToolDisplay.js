import React from "react";
import { priestToolHolySymbol, priestToolMantra } from "../../../../../CharacterSheet/classes/priestInfo";

const PriestToolDisplay = ({ charState }) => (
  <span>
    {charState.toolCode === priestToolHolySymbol &&
      ` My holy symbol is ${charState.priestToolHolySymbol}.`
    }

    {charState.toolCode === priestToolMantra &&
      ` My mantra is ${charState.priestToolMantra}.`
    }
  </span>
)

export default PriestToolDisplay