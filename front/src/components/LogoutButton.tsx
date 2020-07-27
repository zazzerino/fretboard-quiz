import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAsync, flashMessage } from '../actions';
import { AppState } from '../types';

export function LogoutButton() {
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.user.token);

  const onClick = () => {
    dispatch(logoutAsync({ token }));
    dispatch(flashMessage('logged out'))
  };

  return (
    <Link to="/"
          className="LogoutButton"
          onClick={onClick}>
      Logout
    </Link>
  );
}
