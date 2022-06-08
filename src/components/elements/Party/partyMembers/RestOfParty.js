import React from "react";
import PartyMember from './PartyMember';

const RestOfParty = ({ gameState }) => {
    
    return (
        <div>
            {gameState.playerList.map(user => {
                return <PartyMember
                    key={user.uid}
                    uid={user.uid}
                    charID={user.currentCharacterID}
                    hostID={gameState.host}
                />
            })}

        </div>
    )
}

export default RestOfParty


