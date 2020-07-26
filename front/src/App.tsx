import React, { useEffect } from 'react';
import './App.css';
import { useDispatch  } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { SettingsMenu } from './components/SettingsMenu';
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { RoundOverModal } from './components/RoundOverModal';
import { LoginForm } from './components/LoginForm';
import { Username } from './components/Username';
import { FlashMessage } from './components/FlashMessage';
import { RegistrationForm } from './components/RegistrationForm';
import { hideFlash } from './actions';

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      dispatch(hideFlash());
    });

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
  });

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
        <Route path="/register">
          <RegistrationForm />
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
      <FlashMessage />
      <Username />
    </div>
  );
}
