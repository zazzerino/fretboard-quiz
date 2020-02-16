import { Action, NEW_NOTE_TO_GUESS, FRETBOARD_CLICK } from './actions';
import { AppState } from './types';
import { randomNoteInRange } from './theory';

function makeInitialState(): AppState {
  return {
    noteToGuess: randomNoteInRange('E3', 'G#5'),
    // clickedFret: { string: 3, fret: 2 }
  }
}

export function rootReducer(state = makeInitialState(), action: Action): AppState {
  switch (action.type) {
    case NEW_NOTE_TO_GUESS:
      return {
        ...state,
        noteToGuess: action.payload
      }

    case FRETBOARD_CLICK:
      return {
        ...state,
        clickedFret: action.payload
      }

    default:
      return state
  }
}