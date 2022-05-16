import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { defaultUserProfile, userReducer } from "../reducers/userReducer";
import { defaultGameState, gameReducer } from "../reducers/gameReducer";
import { defaultNewCharState, newCharReducer } from "../reducers/newCharReducer";
import { defaultCharState, charReducer } from "../reducers/charReducer";
import ActiveGame from "../components/elements/ActiveGame"
import AuthWrapper from '../components/elements/general/AuthWrapper';
import ChallengeSelect from "../components/elements/Challenges/ChallengeSelect";
import ChooseMode from "../components/elements/general/ChooseMode";
import FirebaseSignIn from '../components/elements/general/FirebaseSignIn';
import GameSetup from "../components/elements/GameSetup";
import JoiningHosting from "../components/elements/general/JoiningHosting";
import NotFoundPage from "../components/elements/general/NotFoundPage";
import PrivacyPolicy from "../components/elements/general/PrivacyPolicy";
import Tos from "../components/elements/general/Tos";
import Welcome from "../components/elements/general/Welcome";
import { resetUserProfile, updateUserState } from "../actions/userActions";

import PartyMembers from "../components/elements/characters/PartyMembers";
import CharacterSelect from "../components/elements/characters/CharacterSelect";
import CreateNewCharacter from "../components/elements/characters/CreateNewCharacter";
import Bard from "../components/classes/Bard";
import Cleric from "../components/classes/Cleric";
import Test from "../components/classes/Test";
import { resetCharacterState, setCharState, setNoCurrentChar } from "../actions/charActions";
import ViewEditCharacter from "../components/elements/characters/ViewEditCharacter";
import { updateChallengesObject } from "../actions/gameActions";
import { startRemoveGameCode } from "../actions/joiningActions";


export const history = createBrowserHistory();

