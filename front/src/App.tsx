import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { SettingsMenu } from './components/SettingsMenu';
import { ScoreBoard } from './components/ScoreBoard';
import { Navbar } from './components/Navbar';
import { RoundOverModal } from './components/RoundOverModal';
import { LoginForm } from './components/LoginForm';
import { Username } from './components/Username';
import { FlashMessage } from './components/FlashMessage';
import { RegistrationForm } from './components/RegistrationForm';

export default function App() {
  /* useEffect(() => { */
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
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/scores">
          <ScoreBoard />
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
