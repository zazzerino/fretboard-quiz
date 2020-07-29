import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { LogoutLink } from './LogoutLink';
import { ScoreLink } from './ScoreLink';

export function Navbar() {
  const token = useSelector((state: AppState) => state.user.token);

  const loginOrLogout = token == null ?
                        (<li>
                          <Link to="/login">Login</Link>
                        </li>) :
                        (<li>
                          <LogoutLink />
                        </li>)

  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">Play</Link>
          </li>
          <li>
            <ScoreLink />
          </li>
          {loginOrLogout}
        </ul>
      </nav>
    </div>
  );
}
