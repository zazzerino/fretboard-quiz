import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types';
import { toggleAccidental } from '../actions';

function AccidentalCheckbox({ name, accidental }) {
  const dispatch = useDispatch();
  const shouldUse = useSelector((state: AppState) => {
    return state.noteOpts.accidentals.includes(accidental);
  });

  return (
    <div className="AccidentalCheckbox">
      <label htmlFor={name}>{name}</label>
      <input type="checkbox"
             name={name}
             checked={shouldUse}
             onChange={() => dispatch(toggleAccidental(accidental))}
      />
    </div>
  );
}

function SharpCheckbox() {
  return <AccidentalCheckbox name="sharps" accidental="#" />
}

function FlatCheckbox() {
  return <AccidentalCheckbox name="flats" accidental="b" />
}

function DoubleSharpCheckbox() {
  return <AccidentalCheckbox name="double-sharps" accidental="##" />
}

function DoubleFlatCheckbox() {
  return <AccidentalCheckbox name="double-flats" accidental="bb" />
}

export function AccidentalSelect(props: any) {
  return (
    <div className="AccidentalSelect">
      <p>Accidentals</p>
      <div className="accidental-checkboxes">
        <SharpCheckbox />
        <FlatCheckbox />
        <DoubleSharpCheckbox />
        <DoubleFlatCheckbox />
      </div>
    </div>
  )
}
