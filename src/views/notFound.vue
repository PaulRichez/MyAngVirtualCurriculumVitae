<template>
  <div id="page">
<neon msg="404 Not Found" />
  </div>
</template>

<script>
import Neon from "../components/neon";

export default {
  name: "notFound",
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