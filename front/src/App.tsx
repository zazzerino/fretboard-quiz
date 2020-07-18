import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { AppState, Status } from './types';
import { newNoteToGuess, tick, reset } from './actions';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { RoundOverModal } from './components/RoundOverModal';
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { SettingsMenu } from './components/SettingsMenu';
import { useInterval } from './util';

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
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/play">
            <PlayingContainer />
          </Route>
          <Route path="/settings">
            <SettingsMenu />
          </Route>
          <Route path="/roundover">
            <RoundOverModal />
          </Route>
          <Route path="/scores">
            <Leaderboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
