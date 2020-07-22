export async function getScores() {
  const scores = fetch('/api/score/all')
    .then(res => res.json())
    .then(data => data.scores);

  const sortedScores = [...(await scores)].sort((a, b) => {
    return parseInt(a.value) < parseInt(b.value) ? 1 : -1;
  });

  return sortedScores;
}

export function createScore({ name, score }) {
  // const response = fetch('/api/score/create', {
  //   method: 'POST',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ name, score }),
  // });

  // return response;
}
