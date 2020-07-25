import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Guess, GuessStatus } from '../types';
import { reset } from '../actions';

export function SubmitScoreBtn(props: any) {
  const dispatch = useDispatch();
  /* const guesses = useSelector((state: AppState) => state.guesses); */
  /* const history = useHistory(); */

  /* const correctGuesses = history.filter((guess: Guess) => {
   *   return guess.guessStatus === 'correct';
   * }).length;

   * const incorrectGuesses = history.filter((guess: Guess) => {
   *   return guess.guessStatus === 'incorrect';
   * }).length;

   * const score = correctGuesses - incorrectGuesses; */

  return (
    <div className="SubmitScoreBtn">
      {/* <button
          className="OpenSubmitModal"
          onClick={() => {
          http.createScore({ name, score });

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
          </button> */}
    </div>
  )
}

export function RoundOverModal(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="RoundOverModal">
      <UserScore />
      <SubmitScoreBtn />
      <button onClick={ () => {
        dispatch(reset());
        history.push('/play')
      }}>
        Play again
      </button>
    </div>
  )
}
