import { merge } from 'ramda'
// actions
const [FETCH_DOGS_STARTED, FETCH_DOGS_SUCCESS, FETCH_DOGS_ERROR, POST_DOG_STARTED, POST_DOG_SUCCESS, POST_DOG_ERROR] =
  ['FETCH_DOGS_STARTED', 'FETCH_DOGS_SUCCESS', 'FETCH_DOGS_ERROR', 'POST_DOG_STARTED', 'POST_DOG_SUCCESS', 'POST_DOG_ERROR']

export default {
  name: 'dogs',
  doPostDog(dog) {
    return async ({dispatch, api }) => {
      dispatch({type: POST_DOG_STARTED})
      const result = await api.post('/dogs', dog)
      if (result.error) {
        dispatch({type: POST_DOG_ERROR, payload: result.error})
        return Promise.resolve(false)
      }
      // handle error 
      dispatch({type: POST_DOG_SUCCESS, payload: result})
      return Promise.resolve(true)
    }
  },
  doFetchDogs() {
    return async ({dispatch, api}) => {
      dispatch({type: FETCH_DOGS_STARTED})
      const dogs = await api.get('/dogs')
      // handle error 
      dispatch({type: FETCH_DOGS_SUCCESS, payload: dogs})
      return Promise.resolve(true)
    }
  },
  selectDogs(state) {
    return state.dogs.data
  },
  reducer(state={loading: false, data: []}, {type, payload}) {
    if (type === FETCH_DOGS_STARTED) {
      return merge(state, {loading: true})
    }
    if (type === FETCH_DOGS_SUCCESS) {
      return merge(state, {loading: false, data: payload})
    }
    if (type === FETCH_DOGS_ERROR) {
      return merge(state, {loading:false, error: payload})
    }
    if (type === POST_DOG_STARTED) {
      return merge(state, {submitting: true})
    }
    if (type === POST_DOG_SUCCESS) {
      return merge(state, {submitting: false, data: [payload, state.data]})
    }
    if (type === POST_DOG_ERROR) {
      return merge(state, {submitting: false, error: payload})
    }

    return state
  }
}
