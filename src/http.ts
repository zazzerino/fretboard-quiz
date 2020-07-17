export function getScores() {
  const scores = fetch('/scores')
    .then(res => res.json())
    .then(data => data.scores);

  return scores;
}

export function createScore({ name, score }) {
  const response = fetch('/scores/create', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, score }),
  });

  return response;
}