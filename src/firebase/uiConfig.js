import { signInWithCredential } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { get, ref, update } from 'firebase/database';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { auth, db } from './firebase';

var uiConfig = {
    autoUpgradeAnonymousUsers: true,

    //Need to update the /url to reflect current game mode (game creation, game in progress, game completed)
    //This must also be reflected at the bottom of the callback list
    signInSuccessUrl: '/gameSetup',

    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/termsofservice',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('/privacypolicy');
    },

    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            // console.log('successful signin:', authResult)

            // Process result. This will not trigger on merge conflicts.
            // On success redirect to signInSuccessUrl.
            // window.location.assign('/gameSetup')
            return true
        }
        // .then(() => {
        //     return true
        // })
        ,
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function (error) {

            // Temp variable to hold the anonymous user data if needed.
            var data = null;
            // Hold a reference to the anonymous current user.
            var anonymousUID = auth.currentUser.uid;
            var authenticatedCred = error.credential;

            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {

                return Promise.resolve();
            }




            return signInWithCredential(auth, authenticatedCred)
                .then(() => {
                    update(ref(db, 'users/' + auth.currentUser.uid), { anonymousUID })
                })
                // .then(() => {
                //     return anonymousUser.delete();
                // })
                .then(() => {
                    data = null;
                    anonymousUID = null;
                    authenticatedCred = null;
                    window.location.assign("/gameSetup")
                })




            // get(ref(db, 'activeGames'))
            //     .then((snapshot) => {
            //         snapshot.forEach((childSnapShot) => {
            //             if (childSnapShot.val().host === anonymousUser.uid) {
            //                 activeKeysRegistered.push(childSnapShot.val().key)
            //             }
            //         })
            //     })



            // console.log('expected merge error when upgrading:', error.code)
            // console.log('full error: ', error)
            // console.log('Anonymouse User data', anonymousUser)
            // The credential the user tried to sign in with.

            // console.log('cred contents: ', cred)
            // If using Firebase Realtime Database. The anonymous user data has to be
            // copied to the non-anonymous user.
            // var app = firebase.app();
            // Save anonymous user data first.
            // const currentUserData = get(db, 'users')
            // if (activeKeysRegistered.length === 0) {
            //     console.log('No current user data, attempted to just sign in')
            //     return signInWithCredential(auth, cred)
            //         .then(() => {
            //             window.location.assign('/gameSetup')
            //         })
            // } else {
            //     console.log('Current User Data exists, attempting to sign in')
            // console.log('current user data: ', currentUserData)
            // return currentUserData












            // app.database().ref('users/' + firebase.auth().currentUser.uid)
            //     .once('value')
            //     .then(function (snapshot) {
            //         data = snapshot.val();
            //         // This will trigger onAuthStateChanged listener which
            //         // could trigger a redirect to another page.
            //         // Ensure the upgrade flow is not interrupted by that callback
            //         // and that this is given enough time to complete before
            //         // redirection.
            //         return firebase.auth().signInWithCredential(cred);
            //     })
            //     .then(function (user) {
            //         // Original Anonymous Auth instance now has the new user.
            //         return app.database().ref('users/' + user.uid).set(data);
            //     })
            //     .then(function () {
            //         // Delete anonymnous user.
            //         return anonymousUser.delete();
            //     }).then(function () {
            //         // Clear data in case a new user signs in, and the state change
            //         // triggers.
            //         data = null;
            //         // FirebaseUI will reset and the UI cleared when this promise
            //         // resolves.
            //         // signInSuccessWithAuthResult will not run. Successful sign-in
            //         // logic has to be run explicitly.
            //         window.location.assign('/gameSetup');
            //     });

        }
    },
};

export { uiConfig }