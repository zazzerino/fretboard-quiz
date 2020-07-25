import { encode } from 'base-64';

export async function getScores() {
  return fetch('/api/score/all')
    .then(res => res.json())
    .then(data => data.scores)
    .then(scores => scores.sort((a, b) => {
      return parseInt(a.value) < parseInt(b.value) ? 1: -1;
    }))
    .catch(error => console.log(error));
}

export async function submitScore({ score, name, token }) {
  return fetch('/api/score/create', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ score, name }),
  }).then(response => response.status === 201)
    .catch(error => console.log(error));
}

export async function getToken({ username, password }) {
  return fetch('/api/token/get', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encode(username + ':' + password),
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return { token: null, username: null }
    }
  }).catch(error => console.log(error));
}

export async function validateToken({ token }) {
  return fetch('/api/token/validate', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  }).then(response => response.json());
}
