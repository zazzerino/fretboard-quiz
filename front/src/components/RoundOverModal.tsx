import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submitScoreAsync, loadScoresAsync } from '../actions';
import { AppState, Guess } from '../types';
import { exportComponentAsPNG } from 'react-component-export-image';

function currentTime() {
  const date = new Date().toString();
  const formatDate = date.split(' ').slice(0, 5).join(' ');

  return formatDate;
}

export function RoundOverModal() {
  const roundOverRef = React.useRef();
  const [time, setTime] = React.useState(currentTime());
  const [submitting, setSubmitting] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const scoreHistory = useSelector((state: AppState) => state.quiz.history);
  const { name } = useSelector((state: AppState) => state.user);

  const correct = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'CORRECT';
  }).length;

  const incorrect = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'INCORRECT';
  }).length;

  const score = correct - incorrect;

  const onClick = () => {
    setSubmitting(true);
    dispatch(submitScoreAsync({ name, score }));

    setTimeout(() => {
      dispatch(loadScoresAsync());
    }, 750);

    setTimeout(() => {
      setSubmitting(false);
      history.push('/scores');
    }, 750)
  }

  React.useEffect(() => {
    setTime(currentTime());
  }, []);

  return (
    <div className="RoundOverModal">
      {
      (
      submitting &&
      <p>Submitting score...</p>
      ) ||
    (
      <div ref={ roundOverRef }>
        <UserScore />
        <p> { time } </p>
        <button onClick={onClick}>
          Submit score
        </button>
        <br />
        <button onClick={() => {
          dispatch(reset());
          history.push('/play');
        }}>
          Play again
        </button>
        <br />
        <button onClick={() => {
          exportComponentAsPNG(roundOverRef, 'score.png', 'white')
        }}>
        Export
        </button>
      </div>
    )
      }
    </div>
  )
}
