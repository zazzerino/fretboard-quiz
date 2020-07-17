import React, { useEffect, useRef } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Status } from './types';
import { newNoteToGuess, tick, reset } from './actions';
import { PlayingContainer } from './components/PlayingContainer';
import { RoundOverModal } from './components/RoundOverModal';
import { Leaderboard } from './components/Leaderboard';
// import * as http from './http'

// http.getScores();
// http.createScore({name:'Billiam',score:-23});

function useInterval(callback: () => void, delay: number) {
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
  const guessStatus = useSelector((state: AppState) => state.guessStatus);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);

  useInterval(() => {
    dispatch(tick());
  }, 1000);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (guessStatus != null) {
        dispatch(newNoteToGuess(noteOpts));
      } else if (status === Status.ROUND_OVER) {
        dispatch(reset());
      }
    }

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  });

  return (
    <div className="App">
      {
        {
          [Status.PLAYING]: <PlayingContainer />,
          [Status.ROUND_OVER]: <RoundOverModal />,
          [Status.SHOW_SCORES]: <Leaderboard />,
        }[status]
      }
    </div>
  );
}