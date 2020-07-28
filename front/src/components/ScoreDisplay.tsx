import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState, Score } from '../types';

interface ScoreDisplayOpts {
  score: Score,
  index: number,
}

export function ScoreDisplay(props: ScoreDisplayOpts) {
  const submittedId = useSelector((state: AppState) => {
    return state.scores.submittedId;
  });

  let className = 'ScoreDisplay';
  if (submittedId === props.score.id) {
    className += ' active';
  }

  return (
    <tr id={props.score.id.toString()} className={className}>
      <td>{props.index}</td>
      <td>{props.score.name}</td>
      <td>{props.score.value}</td>
      <td>{props.score.timestamp}</td>
    </tr>
  );
}
