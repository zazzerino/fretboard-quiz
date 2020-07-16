import * as React from 'react';

interface ScoreRecord {
  id: number,
  name: string,
  score: number
}

interface ScoreDisplayOpts {
  score: ScoreRecord,
  key: number,
  index: number
}

function ScoreDisplay(props: ScoreDisplayOpts) {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.score.name}</td>
      <td>{props.score.score}</td>
    </tr>
  );
}

export function Leaderboard(props: any) {
  const [scores, setScores] = React.useState([])

  React.useEffect(() => {
    fetch('/scores')
      .then(res => res.json())
      .then(data => {
        setScores(data.scores);
      });
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
          </tr>
        </thead>
        <tbody>
          {
            scores.map((score: ScoreRecord, index: number) => {
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