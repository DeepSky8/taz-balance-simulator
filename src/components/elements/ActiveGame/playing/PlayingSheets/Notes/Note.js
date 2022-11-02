import React from "react";

const Note = ({ note, setNote, saveNote }) => {
  const charNotePlaceholder = 'Character-specific notes (accessible on all missions)'
  const missionNotePlaceholder = 'Mission-specific notes (accessible only on this mission)'
  const missionNoteType = 'Mission'
  // const charNoteType = 'Character'

  return (
    <span>
      <label htmlFor={note.charID}>{note.charName}'s {note.genre} Notes: </label>
      <div>
        <textarea
          id={note.charID}
          name={note.charID}
          type="text"
          rows='6'
          columns='60'
          placeholder={note.genre === missionNoteType ? missionNotePlaceholder : charNotePlaceholder}
          value={note.notes}
          onChange={(e) => {
            setNote(e.target.value)
          }}
          onBlur={() => { saveNote() }}
        />
      </div>
    </span>
  )
}

export default Note

// Need to update char name to reflect current local player/current local note