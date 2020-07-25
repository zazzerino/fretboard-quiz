import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { SettingsMenu } from './components/SettingsMenu';
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { RoundOverModal } from './components/RoundOverModal';
import { LoginForm } from './components/LoginForm';

export default function App() {
  const dispatch = useDispatch();

  /* useEffect(() => { */
    /* history.listen((location) => {
     *   onRouteChange(location.pathname, dispatch, { noteOpts, noteToGuess })
     * }); */

    // function handleKeyPress(event: KeyboardEvent) {
    //   if (guessStatus != null) {
    //     dispatch(newNoteToGuess(noteOpts));
    //   } else if (status === Status.ROUND_OVER) {
    //     dispatch(reset());
    //   }
    // }

    // window.addEventListener('keypress', handleKeyPress);

    // return () => {
    //   window.removeEventListener('keypress', handleKeyPress);
    //   unlisten();
    // }
    /* }); */

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/play">
          <PlayingContainer />
        </Route>
        <Route path="/settings">
          <SettingsMenu />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/scores">
          <Leaderboard />
        </Route>
        <Route path="/roundover">
          <RoundOverModal />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
