<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ userName }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mr-5 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/resume">Mon CV</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/portfolio"
              >Portfolio</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { myCvData } from "../assets/data/data";

export default {
  name: "Header",
  data() {
    return { userName: myCvData.user.firstName + " " + myCvData.user.lastName };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin-right: 50px;
}

.navbar {
  background-color: rgb(0, 0, 0, 0.5);
}

.router-link-active {
  color: #fff !important;
  font-weight: bold;
}
</style>
