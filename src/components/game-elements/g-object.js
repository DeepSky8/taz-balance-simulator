import { shuffle } from '../functions'
import { Villain } from '../mission-elements/m-villain'
import { Relic } from '../mission-elements/m-relic'
import { Location } from '../mission-elements/m-location'

class TAZGame {
    constructor(missionObject, players) {
        // Mission object selects 3 elements (Villain, Relic, Location)
        this.villain = new Villain(missionObject.villainNumber)
        this.relic = new Relic(missionObject.relicNumber)
        this.location = new Location(missionObject.locationNumber)
        // Players object contains minimum of 2 players, maximum of 5
        this.playerArray = this.setCharTurnOrder(shuffle(players))
        this.teamHealth = this.setTeamStartHealth(this.playerArray.length)
        this.teamAssist = undefined
    }

    // Check ascending player order for boolean .turnComplete
    // If all turns are complete, reset all flags and start with first player
    // Else return the next player in the turn order
    get activePlayer() {
        this._activePlayer = this.playerArray[0]
        const playerIndex = this.playerArray.findIndex(player => !player.turnComplete)
        if (playerIndex === -1) {
            this.playerArray.forEach(player => {
                player.turnComplete = false
            })
        } else {
            this._activePlayer = this.playerArray[playerIndex]
        }
        return this._activePlayer
    }

    // Randomly select turn order, ensuring that Party Leader goes first
    setCharTurnOrder(shuffled) {
        const turnOrder = []
        // Party Leader (if selected) is added to the array
        shuffled.forEach(player => {
            player.partyLeader ? turnOrder.push(player) : []
        })
        // All non-Party Leader players are added to the array
        shuffled.forEach(player => {
            turnOrder.includes(player) ? [] : turnOrder.push(player)
        })
        // Party is shuffled
        return turnOrder
    }

    setTeamStartHealth(numberPlayers) {
        if (numberPlayers > 3) { return 10 }
        if (numberPlayers === 3) { return 12 }
        if (numberPlayers < 3) { return 14 }
    }

    // End Bracket
}

export { TAZGame as default }