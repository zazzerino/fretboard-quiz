import { randomNoteInRange } from './theory';
import { FretboardCoord } from './types';

export const NEW_NOTE_TO_GUESS = 'NEW_NOTE_TO_GUESS';
export const FRETBOARD_CLICK = 'FRETBOARD_CLICK';

interface NewNoteToGuessAction {
  type: typeof NEW_NOTE_TO_GUESS,
  payload: string
}

interface FretboardClickAction {
  type: typeof FRETBOARD_CLICK,
  payload: FretboardCoord
}

export function newNoteToGuess(): NewNoteToGuessAction {
  const note = randomNoteInRange('E3', 'G#5');

  return {
    type: NEW_NOTE_TO_GUESS,
    payload: note
  }
}

export function fretboardClick(coord: FretboardCoord): FretboardClickAction {
  return {
    type: FRETBOARD_CLICK,
    payload: coord
  }
}

export type Action = NewNoteToGuessAction | FretboardClickAction;
