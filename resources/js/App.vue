<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/editor">Image Editor</router-link>
    </nav>
    <ErrorDisplay />
    <router-view></router-view>
  </div>
</template>

<script>
import ErrorDisplay from './components/ErrorDisplay.vue';

export default {
  name: 'App',
  components: {
    ErrorDisplay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
