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
  kDamageValue,
  kSpecial,
  kSwitcharoo,
  kSafetyHarness,
  kGiantSlayer,
  kPocketSpa,
  kFannypack,
  kRingGreed,
  kStevenGoldfish,
  kFlaregun,
  kProngles,
  kCrit50,
  kRingRecall,
  kSlippiesHaste,
  kBurnsideburns,
  kChampionBelt,
  kNitPicker
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
  const byAdding = '_by adding: '
  const newKard = 'new'
  const searchKard = 'search'
  const g = 'g'
  const t = 't'
  return (


    <div>
      {!reducer.special &&

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
            (ident !== 'search' && (reducer.strength || reducer.health)) &&
            <div className="kostcoFlexContainer">
              <label htmlFor={'healthValue' + flagType + ident}>Health Mod:</label>
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

              <label htmlFor={'strengthValue' + flagType + ident}>Strength Mod:</label>
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

      }

      {reducer.special &&

        <div>
          {flagType === g &&

            <div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'burnsideburns' + flagType + ident}
                  checked={reducer.burnsideburns}
                  onChange={() => {
                    dispatchReducer(kBurnsideburns(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'burnsideburns' + flagType + ident}>Burnside's Sideburns</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'championBelt' + flagType + ident}
                  checked={reducer.championBelt}
                  onChange={() => {
                    dispatchReducer(kChampionBelt(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'championBelt' + flagType + ident}>Champion's Belt</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'fannypack' + flagType + ident}
                  checked={reducer.fannypack}
                  onChange={() => {
                    dispatchReducer(kFannypack(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'fannypack' + flagType + ident}>Fannypack of Holding</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'nitPicker' + flagType + ident}
                  checked={reducer.nitPicker}
                  onChange={() => {
                    dispatchReducer(kNitPicker(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'nitPicker' + flagType + ident}>Nit-Picker</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'pocketSpa' + flagType + ident}
                  checked={reducer.pocketSpa}
                  onChange={() => {
                    dispatchReducer(kPocketSpa(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'pocketSpa' + flagType + ident}>Pocket Spa</label>
              </div>



              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'ringGreed' + flagType + ident}
                  checked={reducer.ringGreed}
                  onChange={() => {
                    dispatchReducer(kRingGreed(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'ringGreed' + flagType + ident}>Ring of Greed</label>
              </div>



              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'giantSlayer' + flagType + ident}
                  checked={reducer.giantSlayer}
                  onChange={() => {
                    dispatchReducer(kGiantSlayer(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'giantSlayer' + flagType + ident}>Ring of the Giant Slayer</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'safetyHarness' + flagType + ident}
                  checked={reducer.safetyHarness}
                  onChange={() => {
                    dispatchReducer(kSafetyHarness(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'safetyHarness' + flagType + ident}>Safety Harness</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'slippiesHaste' + flagType + ident}
                  checked={reducer.slippiesHaste}
                  onChange={() => {
                    dispatchReducer(kSlippiesHaste(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'slippiesHaste' + flagType + ident}>Slippies of Haste</label>
              </div>


              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'stevenGoldfish' + flagType + ident}
                  checked={reducer.stevenGoldfish}
                  onChange={() => {
                    dispatchReducer(kStevenGoldfish(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'stevenGoldfish' + flagType + ident}>Steven the Goldfish</label>
              </div>


              <div className="kostcoFlexContainer">

                <input
                  type='checkbox'
                  id={'switcharoo' + flagType + ident}
                  checked={reducer.switcharoo}
                  onChange={() => {
                    dispatchReducer(kSwitcharoo(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'switcharoo' + flagType + ident}>Wand of Switcharoo</label>

              </div>

            </div>



          }


          {flagType === t &&

            <div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'crit50' + flagType + ident}
                  checked={reducer.crit50}
                  onChange={() => {
                    dispatchReducer(kCrit50(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'crit50' + flagType + ident}>All or Nothing Coin</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'flaregun' + flagType + ident}
                  checked={reducer.flaregun}
                  onChange={() => {
                    dispatchReducer(kFlaregun(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'flaregun' + flagType + ident}>Flaregun of the Fearless</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'prongles' + flagType + ident}
                  checked={reducer.prongles}
                  onChange={() => {
                    dispatchReducer(kProngles(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'prongles' + flagType + ident}>Hyper-Caffeinated Prongles</label>
              </div>

              <div className="kostcoFlexContainer">
                <input
                  type='checkbox'
                  id={'ringRecall' + flagType + ident}
                  checked={reducer.ringRecall}
                  onChange={() => {
                    dispatchReducer(kRingRecall(flagType))
                  }}
                  onBlur={() => { updateKard() }}
                />
                <label htmlFor={'ringRecall' + flagType + ident}>Ring of Recall</label>
              </div>

            </div>

          }
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


// <label htmlFor={'special' + flagType + ident}>One-off Kostco cards</label>
// <input
//   id={'special' + flagType + ident}
//   type='checkbox'
//   value={reducer.special}
//   onChange={() => {
//     dispatchReducer(kSpecial(flagType))
//   }}
//   onBlur={() => { updateKard() }}
// />