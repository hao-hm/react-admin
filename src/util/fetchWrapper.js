import 'whatwg-fetch';

function fetchWrapper(url, method = 'get', body) {
  return fetch(url, {
    headers: {'content-type': 'application/json'},
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => response,
      error => error
    );
}


export default fetchWrapper;