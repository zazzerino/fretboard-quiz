import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { hideFlash } from '../actions';

export function FlashMessage() {
  const message = useSelector((state: AppState) => state.flashMessage);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(hideFlash());
  }

  React.useEffect(() => {
    if (message != null) {
      const timeout = setTimeout(() => {
        dispatch(hideFlash());
      }, 2000);

      return () => clearTimeout(timeout);
    }
  });

  return (
    <div className="FlashMessage" onClick={onClick}>
      {
        message &&
        <p>{message}</p>
      }
    </div>
  );
}
