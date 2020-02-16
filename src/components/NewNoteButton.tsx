import React from 'react';
import { useDispatch } from 'react-redux';
import { newNoteToGuess } from '../actions';

export const NewNoteButton = props => {
  const dispatch = useDispatch();

  return (
    <button className="NewNoteButton"
      onClick={() => dispatch(newNoteToGuess())}
    >
      New Note
    </button>
  );
}