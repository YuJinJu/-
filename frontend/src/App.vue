<template>
  <div id="app">
    <navi-bar />
    <router-view />
  </div>
</template>

<script>
import NaviBar from "./components/layout/NaviBar.vue";

export default {
  name: "App",
  components: {
    NaviBar,
  },
};
</script>

<style>
/* #app {
  background: rgba(241, 219, 206, 0.376);
} */

a:hover {
  text-decoration: none;
  font-weight: bold;
  font-size: 105%;
}

a.router-link-exact-active {
  color: rgb(219, 67, 7);
}
</style>
