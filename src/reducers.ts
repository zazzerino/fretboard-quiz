import { Action, FretboardClickAction, NewNoteToGuessAction, ActionType } from './actions';
import { AppState, Status } from './types';
import { randomNoteInRange, isCorrectGuess } from './theory';

function makeInitialState(): AppState {
  return {
    noteToGuess: randomNoteInRange('E3', 'G#5'),
    clickedFret: null,
    status: Status.PLAYING,
    guesses: []
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
  const status = isCorrect ? Status.CORRECT : Status.INCORRECT;
  const guesses = state.guesses.concat([{
    noteToGuess: state.noteToGuess,
    clickedFret: action.payload,
    isCorrect
  }]);

  return {
    ...state,
    clickedFret: action.payload,
    status,
    guesses
  }
}

export function rootReducer(state = makeInitialState(), action: Action): AppState {
  switch (action.type) {
    case ActionType.NEW_NOTE_TO_GUESS:
      return newNoteToGuess(state, action);

    case ActionType.FRETBOARD_CLICK:
      return fretboardClick(state, action);

    case ActionType.RESET:
      return makeInitialState();

    default:
      return state
  }
}