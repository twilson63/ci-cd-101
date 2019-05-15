import { readable } from 'svelte/store'
import doCreateStore from './bundles'

export const createStore = data => {
  const reduxstore = doCreateStore(data)
  window.store = reduxstore
  const store = readable(reduxstore.selectAll(), function (set) {
    reduxstore.subscribe(() => {
      set(reduxstore.selectAll())
    })
  })
  
  const action = name => (...args) => {
    return reduxstore[name](...args)
  }
  
  return {store, action}
}
