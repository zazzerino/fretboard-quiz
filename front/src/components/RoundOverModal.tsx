import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import * as http from '../http';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Guess } from '../types';
import { showScores, reset } from '../actions';

export function SubmitScoreBtn(props: any) {
  const dispatch = useDispatch();
  /* const guesses = useSelector((state: AppState) => state.guesses); */
  const history = useHistory();

  /* const correctGuesses = guesses.filter((guess: Guess) => {
   *   return guess.isCorrect;
   * }).length;

   * const incorrectGuesses = guesses.filter((guess: Guess) => {
   *   return !guess.isCorrect;
   * }).length;

   * const score = correctGuesses - incorrectGuesses; */

  return (
    <div className="SubmitScoreBtn">
      <button
        className="OpenSubmitModal"
        onClick={() => {
          // http.createScore({ name, score });

          history.push('/scores');
          dispatch(showScores());
        }}
      >
        Submit score
    </button>

      <br></br>
      <button onClick={() => {
        dispatch(reset());
      }}>
        Play again
      </button>
    </div>
  )
}

export function RoundOverModal(props: any) {
  return (
    <div className="RoundOverModal">
      <UserScore />
      <SubmitScoreBtn />
    </div>
  )
}
