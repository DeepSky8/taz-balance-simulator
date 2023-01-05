import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, off, onValue, ref } from "firebase/database";
import { auth, db } from "../../../firebase/firebase";
import {
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
    updateStrength,
    clearStrength,
    startSetCharacterStrength,
    updateMissionNoteArray,
    updateKostcoOptions,
    updateKostcoDiscards,
    startUpdateKostcoCardsOptions,
    updateKostcoSelected,
    startClearKostcoCardsOptions,
    updateKostcoActive,
    startUpdateKostcoItemStrength,
} from "../../../actions/cloudActions";
import { defaultCloudState, cloudReducer } from "../../../reducers/cloudReducer";
import challengeDeck from "../../functions/challengeDeck";
import ActiveGameRouter from "../../../routers/ActiveGameRouter";
import {
    clearCurrentChallenge,
    clearKostcoOptions,
    updateCurrentChallenge,
    updateLocalCharacterID,
    updateHostKey,
    updateCurrentChallengeKey,
    updateUncompletedChallengesVillain,
    updateCompletedChallengesVillain,
    updateUncompletedChallengesRelic,
    updateCompletedChallengesRelic,
    updateUncompletedChallengesLocation,
    updateCompletedChallengesLocation,
    updateTeamArrayCharObject,
    removeTeamArrayCharObject,
    updateActiveCharacterID,
    updateActiveIndex,
    updateLocalIndex,
    addKostcoOption,
} from "../../../actions/localActions";
import { defaultLocalState, localStateReducer } from "../../../reducers/localReducer";
import { stats } from "../CharacterSheet/classes/charInfo";
import { shuffle } from "../../functions/deckRandomizers";
import { defaultKostcoStrengthBonuses, kostcoStrengthBonusesReducer } from "../../../reducers/kostcoStrengthBonusesReducer";
import {
    // addKostcoMagicStrength, 
    // addKostcoMonsterStrength, 
    // addKostcoSpookyStrength, 
    // addKostcoTrapStrength, 
    // addKostcoUndefinedStrength, 
    clearKostcoStrengthBonuses, extractKostcoBonuses
} from "../../../actions/kostcoStrengthBonusActions";
import challengeTypes from "../Challenges/mission-elements/challengeTypes";
import turnStage from "./turnStep/turnStepArrays/turnStage";
import { briefingStage, gameStage } from "./stageObjects/stageObjects";

