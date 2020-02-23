import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types';
import { toggleSharps, toggleFlats, toggleDoubleSharps, toggleDoubleFlats } from '../actions';

export function SharpCheckbox() {
  const dispatch = useDispatch();
  const useSharps = useSelector((state: AppState) => state.noteOpts.useSharps);

  return (
    <div className="SharpCheckbox">
      <label htmlFor="useSharps">Sharps</label>
      <input type="checkbox"
        name="useSharps"
        checked={useSharps}
        onChange={() => dispatch(toggleSharps())}
      />
    </div>
  );
}

export function FlatCheckbox() {
  const dispatch = useDispatch();
  const useFlats = useSelector((state: AppState) => state.noteOpts.useFlats);

  return (
    <div className="FlatCheckbox">
      <label htmlFor="useFlats">Flats</label>
      <input type="checkbox"
        name="useFlats"
        checked={useFlats}
        onChange={() => dispatch(toggleFlats())}
      />
    </div>
  );
}

export function DoubleSharpCheckbox() {
  const dispatch = useDispatch();
  const useFlats = useSelector((state: AppState) => state.noteOpts.useDoubleSharps);

  return (
    <div className="DoubleSharpCheckbox">
      <label htmlFor="useDoubleSharps">Double sharps</label>
      <input type="checkbox"
        name="useDoubleSharps"
        checked={useFlats}
        onChange={() => dispatch(toggleDoubleSharps())}
      />
    </div>
  );
}

export function DoubleFlatCheckbox() {
  const dispatch = useDispatch();
  const useDoubleFlats = useSelector((state: AppState) => state.noteOpts.useDoubleFlats);

  return (
    <div className="DoubleFlatCheckbox">
      <label htmlFor="useDoubleFlats">Double flats</label>
      <input type="checkbox"
        name="useDoubleFlats"
        checked={useDoubleFlats}
        onChange={() => dispatch(toggleDoubleFlats())}
      />
    </div>
  );
}