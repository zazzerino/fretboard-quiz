import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, flashMessage } from '../actions';

export function LogoutButton() {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
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
