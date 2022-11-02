import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { charReducer, defaultCharState } from "../../../../../reducers/charReducer";
import CharStats from "../../../CharacterSheet/AttributePickerElements/CharStats";
import { useReducer } from "react";
import { setCharState } from "../../../../../actions/charActions";
import SpecialAbility from "../../../CharacterSheet/AttributePickerElements/SpecialAbility";
import ClassDisplay from "./AttributeDisplay/ClassDisplay/ClassDisplay";
import { charTitles } from "../../../CharacterSheet/classes/charInfo";
import AssistDisplay from "./AttributeDisplay/AssistDisplay/AssistDisplay";
import ToolDisplay from "./AttributeDisplay/ToolDisplay/ToolDisplay";
import Note from "./Notes/Note";
import { auth } from "../../../../../firebase/firebase";
import { startUpdateMissionNoteArray } from "../../../../../actions/cloudActions";
import { defaultNotePad, noteReducer } from "../../../../../reducers/noteReducer";
import { clearNote, receivedNote, setNoteAuth, setNoteText } from "../../../../../actions/noteActions";


const PlayingSheet = ({ cloudState, localState }) => {
  let location = useLocation()
  const pageCharID = location.pathname.split("/")[4]
  const charIndex = localState.teamCharArray.findIndex((char) =>
    char.charID === pageCharID
  )
  const pageCharName = location.pathname.split("/")[3]
  const tokenAvailable = 'Action Token available'
  const tokenSpent = 'Action Token spent'
  const missionNoteType = 'Mission'
  const charNoteType = 'Character'

  const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)

  const [hasToken, setHasToken] = useState(false)
  const [charNote, setCharNote] = useReducer(noteReducer, defaultNotePad)
  const [missionNote, dispatchMissionNote] = useReducer(noteReducer, defaultNotePad)





  const updateMissionNote = (text) => {
    // Retain all mission notes made when playing other characters
    // removing the single note made while playing this character
    // then concat a new note onto the array
    // containing the new text of the note

    if (pageCharID === localState.localCharacterID) {
      dispatchMissionNote(setNoteText(text))
    }





    // if (localState.localCharacterID === charID) {
    //   setPlayerMissionNote(
    //     {
    //       uid: auth.currentUser.uid,
    //       currentCharacterID: localState.localCharacterID,
    //       charName: pageCharName,
    //       notes: text
    //     })
    // }



    // const removedOldNote = playerMissionNoteArray.filter((note) =>
    //   note.currentCharacterID !== localState.localCharacterID
    // )

    // setPlayerMissionNoteArray([{
    //   uid: auth.currentUser.uid,
    //   currentCharacterID: localState.localCharacterID,
    //   charName: localState.localCharacter.charName,
    //   notes: text
    // }].concat(removedOldNote))


  }

  const saveMissionNote = () => {

    if (pageCharID === localState.localCharacterID) {
      const otherMissionNotes = cloudState.missionNoteArray.filter((note) =>
        note.uid !== auth.currentUser.uid
      )
      const newNoteArray = otherMissionNotes.concat([missionNote])
      startUpdateMissionNoteArray(localState.hostKey, newNoteArray)
    }

  }

  // missionNote
  useEffect(() => {
    // Clear note contents
    dispatchMissionNote(clearNote())
    // Get all notes from cloudState, filtering on the current character displayed
    const tempMissionNoteArray = cloudState.missionNoteArray.filter((note) =>
      note.charID === pageCharID
    )

    // If a single note for the current displayed character exists
    // store that note in the note reducer
    if (tempMissionNoteArray.length === 1) {
      dispatchMissionNote(receivedNote(tempMissionNoteArray[0]))

    } else {
      // If a single note does not exists, and player is viewing their
      // character's page, create a blank note for that character in the reducer
      if (pageCharID === localState.localCharacterID) {

        dispatchMissionNote(
          setNoteAuth(
            auth.currentUser.uid,
            pageCharID,
            pageCharName,
            missionNoteType
          ))
      }
    }

  }, [cloudState.missionNoteArray, pageCharID])


  useEffect(()=>{},[])


  // set local character state
  useEffect(() => {
    if (charIndex >= 0) {
      dispatchCharState(setCharState(localState.teamCharArray[charIndex]))
    }
  }, [localState.teamCharArray, charIndex])

  // set token status
  useEffect(() => {
    const hasActionToken = (
      cloudState.hasActionToken.filter(
        character => character.currentCharacterID === pageCharID
      ).length > 0)
    setHasToken(hasActionToken)
  }, [cloudState.hasActionToken])

  return (
    <span>
      <span>
        <h2>{charState.charName}{charTitles[charState.questCount]}</h2>
        <p>
          {
            localState.activeCharacterID === pageCharID
              ?
              `It's ${charState.charName}'s turn!`
              :
              ''
          }
        </p>
        <p>
          {hasToken ? tokenAvailable : tokenSpent}
        </p>
      </span>

      <SpecialAbility charState={charState} />
      <CharStats charState={charState} />
      <ClassDisplay charState={charState} />
      <ToolDisplay charState={charState} />
      <AssistDisplay charState={charState} />
      <Note
        note={missionNote}
        setNote={updateMissionNote}
        saveNote={saveMissionNote}
      />

    </span>
  )
}

export default PlayingSheet





// <MissionNotes
// playerMissionNoteArray={playerMissionNoteArray}
// setNote={updateMissionNote}
// saveNote={saveMissionNote}
// placeholderText={missionNotePlaceholder}
// type={'Mission'}
// />