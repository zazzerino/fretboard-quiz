import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Guess, GuessStatus } from '../types';
import { reset } from '../actions';

export function RoundOverModal(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="RoundOverModal">
      <UserScore />
      <button onClick={ () => {
        dispatch(reset());
        history.push('/play')
      }}>
        Play again
      </button>
    </div>
  )
}
