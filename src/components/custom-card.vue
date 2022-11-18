<template>
  <div class="custom-card mx-auto text-dark p-3 pb-0">
    <div class="title d-flex align-items-center">
      <span class="text-light p-2 fs-5">{{ title }}</span>
    </div>
    <div class="body" v-if="body">{{ body }}</div>
    <div class="list" v-if="list.length">
      <ul v-for="(item, index) in list" :key="index">
        <li>{{ item }}</li>
      </ul>
    </div>
    <div class="row">
      <div class="col-6" v-if="footerLeft">{{ footerLeft }}</div>
      <div class="col-6 ms-auto text-end" v-if="footerRight">
        <a class="link" :href="link" target="_blank">
          {{ footerRight }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: String,
    body: String,
    footerLeft: String,
    footerRight: String,
    link: String,
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 80%;
  min-height: 120px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  background: var(--bs-gray-300);
}
.title {
  width: 100%;
  min-height: 50px;
  background: linear-gradient(
    90deg,
    var(--bs-dark) 30%,
    #1d4834,
    var(--bs-green) 100%
  );
  border-radius: 30px;
  border-bottom-left-radius: 0;
  transform: translateX(-35px);
}
.title::before {
  content: "";
  position: absolute;
  top: 100%;
  width: 19px;
  height: 30px;
  background: var(--bs-dark);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 2;
}
.title::after {
  content: "";
  position: absolute;
  top: 100%;
  width: 19px;
  height: 15px;
  background: var(--bs-dark);
  z-index: 1;
}
.link {
  color: var(--bs-green);
}
</style>