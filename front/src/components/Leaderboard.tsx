import * as React from 'react';
import { useSelector } from 'react-redux';
import { Score, AppState } from '../types';

interface ScoreDisplayOpts {
  score: Score,
  key: number,
  index: number
}

function ScoreDisplay(props: ScoreDisplayOpts) {
  return (
    <tr id={props.score.id.toString()}>
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
            scores.map((score: Score, index: number) => {
              return <ScoreDisplay
                       key={index}
                       index={index + 1}
                       score={score}
              />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}
