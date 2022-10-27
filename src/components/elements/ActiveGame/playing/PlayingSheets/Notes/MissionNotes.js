import React from "react";
import Note from "./Note";

const MissionNotes = ({ playerMissionNoteArray, setNote, saveNote, placeholderText, type }) => {
  return (
    <span>
      {playerMissionNoteArray.map((note) => {
        return (
          <Note
            key={note.currentCharacterID}
            id={note.currentCharacterID}
            charName={note.charName}
            note={note.notes}
            setNote={setNote}
            saveNote={saveNote}
            placeholderText={placeholderText}
            type={type}
          />
        )
      })}
    </span>
  )
}

export default MissionNotes