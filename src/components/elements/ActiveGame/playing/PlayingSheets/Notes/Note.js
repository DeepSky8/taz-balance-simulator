import React from "react";

const Note = ({ note, charName, setNote, saveNote, placeholderText, id, type }) => {
  return (
    <span>
      <label htmlFor={id}>{charName}'s {type} Notes: </label>
      <div>
        <textarea
          id={id}
          name={id}
          type="text"
          rows='6'
          columns='60'
          placeholder={placeholderText}
          value={note}
          onChange={(e) => {
            setNote(e.target.value, id)
          }}
          onBlur={() => { saveNote() }}
        />
      </div>
    </span>
  )
}

export default Note

// Need to update char name to reflect current local player/current local note