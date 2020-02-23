import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../actions';

export function ResetButton() {
  const dispatch = useDispatch();

  return (
    <button className="ResetButton"
      onClick={() => dispatch(reset())}
    >
      Restart
    </button>
  );
}