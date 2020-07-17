import * as React from 'react';
import { UserScore } from './UserScore';
import { ResetButton } from './ResetButton';
import { ShowLeaderboard } from './Leaderboard';
import * as http from '../http';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Guess } from '../types';
import { showScores } from '../actions';

export function SubmitScoreBtn(props: any) {
  const dispatch = useDispatch();
  const guesses = useSelector((state: AppState) => state.guesses);

  const correctGuesses = guesses.filter((guess: Guess) => {
    return guess.isCorrect;
  }).length;

  const incorrectGuesses = guesses.filter((guess: Guess) => {
    return !guess.isCorrect;
  }).length;

  const score = correctGuesses - incorrectGuesses;

  return (
    <button
      className="OpenSubmitModal"
      onClick={() => {
        const name = prompt('Enter your name:', 'anon')

        http.createScore({ name, score });

        dispatch(showScores());
      }}
    >
      Submit score
    </button>
  )
}

export function RoundOverModal(props: any) {
  return (
    <div className="RoundOverModal">
      <UserScore />
      <SubmitScoreBtn />
      <ShowLeaderboard />
      <ResetButton />
    </div>
  )
}