import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import {
    startNullReadyList,
    startRESETActionTokens,
    startSetActivePlayer,
    startUpdateActiveLocation,
    startUpdateActiveRelic,
    startUpdateActiveVillain,
    startUpdateBriefingStage,
    startUpdateTotalStrength,
    startUpdateGameStage,
    startUpdateTurnStage,
    startUploadDeckCard,
    updateActionTokenList,
    updateActiveTokensList,
    updateAssistTokensList,
    updateBackstory,
    updateCurrentTurn,
    updateGameActive,
    updateGameStatic,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus,
    updateStrength,
    clearStrength,
    startSetCharacterStrength,
    startSetReadyTrue,
} from "../../../actions/cloudActions";
import { auth, db } from "../../../firebase/firebase";
import { defaultCloudState, cloudReducer } from "../../../reducers/cloudReducer";
import incrementStage from "../../functions/incrementStage";
import incrementTurn from "../../functions/incrementTurn";
import { briefingStagesArray } from "./briefingStage/briefingStagesArray";
import challengeDeck from "../../functions/challengeDeck";
import ActiveGameRouter from "../../../routers/ActiveGameRouter";
import {
    clearActiveCharacter,
    clearCurrentChallenge,
    updateActiveCharacter,
    updateCurrentChallenge,
    updateLocalCharacterID,
    updateHostKey,
    updateLocalCharacter,
    updateCurrentChallengeKey,
    updateUncompletedChallengesVillain,
    updateCompletedChallengesVillain,
    updateUncompletedChallengesRelic,
    updateCompletedChallengesRelic,
    updateUncompletedChallengesLocation,
    updateCompletedChallengesLocation,
} from "../../../actions/localActions";
import { defaultLocalState, localStateReducer } from "../../../reducers/localReducer";
import { stats } from "../CharacterSheet/classes/charInfo";
import { gameStageArray, introStages } from "../ActiveGame/gameStage/gameStageArray";


