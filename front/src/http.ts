import { encode } from 'base-64';

export async function getScores() {
  const scores = fetch('/api/score/all')
    .then(res => res.json())
    .then(data => data.scores);

  const sortedScores = [...(await scores)].sort((a, b) => {
    return parseInt(a.value) < parseInt(b.value) ? 1 : -1;
  });

  return sortedScores;
}

export async function createScore({ name, score }) {
  const response = fetch('/api/score/create', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),
  });

  return response;
}

export async function getToken({ username, password }) {
  const response = fetch('/api/token/get', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encode(username + ':' + password),
    },
  });

  const status = (await response).status;
  let token: any = {"token": null};

  if (status === 200) {
    token = (await response).json();
  }

  return token;
}

export async function validateToken({ token }) {
  const response = fetch('/api/token/validate', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  });

  const status = (await response).status;

  if (status === 200) {
    const json = (await response as any).json();
    return json;
  } else {
    return false;
  }
}
