import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function Username() {
  const username = useSelector((state: AppState) => state.user.username);

  return (
    <div className="Username">
      {username &&
       <div>user: {username}</div>
      }
    </div>
  );
}
