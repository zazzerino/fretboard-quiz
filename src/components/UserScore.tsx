import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function UserScore() {
  const userScore = useSelector((state: AppState) => state.userScore);

  return (
    <div className="UserScore">
      <p>Score: {userScore}</p>
    </div>
  )
}