import React, { useEffect, Dispatch } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useInterval } from './util';
import { tick, newNoteToGuess } from './actions';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { SettingsMenu } from './components/SettingsMenu';
/* import { RoundOverModal } from './components/RoundOverModal'; */
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { AppState } from './types';
/* import { LoginForm } from './components/LoginForm'; */
/* import { Logout } from './components/Logout'; */

/* function onRouteChange(pathname: string, dispatch: Dispatch<any>, params: any) {
 *   switch (pathname) {
 *     case '/play':
 *       if (params.noteToGuess == null) {
 *         dispatch(newNoteToGuess(params.noteOpts));
 *       }
 *       break;
 *   }
 * } */

export default function App() {
  const dispatch = useDispatch();
  // const status = useSelector((state: AppState) => state.status);
  // const guessStatus = useSelector((state: AppState) => state.guessStatus);
  const noteOpts = useSelector((state: AppState) => state.noteOpts);
  const noteToGuess = useSelector((state: AppState) => state.quiz.noteToGuess);

  /* const history = useHistory(); */

  useInterval(() => {
    // dispatch(tick());
  }, 1000);

  useEffect(() => {
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
        <Route path="/scores">
          <Leaderboard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
