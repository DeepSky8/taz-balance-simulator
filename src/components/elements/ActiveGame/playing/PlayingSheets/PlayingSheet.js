import React, { useEffect, useState, useReducer } from "react";
import { auth } from "../../../../../firebase/firebase";
import { useLocation } from "react-router-dom";
import { charReducer, defaultCharState } from "../../../../../reducers/charReducer";
import { defaultNotePad, noteReducer } from "../../../../../reducers/noteReducer";
import CharStats from "../../../CharacterSheet/AttributePickerElements/CharStats";
import {
  setCharState,
  setNoCurrentChar,
  startUpdateCharNote
} from "../../../../../actions/charActions";
import SpecialAbility from "../../../CharacterSheet/AttributePickerElements/SpecialAbility";
import ClassDisplay from "./AttributeDisplay/ClassDisplay/ClassDisplay";
import { charTitles } from "../../../CharacterSheet/classes/charInfo";
import AssistDisplay from "./AttributeDisplay/AssistDisplay/AssistDisplay";
import ToolDisplay from "./AttributeDisplay/ToolDisplay/ToolDisplay";
import { startUpdateMissionNoteArray } from "../../../../../actions/cloudActions";
import {
  receivedNote,
  setNoteAuth,
  setNoteText
} from "../../../../../actions/noteActions";
import NotesFrame from "./Notes/NotesFrame";


const PlayingSheet = ({ cloudState, localState }) => {
  let location = useLocation()
  const pageCharID = location.pathname.split("/")[4]
  const charIndex = localState.teamCharArray.findIndex((char) =>
    char.charID === pageCharID
  )
  const pageCharName = location.pathname.split("/")[3]
  const tokenAvailable = 'Action Token available'
  const tokenSpent = 'Action Token spent'
  const missionNoteGenre = 'Mission'
  const charNoteGenre = 'Character'

  const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)

  const [hasToken, setHasToken] = useState(false)
  const [charNote, dispatchCharNote] = useReducer(noteReducer, defaultNotePad)
  const [missionNote, dispatchMissionNote] = useReducer(noteReducer, defaultNotePad)





  const updateMissionNote = (text) => {
    if (pageCharID === localState.localCharacterID) {
      dispatchMissionNote(setNoteText(text))
    }
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
    // dispatchMissionNote(clearNote())
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
            missionNoteGenre
          ))
      }
    }

  }, [cloudState.missionNoteArray, pageCharID])


  const updateCharNote = (text) => {
    if (pageCharID === localState.localCharacterID) {
      dispatchCharNote(setNoteText(text))
    }
  }

  const saveCharNote = () => {
    if (pageCharID === localState.localCharacterID) {
      startUpdateCharNote(auth.currentUser.uid, localState.localCharacterID, charNote)
    }
  }

  // charNote
  useEffect(() => {
    // dispatchCharNote(clearNote())


    if (charState.charNote.charID === pageCharID) {
      dispatchCharNote(receivedNote(charState.charNote))
    } else {
      dispatchCharNote(
        setNoteAuth(
          auth.currentUser.uid,
          pageCharID,
          pageCharName,
          charNoteGenre
        ))
    }

  }, [charState.charNote, pageCharID])


  // set local character state
  useEffect(() => {
    dispatchCharState(setNoCurrentChar())
    if (charIndex >= 0) {
      dispatchCharState(setCharState(localState.teamCharArray[charIndex]))
    }
  }, [localState.teamCharArray[charIndex], charIndex, pageCharID])

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
      <NotesFrame
        charNote={charNote}
        updateCharNote={updateCharNote}
        saveCharNote={saveCharNote}
        missionNote={missionNote}
        updateMissionNote={updateMissionNote}
        saveMissionNote={saveMissionNote}
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

// <Note
// note={missionNote}
// setNote={updateMissionNote}
// saveNote={saveMissionNote}
// />