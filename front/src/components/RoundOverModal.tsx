import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submitScoreAsync, loadScoresAsync } from '../actions';
import { AppState, Guess } from '../types';

export function RoundOverModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const scoreHistory = useSelector((state: AppState) => state.quiz.history);
  const { token, name } = useSelector((state: AppState) => state.user);

  const correct = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'correct';
  }).length;

  const incorrect = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'incorrect';
  }).length;

  const score = correct - incorrect;

  const onClick = () => {
    dispatch(submitScoreAsync({ token, name, score }));
    new Promise(resolve => setTimeout(resolve, 500))
      .then(() => {
        dispatch(loadScoresAsync());
        return new Promise(resolve => setTimeout(resolve, 500))
          .then(() => history.push('/scores'))
      });
  }

  return (
    <div className="RoundOverModal">
      <UserScore />
      <button onClick={onClick}>
        Submit score
      </button>
      <button onClick={() => {
        dispatch(reset());
        history.push('/play');
      }}>
        Play again
      </button>
    </div>
  )
}
