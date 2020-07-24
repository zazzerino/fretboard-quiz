import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';
import { RoundOverModal } from './RoundOverModal';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { newNoteToGuess } from '../actions';

export function PlayingContainer(props: any) {
  const dispatch = useDispatch();
  const noteToGuess = useSelector((state: AppState) => state.quiz.noteToGuess);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);

  React.useEffect(() => {
    if (noteToGuess == null) {
      dispatch(newNoteToGuess(noteOpts));
    }
  });

  return (
    <div className="PlayingContainer">
      <SecondsLeft />
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  );
}
