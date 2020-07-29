import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submitScoreAsync, loadScoresAsync } from '../actions';
import { AppState, Guess } from '../types';

export function RoundOverModal() {
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

  return (
    <div className="RoundOverModal">
      {
      (
      submitting &&
      <p>Submitting score...</p>
      ) ||
    (
      <div>
        <UserScore />
        <button onClick={onClick}>
          Submit score
        </button><br />
        <button onClick={() => {
          dispatch(reset());
          history.push('/play');
        }}>
          Play again
        </button>
      </div>
    )
      }
    </div>
  )
}
