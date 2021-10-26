<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "./components/header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: Zen Old Mincho, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
