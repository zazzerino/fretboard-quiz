import * as React from 'react';
import { useSelector } from 'react-redux';
import { Score, AppState } from '../types';
import { ScoreDisplay } from './ScoreDisplay';

export function ScoreBoard(props: any) {
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
              />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}
