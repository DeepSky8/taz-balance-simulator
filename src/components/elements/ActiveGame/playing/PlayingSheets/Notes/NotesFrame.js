import React from "react";
import Note from "./Note";

const NotesFrame = ({
  charNote,
  updateCharNote,
  saveCharNote,
  missionNote,
  updateMissionNote,
  saveMissionNote
}) => {
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

export default NotesFrame