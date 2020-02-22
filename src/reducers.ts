import { Action, FretboardClickAction, NewNoteToGuessAction, NEW_NOTE_TO_GUESS, FRETBOARD_CLICK } from './actions';
import { AppState, Status } from './types';
import { randomNoteInRange, isCorrectGuess } from './theory';

function makeInitialState(): AppState {
  return {
    noteToGuess: randomNoteInRange('E3', 'G#5'),
    clickedFret: null,
    userScore: 0,
    status: Status.PLAYING
  }
}

function newNoteToGuess(state: AppState, action: NewNoteToGuessAction): AppState {
  return {
    ...state,
    noteToGuess: action.payload,
    clickedFret: null,
    status: Status.PLAYING
  }
}

function fretboardClick(state: AppState, action: FretboardClickAction): AppState {
  const isCorrect = isCorrectGuess(state.noteToGuess, action.payload);
  const newScore = isCorrect ? state.userScore + 1 : state.userScore - 1;
  const status = isCorrect ? Status.CORRECT : Status.INCORRECT;

  return {
    ...state,
    clickedFret: action.payload,
    userScore: newScore,
    status
  }
}

export function rootReducer(state = makeInitialState(), action: Action): AppState {
  switch (action.type) {
    case NEW_NOTE_TO_GUESS:
      return newNoteToGuess(state, action);

    case FRETBOARD_CLICK:
      return fretboardClick(state, action);

    default:
      return state
  }
}