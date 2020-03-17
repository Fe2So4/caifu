<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch("refreshQueryInfo", this.$route.query)
  }
}
</script>

<style lang="scss">
@import './variables.scss';
@import './assets/fonts/iconfont.css';
@import './assets/scss/free.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // margin-top: 60px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
