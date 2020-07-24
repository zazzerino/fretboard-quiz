import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newNoteToGuess } from '../actions';
import { AppState } from '../types';

export const NewNoteButton = props => {
  const dispatch = useDispatch();
  const noteOpts = useSelector((state: AppState) => state.noteOpts);
  const clickable = useSelector((state: AppState) => {
    return state.quiz.guessStatus != null;
  });

  let className = "NewNoteButton";
  if (clickable) {
    className += ' active';
  }

  return (
    <button className={className}
            onClick={() => {
              if (clickable) {
                dispatch(newNoteToGuess(noteOpts));
              }
            }}
    >
      New Note
    </button>
  );
}
