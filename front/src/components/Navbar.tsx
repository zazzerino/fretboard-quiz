import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { logout } from '../actions';

export function Navbar(props: any) {
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.user.token);

  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {
            (token == null
            &&
             <li>
               <Link to="/login">Login</Link>
             </li>)
            ||
            <li>
              <Link to="/logout" onClick={() => dispatch(logout())}>
                Logout
              </Link>
            </li>
          }
          <li>
            <Link to="/settings">Play</Link>
          </li>
          <li>
            <Link to="/scores">Scores</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
