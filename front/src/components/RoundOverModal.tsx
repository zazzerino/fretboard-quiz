import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submitScore } from '../actions';
import { AppState, Guess } from '../types';

export function RoundOverModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const scoreHistory = useSelector((state: AppState) => state.quiz.history);
  const token = useSelector((state: AppState) => state.user.token);

  const correctGuesses = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'correct';
  }).length;

  const incorrectGuesses = scoreHistory.filter((guess: Guess) => {
    return guess.guessStatus === 'incorrect';
  }).length;

  const score = correctGuesses - incorrectGuesses;

  const onClick = () => {
    dispatch(submitScore({ token, score }))
  }

  return (
    <div className="RoundOverModal">
      <UserScore />
      <button onClick={onClick}>
        Submit score
      </button>
      <button onClick={() => {
        dispatch(reset());
        history.push('/play')
      }}>
        Play again
      </button>
    </div>
  )
}
