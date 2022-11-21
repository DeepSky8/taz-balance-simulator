import React from "react";
import {
  kCombatPreroll,
  kHealthValue,
  kActionToken,
  kStrength,
  kAnyTime,
  kAssist,
  kCombat,
  kHealth,
  kMagic,
  kMonster,
  kReroll,
  kCritRoll,
  kSpooky,
  kTargetOther,
  kTargetSelf,
  kTrap,
  kTurnEnd,
  kStrengthValue,
  kCombatPostroll,
  kAssistExtra,
  kAssistValue,
  kDamage,
  kDamageValue
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
  const modifyDamage = 'Modify damage '
  const byAdding = ' by adding: '
  const newKard = 'new'
  const searchKard = 'search'
  return (


    <div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'magic' + flagType + ident}
          checked={reducer.magic}
          onChange={() => {
            dispatchReducer(kMagic(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"magic" + flagType + ident}>Magic</label>

        <input
          type='checkbox'
          id={'monster' + flagType + ident}
          checked={reducer.monster}
          onChange={() => {
            dispatchReducer(kMonster(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'monster' + flagType + ident}>Monster</label>

        <input
          type='checkbox'
          id={'spooky' + flagType + ident}
          checked={reducer.spooky}
          onChange={() => {
            dispatchReducer(kSpooky(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'spooky' + flagType + ident}>Spooky</label>

        <input
          type='checkbox'
          id={'trap' + flagType + ident}
          checked={reducer.trap}
          onChange={() => {
            dispatchReducer(kTrap(flagType))
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
            dispatchReducer(kReroll(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'reroll' + flagType + ident}>Reroll</label>

        <input
          type='checkbox'
          id={'critRoll' + flagType + ident}
          checked={reducer.critRoll}
          onChange={() => {
            dispatchReducer(kCritRoll(flagType))
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
            dispatchReducer(kTargetSelf(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'targetSelf' + flagType + ident}>Own Turn/Self</label>

        <input
          type='checkbox'
          id={'targetOther' + flagType + ident}
          checked={reducer.targetOther}
          onChange={() => {
            dispatchReducer(kTargetOther(flagType))
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
            dispatchReducer(kCombat(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={"combat" + flagType + ident}>Combat</label>

        <input
          type='checkbox'
          id={'turnEnd' + flagType + ident}
          checked={reducer.turnEnd}
          onChange={() => {
            dispatchReducer(kTurnEnd(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'turnEnd' + flagType + ident}>Turn End</label>

        <input
          type='checkbox'
          id={'anyTime' + flagType + ident}
          checked={reducer.anyTime}
          onChange={() => {
            dispatchReducer(kAnyTime(flagType))
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
            dispatchReducer(kActionToken(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'actionToken' + flagType + ident}>Requires Action Token</label>



      </div>

      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'assist' + flagType + ident}
          checked={reducer.assist}
          onChange={() => {
            dispatchReducer(kAssist(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'assist' + flagType + ident}>Assist Related</label>

        {(reducer.assist && flagType === 'g') &&
          <span>

            <input
              type='checkbox'
              id={'assistExtra' + flagType + ident}
              checked={reducer.assistExtra}
              onChange={() => {
                dispatchReducer(kAssistExtra(flagType))
              }}
              onBlur={() => { updateKard() }}
            />
            <label htmlFor={'assistExtra' + flagType + ident}>Extra Assist: </label>

            <input
              className="kostcoNumberEntry"
              id={'assistValue' + flagType + ident}
              type='number'
              value={reducer.assistValue}
              onChange={(e) => {
                dispatchReducer(kAssistValue(parseInt(e.target.value), flagType))
              }}
              onBlur={() => { updateKard() }}
            />


          </span>
        }

      </div>


      <div className="kostcoFlexContainer">
        <input
          type='checkbox'
          id={'damage' + flagType + ident}
          checked={reducer.damage}
          onChange={() => {
            dispatchReducer(kDamage(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'damage' + flagType + ident}>{modifyDamage} </label>

        {(reducer.damage && ident !== searchKard) &&
          <span>
            <label htmlFor={'damageValue' + flagType + ident}> {byAdding}</label>
            <input
              className="kostcoNumberEntry"
              id={'damageValue' + flagType + ident}
              type='number'
              value={reducer.damageValue}
              onChange={(e) => {
                dispatchReducer(kDamageValue(parseInt(e.target.value), flagType))
              }}
              onBlur={() => { updateKard() }}
            />
          </span>
        }

      </div>




      <div className="kostcoFlexContainer">

        <input
          type='checkbox'
          id={'health' + flagType + ident}
          checked={reducer.health}
          onChange={() => {
            dispatchReducer(kHealth(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'health' + flagType + ident}>Modifies Health</label>

        <input
          type='checkbox'
          id={'strength' + flagType + ident}
          checked={reducer.strength}
          onChange={() => {
            dispatchReducer(kStrength(flagType))
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
              dispatchReducer(kHealthValue(parseInt(e.target.value), flagType))
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
              dispatchReducer(kStrengthValue(parseInt(e.target.value), flagType))
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