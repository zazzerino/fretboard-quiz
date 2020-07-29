import { NoteOpts, FretboardNote, FretboardCoord } from './types';
import { randomElement } from './util';

export function parseNote(note: string) {
  const noteRegex = /([a-zA-Z])(#{1,2}||b{1,2})\/?(\d)/g;
  const res = noteRegex.exec(note);

  if (res != null) {
    const [, whiteKey, accidental, octave] = res;
    return { whiteKey, accidental, octave };
  } else {
    throw new Error(`${note} could not be parsed.`);
  }
}

export function midiNum(notename: string) {
  const whiteKeyOffsets = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11
  };

  const accidentalOffsets = {
    'bb': -2,
    'b': -1,
    '': 0,
    '#': 1,
    '##': 2
  };

  const { whiteKey, accidental, octave } = parseNote(notename);

  return (whiteKeyOffsets[whiteKey]
    + accidentalOffsets[accidental]
    + (12 * (parseInt(octave) + 1)));
}

export const defaultNoteOpts: NoteOpts = {
  octaves: [3, 4, 5, 6],
  whiteKeys: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  lowestNote: 'E3',
  highestNote: 'G#5',
  accidentals: ['b', '', '#'],
  strings: [1,2,3,4,5,6],
  fretCount: 4,
  startFret: 0,
}

function generateNote(userOpts: NoteOpts = {}): string {
  const opts = { ...defaultNoteOpts, ...userOpts };

  const whiteKeys = opts.whiteKeys;
  const accidentals = opts.accidentals;
  const octaves = opts.octaves;

  const whiteKey = randomElement(whiteKeys);
  const accidental = randomElement(accidentals);
  const octave = randomElement(octaves);

  return whiteKey + accidental + octave;
}

export function randomNote(userOpts: NoteOpts = {}): string {
  const opts = { ...defaultNoteOpts, ...userOpts };

  const lowestMidi = midiNum(opts.lowestNote);
  const highestMidi = midiNum(opts.highestNote);

  let note: string;
  let midi: number;

  do {
    note = generateNote(userOpts);
    midi = midiNum(note);
  } while (midi < lowestMidi || midi > highestMidi);

  return note;
}

export function randomNoteOnStrings(userOpts: NoteOpts = {}): string {
  const opts = { ...defaultNoteOpts, ...userOpts };
  let midiNums: number[] = [];

  for (let string of opts.strings) {
    for (let fret = opts.startFret; fret < opts.fretCount; fret++) {
      const note = findNoteAt({ string, fret });
      midiNums.push(midiNum(note));
    }
  }

  let randNote: string;
  do {
    randNote = randomNote(opts);
  } while (!midiNums.includes(midiNum(randNote)));

  return randNote;
}

export function transposeNote(notename: string, halfSteps: number) {
  const chromaticSharps =
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const chromaticFlats =
    ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const { whiteKey, accidental, octave } = parseNote(notename);
  const pitch = whiteKey + accidental;
  const indexSharps = chromaticSharps.indexOf(pitch);
  const indexFlats = chromaticFlats.indexOf(pitch);

  const [arr, idx] = indexSharps === -1 ?
    [chromaticFlats, indexFlats] : [chromaticSharps, indexSharps];

  const offset = idx + halfSteps;
  const transposedPitch = arr[((offset % 12) + 12) % 12];
  const transposedOctave = parseInt(octave) + Math.floor(offset / 12);

  return transposedPitch + transposedOctave.toString();
}

const standardTuning = ['E3', 'A3', 'D4', 'G4', 'B4', 'E5'];

export function fretboardNotes(tuning = standardTuning,
                               startFret = 0,
                               fretCount = 4): FretboardNote[] {
  const notes: { string: number, fret: number, note: string }[] = [];

  for (let string = 0; string < tuning.length; string++) {
    for (let fret = startFret; fret <= fretCount; fret++) {
      notes.push({
        string: Math.abs(string - tuning.length),
        fret: fret,
        note: transposeNote(tuning[string], fret)
      });
    }
  }

  return notes;
}

export function findNoteAt(coord: FretboardCoord, notes = fretboardNotes()) {
  return notes.find(note => {
    return note.string === coord.string && note.fret === coord.fret;
  }).note;
}

export function isEnharmonic(...notes: string[]): boolean {
  const firstMidi = notes[0] ? midiNum(notes[0]) : null;

  return notes.every(note => {
    return firstMidi === midiNum(note);
  });
}

export function isCorrectGuess(noteToGuess: string,
                               clickedFret: FretboardCoord | null) {
  if (clickedFret == null) { return false };

  const guessedNote = findNoteAt(clickedFret);

  return isEnharmonic(noteToGuess, guessedNote);
}

export function findFret(note: string,
                         notes = fretboardNotes()): FretboardCoord {
  return notes.find(fretboardNote => {
    return isEnharmonic(note, fretboardNote.note)
  });
}
