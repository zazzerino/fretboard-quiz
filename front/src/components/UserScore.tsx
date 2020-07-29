import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState, Guess } from '../types';

export function UserScore() {
  const history = useSelector((state: AppState) => state.quiz.history);

  const correctGuesses = history.filter((guess: Guess) => {
    return guess.guessStatus === 'CORRECT';
  }).length;

  const incorrectGuesses = history.filter((guess: Guess) => {
    return guess.guessStatus === 'INCORRECT';
  }).length;

  const totalScore = correctGuesses - incorrectGuesses;

  return (
    <div className="UserScore">
      <p>Correct: {correctGuesses}</p>
      <p>Incorrect: {incorrectGuesses}</p>
      <p className="total-score">Total score: {totalScore}</p>
    </div>
  );
}