const ActiveGame = () => {
    let navigate = useNavigate()

    const [cloudState, dispatchCloudState] = useReducer(cloudReducer, defaultCloudState)
    const [localState, dispatchLocalState] = useReducer(localStateReducer, defaultLocalState)
    const [kostcoStrength, dispatchKostcoStrength] = useReducer(kostcoStrengthBonusesReducer, defaultKostcoStrengthBonuses)
    const [allKostcoIDs, setAllKostcoIDs] = useState([])

    // State guards
    useEffect(() => {
        // If the current user is the game host
        if (auth.currentUser.uid === cloudState.static.host) {

            // If no gameStage exists, set it to INTRO
            if (cloudState.active.gameStage === undefined) {
                startUpdateGameStage(
                    localState.hostKey,
                    gameStage.intro
                )
            }

            // If no backstory state exists, set it to Villain
            if (cloudState.backstory.briefingStage === undefined) {
                startUpdateBriefingStage(
                    localState.hostKey,
                    briefingStage.villain
                )
            }

            // If no turnStage exists, set it to DESCRIBE_SCENE_ONE
            if (cloudState.currentTurn.turnStage === undefined) {
                startUpdateTurnStage(
                    localState.hostKey,
                    turnStage.describeSceneOne
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

        // Ongoing missionNoteArray listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/missionNoteArray'),
            (snapshot) => {
                const tempMissionNoteArray = [];
                if (snapshot.exists()) {
                    snapshot.forEach((note) => {
                        tempMissionNoteArray.push(note.val())
                    })
                }
                dispatchCloudState(updateMissionNoteArray(tempMissionNoteArray))
            })

        // Ongoing kostco option listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/kostco/options'),
            (snapshot) => {
                const tempKostcoOptions = [];
                if (snapshot.exists()) {
                    snapshot.forEach((kardID) => {
                        tempKostcoOptions.push(kardID.val())
                    })
                }
                dispatchCloudState(updateKostcoOptions(tempKostcoOptions))
            })

        // Ongoing kostco discard listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/kostco/discarded'),
            (snapshot) => {
                const tempKostcoDiscard = [];
                if (snapshot.exists()) {
                    snapshot.forEach((kardID) => {
                        tempKostcoDiscard.push(kardID.val())
                    })
                }
                dispatchCloudState(updateKostcoDiscards(tempKostcoDiscard))
            })

        // Ongoing kostco selected listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/kostco/selected'),
            (snapshot) => {

                if (snapshot.exists()) {
                    dispatchCloudState(updateKostcoSelected(snapshot.val()))
                }

            })

        // Ongoing kostco selected listener
        onValue(ref(db, 'savedGames/' + localState.hostKey + '/kostco/active'),
            (snapshot) => {

                if (snapshot.exists()) {
                    dispatchCloudState(updateKostcoActive(snapshot.val()))
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
            off(ref(db, 'savedGames/' + localState.hostKey + '/missionNoteArray'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/kostco/options'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/kostco/discarded'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/kostco/selected'))
            off(ref(db, 'savedGames/' + localState.hostKey + '/kostco/active'))
        }

    }, [localState.hostKey])

    // Ongoing character listeners
    useEffect(() => {
        // if (localState.localCharacterID !== '') {
        //     onValue(ref(db, 'characters/' + auth.currentUser.uid + '/' + localState.localCharacterID),
        //         (snapshot) => {
        //             if (snapshot.exists()) {
        //                 dispatchLocalState(updateLocalCharacter(snapshot.val()))
        //             }
        //         })
        // }

        if (cloudState.playerList.length > 0) {
            cloudState.playerList.forEach((player) => {
                onValue(ref(db, 'characters/' + player.uid + '/' + player.currentCharacterID),
                    (snapshot) => {
                        if (snapshot.exists()) {
                            dispatchLocalState(updateTeamArrayCharObject(snapshot.val()))
                        } else {
                            dispatchLocalState(removeTeamArrayCharObject(player.currentCharacterID))
                        }
                    }
                )
            })
        }


        return () => {
            // if (localState.localCharacterID !== '') {
            //     off(ref(db, 'characters/' + auth.currentUser.uid + '/' + localState.localCharacterID))
            // }
            if (cloudState.playerList.length > 0) {
                cloudState.playerList.forEach((player) => {
                    off(ref(db, 'characters/' + player.uid + '/' + player.currentCharacterID))
                })
            }
        }
    }, [cloudState.playerList])

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

    // Finds index of local and active characters in localState.teamCharArray
    // and stores these indexes on localState
    useEffect(() => {

        dispatchLocalState(
            updateActiveCharacterID(
                cloudState.active.activeCharID
            )
        )

        const activeCharIndex = localState.teamCharArray.findIndex(
            (charObject) => charObject.charID === cloudState.active.activeCharID)
        if (activeCharIndex > 0) {
            dispatchLocalState(
                updateActiveIndex(
                    activeCharIndex
                )
            )
        }

        const localCharIndex = localState.teamCharArray.findIndex(
            (charObject) => charObject.charID === localState.localCharacterID)

        if (localCharIndex > 0) {
            dispatchLocalState(
                updateLocalIndex(
                    localCharIndex
                )
            )
        }

    },
        [
            localState.localCharacterID,
            cloudState.active.activeCharID,
            localState.teamCharArray
        ]
    )

    // Calculate kostco bonuses for each of the owned kards
    useEffect(() => {

        if (
            auth.currentUser.uid === cloudState.active.activeUID
            &&
            cloudState.active.gameStage === gameStage.challenges
        ) {
            // First clear any previously-calculated kostco bonuses
            dispatchKostcoStrength(clearKostcoStrengthBonuses())

            // Gather active Kostco items 
            const kostcoItems = localState
                .teamCharArray[localState.activeIndex]
                .charKostco
                .filter(kard => kard.kID !== '0')

            // If kostco items for active character exist
            if (kostcoItems.length > 0) {
                // For all Kostco items providing an ongoing strength bonus
                (kostcoItems.filter(kard => kard.g.strength === true))
                    .forEach(kard => {

                        dispatchKostcoStrength(extractKostcoBonuses(kard))

                        // // If the kard provides a bonus to a specific challenge type, 
                        // // update that strength bonus on the specific challenge type
                        // // and create an object entry for reference
                        // if (kard.g.magic) { dispatchKostcoStrength(addKostcoMagicStrength(kard)) }
                        // if (kard.g.monster) { dispatchKostcoStrength(addKostcoMonsterStrength(kard)) }
                        // if (kard.g.spooky) { dispatchKostcoStrength(addKostcoSpookyStrength(kard)) }
                        // if (kard.g.trap) { dispatchKostcoStrength(addKostcoTrapStrength(kard)) }
                        // // If the kard provides a general strength bonus
                        // // update the general kostco strength bonus
                        // // and create an object entry for reference
                        // if (
                        //     !kard.g.magic &&
                        //     !kard.g.monster &&
                        //     !kard.g.spooky &&
                        //     !kard.g.trap
                        // ) {
                        //     dispatchKostcoStrength(addKostcoUndefinedStrength(kard))
                        // }

                    })
                startUpdateKostcoItemStrength(localState.hostKey, kostcoStrength)
            }
        }

    }, [
        localState.activeIndex,
        localState
            .teamCharArray[localState.activeIndex]
            .charKostco
    ])


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
    // This effect is run by the active player
    useEffect(() => {
        if (
            auth.currentUser.uid === cloudState.active.activeUID
            &&
            cloudState.active.gameStage === gameStage.challenges
        ) {

            // Does the current challenge have any specific challenge types?
            const currentChallengeTypes = [];
            if (localState.currentChallenge.monster) { currentChallengeTypes.push(challengeTypes.monster) }
            if (localState.currentChallenge.spooky) { currentChallengeTypes.push(challengeTypes.spooky) }
            if (localState.currentChallenge.magic) { currentChallengeTypes.push(challengeTypes.magic) }
            if (localState.currentChallenge.trap) { currentChallengeTypes.push(challengeTypes.trap) }
            if (cloudState.currentTurn.selectedChallenge === 'relic') { currentChallengeTypes.push(challengeTypes.relic) }

            // Get the strength info from the active character
            const baseStrength = stats[localState.teamCharArray[localState.activeIndex].classCode].strength;
            const specialStrength = stats[localState.teamCharArray[localState.activeIndex].classCode].specialStrength;
            const specialTarget = stats[localState.teamCharArray[localState.activeIndex].classCode].specialTarget


            // If the active character is extra strong against the current challenge
            // use their special strength instead of base strength
            const characterStrength = currentChallengeTypes.includes(specialTarget) ?
                (specialStrength)
                :
                (baseStrength);

            // Destructure current assistive strength elements
            // and total them up
            const {
                actionWarrior,
                actionWizard,
                assistOne,
                assistTwo,
                kostcoMagic,
                kostcoMonster,
                kostcoSpooky,
                kostcoTrap,
                kostcoUndefined,
                ongoingItem,
                singleUseItem,
                story
            } = cloudState.strength;

            const totalAddStrength =
                actionWarrior +
                actionWizard +
                assistOne +
                assistTwo +
                kostcoUndefined +
                ongoingItem +
                singleUseItem +
                story;

            const tempKostcoBonusArray = []
            currentChallengeTypes.forEach(type => {

                if (kostcoMagic > 0 && type === challengeTypes.magic) {
                    tempKostcoBonusArray.push(kostcoMagic)
                }
                if (kostcoMonster > 0 && type === challengeTypes.monster) {
                    tempKostcoBonusArray.push(kostcoMonster)
                }
                if (kostcoSpooky > 0 && type === challengeTypes.spooky) {
                    tempKostcoBonusArray.push(kostcoSpooky)
                }
                if (kostcoTrap > 0 && type === challengeTypes.trap) {
                    tempKostcoBonusArray.push(kostcoTrap)
                }

            })

            const kostcoTypeBonus = tempKostcoBonusArray.length > 1
                ?
                (tempKostcoBonusArray.sort((a, b) => a - b))[0]
                :
                tempKostcoBonusArray.length > 0
                    ?
                    tempKostcoBonusArray[0]
                    :
                    0


            // Destructure the roll data, as well as whether the current challenge requires
            // advantage/disadvantage
            const { rollOne, rollTwo } = cloudState.currentTurn
            const { advantage, disadvantage } = localState.currentChallenge

            // Based on dis/advantage and the presence/lack of rolls, 
            // calculate the final roll result
            const rollResult = calcDisAdvantage(advantage, disadvantage, rollOne, rollTwo)

            // Total everything together and send it to the cloud
            const totalUpdatedStrength = characterStrength + totalAddStrength + rollResult + kostcoTypeBonus


            if (localState.hostKey) {
                startSetCharacterStrength(localState.hostKey, characterStrength)
                startUpdateTotalStrength(localState.hostKey, totalUpdatedStrength)

            }
        }
    },
        [
            localState.currentChallenge,
            localState.activeIndex,
            // localState.activeCharacterID,
            cloudState.strength,
            cloudState.currentTurn.rollOne,
            cloudState.currentTurn.rollTwo,
        ])

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
            case gameStage.intro:
                navigate('introductions')
                break;
            case gameStage.briefing:
                navigate('missionBriefing')
                break;
            case gameStage.transport:
                navigate('transport')
                setTimeout(() => {
                    startUpdateGameStage(
                        localState.hostKey,
                        gameStage.challenges
                    )
                }, 8000)
                break;
            case gameStage.challenges:
                navigate('playing/Gameboard')
                break;
            case gameStage.victory:
                break;
            case gameStage.failure:
                break;
            case gameStage.end:
                navigate('/gameSetup')
                break;
            // case 'gameSetup':
            //     navigate('/gameSetup')
            //     break;
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

    // --


    // Single update Kostco listener
    // Run by game host only
    useEffect(() => {
        if (auth.currentUser.uid === cloudState.static.host) {
            onValue(ref(db, 'kostco'),
                (snapshot) => {
                    const tempKostcoIDs = [];
                    if (snapshot.exists()) {
                        snapshot.forEach((kard) => {
                            tempKostcoIDs.push(kard.val().kID)
                        })
                    }
                    setAllKostcoIDs(tempKostcoIDs)
                }, {
                onlyOnce: true
            })
        }
        return () => {
            off(ref(db, 'kostco'))
        }

    }, [cloudState.static.host])

    // When it's DESCRIBETWO stage
    // the game host collates all the current Kostco kards
    // and stores two new card IDs in the cloud
    // from the list of unused Kostco kards 
    useEffect(() => {
        const currentKostcoIDs = []
        if (
            auth.currentUser.uid === cloudState.static.host
            &&
            cloudState.currentTurn.turnStage === turnStage.describeSceneTwo
        ) {
            const tempKostco = []

            localState
                .teamCharArray
                .forEach(
                    char => tempKostco.push(...char.charKostco)
                )

            if (tempKostco.length > 0) {
                currentKostcoIDs.push(tempKostco.concat())
            }

            const unusedKostcoIDs = shuffle(
                allKostcoIDs
                    .filter(
                        (kard) =>
                            !currentKostcoIDs.includes(kard.kID)
                    )
            )
            startUpdateKostcoCardsOptions(localState.hostKey, unusedKostcoIDs.slice(0, 2))
        }

        if (
            auth.currentUser.uid === cloudState.static.host
            &&
            cloudState.currentTurn.turnStage === turnStage.kostcoGive
        ) {

            // startUpdateKostcoCardsOptions(localState.hostKey, ['0'])
            startClearKostcoCardsOptions(localState.hostKey)
            dispatchLocalState(clearKostcoOptions())
        }
    }, [cloudState.currentTurn.turnStage, allKostcoIDs])

    // When the option list of kostco kard IDs stored in the cloud changes
    // get the corresponding kard information and store it 
    // on localState
    useEffect(() => {
        dispatchLocalState(clearKostcoOptions())
        if (cloudState.kostco.options.length > 0) {

            cloudState.kostco.options.forEach(kID => {
                get(ref(db, 'kostco/' + kID))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            dispatchLocalState(addKostcoOption(snapshot.val()))
                        }
                    })
                    .catch((error) => {
                        console.log('error', error)
                    })

            })
        }
        //  else {
        //     dispatchLocalState(clearKostcoOptions())

        // }

        // return () => { 
        //     off(ref(db, 'savedGames/' + localState.hostKey + '/kostco/selected'))
        // }

    }, [cloudState.kostco.options])

    // --






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
