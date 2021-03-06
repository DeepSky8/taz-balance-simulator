import { signInAnonymously } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

export const Welcome = () => {

    // const authenticateUser = () => {
    //     if (!auth.currentUser) {
    //         signInAnonymously(auth)
    //     }
    // }

    return (<div>
        <p>
            Welcome to an electronic verson of The Adventure Zone:
            Bureau of Balance board game by Keith Baker and Jennifer Ellis
            at Twogether Studios.
        </p>
        <p>
            Designed solely for remote-play, this electronic version requires a
            seperate way to communicate with your group
            (<a
                href="https://discord.com/"
                target="_blank"
                rel='noreferrer'
            >
                Discord
            </a> is a popular option).
        </p>
        <p>
            If you enjoy the electronic version, you'll love the boardgame even more! Use the link below to go the Twogether Studios homepage!
        </p>
        <div>
            <a
                href="https://www.twogetherstudios.com/products/the-adventure-zone-bureau-of-balance-game-us-canada"
                target="_blank"
                rel="noreferrer"
            >
                Buy the boardgame!
            </a>
            <div>
            <Link to="/chooseMode">Play TAZ Bureau of Balance digitally</Link>
        </div>
        </div>
    </div>)
}

export { Welcome as default }

// onClick={authenticateUser} 