import 'whatwg-fetch';
import {normalize} from 'normalizr'

function callAPI(url, options) {
  const schema = options && options.schema;
  const body = options && options.body;
  return fetch(url, {
    ...options,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body)
  })
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return schema ? normalize(json, schema) : json;
      })
    )

}
export default callAPI;