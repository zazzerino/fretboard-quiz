import { Action, FretboardClickAction, NewNoteToGuessAction, ActionType, ToggleStringAction, TickAction } from './actions';
import { AppState, Status, GuessStatus } from './types';
import { randomNote, isCorrectGuess, defaultNoteOpts } from './theory';
import { coinSound, bowserFallsSound } from './audio';

const defaultRoundLength = 20;

function makeInitialState(): AppState {
  const note = randomNote(defaultNoteOpts);

  return {
    noteToGuess: note,
    clickedFret: null,
    status: Status.PLAYING,
    guessStatus: null,
    guesses: [],
    noteOpts: defaultNoteOpts,
    roundLength: defaultRoundLength,
    secondsLeft: defaultRoundLength,
  }
}

function handleNewNoteToGuess(state: AppState, action: NewNoteToGuessAction): AppState {
  return {
    ...state,
    noteToGuess: action.payload,
    clickedFret: null,
    guessStatus: null,
    status: Status.PLAYING,
  };
}

function handleFretboardClick(state: AppState, action: FretboardClickAction): AppState {
  const isCorrect = isCorrectGuess(state.noteToGuess, action.payload);
  const guessStatus = isCorrect ? GuessStatus.CORRECT : GuessStatus.INCORRECT;

  isCorrect ? coinSound.play() : bowserFallsSound.play();

  const guesses = state.guesses.concat([{
    noteToGuess: state.noteToGuess,
    clickedFret: action.payload,
    isCorrect
  }]);

  return {
    ...state,
    clickedFret: action.payload,
    guessStatus,
    guesses
  };
}

function updateNoteOpts(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionType.TOGGLE_SHARPS:
      const sharpOpts = { ...state.noteOpts, useSharps: !state.noteOpts.useSharps };
      return { ...state, noteOpts: sharpOpts };

    case ActionType.TOGGLE_FLATS:
      const flatOpts = { ...state.noteOpts, useFlats: !state.noteOpts.useFlats };
      return { ...state, noteOpts: flatOpts };

    case ActionType.TOGGLE_DOUBLE_SHARPS:
      const doubleSharpOpts = { ...state.noteOpts, useDoubleSharps: !state.noteOpts.useDoubleSharps };
      return { ...state, noteOpts: doubleSharpOpts };

    case ActionType.TOGGLE_DOUBLE_FLATS:
      const doubleFlatOpts = { ...state.noteOpts, useDoubleFlats: !state.noteOpts.useDoubleFlats };
      return { ...state, noteOpts: doubleFlatOpts };
  }
}

function toggleElement<T>(array: T[], elem: T): T[] {
  if (array.includes(elem)) {
    return array.filter((e: T) => {
      return e !== elem;
    });
  } else {
    return [...array, elem];
  }
}

function handleToggleString(state: AppState, action: ToggleStringAction) {
  const stringsToUse = toggleElement(state.noteOpts.stringsToUse, action.payload)
  const noteOpts = { ...state.noteOpts, stringsToUse };

  return { ...state, noteOpts };
}

function handleTick(state: AppState, action: TickAction) {
  let status = state.status;

  switch (status) {
    case Status.PLAYING:
      let secondsLeft = state.secondsLeft;

      if (secondsLeft <= 0) {
        status = Status.ROUND_OVER
      } else {
        secondsLeft = secondsLeft - 1;
      }

      return { ...state, secondsLeft, status };

    default:
      return state;
  }
}

export function rootReducer(state = makeInitialState(), action: Action): AppState {
  switch (action.type) {
    case ActionType.NEW_NOTE_TO_GUESS:
      return handleNewNoteToGuess(state, action);

    case ActionType.FRETBOARD_CLICK:
      return handleFretboardClick(state, action);

    case ActionType.RESET:
      return makeInitialState();

    case ActionType.TOGGLE_SHARPS:
    case ActionType.TOGGLE_FLATS:
    case ActionType.TOGGLE_DOUBLE_SHARPS:
    case ActionType.TOGGLE_DOUBLE_FLATS:
      return updateNoteOpts(state, action);

    case ActionType.TOGGLE_STRING:
      return handleToggleString(state, action);

    case ActionType.TICK:
      return handleTick(state, action);

    default:
      return state;
  }
}