import React from "react";
import { NavLink } from "react-router-dom";

const CharNav = ({ cloudState, localState }) => {

  const gameBoard = {
    uid: 'Gameboard',
    charName: 'Gameboard',
    currentCharacterID: ''
  }

  const mission = {
    uid: 'Mission',
    charName: 'Mission',
    currentCharacterID: ''
  }

  const tabs = [
    gameBoard,
    ...cloudState.playerList,
    mission,
  ]

  return (
    <div>

      <nav>

        {tabs.map((element) => {
          return (
            <NavLink
              key={element.uid}
              to={
                element.charName + '/' + element.currentCharacterID
                // (
                //   element.uid === gameBoard.uid
                //     ?
                //     ''
                //     :
                //     ("/" + element.currentCharacterID)
                // )
              }
              className={({ isActive }) =>
              (`${isActive
                ?
                "nav-link-selected"
                :
                'nav-link'}${element.currentCharacterID === localState.activeCharacterID
                  ?
                  '-currentTurn'
                  :
                  ""}`
              )
              }
            >
              | {element.charName} |
            </NavLink>
          )
        })}
      </nav>

    </div>
  )
}

export default CharNav