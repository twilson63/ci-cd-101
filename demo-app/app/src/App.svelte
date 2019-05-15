<script>
  import { setContext } from 'svelte'
  import { createStore } from './store'
  import navHelper from './lib/nav-helper'

  export let initialData = {}

  let { store, action } = createStore(initialData)
  
  $: page = $store.route
 
  
  setContext('store', store)
  setContext('action', action)


</script>
<div on:click={navHelper(action('doUpdateUrl'))}>  
  <svelte:component this={page} />
</div>
<style>
  :global(body) {
    height: 100vh;
  }
  div {
    height: 100%;
  }
</style>
