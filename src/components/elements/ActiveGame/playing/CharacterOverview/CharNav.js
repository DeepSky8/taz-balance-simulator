import React from "react";
import { NavLink } from "react-router-dom";

const CharNav = ({ cloudState, localState, children }) => {

  const gameBoard = {
    uid: cloudState.static.key,
    charName: 'Challenges'
  }

  const tabs = [
    gameBoard,
    ...cloudState.playerList
  ]

  return (
    <div>
      <nav>
        {tabs.map((element) => {
          return (
            <NavLink
              key={element.uid}
              to={element.charName}
              className={isActive =>
                (isActive ? "nav-link" : 'nav-link-unselected')}
            >
              {element.charName}
            </NavLink>
          )
        })}
      </nav>

    </div>
  )
}

export default CharNav