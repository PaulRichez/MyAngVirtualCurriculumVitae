<template>
  <div id="page">
    <neon msg="Coming soon" />
  </div>
</template>

<script>
import Neon from "../components/neon";

export default {
  name: "Portfolio",
  components: {
    Neon,
  },
};
</script>

<style scoped>
#page {
  padding-top: 60px;
}
</style>