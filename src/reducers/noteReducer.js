

const defaultNotePad = {
  uid: '',
  charID: '',
  charName: '',
  notes: '',
  genre: '',
}

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...defaultNotePad,
        ...state,
        uid: action.uid,
        charID: action.charID,
        charName: action.charName,
        genre: action.genre
      }
    case 'SET_NOTES':
      return {
        ...defaultNotePad,
        ...state,
        notes: action.notes
      }
    case 'RECEIVED_NOTE':
      return {
        ...action.fullNote
      }
    case 'CLEAR_NOTE':
      return {
        ...defaultNotePad
      }
    default:
      return state
  }
}

export { defaultNotePad, noteReducer }