import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import {
    off,
    onValue,
    ref,
} from "firebase/database";
import {
    clearPlayerList,
    updateGameState,
    updatePlayerList,
} from "../../actions/gameActions";
import { startRemoveGameID } from "../../actions/userActions";

export const GameSetup = ({
    dispatchGameState,
    userState,
    children
}) => {


    // When the local gameID changes, either start a listener to get the host
    // and then start a listener to get the participating players.
    // If the Active Game record no longer exists, 
    // get rid of the stored gameID and clear the local player list
    useEffect(() => {

        if (userState.gameID) {
            onValue(ref(db, 'activeGames/' + userState.gameID), (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateGameState(snapshot.val()))
                    // dispatchGameState(updateChallengesObject(snapshot.val()))
                } else {
                    // startRemoveGameID(auth.currentUser.uid)
                    console.log('would have started StartRemoveGameID with auth: ', auth.currentUser.uid)
                    dispatchGameState(clearPlayerList())
                }
            })

            onValue(ref(db, 'activeGames/' + userState.gameID + '/playerList'), snapshot => {

                if (snapshot.exists()) {
                    const playerList = [];
                    snapshot.forEach((player) => { playerList.push(player.val()) })
                    const otherPlayers = playerList.filter(player => player.uid !== auth.currentUser.uid)
                    dispatchGameState(updatePlayerList(otherPlayers))

                }

            })
        }

        return () => {
            off(ref(db, 'activeGames/' + userState.gameID))
            off(ref(db, 'activeGames/' + userState.gameID + '/playerList'))
        }
    }, [userState.gameID])



    // If this user is associated with an Active Game
    // start a listener on the list of characters associated 
    // with this game
    // useEffect(() => {
    // if (userState.gameID) {
    //     onValue(ref(db, 'activeGames/' + userState.gameID), (snapshot) => {
    //         if (snapshot.exists()) {
    //             dispatchGameState(updateChallengesObject(snapshot.val()))
    //         } else {
    //             startRemoveGameID(auth.currentUser.uid)
    //         }
    //     })



    //     onValue(ref(db, 'activeGames/' + userState.gameID + '/characterList'), snapshot => {
    //         const userList = [];
    //         console.log('characterList useEffect onValue fired: ')
    //         if (snapshot.exists()) {
    //             console.log('character list', snapshot.val())
    //             snapshot.forEach(
    //                 childSnapShot =>
    //                     userList.push(
    //                         childSnapShot.val()
    //                     )
    //             )
    //         }
    //         dispatchGameState(
    //             updateUserList(
    //                 userList.filter(user => user.uid !== userState.uid)
    //             )
    //         )
    //     })
    // }

    // return () => {
    //     off(ref(db, 'activeGames/' + userState.gameID))
    //     off(ref(db, 'activeGames/' + userState.gameID + '/characterList'))
    // }
    // }, [userState.gameID])



    return (
        <div>
            {children}
        </div>
    )

}

export { GameSetup as default }



