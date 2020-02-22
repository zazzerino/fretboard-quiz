import { randomNoteInRange } from './theory';
import { FretboardCoord } from './types';

export enum ActionType {
  NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS',
  FRETBOARD_CLICK = 'FRETBOARD_CLICK',
  RESET = 'RESET'
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

export function newNoteToGuess(): NewNoteToGuessAction {
  const note = randomNoteInRange('E3', 'G#5');

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

export type Action = NewNoteToGuessAction | FretboardClickAction | ResetAction;