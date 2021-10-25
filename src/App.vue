<template>
  <Header />
  <home :user="myCvData.user" :theme="theme" />
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/header.vue";
import Home from "./components/home.vue";

import { myCvData } from "./assets/data/data.js";

export default {
  name: "App",
  components: {
    Header,
    Home,
  },
  data() {
    return { myCvData, theme: {} };
  },
  created() {
    const style = getComputedStyle(document.body);

    this.theme.blue = style.getPropertyValue('--bs-blue');
    this.theme.red = style.getPropertyValue('--bs-red');
    this.theme.orange = style.getPropertyValue('--bs-orange');
    this.theme.green = style.getPropertyValue('--bs-green');
    this.theme.yellow = style.getPropertyValue('--bs-yellow');
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
