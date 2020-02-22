export type Note = string;

export interface FretboardCoord {
  string: number,
  fret: number
}

export interface FretboardDot extends FretboardCoord {
  color: string
}

export interface FretboardNote extends FretboardCoord {
  note: Note
}

export enum Status {
  PLAYING = 'PLAYING',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT'
}

export interface AppState {
  noteToGuess: string,
  clickedFret?: FretboardCoord,
  userScore: number,
  status: Status
}
