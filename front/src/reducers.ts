import { Action, FretboardClickAction, NewNoteToGuessAction, ActionType,
         ToggleStringAction, TickAction, LoginAction,
         LogoutAction } from './actions';
import { AppState, User, Quiz, Score, GuessStatus, NoteOpts } from './types';
import { randomNote, isCorrectGuess, defaultNoteOpts,
         randomNoteOnStrings } from './theory';
import { correctSound, incorrectSound } from './audio';
import { toggleElement } from './util';
import { combineReducers } from 'redux';

const defaultRoundLength = 20;

function makeInitialState(): AppState {
  const note = randomNoteOnStrings();

  return {
    noteOpts: defaultNoteOpts,
    quiz: {
      roundLength: defaultRoundLength,
      secondsLeft: defaultRoundLength,
      noteToGuess: null,
      clickedFret: null,
      guessStatus: null,
      history: [],
    },
    user: {
      username: null,
      token: null,
    },
    scores: [],
  }
}

const initialState = makeInitialState();

// function handleTick(state: AppState, action: TickAction) {
//   let status = state.status;

//   switch (status) {
//     case Status.PLAYING:
//       let secondsLeft = state.secondsLeft;

//       if (secondsLeft <= 0) {
//         status = Status.ROUND_OVER;
//       } else {
//         secondsLeft = secondsLeft - 1;
//       }

//       return { ...state, secondsLeft, status };

//     default:
//       return state;
//   }
// }

export function scores(state = initialState.scores, action: Action): Score[] {
  return state;
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
      const isCorrect = isCorrectGuess(state.noteToGuess, action.coord);
      const guessStatus =
        isCorrect ? GuessStatus.CORRECT : GuessStatus.INCORRECT;
      const history = state.history.concat([{
        noteToGuess: state.noteToGuess,
        clickedFret: action.coord,
        isCorrect
      }]);

      return {
        ...state,
        clickedFret: action.coord,
        guessStatus,
        history
      };

    case ActionType.RESET_QUIZ:
      return initialState.quiz;

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
        username: action.username
      }

    case ActionType.LOGOUT:
      return {
        ...state,
        token: null,
        username: null
      }

    default:
      return state;
  }
}

export const rootReducer = combineReducers({ quiz, scores, noteOpts, user });
