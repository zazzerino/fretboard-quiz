import * as t from './theory';

it('parses notes', () => {
  expect(t.parseNote('C4')).toEqual({
    whiteKey: 'C',
    accidental: '',
    octave: '4'
  });

  expect(t.parseNote('C##4')).toEqual({
    whiteKey: 'C',
    accidental: '##',
    octave: '4'
  });
});

it('finds the midi num', () => {
  expect(t.midiNum('C4')).toBe(60);
  expect(t.midiNum('Gbb3')).toBe(53);
});

it('gens a random note', () => {
  let randNote = t.randomNote();
  let parsedNote = t.parseNote(randNote);

  expect(typeof parsedNote.whiteKey == 'string').toBe(true);
  expect(typeof parsedNote.accidental == 'string').toBe(true);
  expect(typeof parsedNote.octave == 'string').toBe(true);
});
