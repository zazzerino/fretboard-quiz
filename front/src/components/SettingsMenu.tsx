import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../types';
import { newNoteToGuess, reset } from '../actions';
import { StringSelect } from './StringSelect';
import { AccidentalSelect } from './AccidentalCheckbox';
import { Username } from './Username';

export function SettingsMenu(props: any) {
  const dispatch = useDispatch();
  const noteOpts = useSelector((state: AppState) => state.noteOpts)
  const history = useHistory();
  const previousNote = useSelector((state: AppState) => {
    return state.quiz.noteToGuess;
  });

  return (
    <div className="SettingsMenu">
      <h1>Settings</h1>
      <StringSelect />
      <AccidentalSelect />
      <button onClick={() => {
        dispatch(reset());
        dispatch(newNoteToGuess(noteOpts, previousNote));
        history.push('/play');
      }}>
        Start
      </button>
      <Username />
    </div>
  );
}
