import React, { useEffect, useRef } from 'react';
import './App.css';
import { Stave } from './components/Stave';
import { Fretboard } from './components/Fretboard';
import { NewNoteButton } from './components/NewNoteButton';
import { UserScore } from './components/UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Status } from './types';
import { newNoteToGuess, tick } from './actions';
import { ResetButton } from './components/ResetButton';
import { AccidentalSelect } from './components/AccidentalCheckbox';
import { StringSelect } from './components/StringSelect';
import { SecondsLeft } from './components/SecondsLeft';

function useInterval(callback, delay) {
  // credit Dan Abramov
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);

  function handleKeyPress(event: KeyboardEvent) {
    if (status === Status.PLAYING) { return; };

    switch (event.key) {
      case 'Enter':
        dispatch(newNoteToGuess(noteOpts));
        break;
      case ' ':
        dispatch(newNoteToGuess(noteOpts));
        break;
    }
  }

  useInterval(() => {
    dispatch(tick());
  }, 1000);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  });

  return (
    <div className="App">
      <UserScore />
      <SecondsLeft />
      <Stave />
      <Fretboard />
      <NewNoteButton />
      <StringSelect />
      <AccidentalSelect />
      <ResetButton />
    </div>
  )
}