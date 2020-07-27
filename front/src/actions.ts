import { randomNoteOnStrings, isCorrectGuess } from './theory';
import { FretboardCoord, NoteOpts, GuessStatus, Score } from './types';
import * as http from './http';
import { correctSound, incorrectSound } from './audio';

export enum ActionType {
  FRETBOARD_CLICK = 'FRETBOARD_CLICK',
  NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS',
  RESET_QUIZ = 'RESET_QUIZ',
  TOGGLE_ACCIDENTAL = 'TOGGLE_ACCIDENTAL',
  TOGGLE_STRING = 'TOGGLE_STRING',
  TICK = 'TICK',
  ROUND_OVER = 'ROUND_OVER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOAD_SCORES = 'LOAD_SCORES',
  SUBMIT_SCORE = 'SUBMIT_SCORE',
  FLASH_MESSAGE = 'FLASH_MESSAGE',
  HIDE_FLASH = 'HIDE_FLASH',
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
  noteToGuess: string,
  guessStatus: GuessStatus,
}

export function fretboardClick({ noteToGuess, coord }): FretboardClickAction {
  const guessStatus = isCorrectGuess(noteToGuess, coord) ?
    'correct' : 'incorrect';

  if (guessStatus === 'correct') {
    correctSound.play();
  } else {
    incorrectSound.play();
  }

  return {
    type: ActionType.FRETBOARD_CLICK,
    coord,
    noteToGuess,
    guessStatus,
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
  name: string | null,
}

export function login({ token, name }): LoginAction {
  return {
    type: ActionType.LOGIN,
    token,
    name,
  };
}

export function loginAsync({ name, password }) {
  return async function(dispatch) {
    return http.getToken({ name, password })
      .then(data => {
        const { token, name } = data;
        if (token != null && name != null) {
          dispatch(flashMessage(`logged in as ${name}`))
          dispatch(login({ token, name }));
        } else {
          dispatch(flashMessage('incorrect username or password'));
        }
      })
      .catch(error => dispatch(flashMessage(`error: ${error}`)));
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

export function logoutAsync({ token }) {
  return async function(dispatch) {
    http.revokeToken({ token })
      .then(response => {
        console.log(response);
        dispatch(logout());
      })
  }
}

export interface LoadScoresAction {
  type: ActionType.LOAD_SCORES,
  scores: Score[],
}

export function loadScores(scores: Score[]): LoadScoresAction {
  return {
    type: ActionType.LOAD_SCORES,
    scores,
  }
}

export function loadScoresAsync() {
  return async function(dispatch) {
    http.getScores()
      .then(scores => dispatch(loadScores(scores)));
  }
}

export interface SubmitScoreAction {
  type: ActionType.SUBMIT_SCORE,
  score: number,
  token: string,
  name: string,
}

export function submitScore({ score, name, token }): SubmitScoreAction {
  return {
    type: ActionType.SUBMIT_SCORE,
    score,
    token,
    name,
  }
}

export function submitScoreAsync({ score, name, token }) {
  return async function(dispatch) {
    http.submitScore({ score, name, token })
      .then(() => dispatch(submitScore({ score, name, token })))
  }
}

export interface FlashMessageAction {
  type: ActionType.FLASH_MESSAGE,
  message: string
}

export function flashMessage(message): FlashMessageAction {
  return {
    type: ActionType.FLASH_MESSAGE,
    message
  }
}

export interface HideFlashAction {
    type: ActionType.HIDE_FLASH,
}

export function hideFlash(): HideFlashAction {
  return {
    type: ActionType.HIDE_FLASH
  }
}

export type Action = NewNoteToGuessAction
  | FretboardClickAction | ResetQuizAction
  | ToggleAccidentalAction | ToggleStringAction
  | TickAction | RoundOverAction
  | LoadScoresAction | SubmitScoreAction
  | FlashMessageAction | HideFlashAction
  | LoginAction | LogoutAction;
