import React from "react";
import { useState } from "react";
import {
  kCombatPreroll,
  kHealthValue,
  kostcoActionToken,
  kostcoAddStrength,
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

const FlagFrame = ({ reducer, dispatchReducer, updateKard, ident, flagType }) => {


  return (


    <div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'magic' + flagType + ident}
          checked={reducer.magic}
          onChange={() => {
            dispatchReducer(kostcoMagic())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"magic" + flagType + ident}>Magic</label>

        <input
          type='checkbox'
          id={'monster' + flagType + ident}
          checked={reducer.monster}
          onChange={() => {
            dispatchReducer(kostcoMonster())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'monster' + flagType + ident}>Monster</label>

        <input
          type='checkbox'
          id={'spooky' + flagType + ident}
          checked={reducer.spooky}
          onChange={() => {
            dispatchReducer(kostcoSpooky())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'spooky' + flagType + ident}>Spooky</label>

        <input
          type='checkbox'
          id={'trap' + flagType + ident}
          checked={reducer.trap}
          onChange={() => {
            dispatchReducer(kostcoTrap())
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
            dispatchReducer(kostcoReroll())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'reroll' + flagType + ident}>Reroll</label>

        <input
          type='checkbox'
          id={'critRoll' + flagType + ident}
          checked={reducer.critRoll}
          onChange={() => {
            dispatchReducer(kostcoCritRoll())
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
            dispatchReducer(kostcoTargetSelf())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'targetSelf' + flagType + ident}>Target Self</label>

        <input
          type='checkbox'
          id={'targetOther' + flagType + ident}
          checked={reducer.targetOther}
          onChange={() => {
            dispatchReducer(kostcoTargetOther())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'targetOther' + flagType + ident}>Target Other</label>
      </div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'combat' + flagType + ident}
          checked={reducer.combat}
          onChange={() => {
            dispatchReducer(kostcoCombat())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"combat" + flagType + ident}>Combat</label>

        <input
          type='checkbox'
          id={'turnEnd' + flagType + ident}
          checked={reducer.turnEnd}
          onChange={() => {
            dispatchReducer(kostcoTurnEnd())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'turnEnd' + flagType + ident}>Turn End</label>

        <input
          type='checkbox'
          id={'anyTime' + flagType + ident}
          checked={reducer.anyTime}
          onChange={() => {
            dispatchReducer(kostcoAnyTime())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'anyTime' + flagType + ident}>Any Time</label>
      </div>

      {
        (reducer.combat) &&
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'combatPreroll' + flagType + ident}
            checked={reducer.combatPreroll}
            onChange={() => {
              dispatchReducer(kCombatPreroll())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'combatPreroll' + flagType + ident}>Use before rolling</label>

          <input
            type='checkbox'
            id={'combatPostroll' + flagType + ident}
            checked={reducer.combatPostroll}
            onChange={() => {
              dispatchReducer(kCombatPostroll())
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
            dispatchReducer(kostcoActionToken())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'actionToken' + flagType + ident}>Action Tokens</label>

        <input
          type='checkbox'
          id={'assist' + flagType + ident}
          checked={reducer.assist}
          onChange={() => {
            dispatchReducer(kostcoAssist())
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
            dispatchReducer(kostcoHealth())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'health' + flagType + ident}>Affects Health</label>

        <input
          type='checkbox'
          id={'addStrength' + flagType + ident}
          checked={reducer.addStrength}
          onChange={() => {
            dispatchReducer(kostcoAddStrength())
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"addStrength" + flagType + ident}>Adds Strength</label>
      </div>

      {
        (reducer.addStrength || reducer.health) &&
        <div className="kostcoFlexContainer">
          <label htmlFor={'healthValue' + flagType + ident}>Health Modifier</label>
          <input
            className="kostcoNumberEntry"
            id={'healthValue' + flagType + ident}
            type='number'
            value={reducer.healthValue}
            onChange={(e) => {
              dispatchReducer(kHealthValue(e.target.value))
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
              dispatchReducer(kStrengthValue(e.target.value))
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