const AppRouter = () => {
    const [gameArray, setGameArray] = useState([])
    const [charArray, setCharArray] = useState([])
    // const [gameObjectsArray, setGameObjectsArray] = useState([])
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)
    const [newCharState, dispatchNewCharState] = useReducer(newCharReducer, defaultNewCharState)
    const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)

    // This listener updates the local state to 
    // mirror the user account in the cloud
    useEffect(() => {
        console.log('current user anonymous? ', auth.currentUser.isAnonymous)
        console.log('auth user UID ', auth.currentUser.uid)
        console.log('user state UID ', userState.uid)
        if (auth.currentUser.isAnonymous || auth.currentUser.uid !== userState.uid) {
            dispatchUserState(resetUserProfile())
            dispatchCharState(resetCharacterState())
        }
        onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {


            // If there is a user account in the cloud
            if (snapshot.exists()) {
                dispatchUserState(updateUserState(snapshot.val()))

                // const anonymousUID = snapshot.val().anonymousUID
                // // If the user account has an associated anonymous user account
                // // get the data from that account and copy it into the signed-in account
                // // then remove the anonymous account record
                // // then remove the anonymous account association from the user account            
                // if (anonymousUID) {
                //     get(ref(db, 'users/' + anonymousUID), (snapshot) => {
                //         update(ref(db, 'users/' + authUID), { ...snapshot.val() })
                //     })
                //         .then(() => {
                //             remove(ref(db, 'users/' + anonymousUID))
                //         })
                // }
                // update(ref(db, 'users/' + authUID), { anonymousUID: null })
                // Send the cloud data to local SetupState

            }
        })

        // When this element is closed, remove the listener on the user account
        return (() => {
            off(ref(db, 'users/' + auth.currentUser.uid))
        })
    }, [])

    // Listen to the cloud list of characters created by this user
    // When the list changes, set the new list in local storage
    useEffect(() => {
        onValue(ref(db, 'characters/' + auth.currentUser.uid), (snapshot) => {
            const characterArray = [];
            snapshot.forEach(childSnapShot => {
                characterArray.push(childSnapShot.val())
            })

            setCharArray(characterArray)

        })

        return (() => {
            off(ref(db, 'characters/' + auth.currentUser.uid))
        })

    }, [])

    useEffect(() => {

        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const updatedArray = [];
            snapshot.forEach((childSnapShot) => {
                updatedArray.push(childSnapShot.val().gameID)
            })

            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)
        })

        return () => {

            // Remove the listener on Active Games in the cloud
            off(ref(db, 'activeGames'))
        }
    }, [])

    useEffect(() => {
        const gameID = userState.gameID
        if (gameID) {
            onValue(ref(db, 'activeGames/' + gameID), (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateChallengesObject(snapshot.val()))
                } else {
                    off(ref(db, 'activeGames/' + gameID))
                    startRemoveGameCode(auth.currentUser.uid, gameID)
                }
            })
        }

        return () => {
            off(ref(db, 'activeGames/' + gameID))
        }

    }, [userState.gameID])

    useEffect(() => {
        if (userState.currentCharacterID) {
            let charObject = charArray.find(character =>
                character.charID === userState.currentCharacterID)
            dispatchCharState(setCharState(charObject))
        } else {
            dispatchCharState(setNoCurrentChar())
        }
    }, [userState.currentCharacterID, charArray])


    useEffect(() => {
        console.log('userState changed: ', userState)
    }, [userState])

    // useEffect(() => {
    //     console.log('gameArray changed: ', gameArray)
    // }, [gameArray])

    // useEffect(() => {
    //     console.log('gameState changed: ', gameState)
    // }, [gameState])

    // useEffect(() => {
    //     console.log('new character state changed: ', newCharState)
    // }, [newCharState])

    // useEffect(() => {
    //     console.log('character state changed: ', charState)
    // }, [charState])

    // useEffect(() => {
    //     console.log('character array changed: ', charArray)
    // }, [charArray])

    return (

        <HistoryRouter history={history}>

            <div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path='chooseMode' element={<ChooseMode />} />
                    <Route path='gameSetup' element={
                        <GameSetup>
                            <AuthWrapper />
                            <JoiningHosting
                                userState={userState}
                                gameArray={gameArray}
                            />
                            <CharacterSelect
                                userState={userState}
                                charState={charState}
                                dispatchCharState={dispatchCharState}
                                charArray={charArray}
                            />
                            <PartyMembers
                                userState={userState}
                                gameState={gameState}

                            />
                            <ChallengeSelect
                                userState={userState}
                                gameState={gameState}
                            />

                        </GameSetup>

                    } />

                    <Route path='/viewEditCharacter/:characterID' element={<ViewEditCharacter />} />
                    <Route path="/createNewCharacter/*"
                        element={
                            <div>
                                <AuthWrapper />
                                <JoiningHosting
                                    userState={userState}
                                    gameArray={gameArray}
                                />
                                <CreateNewCharacter
                                    newCharState={newCharState}
                                    dispatchNewCharState={dispatchNewCharState}
                                />

                            </div>
                        }

                    >
                        <Route path='createBard'
                            element={<Bard
                                newCharState={newCharState}
                                dispatchNewCharState={dispatchNewCharState}
                            />}
                        />
                        <Route path='createCleric'
                            element={<Cleric
                                newCharState={newCharState}
                                dispatchNewCharState={dispatchNewCharState}
                            />}
                        />
                    </Route>



                    <Route path='/gameInProcess' element={
                        <AuthWrapper
                            userState={userState}
                            dispatchSetupState={dispatchUserState}>
                            <ActiveGame />
                        </AuthWrapper>
                    }
                    />

                    <Route
                        path="/signIn"
                        element={<FirebaseSignIn />}
                    />
                    <Route
                        path="termsofservice"
                        element={<Tos />}
                    />
                    <Route
                        path="privacypolicy"
                        element={<PrivacyPolicy />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

        </HistoryRouter>
    )
}

export default AppRouter;
