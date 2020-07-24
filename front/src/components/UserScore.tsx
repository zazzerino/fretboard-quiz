import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState, Guess } from '../types';

export function UserScore() {
  /* const guesses = useSelector((state: AppState) => state.guesses); */

  /* const correctGuesses = guesses.filter((guess: Guess) => {
   *   return guess.isCorrect;
   * }).length;

   * const incorrectGuesses = guesses.filter((guess: Guess) => {
   *   return !guess.isCorrect;
   * }).length;

   * const totalScore = correctGuesses - incorrectGuesses; */

  return (
    <div className="UserScore">
      {/* <p>Correct: {correctGuesses}</p>
          <p>Incorrect: {incorrectGuesses}</p>
          <p className="total-score">Total score: {totalScore}</p> */}
    </div>
  );
}
