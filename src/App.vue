<template>
  <Header />
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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
  },
};
</script>

<style>
#app {
  font-family: Zen Old Mincho, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
