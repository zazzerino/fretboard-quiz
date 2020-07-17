import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function SecondsLeft() {
  const secondsLeft = useSelector((state: AppState) => state.secondsLeft);

  return (
    <div className="SecondsLeft">
      <p>Time remaining: {secondsLeft}</p>
    </div>
  );
}