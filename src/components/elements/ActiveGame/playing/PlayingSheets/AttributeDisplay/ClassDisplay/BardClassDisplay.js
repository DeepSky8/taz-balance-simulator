import React from "react";
import { raceTitles } from "../../../../../CharacterSheet/classes/charInfo";

const BardClassDisplay = ({ charState }) => (
  <span>
    {charState.raceCode === raceTitles.indexOf('Human') &&
      ` ${charState.humanBardBand}.`
    }

    {charState.raceCode === raceTitles.indexOf('Magical Robot') &&
      ` I was created by ${charState.robotBardCreator}. I look like ${charState.robotBardVisual}.`
    }
  </span>
)


export default BardClassDisplay