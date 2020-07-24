import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../types';
import { newNoteToGuess } from '../actions';
import { StringSelect } from './StringSelect';
import { AccidentalSelect } from './AccidentalCheckbox';

export function SettingsMenu(props: any) {
  const dispatch = useDispatch();
  const noteOpts = useSelector((app: AppState) => app.noteOpts)
  const history = useHistory();

  return (
    <div className="SettingsMenu">
      <StringSelect />
      <AccidentalSelect />
      <button onClick={() => {
        dispatch(newNoteToGuess(noteOpts));
        history.push('/play');
      }}>
        Start
      </button>
    </div>
  );
}
