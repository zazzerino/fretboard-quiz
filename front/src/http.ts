import { encode } from 'base-64';

export async function getScores() {
  return fetch('/api/score/all')
    .then(res => res.json())
    .then(data => data.scores)
    .then(scores => scores.sort((a, b) => {
      return parseInt(a.value) < parseInt(b.value) ? 1 : -1;
    }))
    .catch(error => console.log(error));
}

export async function createUser({ name, password, email }) {
  return fetch('/api/user/create', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email })
  })
}

export async function getToken({ name, password }) {
  return fetch('/api/token/get', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': 'Basic ' + encode(name + ':' + password),
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return { token: null, name: null }
    }
  }).catch(error => console.log(error));
}

export async function revokeToken({ token }) {
  return fetch('/api/token/revoke', {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
}

// export async function validateToken({ token }) {
//   return fetch('/api/token/validate', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token })
//   }).then(response => response.json());
// }

export async function submitScore({ score, name }) {
  return fetch('/api/score/create', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ score, name }),
  }).then(response => response.status === 201)
    .catch(error => console.log(error));
}