const ActiveGame = () => {
    let navigate = useNavigate()

    const [cloudState, dispatchCloudState] = useReducer(cloudReducer, defaultCloudState)
    const [localState, dispatchLocalState] = useReducer(localStateReducer, defaultLocalState)


    // State guards
    useEffect(() => {
        // If the current user is the game host
        if (auth.currentUser.uid === cloudState.static.host) {

            // If no gameStage exists, set it to the default
            if (cloudState.active.gameStage === undefined) {
                startUpdateGameStage(
                    cloudState.static.host,
                    cloudState.static.key,
                    incrementStage('default')
                )
            }

            // If no backstory state exists, set it to the first one
            if (cloudState.backstory.briefingStage === undefined) {
                startUpdateBriefingStage(
                    localState.hostKey,
                    briefingStagesArray[0]
                )
            }

            // If no turnStage exists, set it to the default
            if (cloudState.currentTurn.turnStage === undefined) {
                startUpdateTurnStage(
                    cloudState.static.host,
                    cloudState.static.key,
                    incrementTurn('default')
                )
            }

        }
    }, [cloudState])

    // User listener, updated a single time:
    // Current Game: host and key
    // Current Character ID (localState.localCharacterID from User.currentCharacterID)
    useEffect(() => {
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/currentGame'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchLocalState(updateHostKey(snapshot.val()))
                } else {
                    navigate('/')
                }
            }, {
            onlyOnce: true
        })

        onValue(ref(db, 'users/' + auth.currentUser.uid + '/currentCharacterID'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchLocalState(updateLocalCharacterID(snapshot.val()))
                } else {
                    navigate('/gameSetup')
                }
            }, {
            onlyOnce: true
        })
        return () => {
            off(ref(db, 'users/' + auth.currentUser.uid + '/currentGame'))
            off(ref(db, 'users/' + auth.currentUser.uid + '/currentCharacterID'))
        }
    }, [])


    // CloudState listeners
    // Updated a single time: static, playerList
    // Not updated: classList
    useEffect(() => {
        // Single-time Static listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/static'),
            (snapshot) => {
                if (snapshot.exists()) {
                    // If cloudState static items exists at this address, sync the local cloudState
                    dispatchCloudState(updateGameStatic(snapshot.val()))
                } else if (auth.currentUser.uid !== null) {
                    // If a cloudState doesn't exist, but there IS a user signed in
                    // navigate to the gameSetup
                    navigate('/gameSetup')
                } else {
                    // If there is not a user signed in, navigate to the main welcome screen
                    navigate('/')
                }
            }, {
            onlyOnce: true
        })

        // Single-time playerList listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/playerList'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const playerList = [];
                    snapshot.forEach((player) => {
                        playerList.push(player.val())
                    })
                    dispatchCloudState(updatePlayerList(playerList))
                } else {

                }
            }, {
            onlyOnce: true
        })

        // Ongoing Active listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/active'),
            (snapshot) => {
                if (snapshot.exists()) {
                    // If cloudState progress object exists at this address, sync the local cloudState
                    dispatchCloudState(updateGameActive(snapshot.val()))
                } else if (auth.currentUser.uid !== null) {
                    // If a cloudState doesn't exist, but there IS a user signed in
                    // navigate to the gameSetup
                    navigate('/gameSetup')
                } else {
                    // If there is not a user signed in, navigate to the main welcome screen
                    navigate('/')
                }
            })

        // Ongoing readyList listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/readyList'),
            (snapshot) => {
                const readyList = []
                if (snapshot.exists()) {
                    snapshot.forEach((readyPlayer) => {
                        readyList.push(readyPlayer.val())
                    })
                }
                // else {
                //     dispatchCloudState(clearActivePlayer())
                // }
                dispatchCloudState(updateReadyList(readyList))
            })

        // Ongoing backstory listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/backstory'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchCloudState(updateBackstory(snapshot.val()))
                }

            })

        // Ongoing currentTurn listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/currentTurn'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchCloudState(updateCurrentTurn(snapshot.val()))
                    // console.log('currentTurn contents', snapshot.val())
                }

            })

        // Ongoing hasActionToken listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/hasActionToken'),
            (snapshot) => {
                const actionTokenList = []
                if (snapshot.exists()) {
                    snapshot.forEach((hasTokenPlayer) => {
                        actionTokenList.push(hasTokenPlayer.val())
                    })
                }
                dispatchCloudState(updateActionTokenList(actionTokenList))
            })

        // Ongoing activeActionTokens listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/activeActionTokens'),
            (snapshot) => {
                const actionTokenList = []
                if (snapshot.exists()) {
                    snapshot.forEach((activeTokenPlayer) => {
                        actionTokenList.push(activeTokenPlayer.val())
                    })
                }
                dispatchCloudState(updateActiveTokensList(actionTokenList))
            })

        // Ongoing activeAssistTokens listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/activeAssistTokens'),
            (snapshot) => {
                const assistTokenList = []
                if (snapshot.exists()) {
                    snapshot.forEach((assistTokenPlayer) => {
                        assistTokenList.push(assistTokenPlayer.val())
                    })
                }
                dispatchCloudState(updateAssistTokensList(assistTokenList))
            })

        // Ongoing Strength listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/strength'),
            (snapshot) => {

                if (snapshot.exists()) {
                    dispatchCloudState(updateStrength(snapshot.val()))
                } else {
                    dispatchCloudState(clearStrength())
                }

            })

        return () => {
            off(ref(db, 'savedGames/' + localState.hostKey + '/static'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/active'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/playerList'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/readyList'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/backstory'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/currentTurn'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/hasActionToken'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/activeActionTokens'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/activeAssistTokens'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/strength'))
        }

    }, [localState.hostKey])

    // Ongoing local character listener
    useEffect(() => {
        if (localState.localCharacterID !== '') {
            onValue(ref(db, 'characters/' + auth.currentUser.uid + '/' + localState.localCharacterID),
                (snapshot) => {
                    if (snapshot.exists()) {
                        dispatchLocalState(updateLocalCharacter(snapshot.val()))
                    }
                })
        }

        return () => {
            if (localState.localCharacterID !== '') {
                off(ref(db, 'characters/' + auth.currentUser.uid + '/' + localState.localCharacterID))
            }
        }
    }, [localState.localCharacterID])

    // Compares the UIDs on the readyList with the list of players in the game
    // The next player in the playerList who isn't on the readyList is set as the activePlayer
    useEffect(() => {
        if (auth.currentUser.uid === cloudState.static.host) {
            const remainingPlayers = []
            cloudState.playerList.forEach(player => {
                if (!cloudState.readyList.includes(player.uid)) {
                    remainingPlayers.push(player)
                }
            })
            if (remainingPlayers.length > 0) {
                startSetActivePlayer(localState.hostKey, remainingPlayers[0].uid, remainingPlayers[0].currentCharacterID)
            }
        }

    }, [cloudState.readyList])

    // Listener for remote activePlayer on cloudState
    useEffect(() => {
        if (cloudState.active.activeUID &&
            (cloudState.active.activeUID !== auth.currentUser.uid)
        ) {
            dispatchLocalState(clearActiveCharacter())

            // If the current Active Player is not the local player, 
            // establish a listener for the duration of their turn
            onValue(ref(db, 'characters/' + cloudState.active.activeUID + '/' + cloudState.active.activeCharID),
                (snapshot) => {
                    if (snapshot.exists()) {
                        dispatchLocalState(updateActiveCharacter(snapshot.val()))
                    }
                })
        }

        return () => {
            if (cloudState.active.activeUID && cloudState.active.activeUID !== auth.currentUser.uid) {
                cloudState.playerList.forEach((player) => {
                    off(ref(db, 'characters/' + player.uid + '/' + player.currentCharacterID))
                })
            }
        }
    }, [cloudState.active.activeUID])

    // If activePlayer is the local player
    // mirror the localChar state into the activeCharacterObject
    useEffect(() => {
        if (cloudState.active.activeCharID &&
            (cloudState.active.activeCharID === localState.localCharacterID)
        ) {
            dispatchLocalState(clearActiveCharacter())
            dispatchLocalState(updateActiveCharacter(localState.localCharacter))
        }

    }, [cloudState.active.activeCharID, localState.localCharacterID, localState.localCharacter])

    const calcDisAdvantage = (advantage, disadvantage, rollOne, rollTwo) => {
        let rollResult = 0
        if (rollOne) { rollResult = rollOne }
        if (advantage && rollTwo) {
            rollResult = (rollOne > rollTwo ? rollOne : rollTwo)
        }
        if (disadvantage && rollTwo) {
            rollResult = (rollOne < rollTwo ? rollOne : rollTwo)
        }
        return rollResult
    }

    // Calculate current active player strength 
    // taking into effect current challenge, 
    // any effects that add to strength,
    // and dice rolls
    // and send to cloud
    // This effect is run by the active player
    useEffect(() => {
        if (
            auth.currentUser.uid === cloudState.active.activeUID
            &&
            cloudState.active.gameStage === gameStageArray[3]
        ) {

            // Does the current challenge have any specific challenge types?
            const currentChallengeTypes = [];
            if (localState.currentChallenge.monster) { currentChallengeTypes.push('Monster') }
            if (localState.currentChallenge.spooky) { currentChallengeTypes.push('Spooky') }
            if (localState.currentChallenge.magic) { currentChallengeTypes.push('Magic') }
            if (localState.currentChallenge.trap) { currentChallengeTypes.push('Trap') }
            if (cloudState.currentTurn.selectedChallenge === 'relic') { currentChallengeTypes.push('Relic') }

            // Get the strength info from the active character
            let baseStrength = 0;
            let specialStrength = 0;
            let specialTarget = '';
            if (localState.activeCharacter.charName) {
                baseStrength = stats[localState.activeCharacter.classCode].strength;
                specialStrength = stats[localState.activeCharacter.classCode].specialStrength;
                specialTarget = stats[localState.activeCharacter.classCode].specialTarget
            }

            // If the active character is extra strong against the current challenge
            // use their special strength instead of base strength
            const characterStrength = currentChallengeTypes.includes(specialTarget) ?
                (specialStrength)
                :
                (baseStrength);

            // Destructure current assistive strength elements
            // and total them up
            const { actionWarrior, actionWizard, assistOne, assistTwo, ongoingItem, singleUseItem, story } = cloudState.strength
            const totalAddStrength = actionWarrior + actionWizard + assistOne + assistTwo + ongoingItem + singleUseItem + story

            // Destructure the roll data, as well as whether the current challenge requires
            // advantage/disadvantage
            const { rollOne, rollTwo } = cloudState.currentTurn
            const { advantage, disadvantage } = localState.currentChallenge

            // Based on dis/advantage and the presence/lack of rolls, 
            // calculate the final roll result
            const rollResult = calcDisAdvantage(advantage, disadvantage, rollOne, rollTwo)

            // Total everything together and send it to the cloud
            const totalUpdatedStrength = characterStrength + totalAddStrength + rollResult


            if (localState.hostKey) {
                startSetCharacterStrength(localState.hostKey, characterStrength)
                startUpdateTotalStrength(localState.hostKey, totalUpdatedStrength)

            }
        }
    },
        [
            localState.currentChallenge,
            localState.activeCharacter,
            cloudState.strength,
            cloudState.currentTurn.rollOne,
            cloudState.currentTurn.rollTwo
        ])


    const incrementGameStage = () => {
        startUpdateGameStage(localState.hostKey, incrementStage(cloudState.active.gameStage))
        dispatchCloudState(updateReadyStatus(false))
    }

    // Triggered by Ready state and team health changes
    // evaluate the current stage of the game
    // and advance it when appropriate
    // useEffect(() => {
    //     if (auth.currentUser.uid === cloudState.static.host) {
    //         if (
    //             (introStages.includes(cloudState.active.gameStage)) &&
    //             cloudState.active.ready
    //         ) {
    //             incrementGameStage()
    //         } else if (
    //             (cloudState.active.teamHealth === 0) &&
    //             cloudState.active.ready
    //         ) {
    //             incrementGameStage()
    //         } else if (
    //             ((cloudState.active.progressRelic > 10) &&
    //                 (cloudState.active.progressVillain > 10 || cloudState.active.progressLocation > 10))
    //         ) {
    //             incrementGameStage()
    //         }
    //     }


    // }, [cloudState.active.ready, cloudState.active.teamHealth])

    // If the cloud-stored text indicating which challenge has been selected changes
    // or if the challenge which has been selected _itself_ changes
    // update the locally-stored challenge elements with current face
    useEffect(() => {
        if (cloudState.currentTurn.selectedChallenge !== '') {
            dispatchLocalState(
                updateCurrentChallenge(
                    cloudState.currentTurn
                    [
                    cloudState.currentTurn.selectedChallenge
                    ][
                    cloudState.currentTurn
                    [
                        cloudState.currentTurn.selectedChallenge
                    ].visible
                    ]
                )
            )
            dispatchLocalState(
                updateCurrentChallengeKey(
                    cloudState.currentTurn
                    [
                        cloudState.currentTurn.selectedChallenge
                    ].challengeKey
                )

            )
            // console.log('currentChallenge', cloudState.currentTurn[cloudState.currentTurn.selectedChallenge][cloudState.currentTurn[cloudState.currentTurn.selectedChallenge].visible])
        } else {
            dispatchLocalState(clearCurrentChallenge())
        }
    }, [cloudState.currentTurn.selectedChallenge, cloudState.currentTurn[cloudState.currentTurn.selectedChallenge]])

    // Navigate to activeGame pages
    // based on game stages completed
    useEffect(() => {
        switch (cloudState.active.gameStage) {
            case 'INTRO':
                navigate('introductions')
                break;
            case 'BRIEF':
                navigate('missionBriefing')
                break;
            case 'TRANSPORT':
                navigate('transport')
                setTimeout(() => {
                    startUpdateGameStage(
                        localState.hostKey,
                        incrementStage(cloudState.active.gameStage)
                    )
                }, 8000)
                break;
            case 'CHALLENGES':
                navigate('playing')
                break;
            case 'END':
                navigate('summary')
                break;
            case 'gameSetup':
                navigate('/gameSetup')
                break;
            default:
                break;
        }
    }, [cloudState.active.gameStage])

    // Only run if the tempUncompleteCards length is 1 or less
    const findFinale = (uncompleteArray, completeArray) => {

        const uncompleteIndex = uncompleteArray.findIndex((fullCard) => (fullCard.front.boss === true))
        const completeIndex = completeArray.findIndex((fullCard) => (fullCard.front.boss === true))

        if (uncompleteIndex >= 0) {
            return uncompleteArray[uncompleteIndex]
        } else if (completeIndex >= 0) {
            return completeArray[completeIndex]
        }
    }

    // Challenge deck listeners
    // This is only run on the host; the active challenges are pushed
    // to the cloud, as is the deck when deck creation is needed
    useEffect(() => {

        if (auth.currentUser.uid === cloudState.static.host) {
            // Villain challenge listener
            onValue(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeVillain),
                (snapshot) => {
                    if (snapshot.exists()) {
                        const tempUncompleteCards = [];
                        const tempCompleteCards = [];

                        snapshot.forEach((card) => {
                            if (!card.val().completed) {
                                tempUncompleteCards.push(card.val())
                            }
                            if (card.val().completed) {
                                tempCompleteCards.push(card.val())
                            }
                        })
                        if (tempUncompleteCards.length <= 1) {
                            startUpdateActiveVillain(
                                localState.hostKey,
                                findFinale(tempUncompleteCards, tempCompleteCards),
                                tempCompleteCards.length)

                        } else {
                            startUpdateActiveVillain(localState.hostKey, tempUncompleteCards[0], tempCompleteCards.length)
                        }
                        dispatchLocalState(updateUncompletedChallengesVillain(tempUncompleteCards))
                        dispatchLocalState(updateCompletedChallengesVillain(tempCompleteCards))

                        // If no Villain challenge deck exists
                        // the Host of the game creates a deck and uploads it
                    } else if (auth.currentUser.uid === cloudState.static.host) {

                        onValue(ref(db, 'challenges/' + cloudState.static.codeVillain),
                            (snapshot) => {
                                if (snapshot.exists()) {
                                    const uncombinedChallengesArray = [];
                                    snapshot.forEach((cardFace) => {
                                        uncombinedChallengesArray.push(cardFace.val())
                                    })

                                    const combinedChallengesArray = challengeDeck(
                                        cloudState.static.codeVillain,
                                        uncombinedChallengesArray
                                    )

                                    combinedChallengesArray.forEach((card) => {
                                        startUploadDeckCard(
                                            localState.hostKey,
                                            cloudState.static.codeVillain,

                                            card
                                        )
                                    })
                                }
                            }, {
                            onlyOnce: true
                        })
                    }
                })


            // Relic challenge listener
            onValue(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeRelic),
                (snapshot) => {

                    if (snapshot.exists()) {
                        const tempUncompleteCards = [];
                        const tempCompleteCards = [];

                        snapshot.forEach((card) => {
                            if (!card.val().completed) {
                                tempUncompleteCards.push(card.val())
                            }
                            if (card.val().completed) {
                                tempCompleteCards.push(card.val())
                            }
                        })
                        if (tempUncompleteCards.length <= 1) {
                            startUpdateActiveRelic(
                                localState.hostKey,
                                findFinale(tempUncompleteCards, tempCompleteCards),
                                tempCompleteCards.length)

                        } else {
                            startUpdateActiveRelic(localState.hostKey, tempUncompleteCards[0], tempCompleteCards.length)
                        }
                        dispatchLocalState(updateUncompletedChallengesRelic(tempUncompleteCards))
                        dispatchLocalState(updateCompletedChallengesRelic(tempCompleteCards))
                    } else if (auth.currentUser.uid === cloudState.static.host) {
                        onValue(ref(db, 'challenges/' + cloudState.static.codeRelic),
                            (snapshot) => {

                                if (snapshot.exists()) {
                                    const uncombinedChallengesArray = [];
                                    snapshot.forEach((cardFace) => {
                                        uncombinedChallengesArray.push(cardFace.val())
                                    })

                                    const combinedChallengesArray = challengeDeck(
                                        cloudState.static.codeRelic,
                                        uncombinedChallengesArray
                                    )

                                    combinedChallengesArray.forEach((card) => {
                                        startUploadDeckCard(
                                            localState.hostKey,
                                            cloudState.static.codeRelic,

                                            card
                                        )
                                    })
                                }
                            }, {
                            onlyOnce: true
                        })
                    }
                })


            // Location challenge listener
            onValue(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeLocation),
                (snapshot) => {
                    if (snapshot.exists()) {
                        const tempUncompleteCards = [];
                        const tempCompleteCards = [];

                        snapshot.forEach((card) => {
                            if (!card.val().completed) {
                                tempUncompleteCards.push(card.val())
                            }
                            if (card.val().completed) {
                                tempCompleteCards.push(card.val())
                            }
                        })
                        if (tempUncompleteCards.length <= 1) {
                            startUpdateActiveLocation(
                                localState.hostKey,
                                findFinale(tempUncompleteCards, tempCompleteCards),
                                tempCompleteCards.length)

                        } else {
                            startUpdateActiveLocation(localState.hostKey, tempUncompleteCards[0], tempCompleteCards.length)
                        }
                        dispatchLocalState(updateUncompletedChallengesLocation(tempUncompleteCards))
                        dispatchLocalState(updateCompletedChallengesLocation(tempCompleteCards))
                    } else if (auth.currentUser.uid === cloudState.static.host) {
                        onValue(ref(db, 'challenges/' + cloudState.static.codeLocation),
                            (snapshot) => {
                                if (snapshot.exists()) {
                                    const uncombinedChallengesArray = [];
                                    snapshot.forEach((cardFace) => {
                                        uncombinedChallengesArray.push(cardFace.val())
                                    })

                                    const combinedChallengesArray = challengeDeck(
                                        cloudState.static.codeLocation,
                                        uncombinedChallengesArray
                                    )

                                    combinedChallengesArray.forEach((card) => {
                                        startUploadDeckCard(
                                            localState.hostKey,
                                            cloudState.static.codeLocation,

                                            card
                                        )
                                    })
                                }
                            }, {
                            onlyOnce: true
                        })
                    }
                })
        }


        return () => {
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeVillain))
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeRelic))
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeLocation))
            if (auth.currentUser.uid === cloudState.static.host) {
                off(ref(db, 'challenges/' + cloudState.static.codeVillain))
                off(ref(db, 'challenges/' + cloudState.static.codeRelic))
                off(ref(db, 'challenges/' + cloudState.static.codeLocation))
            }
        }

    }, [localState.hostKey, cloudState.static])





    return (
        <div>
            <ActiveGameRouter
                cloudState={cloudState}
                localState={localState}
            />

        </div>
    )
}

export { ActiveGame as default }
