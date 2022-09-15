import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import {
    startNewRound,
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
    startAddStoryBonus,
} from "../../../actions/cloudActions";
import { auth, db } from "../../../firebase/firebase";
import { defaultCloudState, cloudReducer } from "../../../reducers/cloudReducer";
import incrementStage from "../../functions/incrementStage";
import incrementTurn from "../../functions/incrementTurn";
import { briefingStages } from "../../functions/briefingStages";
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
} from "../../../actions/localActions";
import { defaultLocalState, localStateReducer } from "../../../reducers/localReducer";
import { stats } from "../CharacterSheet/classes/charInfo";
import { isCompositeComponent } from "react-dom/test-utils";

const ActiveGame = () => {
    let navigate = useNavigate()

    const introStages = ['INTRO', 'BRIEF', 'BACKSTORY']
    const [cloudState, dispatchCloudState] = useReducer(cloudReducer, defaultCloudState)
    const [localState, dispatchLocalState] = useReducer(localStateReducer, defaultLocalState)


    // State guards
    useEffect(() => {
        // If the current user is the game host
        if (auth.currentUser.uid === localState.hostKey.split('/', 1)) {

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
                    cloudState.static.host,
                    cloudState.static.key,
                    briefingStages[0]
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

    // Challenge deck listeners
    useEffect(() => {
        // Villain challenge listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeVillain),
            (snapshot) => {
                if (snapshot.exists()) {
                    // console.log('snapshot', snapshot.val())

                    const tempUncompleteCards = [];
                    snapshot.forEach((card) => {
                        tempUncompleteCards.push(card.val())
                    })
                    // dispatchCurrentTurn(updateUncompletedVillain(tempUncompleteCards))
                    startUpdateActiveVillain(localState.hostKey, tempUncompleteCards[0])


                    // If no uncomplete Villain challenge deck exists
                    // the Host of the game creates a deck and uploads it
                } else if (auth.currentUser.uid === localState.hostKey.split('/', 1).toString()) {
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
                    snapshot.forEach((card) => {
                        tempUncompleteCards.push(card.val())
                    })
                    // dispatchCurrentTurn(updateUncompletedRelic(tempUncompleteCards))
                    startUpdateActiveRelic(localState.hostKey, tempUncompleteCards[0])
                } else if (auth.currentUser.uid === localState.hostKey.split('/', 1).toString()) {
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

            
        // Uncomplete Location challenge listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeLocation),
            (snapshot) => {
                if (snapshot.exists()) {
                    const tempUncompleteCards = [];
                    snapshot.forEach((card) => {
                        tempUncompleteCards.push(card.val())
                    })
                    // dispatchCurrentTurn(updateUncompletedLocation(tempUncompleteCards))
                    startUpdateActiveLocation(localState.hostKey, tempUncompleteCards[0])
                } else if (auth.currentUser.uid === localState.hostKey.split('/', 1).toString()) {
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

            

        return () => {
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeVillain))
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeRelic))
            off(ref(db, 'savedGames/' + localState.hostKey + '/challenges/' + cloudState.static.codeLocation))
            if (auth.currentUser.uid === localState.hostKey.split('/', 1)) {
                off(ref(db, 'challenges/' + cloudState.static.codeVillain))
                off(ref(db, 'challenges/' + cloudState.static.codeRelic))
                off(ref(db, 'challenges/' + cloudState.static.codeLocation))
            }
        }

    }, [localState.hostKey, cloudState.static])

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
                        // dispatchLocalCharObject(snapshot.val())

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
    // If no players are left, clears the readyList array
    // and updates the cloud with Ready state True, 
    useEffect(() => {
        const remainingPlayers = []
        cloudState.playerList.forEach(player => {
            if (!cloudState.readyList.includes(player.uid)) {
                remainingPlayers.push(player)
            }
        })
        if (remainingPlayers.length > 0) {
            startSetActivePlayer(localState.hostKey, remainingPlayers[0].uid, remainingPlayers[0].currentCharacterID)
        }
        if ((cloudState.playerList.length !== 0) &&
            (cloudState.playerList.length === cloudState.readyList.length)
        ) {
            startNewRound(localState.hostKey)
            startRESETActionTokens(localState.hostKey, cloudState.playerList)
            // Dispatches locally only
            dispatchCloudState(updateReadyStatus(true))
        }
    }, [cloudState.readyList])

    // Listener for remote activePlayer on cloudState
    useEffect(() => {
        if (cloudState.active.activeUID &&
            (cloudState.active.activeUID !== auth.currentUser.uid)
        ) {
            // dispatchActiveCharacterObject({})
            dispatchLocalState(clearActiveCharacter())

            // If the current Active Player is not the local player, 
            // establish a listener for the duration of their turn
            onValue(ref(db, 'characters/' + cloudState.active.activeUID + '/' + cloudState.active.activeCharID),
                (snapshot) => {
                    if (snapshot.exists()) {
                        // dispatchActiveCharacterObject(snapshot.val())
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
            // dispatchActiveCharacterObject(localCharObject)
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
    useEffect(() => {
        if (auth.currentUser.uid === cloudState.active.activeUID) {

            // Does the current challenge have any specific challenge types?
            const currentChallengeTypes = [];
            if (localState.currentChallenge.monster) { currentChallengeTypes.push('Monster') }
            if (localState.currentChallenge.spooky) { currentChallengeTypes.push('Spooky') }
            if (localState.currentChallenge.magic) { currentChallengeTypes.push('Magic') }
            if (localState.currentChallenge.trap) { currentChallengeTypes.push('Trap') }

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
            const { assist, ongoingItem, singleUseItem, story } = cloudState.strength
            const totalAddStrength = assist + ongoingItem + singleUseItem + story

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
    useEffect(() => {
        if (
            (introStages.includes(cloudState.active.gameStage)) &&
            cloudState.active.ready
        ) {
            incrementGameStage()
        } else if (
            (cloudState.active.teamHealth === 0) &&
            cloudState.active.ready
        ) {
            incrementGameStage()
        } else if (
            ((cloudState.active.progressRelic > 10) &&
                (cloudState.active.progressVillain > 10 || cloudState.active.progressLocation > 10))
        ) {
            incrementGameStage()
        }

    }, [cloudState.active.ready, cloudState.active.teamHealth])

    // If the cloud-stored text indicating which challenge has been selected changes
    // or if the challenge which has been selected _itself_ changes
    // update the locally-stored challenge elements with current face
    useEffect(() => {
        if (cloudState.currentTurn.selectedChallenge !== '') {
            dispatchLocalState(updateCurrentChallenge(cloudState.currentTurn[cloudState.currentTurn.selectedChallenge][cloudState.currentTurn[cloudState.currentTurn.selectedChallenge].visible]))
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
                        cloudState.static.host,
                        cloudState.static.key,
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

    // // Testing tools
    // const resetStages = () => {
    //     startUpdateGameStage(localState.hostKey, 'INTRO')
    // }

    // const stepStage = () => {
    //     startUpdateGameStage(localState.hostKey, incrementStage(cloudState.active.gameStage))
    // }

    // const resetTurnStage = () => {
    //     startUpdateTurnStage(localState.hostKey, incrementTurn('default'))
    // }

    // const resetActionTokens = () => {
    //     startRESETActionTokens(localState.hostKey, cloudState.playerList)
    // }
    // // Testing tools

    // useEffect(() => {
    //     console.log('host', localState.hostKey.split('/', 1))

    // })

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


// <div>
// <p> - break - </p>
// <div>Villain Code: {cloudState.static.codeVillain}</div>
// <div>Relic Code: {cloudState.static.codeRelic}</div>
// <div>Location Code: {cloudState.static.codeLocation}</div>
// <div>Game Stage: {cloudState.active.gameStage}</div>
// <div>Turn Stage: {cloudState.currentTurn.turnStage}</div>
// <div>Briefing Stage: {cloudState.backstory.briefingStage}</div>
// <div>Host: {cloudState.static.host}</div>
// <div>Key: {cloudState.static.key}</div>
// <div>Surprises: {cloudState.surprises}</div>
// <div>Villain Progress: {cloudState.active.progressVillain}</div>
// <div>Relic Progress: {cloudState.active.progressRelic}</div>
// <div>Location Progress: {cloudState.active.progressLocation}</div>
// <div>Ready state: {cloudState.active.ready && cloudState.active.ready ? 'true' : 'false'}</div>
// <div>Team Health: {cloudState.active.teamHealth}</div>
// <div>Active Character: {cloudState.active.activeUID && cloudState.active.activeCharID}</div>
// </div>


// <AuthWrapper />
//             <ActiveCharWrapper
//                 cloudState={cloudState}
//                 activeCharacter={activeCharacterObject}
//                 localCharacter={localCharObject}
//                 resetStages={resetStages}
//                 stepStage={stepStage}
//                 resetTurnStage={resetTurnStage}
//                 resetActionTokens={resetActionTokens}
//             />
//             <PassTurn
//                 cloudState={cloudState}
//                 character={activeCharacterObject}
//             />

//             <Routes>
//                 <Route
//                     path="introductions"
//                     element={
//                         <div>
//                             <IntroDescription />
//                             <IntroCharacter
//                                 character={activeCharacterObject}
//                                 ready={cloudState.ready}
//                             />
//                         </div>
//                     }
//                 />
//                 <Route
//                     path="missionBriefing/*"
//                     element={
//                         <MissionBriefing
//                             cloudState={cloudState}
//                         />
//                     }
//                 />
//                 <Route
//                     path="backstory"
//                     element={
//                         <div>
//                             backstory
//                         </div>
//                     }
//                 />
//                 <Route
//                     path="transport"
//                     element={
//                         <BriefingComplete />
//                     }
//                 />
//                 <Route
//                     path="playing"
//                     element={
//                         <Playing
//                             cloudState={cloudState}

//                         >



//                         </Playing>
//                     }
//                 />
//                 <Route
//                     path="summary"
//                     element={
//                         <div>
//                             summary
//                         </div>
//                     }
//                 />
//             </Routes>

// <ChallengeFrame>
// <VillainChallenge />
// </ChallengeFrame>


// deckUncompletedVillain={deckUncompletedVillain}
// deckUncompletedRelic={deckUncompletedRelic}
// deckUncompletedLocation={deckUncompletedLocation}








// {cloudState.classStorage.forEach((classNumber) => {
//     <div>Class Storage: {classNumber} </div>
// })}



            // {cloudState.playerList &&
            //     cloudState.playerList.forEach((playerObject) => {
            //         return (<div>Team Player Object: {playerObject.currentCharacterID}, {playerObject.uid}</div>)
            //     })
            // }

// {cloudState.readyList && playerObject.currentCharacterID}, {cloudState.readyList && playerObject.uid}
