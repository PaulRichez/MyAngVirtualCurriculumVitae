<template>
  <section class="banner d-flex justify-content-center align-items-center pt-5">
    <div class="container my-5 py-5">
      <div class="row">
        <div class="col-md-12 banner-desc lh-lg">
          <div id="type"></div>
          <div id="social-network" class="d-flex justify-content-evenly">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";

export default {
  name: "Home",
  props: {
    user: Object,
    theme: Object,
  },
  mounted() {
    const type = document.getElementById("type");
    const sn = document.getElementById("social-network");
    let currentTextColor = "white";
    window.addEventListener("load", () => {
      typeWrit.start();
    });
    const typeWrit = new Typewriter(type, {
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
      .callFunction(() => setTimeout(() => sn.classList.add("fondu-in"), 1000));
  },
};
</script>

<style scoped>
.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/images/despaired-gc40ef02cb_1920.jpg") center center
      no-repeat;
  background-size: cover;
  height: 100vh;
  color: white;
  font-size: 30px;
}
#social-network {
  width: 360px;
  opacity: 0;
}

.fondu-in {
  opacity: 1 !important;
  transition: all 2s ease-in;
}
</style>