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

const KostcoFlags = ({ reducer, dispatchReducer, updateKard, ident }) => {
  const ongoing = 'ongoing'
  const oneshot = 'oneshot'
  const [flagDisplay, setFlagDisplay] = useState(ongoing)

  return (
    <div>
      <span className="kostcoCenter">
        <button onClick={() => { setFlagDisplay(ongoing) }}>Ongoing</button>
        <button onClick={() => { setFlagDisplay(oneshot) }}>Oneshot</button>
      </span>

      {flagDisplay === ongoing &&

        <div>

        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'magic' + ongoing + ident}
            checked={reducer.magic}
            onChange={() => {
              dispatchReducer(kostcoMagic())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={"magic" + ongoing + ident}>Magic</label>
        
          <input
            type='checkbox'
            id={'monster' + ongoing + ident}
            checked={reducer.monster}
            onChange={() => {
              dispatchReducer(kostcoMonster())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'monster' + ongoing + ident}>Monster</label>
        
          <input
            type='checkbox'
            id={'spooky' + ongoing + ident}
            checked={reducer.spooky}
            onChange={() => {
              dispatchReducer(kostcoSpooky())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'spooky' + ongoing + ident}>Spooky</label>
        
          <input
            type='checkbox'
            id={'trap' + ongoing + ident}
            checked={reducer.trap}
            onChange={() => {
              dispatchReducer(kostcoTrap())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'trap' + ongoing + ident}>Trap</label>
        </div>
        
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'reroll' + ongoing + ident}
            checked={reducer.reroll}
            onChange={() => {
              dispatchReducer(kostcoReroll())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'reroll' + ongoing + ident}>Reroll</label>
        
          <input
            type='checkbox'
            id={'critRoll' + ongoing + ident}
            checked={reducer.critRoll}
            onChange={() => {
              dispatchReducer(kostcoCritRoll())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'critRoll' + ongoing + ident}>Critical Hit</label>
        
        </div>
        
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'targetSelf' + ongoing + ident}
            checked={reducer.targetSelf}
            onChange={() => {
              dispatchReducer(kostcoTargetSelf())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'targetSelf' + ongoing + ident}>Target Self</label>
        
          <input
            type='checkbox'
            id={'targetOther' + ongoing + ident}
            checked={reducer.targetOther}
            onChange={() => {
              dispatchReducer(kostcoTargetOther())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'targetOther' + ongoing + ident}>Target Other</label>
        </div>
        
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'combat' + ongoing + ident}
            checked={reducer.combat}
            onChange={() => {
              dispatchReducer(kostcoCombat())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={"combat" + ongoing + ident}>Combat</label>
        
          <input
            type='checkbox'
            id={'turnEnd' + ongoing + ident}
            checked={reducer.turnEnd}
            onChange={() => {
              dispatchReducer(kostcoTurnEnd())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'turnEnd' + ongoing + ident}>Turn End</label>
        
          <input
            type='checkbox'
            id={'anyTime' + ongoing + ident}
            checked={reducer.anyTime}
            onChange={() => {
              dispatchReducer(kostcoAnyTime())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'anyTime' + ongoing + ident}>Any Time</label>
        </div>
        
        {
          (reducer.combat) &&
          <div className="kostcoFlexContainer">
            <input
              type='checkbox'
              id={'combatPreroll' + ongoing + ident}
              checked={reducer.combatPreroll}
              onChange={() => {
                dispatchReducer(kCombatPreroll())
              }}
              onBlur={() => { updateKard() }}
            />
            <label htmlFor={'combatPreroll' + ongoing + ident}>Use before rolling</label>
        
            <input
              type='checkbox'
              id={'combatPostroll' + ongoing + ident}
              checked={reducer.combatPostroll}
              onChange={() => {
                dispatchReducer(kCombatPostroll())
              }}
              onBlur={() => { updateKard() }}
            />
            <label htmlFor={'combatPostroll' + ongoing + ident}>Use after rolling</label>
          </div>
        
        }
        
        <div className="kostcoFlexContainer">
          <input
            type='checkbox'
            id={'actionToken' + ongoing + ident}
            checked={reducer.actionToken}
            onChange={() => {
              dispatchReducer(kostcoActionToken())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'actionToken' + ongoing + ident}>Action Tokens</label>
        
          <input
            type='checkbox'
            id={'assist' + ongoing + ident}
            checked={reducer.assist}
            onChange={() => {
              dispatchReducer(kostcoAssist())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'assist' + ongoing + ident}>Assistance</label>
        
        </div>
        
        
        <div className="kostcoFlexContainer">
        
          <input
            type='checkbox'
            id={'health' + ongoing + ident}
            checked={reducer.health}
            onChange={() => {
              dispatchReducer(kostcoHealth())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={'health' + ongoing + ident}>Affects Health</label>
        
          <input
            type='checkbox'
            id={'addStrength' + ongoing + ident}
            checked={reducer.addStrength}
            onChange={() => {
              dispatchReducer(kostcoAddStrength())
            }}
            onBlur={() => { updateKard() }}
          />
          <label htmlFor={"addStrength" + ongoing + ident}>Adds Strength</label>
        </div>
        
        {
          (reducer.addStrength || reducer.health) &&
          <div className="kostcoFlexContainer">
            <label htmlFor={'healthValue' + ongoing + ident}>Health Modifier</label>
            <input
              className="kostcoNumberEntry"
              id={'healthValue' + ongoing + ident}
              type='number'
              value={reducer.healthValue}
              onChange={(e) => {
                dispatchReducer(kHealthValue(e.target.value))
              }}
              onBlur={() => { updateKard() }}
            />
        
            <label htmlFor={'strengthValue' + ongoing + ident}>Strength Modifier</label>
            <input
              className="kostcoNumberEntry"
              id={'strengthValue' + ongoing + ident}
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
      }


    </div>
  )
}

export default KostcoFlags

// {(reducer.actionToken || reducer.assist) &&
//   <div className="kostcoFlexContainer">
//     <input
//       type='checkbox'
//       id=''
//     />
//   </div>
// }

// <div>

// <div className="kostcoFlexContainer">
//   <input
//     type='checkbox'
//     id={'magic' + ongoing + ident}
//     checked={reducer.magic}
//     onChange={() => {
//       dispatchReducer(kostcoMagic())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={"magic" + ongoing + ident}>Magic</label>

//   <input
//     type='checkbox'
//     id={'monster' + ongoing + ident}
//     checked={reducer.monster}
//     onChange={() => {
//       dispatchReducer(kostcoMonster())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'monster' + ongoing + ident}>Monster</label>

//   <input
//     type='checkbox'
//     id={'spooky' + ongoing + ident}
//     checked={reducer.spooky}
//     onChange={() => {
//       dispatchReducer(kostcoSpooky())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'spooky' + ongoing + ident}>Spooky</label>

//   <input
//     type='checkbox'
//     id={'trap' + ongoing + ident}
//     checked={reducer.trap}
//     onChange={() => {
//       dispatchReducer(kostcoTrap())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'trap' + ongoing + ident}>Trap</label>
// </div>

// <div className="kostcoFlexContainer">
//   <input
//     type='checkbox'
//     id={'reroll' + ongoing + ident}
//     checked={reducer.reroll}
//     onChange={() => {
//       dispatchReducer(kostcoReroll())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'reroll' + ongoing + ident}>Reroll</label>

//   <input
//     type='checkbox'
//     id={'critRoll' + ongoing + ident}
//     checked={reducer.critRoll}
//     onChange={() => {
//       dispatchReducer(kostcoCritRoll())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'critRoll' + ongoing + ident}>Critical Hit</label>

// </div>

// <div className="kostcoFlexContainer">
//   <input
//     type='checkbox'
//     id={'targetSelf' + ongoing + ident}
//     checked={reducer.targetSelf}
//     onChange={() => {
//       dispatchReducer(kostcoTargetSelf())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'targetSelf' + ongoing + ident}>Target Self</label>

//   <input
//     type='checkbox'
//     id={'targetOther' + ongoing + ident}
//     checked={reducer.targetOther}
//     onChange={() => {
//       dispatchReducer(kostcoTargetOther())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'targetOther' + ongoing + ident}>Target Other</label>
// </div>

// <div className="kostcoFlexContainer">
//   <input
//     type='checkbox'
//     id={'combat' + ongoing + ident}
//     checked={reducer.combat}
//     onChange={() => {
//       dispatchReducer(kostcoCombat())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={"combat" + ongoing + ident}>Combat</label>

//   <input
//     type='checkbox'
//     id={'turnEnd' + ongoing + ident}
//     checked={reducer.turnEnd}
//     onChange={() => {
//       dispatchReducer(kostcoTurnEnd())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'turnEnd' + ongoing + ident}>Turn End</label>

//   <input
//     type='checkbox'
//     id={'anyTime' + ongoing + ident}
//     checked={reducer.anyTime}
//     onChange={() => {
//       dispatchReducer(kostcoAnyTime())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'anyTime' + ongoing + ident}>Any Time</label>
// </div>

// {
//   (reducer.combat) &&
//   <div className="kostcoFlexContainer">
//     <input
//       type='checkbox'
//       id={'combatPreroll' + ongoing + ident}
//       checked={reducer.combatPreroll}
//       onChange={() => {
//         dispatchReducer(kCombatPreroll())
//       }}
//       onBlur={() => { updateKard() }}
//     />
//     <label htmlFor={'combatPreroll' + ongoing + ident}>Use before rolling</label>

//     <input
//       type='checkbox'
//       id={'combatPostroll' + ongoing + ident}
//       checked={reducer.combatPostroll}
//       onChange={() => {
//         dispatchReducer(kCombatPostroll())
//       }}
//       onBlur={() => { updateKard() }}
//     />
//     <label htmlFor={'combatPostroll' + ongoing + ident}>Use after rolling</label>
//   </div>

// }

// <div className="kostcoFlexContainer">
//   <input
//     type='checkbox'
//     id={'actionToken' + ongoing + ident}
//     checked={reducer.actionToken}
//     onChange={() => {
//       dispatchReducer(kostcoActionToken())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'actionToken' + ongoing + ident}>Action Tokens</label>

//   <input
//     type='checkbox'
//     id={'assist' + ongoing + ident}
//     checked={reducer.assist}
//     onChange={() => {
//       dispatchReducer(kostcoAssist())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'assist' + ongoing + ident}>Assistance</label>

// </div>


// <div className="kostcoFlexContainer">

//   <input
//     type='checkbox'
//     id={'health' + ongoing + ident}
//     checked={reducer.health}
//     onChange={() => {
//       dispatchReducer(kostcoHealth())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={'health' + ongoing + ident}>Affects Health</label>

//   <input
//     type='checkbox'
//     id={'addStrength' + ongoing + ident}
//     checked={reducer.addStrength}
//     onChange={() => {
//       dispatchReducer(kostcoAddStrength())
//     }}
//     onBlur={() => { updateKard() }}
//   />
//   <label htmlFor={"addStrength" + ongoing + ident}>Adds Strength</label>
// </div>

// {
//   (reducer.addStrength || reducer.health) &&
//   <div className="kostcoFlexContainer">
//     <label htmlFor={'healthValue' + ongoing + ident}>Health Modifier</label>
//     <input
//       className="kostcoNumberEntry"
//       id={'healthValue' + ongoing + ident}
//       type='number'
//       value={reducer.healthValue}
//       onChange={(e) => {
//         dispatchReducer(kHealthValue(e.target.value))
//       }}
//       onBlur={() => { updateKard() }}
//     />

//     <label htmlFor={'strengthValue' + ongoing + ident}>Strength Modifier</label>
//     <input
//       className="kostcoNumberEntry"
//       id={'strengthValue' + ongoing + ident}
//       type='number'
//       value={reducer.strengthValue}
//       onChange={(e) => {
//         dispatchReducer(kStrengthValue(e.target.value))
//       }}
//       onBlur={() => { updateKard() }}
//     />
//   </div>
// }
// </div>