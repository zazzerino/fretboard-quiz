import * as React from 'react';
import { useDispatch } from 'react-redux';
import { showScores } from '../actions';
import { Score } from '../types';
import * as http from '../http';

/* interface ScoreRecord {
 *   id: number,
 *   name: string,
 *   score: number,
 *   time: string
 * } */

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

export function ShowLeaderboard(props: any) {
  const dispatch = useDispatch();

  return (
    <button
      className="ShowLeaderboard"
      onClick={() => { dispatch(showScores()) }}
    >
      High Scores
    </button>
  )
}

export function Leaderboard(props: any) {
  const [scores, setScores] = React.useState([])

  React.useEffect(() => {
    http.getScores().then(data => {
      setScores(data);
    });

    /* http.validateToken({ token: 'SsFtw5yjpKd6ZOki7GG1oXIQ9HtBw+d4' })
     *     .then(data => console.log(data)); */

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
