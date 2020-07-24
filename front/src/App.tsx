import React, { useEffect, Dispatch } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useInterval } from './util';
import { tick, showSettings } from './actions';
import { Home } from './components/Home';
import { PlayingContainer } from './components/PlayingContainer';
import { RoundOverModal } from './components/RoundOverModal';
import { Leaderboard } from './components/Leaderboard';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/LoginForm';

function onRouteChange(pathname: string, dispatch: Dispatch<any>) {
  switch (pathname) {
    case '/play':
      dispatch(showSettings());
      break;
  }
}

export default function App() {
  const dispatch = useDispatch();
  // const status = useSelector((state: AppState) => state.status);
  // const guessStatus = useSelector((state: AppState) => state.guessStatus);
  // const noteOpts = useSelector((state: AppState) => state.noteOpts);

  const history = useHistory();

  useInterval(() => {
      /* dispatch(tick()); */
  }, 1000);

  useEffect(() => {
    history.listen((location) => {
      onRouteChange(location.pathname, dispatch)
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
        <Route path="/roundover">
          <RoundOverModal />
        </Route>
        <Route path="/scores">
          <Leaderboard />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
