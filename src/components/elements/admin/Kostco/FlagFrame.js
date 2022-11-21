import React from "react";
import {
  kCombatPreroll,
  kHealthValue,
  kostcoActionToken,
  kostcoStrength,
  kostcoAnyTime,
  kostcoAssist,
  kostcoCombat,
  kostcoHealth,
  kostcoMagic,
  kostcoMonster,
  kostcoReroll,
  kostcoCritRoll,
  kostcoSpooky,
  kostcoTargetOther,
  kostcoTargetSelf,
  kostcoTrap,
  kostcoTurnEnd,
  kStrengthValue,
  kCombatPostroll
} from "../../../../actions/kostcoActions";

const FlagFrame = (
  {
    reducer,
    dispatchReducer,
    updateKard,
    ident,
    flagType
  }
) => {

  return (


    <div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'magic' + flagType + ident}
          checked={reducer.magic}
          onChange={() => {
            dispatchReducer(kostcoMagic(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"magic" + flagType + ident}>Magic</label>

        <input
          type='checkbox'
          id={'monster' + flagType + ident}
          checked={reducer.monster}
          onChange={() => {
            dispatchReducer(kostcoMonster(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'monster' + flagType + ident}>Monster</label>

        <input
          type='checkbox'
          id={'spooky' + flagType + ident}
          checked={reducer.spooky}
          onChange={() => {
            dispatchReducer(kostcoSpooky(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'spooky' + flagType + ident}>Spooky</label>

        <input
          type='checkbox'
          id={'trap' + flagType + ident}
          checked={reducer.trap}
          onChange={() => {
            dispatchReducer(kostcoTrap(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'trap' + flagType + ident}>Trap</label>
      </div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'reroll' + flagType + ident}
          checked={reducer.reroll}
          onChange={() => {
            dispatchReducer(kostcoReroll(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'reroll' + flagType + ident}>Reroll</label>

        <input
          type='checkbox'
          id={'critRoll' + flagType + ident}
          checked={reducer.critRoll}
          onChange={() => {
            dispatchReducer(kostcoCritRoll(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'critRoll' + flagType + ident}>Critical Hit</label>

      </div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'targetSelf' + flagType + ident}
          checked={reducer.targetSelf}
          onChange={() => {
            dispatchReducer(kostcoTargetSelf(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'targetSelf' + flagType + ident}>Own Turn/Self</label>

        <input
          type='checkbox'
          id={'targetOther' + flagType + ident}
          checked={reducer.targetOther}
          onChange={() => {
            dispatchReducer(kostcoTargetOther(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'targetOther' + flagType + ident}>Other Turn/Other</label>
      </div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'combat' + flagType + ident}
          checked={reducer.combat}
          onChange={() => {
            dispatchReducer(kostcoCombat(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"combat" + flagType + ident}>Combat</label>

        <input
          type='checkbox'
          id={'turnEnd' + flagType + ident}
          checked={reducer.turnEnd}
          onChange={() => {
            dispatchReducer(kostcoTurnEnd(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'turnEnd' + flagType + ident}>Turn End</label>

        <input
          type='checkbox'
          id={'anyTime' + flagType + ident}
          checked={reducer.anyTime}
          onChange={() => {
            dispatchReducer(kostcoAnyTime(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'anyTime' + flagType + ident}>Any Turn Step</label>
      </div>

      {
        (reducer.combat) &&
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'combatPreroll' + flagType + ident}
            checked={reducer.combatPreroll}
            onChange={() => {
              dispatchReducer(kCombatPreroll(flagType))
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'combatPreroll' + flagType + ident}>Use before rolling</label>

          <input
            type='checkbox'
            id={'combatPostroll' + flagType + ident}
            checked={reducer.combatPostroll}
            onChange={() => {
              dispatchReducer(kCombatPostroll(flagType))
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'combatPostroll' + flagType + ident}>Use after rolling</label>
        </div>

      }

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'actionToken' + flagType + ident}
          checked={reducer.actionToken}
          onChange={() => {
            dispatchReducer(kostcoActionToken(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'actionToken' + flagType + ident}>Action Tokens</label>

        <input
          type='checkbox'
          id={'assist' + flagType + ident}
          checked={reducer.assist}
          onChange={() => {
            dispatchReducer(kostcoAssist(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'assist' + flagType + ident}>Assistance</label>

      </div>


      <div className="kostcoFlexContainer">

        <input
          type='checkbox'
          id={'health' + flagType + ident}
          checked={reducer.health}
          onChange={() => {
            dispatchReducer(kostcoHealth(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'health' + flagType + ident}>Modifies Health</label>

        <input
          type='checkbox'
          id={'strength' + flagType + ident}
          checked={reducer.strength}
          onChange={() => {
            dispatchReducer(kostcoStrength(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"strength" + flagType + ident}>Modifies Strength</label>
      </div>

      {
        (reducer.strength || reducer.health) &&
        <div className="kostcoFlexContainer">
          <label htmlFor={'healthValue' + flagType + ident}>Health Modifier</label>
          <input
            className="kostcoNumberEntry"
            id={'healthValue' + flagType + ident}
            type='number'
            value={reducer.healthValue}
            onChange={(e) => {
              dispatchReducer(kHealthValue(e.target.value, flagType))
            }}
            onBlur={() => { updateKard() }}
          />

          <label htmlFor={'strengthValue' + flagType + ident}>Strength Modifier</label>
          <input
            className="kostcoNumberEntry"
            id={'strengthValue' + flagType + ident}
            type='number'
            value={reducer.strengthValue}
            onChange={(e) => {
              dispatchReducer(kStrengthValue(e.target.value, flagType))
            }}
            onBlur={() => { updateKard() }}
          />
        </div>
      }
    </div>
  )
}

export default FlagFrame

// {(reducer.actionToken || reducer.assist) &&
//   <div className="kostcoFlexContainer">
//     <input
//       type='checkbox'
//       id=''
//     />
//   </div>
// }