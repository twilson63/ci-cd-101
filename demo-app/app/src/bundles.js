import { composeBundles, createRouteBundle } from 'redux-bundler'
import dogs from './dogs/bundle'

import Start from './pages/start.html'
import Dogs from './pages/dogs.html'
import Form from './pages/form.html'

const routes = createRouteBundle({
  '/': Start,
  '/dogs': Dogs,
  '/dogs/new': Form
})

export default composeBundles(app, dogs, routes)


function app() {
  const apiFetch = (method, path, token, body) => {
    let options = {
      method,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }
    }
    if (body) { options.body = JSON.stringify(body) }
    return fetch(process.env.API + path, options)
      .then(res => res.json())
      .catch(err => ({ error: err.message}))
    }

  return {
    name: 'app',
    selectAccessToken() {
      return '1234'
    },
    getExtraArgs(store) {
      return {
        api: {
          get(path) {
            return apiFetch('GET', path, store.selectAccessToken())
          },
          post(path, body) {
            return apiFetch('POST', path, store.selectAccessToken(), body)
          },
          put(path, body) {
            return apiFetch('PUT', path, store.selectAccessToken(), body)
          },
          delete(path) {
            return apiFetch('DELETE', path, store.selectAccessToken())
          }
        }
      }
    }
  }
}



