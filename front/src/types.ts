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

export enum Status {
  INIT = 'INIT',
  PLAYING = 'PLAYING',
  ROUND_OVER = 'ROUND_OVER',
  SHOW_SETTINGS = 'SHOW_SETTINGS',
  SHOW_SCORES = 'SHOW_SCORES',
}

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
  accidentalsToUse: string[],
  stringsToUse: number[],
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

export interface QuizState {
  noteToGuess: string,
  clickedFret: FretboardCoord | null,
  guessStatus: GuessStatus,
}

export interface History {
  guesses: Guess[]
}

export interface AppState {
  noteOpts: NoteOpts,
  quiz: QuizState,
  user: User,
}

// export interface AppState {
//   noteToGuess: string,
//   clickedFret?: FretboardCoord,
//   status: Status,
//   guesses: Guess[],
//   guessStatus: GuessStatus,
//   noteOpts: NoteOpts,
//   roundLength: number, // in seconds
//   secondsLeft: number,
//   scores?: Score[],
//   token: string | null,
//   username: string | null,
// }
