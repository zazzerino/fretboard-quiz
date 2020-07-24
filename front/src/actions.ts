import { randomNoteOnStrings } from './theory';
import { FretboardCoord, NoteOpts } from './types';
import * as http from './http';

export enum ActionType {
  FRETBOARD_CLICK = 'FRETBOARD_CLICK',

  NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS',
  RESET_QUIZ = 'RESET_QUIZ',

  // TOGGLE_SHARPS = 'TOGGLE_SHARPS',
  // TOGGLE_FLATS = 'TOGGLE_FLATS',
  // TOGGLE_DOUBLE_SHARPS = 'TOGGLE_DOUBLE_SHARPS',
  // TOGGLE_DOUBLE_FLATS = 'TOGGLE_DOUBLE_FLATS',
  TOGGLE_ACCIDENTAL = 'TOGGLE_ACCIDENTAL',
  TOGGLE_STRING = 'TOGGLE_STRING',

  TICK = 'TICK',

  ROUND_OVER = 'ROUND_OVER',

  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface ToggleStringAction {
  type: ActionType.TOGGLE_STRING,
  string: number
}

export function toggleString(stringNum: number): ToggleStringAction {
  return {
    type: ActionType.TOGGLE_STRING,
    string: stringNum
  }
}

export interface NewNoteToGuessAction {
  type: ActionType.NEW_NOTE_TO_GUESS,
  note: string
}

export function newNoteToGuess(opts: NoteOpts): NewNoteToGuessAction {
  const note = randomNoteOnStrings(opts);

  return {
    type: ActionType.NEW_NOTE_TO_GUESS,
    note,
  }
}

export interface FretboardClickAction {
  type: ActionType.FRETBOARD_CLICK,
  coord: FretboardCoord
}

export function fretboardClick(coord: FretboardCoord): FretboardClickAction {
  return {
    type: ActionType.FRETBOARD_CLICK,
    coord,
  }
}

export interface ResetQuizAction {
  type: ActionType.RESET_QUIZ
}

export function reset(): ResetQuizAction {
  return { type: ActionType.RESET_QUIZ };
}

export interface ToggleAccidentalAction {
  type: ActionType.TOGGLE_ACCIDENTAL,
  accidental: string,
}

export function toggleAccidental(accidental: string) {
  return {
    type: ActionType.TOGGLE_ACCIDENTAL,
    accidental,
  }
}

// export interface ToggleSharpsAction {
//   type: ActionType.TOGGLE_SHARPS
// }

// export function toggleSharps(): ToggleSharpsAction {
//   return { type: ActionType.TOGGLE_SHARPS };
// }

// export interface ToggleFlatsAction {
//   type: ActionType.TOGGLE_FLATS
// }

// export function toggleFlats(): ToggleFlatsAction {
//   return { type: ActionType.TOGGLE_FLATS };
// }

// export interface ToggleDoubleSharpsAction {
//   type: ActionType.TOGGLE_DOUBLE_SHARPS
// }

// export function toggleDoubleSharps(): ToggleDoubleSharpsAction {
//   return { type: ActionType.TOGGLE_DOUBLE_SHARPS };
// }

// export interface ToggleDoubleFlatsAction {
//   type: ActionType.TOGGLE_DOUBLE_FLATS
// }

// export function toggleDoubleFlats(): ToggleDoubleFlatsAction {
//   return { type: ActionType.TOGGLE_DOUBLE_FLATS };
// }

export interface TickAction {
  type: ActionType.TICK,
}

export function tick(): TickAction {
  return { type: ActionType.TICK };
}

export interface RoundOverAction {
  type: ActionType.ROUND_OVER,
}

export function roundOver(): RoundOverAction {
  return { type: ActionType.ROUND_OVER };
}

export interface LoginAction {
  type: ActionType.LOGIN,
  token: string | null,
  username: string | null,
}

export function login({ token, username }): LoginAction {
  return {
    type: ActionType.LOGIN,
    token,
    username,
  };
}

export function loginAsync({ username, password }) {
  return function(dispatch) {
    return http.getToken({ username, password })
      .then(data => {
        const { token, username } = data;
        dispatch(login({ token, username }));
      });
  }
}

export interface LogoutAction {
  type: ActionType.LOGOUT,
}

export function logout(): LogoutAction {
  return {
    type: ActionType.LOGOUT,
  }
}

export type Action = NewNoteToGuessAction
  | FretboardClickAction | ResetQuizAction
// | ToggleSharpsAction | ToggleFlatsAction
// | ToggleDoubleSharpsAction | ToggleDoubleFlatsAction
  | ToggleAccidentalAction | ToggleStringAction
  | TickAction
  | RoundOverAction | LoginAction | LogoutAction;
