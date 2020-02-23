import { randomNote } from './theory';
import { FretboardCoord, NoteOpts } from './types';

export enum ActionType {
  FRETBOARD_CLICK = 'FRETBOARD_CLICK',

  NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS',
  RESET = 'RESET',

  TOGGLE_SHARPS = 'TOGGLE_SHARPS',
  TOGGLE_FLATS = 'TOGGLE_FLATS',
  TOGGLE_DOUBLE_SHARPS = 'TOGGLE_DOUBLE_SHARPS',
  TOGGLE_DOUBLE_FLATS = 'TOGGLE_DOUBLE_FLATS'
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

export function newNoteToGuess(opts: NoteOpts): NewNoteToGuessAction {
  const note = randomNote(opts);

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
  return {
    type: ActionType.RESET
  }
}

export function toggleSharps(): ToggleSharpsAction {
  return {
    type: ActionType.TOGGLE_SHARPS
  }
}

export function toggleFlats(): ToggleFlatsAction {
  return {
    type: ActionType.TOGGLE_FLATS
  }
}

export function toggleDoubleSharps(): ToggleDoubleSharpsAction {
  return {
    type: ActionType.TOGGLE_DOUBLE_SHARPS
  }
}

export function toggleDoubleFlats(): ToggleDoubleFlatsAction {
  return {
    type: ActionType.TOGGLE_DOUBLE_FLATS
  }
}

export type Action = NewNoteToGuessAction
  | FretboardClickAction | ResetAction
  | ToggleSharpsAction | ToggleFlatsAction
  | ToggleDoubleSharpsAction | ToggleDoubleFlatsAction;