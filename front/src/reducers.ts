import { Action, ActionType } from './actions';
import { AppState, User, Quiz, NoteOpts, Scores } from './types';
import { defaultNoteOpts } from './theory';
import { toggleElement } from './util';
import { combineReducers } from 'redux';

const defaultRoundLength = 20;

const initialState: AppState = {
  noteOpts: defaultNoteOpts,
  quiz: {
    roundLength: defaultRoundLength,
    secondsLeft: defaultRoundLength,
    noteToGuess: null,
    clickedFret: null,
    guessStatus: null,
    history: [],
    status: 'PLAYING',
  },
  user: {
    name: null,
    token: null,
  },
  scores: {
    history: [],
    submittedId: null,
  },
  flashMessage: null,
}

export function scores(state = initialState.scores,
                       action: Action): Scores {
  switch (action.type) {
    case ActionType.LOAD_SCORES:
      return { ...state, history: action.scores };

    case ActionType.SUBMIT_SCORE:
      return { ...state, submittedId: action.id };

    default:
      return state;
  }
}

export function quiz(state = initialState.quiz, action: Action): Quiz {
  switch (action.type) {
    case ActionType.NEW_NOTE_TO_GUESS:
      return {
        ...state,
        noteToGuess: action.note,
        clickedFret: null,
        guessStatus: null,
      };

    case ActionType.FRETBOARD_CLICK:
      const guessStatus = action.guessStatus;
      const history = state.history.concat([{
        noteToGuess: state.noteToGuess,
        clickedFret: action.coord,
        guessStatus,
      }]);
      return {
        ...state,
        clickedFret: action.coord,
        guessStatus,
        history
      };

    case ActionType.RESET_QUIZ:
      return initialState.quiz;

    case ActionType.TICK:
      const secondsLeft = state.secondsLeft - 1;
      return secondsLeft < 0 ?
        { ...state }
        : { ...state, secondsLeft };

    default:
      return state;
  }
}

export function noteOpts(state = initialState.noteOpts,
                         action: Action): NoteOpts {
  switch (action.type) {
    case ActionType.TOGGLE_ACCIDENTAL:
      const accidentals = toggleElement(state.accidentals, action.accidental);
      return { ...state, accidentals };

    case ActionType.TOGGLE_STRING:
      const strings = toggleElement(state.strings, action.string);
      return { ...state, strings }

    default:
      return state;
  }
}

export function user(state = initialState.user, action: Action): User {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        token: action.token,
        name: action.name
      }

    case ActionType.LOGOUT:
      return {
        ...state,
        token: null,
        name: null
      }

    default:
      return state;
  }
}

export function flashMessage(state = initialState.flashMessage,
                             action: Action): string {
  switch (action.type) {
    case ActionType.FLASH_MESSAGE:
      return action.message;

    case ActionType.HIDE_FLASH:
      return null;

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  quiz, scores, noteOpts, user, flashMessage
});
