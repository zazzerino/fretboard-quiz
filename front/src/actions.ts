import { randomNoteOnStrings } from './theory';
import { FretboardCoord, NoteOpts } from './types';

export enum ActionType {
  FRETBOARD_CLICK = 'FRETBOARD_CLICK',

  NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS',
  RESET = 'RESET',

  TOGGLE_SHARPS = 'TOGGLE_SHARPS',
  TOGGLE_FLATS = 'TOGGLE_FLATS',
  TOGGLE_DOUBLE_SHARPS = 'TOGGLE_DOUBLE_SHARPS',
  TOGGLE_DOUBLE_FLATS = 'TOGGLE_DOUBLE_FLATS',

  TOGGLE_STRING = 'TOGGLE_STRING',

  TICK = 'TICK',

  SHOW_SCORES = 'SHOW_SCORES',
  SHOW_SETTINGS = 'SHOW_SETTINGS',

  ROUND_OVER = 'ROUND_OVER',
}

export interface NewNoteToGuessAction {
  type: ActionType.NEW_NOTE_TO_GUESS,
  payload: string
}

export interface FretboardClickAction {
  type: ActionType.FRETBOARD_CLICK,
  payload: FretboardCoord
}

export interface ResetAction {
  type: ActionType.RESET
}

export interface ToggleSharpsAction {
  type: ActionType.TOGGLE_SHARPS
}

export interface ToggleFlatsAction {
  type: ActionType.TOGGLE_FLATS
}

export interface ToggleDoubleSharpsAction {
  type: ActionType.TOGGLE_DOUBLE_SHARPS
}

export interface ToggleDoubleFlatsAction {
  type: ActionType.TOGGLE_DOUBLE_FLATS
}

export interface ToggleStringAction {
  type: ActionType.TOGGLE_STRING,
  payload: number
}

export interface TickAction {
  type: ActionType.TICK,
}

export interface ShowScoresAction {
  type: ActionType.SHOW_SCORES,
}

export interface ShowSettingsAction {
  type: ActionType.SHOW_SETTINGS,
}

export interface RoundOverAction {
  type: ActionType.ROUND_OVER,
}

export function toggleString(stringNum: number): ToggleStringAction {
  return {
    type: ActionType.TOGGLE_STRING,
    payload: stringNum
  }
}

export function newNoteToGuess(opts: NoteOpts): NewNoteToGuessAction {
  // const note = randomNote(opts);
  const note = randomNoteOnStrings(opts);

  return {
    type: ActionType.NEW_NOTE_TO_GUESS,
    payload: note
  }
}

export function fretboardClick(coord: FretboardCoord): FretboardClickAction {
  return {
    type: ActionType.FRETBOARD_CLICK,
    payload: coord
  }
}

export function reset(): ResetAction {
  return { type: ActionType.RESET };
}

export function toggleSharps(): ToggleSharpsAction {
  return { type: ActionType.TOGGLE_SHARPS };
}

export function toggleFlats(): ToggleFlatsAction {
  return { type: ActionType.TOGGLE_FLATS };
}

export function toggleDoubleSharps(): ToggleDoubleSharpsAction {
  return { type: ActionType.TOGGLE_DOUBLE_SHARPS };
}

export function toggleDoubleFlats(): ToggleDoubleFlatsAction {
  return { type: ActionType.TOGGLE_DOUBLE_FLATS };
}

export function tick(): TickAction {
  return { type: ActionType.TICK };
}

export function showScores(): ShowScoresAction {
  return { type: ActionType.SHOW_SCORES };
}

export function showSettings(): ShowSettingsAction {
  return { type: ActionType.SHOW_SETTINGS };
}

export function roundOver(): RoundOverAction {
  return { type: ActionType.ROUND_OVER };
}

export type Action = NewNoteToGuessAction
  | FretboardClickAction | ResetAction
  | ToggleSharpsAction | ToggleFlatsAction
  | ToggleDoubleSharpsAction | ToggleDoubleFlatsAction
  | ToggleStringAction | TickAction
  | ShowScoresAction | ShowSettingsAction
  | RoundOverAction;
