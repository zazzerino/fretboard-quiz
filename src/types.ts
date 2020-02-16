export interface AppState {
  noteToGuess: string,
  clickedFret?: FretboardCoord
}

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