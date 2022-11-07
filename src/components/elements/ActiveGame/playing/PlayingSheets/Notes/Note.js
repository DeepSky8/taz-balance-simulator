import React from "react";

const missionNoteGenre = 'Mission'
const charNoteGenre = 'Character'

const Note = ({ note, updateNote, saveNote }) => {
  const charNotePlaceholder = 'Character-specific notes (accessible on all missions)'
  const missionNotePlaceholder = 'Mission-specific notes (accessible only on this mission)'


  return (
    <span className="noteContainer">
      <label htmlFor={note.charID}>{note.charName}'s {note.genre} Notes: </label>
      <div>
        <textarea
          id={note.charID}
          name={note.charID}
          type="text"
          rows='6'
          columns='60'
          placeholder={note.genre === missionNoteGenre
            ? missionNotePlaceholder
            :
            note.genre === charNoteGenre
              ?
              charNotePlaceholder
              :
              "Put any kind of note in here, it doesn't really matter"
          }
          value={note.notes}
          onChange={(e) => {
            updateNote(e.target.value)
          }}
          onBlur={() => { saveNote() }}
        />
      </div>
    </span>
  )
}

export { missionNoteGenre, charNoteGenre, Note as default }