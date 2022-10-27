import React from "react";
import { priestAssistFame, priestAssistHobby } from "../../../../../CharacterSheet/classes/priestInfo";

const PriestAssistDisplay = ({ charState }) => (
  <span>
    {charState.assistCode === priestAssistFame &&
      ` I'm famous because ${charState.priestAssistFame} and it helps because ${charState.priestAssistFameHelps}.`
    }

    {charState.assistCode === priestAssistHobby &&
      ` My hobby is ${charState.priestAssistHobby}.`
    }
  </span>
)

export default PriestAssistDisplay