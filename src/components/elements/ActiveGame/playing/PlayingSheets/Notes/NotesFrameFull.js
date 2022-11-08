import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { startUpdateCharNote } from "../../../../../../actions/charActions";
import { startUpdateMissionNoteArray } from "../../../../../../actions/cloudActions";
import { clearNote, receivedNote, setNoteAuth, setNoteText } from "../../../../../../actions/noteActions";
import { auth } from "../../../../../../firebase/firebase";
import { defaultNotePad, noteReducer } from "../../../../../../reducers/noteReducer";
import Note, { charNoteGenre, missionNoteGenre } from "./Note";

const NotesFrameFull = ({
  cloudState,
  localState,
  charState,
  pageData,
}) => {

  const [charNote, dispatchCharNote] = useReducer(noteReducer, defaultNotePad)
  const [missionNote, dispatchMissionNote] = useReducer(noteReducer, defaultNotePad)



  const updateMissionNote = (text) => {
    if (pageData.charID === localState.localCharacterID) {
      dispatchMissionNote(setNoteText(text))
    }
  }

  const saveMissionNote = () => {

    if (pageData.charID === localState.localCharacterID) {
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
      note.charID === pageData.charID
    )

    // If a single note for the current displayed character exists
    // store that note in the note reducer
    if (tempMissionNoteArray.length === 1) {
      dispatchMissionNote(receivedNote(tempMissionNoteArray[0]))

    } else {
      // If a single note does not exist create a blank note 
      // for that character in the reducer

      dispatchMissionNote(
        setNoteAuth(
          auth.currentUser.uid,
          pageData.charID,
          pageData.charName,
          missionNoteGenre
        ))
    }

  }, [cloudState.missionNoteArray, pageData.charID])


  const updateCharNote = (text) => {
    if (pageData.charID === localState.localCharacterID) {
      dispatchCharNote(setNoteText(text))
    }
  }

  const saveCharNote = () => {
    if (pageData.charID === localState.localCharacterID) {
      startUpdateCharNote(auth.currentUser.uid, localState.localCharacterID, charNote)
    }
  }

  // charNote
  useEffect(() => {
    dispatchCharNote(clearNote())

    if (charState.charNote.charID === pageData.charID) {
      dispatchCharNote(receivedNote(charState.charNote))
    } else {
      dispatchCharNote(
        setNoteAuth(
          auth.currentUser.uid,
          pageData.charID,
          pageData.charName,
          charNoteGenre
        ))
    }

  }, [charState.charNote, pageData.charID])

  return (
    <span className="noteFrame">
      <Note
        note={missionNote}
        updateNote={updateMissionNote}
        saveNote={saveMissionNote}
      />
      <Note
        note={charNote}
        updateNote={updateCharNote}
        saveNote={saveCharNote}
      />
    </span>
  )
}

export default NotesFrameFull