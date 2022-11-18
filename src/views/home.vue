<template>
  <section
    class="
      banner
      d-flex
      justify-content-center
      align-items-center
      overflow-hidden
      pt-5
    "
  >
    <div class="container my-5 py-5">
      <div class="row" style="height:300px">
        <div class="col-12 col-lg-6 banner-desc lh-lg fs-1">
          <div id="type"></div>
          <div
            id="social-network"
            class="d-flex justify-content-evenly col-md-4 col-xl-3"
          >
            <a
              :href="user.linkedin"
              target="_blank"
              class="btn btn-outline-light"
              role="button"
              aria-disabled="true"
              ><i class="bi-linkedin"></i
            ></a>
            <a
              :href="user.github"
              target="_blank"
              class="btn btn-outline-light"
              role="button"
              aria-disabled="true"
              ><i class="bi-github"></i
            ></a>
            <a
              :href="'mailTo:' + user.email"
              target="_blank"
              class="btn btn-outline-light"
              role="button"
              aria-disabled="true"
              ><i class="bi-envelope"></i
            ></a>
          </div>
        </div>
        <div class="col-lg-6 d-none d-lg-flex align-items-stretch justify-content-end">
          <MyTerminal />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";
import MyTerminal from "../components/my-terminal.vue";
import theme from "../assets/js/getTheme";
import { myCvData } from "../assets/data/data";
export default {
  name: "Home",
  components: { MyTerminal },
  data() {
    return { theme, user: myCvData.user, tp: null };
  },
  unmounted() {
    this.tp.stop();
  },
  mounted() {
    const type = document.getElementById("type");
    const sn = document.getElementById("social-network");
    let currentTextColor = "white";
    this.tp = new Typewriter(type, {
      delay: 75,
      deleteSpeed: 100,
    })
      .typeString("Hey !!!")
      .pauseFor(1500)
      .typeString(
        `<br />Moi C'est <strong id="firstName" style="color: ${currentTextColor}; font-size:45px;">${this.user.firstName}</strong>`
      )
      .pauseFor(300)
      .typeString(", Dev <br />")
      .pauseFor(300)
      .callFunction(
        () =>
          (document.getElementById("firstName").style.color = this.theme.orange)
      )
      .typeString(
        `<strong style="color: ${this.theme.orange}; font-size:45px;">HTML</strong>`
      )
      .pauseFor(500)
      .deleteChars(4)
      .callFunction(
        () =>
          (document.getElementById("firstName").style.color = this.theme.blue)
      )
      .typeString(
        `<strong style="color: ${this.theme.blue}; font-size:45px;">CSS</strong>`
      )
      .pauseFor(500)
      .deleteChars(3)
      .callFunction(
        () =>
          (document.getElementById("firstName").style.color = this.theme.yellow)
      )
      .typeString(
        `<strong style="color: ${this.theme.yellow}; font-size:45px;">Javascript</strong>`
      )
      .pauseFor(500)
      .deleteChars(4)
      .changeDeleteSpeed("natural")
      .deleteChars(6)
      .pauseFor(300)
      .callFunction(
        () =>
          (document.getElementById("firstName").style.color = this.theme.green)
      )
      .typeString(
        `<strong style="color: ${this.theme.green}; font-size:45px;">FrontEnd</strong>`
      )
      .pause(150)
      .typeString(
        `<strong style="color: ${this.theme.green}; font-size:45px;"> !!!</strong>`
      )
      .callFunction(() => type.lastChild.remove())
      .callFunction(() => {})
      .callFunction(() => setTimeout(() => sn.classList.add("fondu-in"), 1000))
      .start();
  },
};
</script>

<style scoped>
.banner {
  height: 100vh;
  color: white;
}
#social-network {
  opacity: 0;
}

.fondu-in {
  opacity: 1 !important;
  transition: all 2s ease-in;
}
</style>