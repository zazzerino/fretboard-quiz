export interface FretboardCoord {
  string: number,
  fret: number
}

export interface FretboardDot extends FretboardCoord {
  color: string
}

export interface FretboardNote extends FretboardCoord {
  note: string
}

export enum Status {
  PLAYING = 'PLAYING',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT'
}

export interface Guess {
  clickedFret: FretboardCoord,
  noteToGuess: string,
  isCorrect: boolean
}

export interface NoteOpts {
  useSharps?: boolean,
  useFlats?: boolean,
  useDoubleSharps?: boolean,
  useDoubleFlats?: boolean,
  octaves?: number[],
  whiteKeys?: string[],
  lowestNote?: string,
  highestNote?: string,
  stringsToUse?: number[]
}

export interface AppState {
  noteToGuess: string,
  clickedFret?: FretboardCoord,
  status: Status,
  guesses: Guess[],
  noteOpts: NoteOpts,
  roundLength: number, // in seconds
  secondsLeft: number,
}