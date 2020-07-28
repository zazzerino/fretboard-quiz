export interface FretboardCoord {
  string: number,
  fret: number,
}

export interface FretboardNote extends FretboardCoord {
  note: string
}

export type GuessStatus = 'correct' | 'incorrect';

export interface Guess {
  clickedFret: FretboardCoord,
  noteToGuess: string,
  guessStatus: GuessStatus,
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
  id: number,
  name: string,
  value: number,
  timestamp: string,
}

export interface Scores {
  history: Score[],
  submittedId: number,
}

export interface User {
  name: string,
  token: string,
}

export type QuizStatus = 'playing' | 'roundover';

export interface Quiz {
  roundLength: number,
  secondsLeft: number,
  noteToGuess: string,
  clickedFret: FretboardCoord | null,
  guessStatus: GuessStatus,
  history: Guess[],
  status: QuizStatus,
}

export interface AppState {
  noteOpts: NoteOpts,
  quiz: Quiz,
  user: User,
  scores: Scores,
  flashMessage: string,
}
