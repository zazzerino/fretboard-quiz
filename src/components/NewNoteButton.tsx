import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newNoteToGuess } from '../actions';
import { AppState } from '../types';

export const NewNoteButton = props => {
  const dispatch = useDispatch();
  const noteOpts = useSelector((state: AppState) => state.noteOpts);

  return (
    <button className="NewNoteButton"
      onClick={() => dispatch(newNoteToGuess(noteOpts))}
    >
      New Note
    </button>
  );
}