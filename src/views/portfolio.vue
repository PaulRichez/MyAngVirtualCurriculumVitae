<script setup>
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRoute } from "vue-router";

const db = useFirestore();
const projects = useCollection(collection(db, "projects"));

const route = useRoute();
</script>
<template>
  <div
    id="page"
    class="text-light d-flex justify-content-center align-items-center"
  >
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="false"
    >
      <div class="carousel-indicators align-items-center">
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          :data-bs-slide-to="index"
          v-bind:class="{
            active: route.query?.project
              ? route.query.project == project.myId
              : !index,
          }"
          aria-current="true"
          :aria-label="'Slide ' + project.myId"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-bind:class="{
            active: route.query?.project
              ? route.query.project == project.myId
              : !index,
          }"
          v-for="(project, index) in projects"
          :key="project.id"
        >
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
            width="800"
            height="450"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: First slide"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="transparent"></rect>
          </svg>
          <div class="image-slider">
            <img :src="project.sliderImage" />
          </div>
          <div class="carousel-caption">
            <h5>{{ project.title }}</h5>
            <p style="min-height: 48px">{{ project.description }}</p>
            <div>
              <span v-if="project.indisponible">Comming soon</span>
              <a
                v-if="project.githubLink"
                :href="project.githubLink"
                target="_blank"
                class="btn btn-outline-light"
                v-bind:class="{ 'me-3': project.npmLink }"
                role="button"
                aria-disabled="true"
                ><i class="bi-github"></i
              ></a>
              <a
                style="padding-top: 3px; height: 38px"
                v-if="project.npmLink"
                :href="project.npmLink"
                target="_blank"
                class="btn btn-outline-light"
                role="button"
                aria-disabled="true"
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <polygon
                      fill="#C12127"
                      points="0 256 0 0 256 0 256 256"
                    ></polygon>
                    <polygon
                      fill="#FFFFFF"
                      points="48 48 208 48 208 208 176 208 176 80 128 80 128 208 48 208"
                    ></polygon>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  components: {},
};
</script>

<style scoped>
#page {
  padding-top: 60px;
  height: 100vh;
}
.carousel {
  width: 100%;
  max-width: 800px;
  height: 450px;
}

.carousel-caption {
  width: 100%;
  left: 0;
  right: 0;
}

.carousel-indicators > .active {
  height: 5px;
}
.image-slider {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -100%);
  left: 50%;
}
</style>