import React from "react";

const ActiveGame = ({ gameState, dispatchGameState }) => {

    return (
        <div>
            This is the active game screen
            <div>Villain Code: {gameState.challengesObject.villainCode}</div>
            <div>Relic Code: {gameState.challengesObject.relicCode}</div>
            <div>Location Code: {gameState.challengesObject.locationCode}</div>
            <div>Class List: {gameState.classList}</div>

            <div>Game ID: {gameState.gameID}</div>
            <div>Host: {gameState.host}</div>
            <div>Key: {gameState.key}</div>
            <div>Surprises: {gameState.surprises}</div>
            <div>Villain Progress: {gameState.progress.villain}</div>
            <div>Relic Progress: {gameState.progress.relic}</div>
            <div>Location Progress: {gameState.progress.location}</div>
            <div>Ready state: {gameState.ready}</div>
            <div>Ready list: {gameState.readyList}</div>
            <div>Team Health: {gameState.teamHealth}</div>
            {gameState.playerList.forEach((playerObject) => {
                <div>Player Object: {playerObject.currentCharacterID}, {playerObject.uid}</div>
            })}
        </div>
    )
}

export { ActiveGame as default }

// {gameState.classStorage.forEach((classNumber) => {
//     <div>Class Storage: {classNumber} </div>
// })}