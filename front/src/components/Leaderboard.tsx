import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Score, AppState } from '../types';
import { loadScoresAsync } from '../actions';

interface ScoreDisplayOpts {
  score: Score,
  key: number,
  index: number
}

function ScoreDisplay(props: ScoreDisplayOpts) {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.score.username}</td>
      <td>{props.score.value}</td>
      <td>{props.score.timestamp}</td>
    </tr>
  );
}

export function Leaderboard(props: any) {
  const scores = useSelector((state: AppState) => state.scores)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadScoresAsync());
  }, []);

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
