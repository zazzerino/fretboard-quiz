export interface FretboardCoord {
  string: number,
  fret: number,
}

export interface FretboardDot extends FretboardCoord {
  color: string
}

export interface FretboardNote extends FretboardCoord {
  note: string
}

// export enum Status {
//   INIT = 'INIT',
//   PLAYING = 'PLAYING',
//   ROUND_OVER = 'ROUND_OVER',
//   SHOW_SETTINGS = 'SHOW_SETTINGS',
//   SHOW_SCORES = 'SHOW_SCORES',
// }

export enum GuessStatus {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}

export interface Guess {
  clickedFret: FretboardCoord,
  noteToGuess: string,
  isCorrect: boolean,
}

export interface NoteOpts {
  octaves?: number[],
  whiteKeys?: string[],
  lowestNote?: string,
  highestNote?: string,
  accidentals?: string[],
  strings?: number[],
  fretCount?: number,
  startFret?: number,
}

export interface Score {
  username: string,
  value: number,
  timestamp: string,
}

export interface User {
  username: string,
  token: string,
}

export interface Quiz {
  roundLength: number,
  secondsLeft: number,
  noteToGuess: string,
  clickedFret: FretboardCoord | null,
  guessStatus: GuessStatus,
  history: Guess[]
}

export interface AppState {
  noteOpts: NoteOpts,
  quiz: Quiz,
  user: User,
  scores: Score[],
}
