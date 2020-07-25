import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../types';
import { newNoteToGuess, reset } from '../actions';
import { StringSelect } from './StringSelect';
import { AccidentalSelect } from './AccidentalCheckbox';

export function SettingsMenu(props: any) {
  const dispatch = useDispatch();
  const noteOpts = useSelector((app: AppState) => app.noteOpts)
  const history = useHistory();

  return (
    <div className="SettingsMenu">
      <h1>Settings</h1>
      <StringSelect />
      <AccidentalSelect />
      <button onClick={() => {
        dispatch(reset());
        dispatch(newNoteToGuess(noteOpts));
        history.push('/play');
      }}>
        Start
      </button>
    </div>
  );
}
