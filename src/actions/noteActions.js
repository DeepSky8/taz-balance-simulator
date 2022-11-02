export const setNoteAuth = (uid, charID, charName, genre) => ({
  type: 'SET_AUTH',
  uid,
  charID,
  charName,
  genre
})

export const setNoteText = (notes) => ({
  type: 'SET_NOTES',
  notes
})

export const receivedNote = (fullNote) => ({
  type: 'RECEIVED_NOTE',
  fullNote
})

export const clearNote = () => ({
  type: 'CLEAR_NOTE'
})