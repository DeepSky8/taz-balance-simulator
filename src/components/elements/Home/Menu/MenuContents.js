import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { adminAccess } from "../../admin/lincolnLogs";


const MenuContents = () => {
  const navigate = useNavigate()


  const onLogoutClick = () => {

    signOut(auth)
      .then(navigate("/"))
      .catch((error) => {
        console.log("error thrown on logout:", error)
      })
  }

  const LogoutLink = () => {

    return (

      <button onClick={() => { onLogoutClick() }}> Logout </button>

    )
  }

  return (
    <div >

      <h2>
        {auth.currentUser.isAnonymous === false
          ?
          <LogoutLink />
          :
          <Link to='/signIn'>Login</Link>
        }
      </h2>

      <h2>
        <Link to='/gameSetup'>Game Menu</Link>
      </h2>

      <h3>
        <ul>
          <li><Link to='/gameSetup/selectCharacter'>Saved Characters</Link></li>
          <li><Link to='/gameSetup/selectChallenges'>Saved Games</Link></li>
        </ul>

      </h3>

      <h2>
        <Link to='/activeGame/introductions'>Resume Active Game</Link>

      </h2>

      <h3>
        {auth.currentUser.uid === adminAccess &&
          <span>
            --------------
            <Link to='/deckUpdates'>Deck Updates</Link>
            <Link to='/kostcoUpdates'>Kostco Updates</Link>
          </span>
        }

      </h3>

    </div>
  )
}

export default MenuContents

// <MenuButton
// handleClick={() => { handleClick() }}
// />