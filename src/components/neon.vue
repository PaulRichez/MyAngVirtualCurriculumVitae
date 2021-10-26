<template>
  <div id="full-page">
    <h1 class="neonText">
      {{ msg }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "Neon",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
#full-page {
  position: absolute;
  left:0;
  top:0;
  z-index: 99;
  height: 100vh;
  width:100vw;
  background-color: #010a01;
  background-image: url("https://cdn.pixabay.com/photo/2017/02/12/12/42/wall-2059909_640.png");
}
.neonText {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff,
    0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff;
}

h1 {
  text-align: center;
  font-size: 5.2rem;
  animation: pulsate 0.11s ease-in-out infinite alternate;
}

@keyframes pulsate {
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #5271ff,
      0 0 80px #5271ff, 0 0 90px #5271ff, 0 0 100px #5271ff, 0 0 150px #5271ff;
  }

  0% {
    text-shadow: 0 0 2px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 30px #5271ff,
      0 0 63px #5271ff, 0 0 70px #5271ff, 0 0 80px #5271ff, 0 0 130px #5271ff;
  }
}
</style>
