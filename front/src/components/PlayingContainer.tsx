import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';
import { RoundOverModal } from './RoundOverModal';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { newNoteToGuess } from '../actions';
import { Redirect } from 'react-router-dom';

export function PlayingContainer(props: any) {
  const dispatch = useDispatch();
  const noteToGuess = useSelector((state: AppState) => state.quiz.noteToGuess);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);
  const isRoundOver = useSelector((state: AppState) => {
      return state.quiz.secondsLeft <= 0;
  });

  React.useEffect(() => {
    if (noteToGuess == null) {
      dispatch(newNoteToGuess(noteOpts));
    }

    /* if (isRoundOver === true) {
     *   <Redirect to="/roundover" />
     * } */
  });

  return (
    <div className="PlayingContainer">
      { isRoundOver && <Redirect to="/roundover" /> }
      <SecondsLeft />
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  );
}
