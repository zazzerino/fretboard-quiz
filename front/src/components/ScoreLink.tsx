import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadScoresAsync } from '../actions';

export function ScoreLink() {
  const dispatch = useDispatch();

  return (
    <Link to="/scores"
          onClick={() => {
            dispatch(loadScoresAsync());
          }}>
      Scores
    </Link>
  );
}
