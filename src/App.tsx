import React, { useEffect, useRef } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Status } from './types';
import { newNoteToGuess, tick, reset } from './actions';
import { PlayingContainer } from './components/PlayingContainer';
import { RoundOverModal } from './components/RoundOverModal';

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
      case ' ':
        if (status !== Status.ROUND_OVER) {
          dispatch(newNoteToGuess(noteOpts));
        }
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
      {status !== Status.ROUND_OVER &&
        <PlayingContainer />}
      {status === Status.ROUND_OVER &&
        <RoundOverModal />}
    </div>
  );
}