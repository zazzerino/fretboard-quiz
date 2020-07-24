import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function Navbar(props: any) {
  const token = useSelector((state: AppState) => state.token);

  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token == null &&
            <li>
              <Link to="/login">Login</Link>
            </li>
          }
          <li>
            <Link to="/play">Play</Link>
          </li>
          <li>
            <Link to="/scores">Scores</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
