import * as React from 'react';
import { useSelector } from 'react-redux';
import { Score, AppState } from '../types';

interface ScoreDisplayOpts {
  score: Score,
  key: number,
  index: number,
  id: number,
}

function ScoreDisplay(props: ScoreDisplayOpts) {
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

export function Leaderboard(props: any) {
  const scores = useSelector((state: AppState) => state.scores)

  return (
    <div className="Leaderboard">
      <h1>High Scores</h1>
      <table className="Leaderboard-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            scores.history.map((score: Score, index: number) => {
              return <ScoreDisplay
                       key={index}
                       index={index + 1}
                       score={score}
                       id={score.id}
              />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}
