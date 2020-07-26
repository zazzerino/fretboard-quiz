import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function FlashMessage() {
  const message = useSelector((state: AppState) => state.flashMessage);

  return (
    <div className="FlashMessage">
      {
        message &&
        <p>{message}</p>
      }
    </div>
  );
}
