import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function Username() {
  const name = useSelector((state: AppState) => state.user.name);

  return (
    <div className="Username">
      {
        name &&
        <div>logged in as: {name}</div>
      }
    </div>
  );
}
