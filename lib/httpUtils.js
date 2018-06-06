import fetch from 'node-fetch';
import querystring from 'querystring';
import FormData from 'form-data';

export const makeFormData = (data) => {
  const formData = new FormData();

  for (var key in data) {
    formData.append(key, data[key]);
  }

  return formData;
}

export const makeRequest = (uri, method='GET', options) => {
  const params = options.params;
  const body = options.body;
  const paramstring = querystring.stringify(params);

  switch (method) {
    case `GET`:
      return fetch(`${uri}?${paramstring}`)
    default:
      return fetch(`${uri}?${paramstring}`, {
        method,
        body
      });
  }
}