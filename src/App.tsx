import React, { useEffect } from 'react';
import './App.css';
import { Stave } from './components/Stave';
import { Fretboard } from './components/Fretboard';
import { NewNoteButton } from './components/NewNoteButton';
import { UserScore } from './components/UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Status } from './types';
import { newNoteToGuess } from './actions';
import { ResetButton } from './components/ResetButton';
import { SharpCheckbox, FlatCheckbox, DoubleSharpCheckbox, DoubleFlatCheckbox } from './components/AccidentalCheckbox';

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);

  function handleKeyPress(event: KeyboardEvent) {
    if (status === Status.PLAYING) { return; };

    switch (event.key) {
      case 'Enter':
        dispatch(newNoteToGuess(noteOpts));
      case ' ':
        dispatch(newNoteToGuess(noteOpts));
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  });

  return (
    <div className="App">
      <UserScore />
      <Stave />
      <Fretboard />
      <NewNoteButton />
      <ResetButton />
      <SharpCheckbox />
      <FlatCheckbox />
      <DoubleSharpCheckbox />
      <DoubleFlatCheckbox />
    </div>
  )
}