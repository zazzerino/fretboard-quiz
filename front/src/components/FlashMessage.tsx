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
    setTimeout(() => {
      dispatch(hideFlash());
    }, 4000);
  }, [message]);

  return (
    <div className="FlashMessage" onClick={onClick}>
      {
        message &&
        <p>{message}</p>
      }
    </div>
  );
}
