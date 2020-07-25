import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UserScore } from './UserScore';
import { useDispatch } from 'react-redux';
import { reset } from '../actions';

export function RoundOverModal() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="RoundOverModal">
      <UserScore />
      <button onClick={() => {
        dispatch(reset());
        history.push('/play')
      }}>
        Play again
      </button>
    </div>
  )
}
