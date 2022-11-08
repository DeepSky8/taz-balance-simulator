import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";

const KostcoUpdates = () => {
  let navigate = useNavigate()
  const [searchTerms, setSearchTerms] = useState('')

  useEffect(() => {
    if (auth.currentUser.uid !== 'nKtUXPTXqMaRfQhOTSWsuOxrxst1') {
      navigate('/')
    }
  })

  return (
    <div>
      Kostco Updates
      <label htmlFor="searchTerms">Text Search: </label>
      <input
        id="searchTerms"
        name="searchTerms"
        type='text'
        placeholder="Search all card text"
        value={searchTerms}
        onChange={(e) => {
          setSearchTerms(e.target.value)
        }}
      />

      <label htmlFor="searchEffects">Effect Search: </label>

    </div>
  )
}

export default KostcoUpdates

// <input 
// id="searchEffects"
// name="searchEffects"
// type=
// />