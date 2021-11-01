<template>
  <div id="page">
    <section class="text-light bg_dark">
      <!-- PROFIL -->
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="row border-bottom w-75 mx-auto">
              <h2 class="text-center">{{ myCvData.user.postName }}</h2>
            </div>
            <div class="row mt-4 text-center text-sm-start">
              <div class="col-md-6">
                <!-- profil image -->
                <div id="profil-image" class="mx-auto"></div>
              </div>
              <div class="col-md-6 my-auto">
                <!-- info personnel -->
                <h3>
                  {{ myCvData.user.firstName }} {{ myCvData.user.lastName }}
                </h3>
                <div>{{ age }} - {{ myCvData.user.city }}</div>
                <div>
                  <i class="bi-envelope me-1"></i>
                  <a
                    class="link-light"
                    :href="'mailTo:' + myCvData.user.email"
                    target="_blank"
                  >
                    {{ myCvData.user.email }}
                  </a>
                </div>
                <div>
                  <i class="bi-telephone me-1"></i>
                  <a
                    class="link-light"
                    :href="'tel:' + myCvData.user.phoneNumber"
                    target="_blank"
                  >
                    {{ myCvData.user.phoneNumber }}
                  </a>
                </div>
              </div>
            </div>
            <div class="row my-3 w-50 mx-auto">
              <button
                type="button"
                class="btn btn-outline-success"
                v-on:click="dlPdf"
              >
                <i class="bi-download"></i> Télécharger mon CV
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <!-- skills -->
            <div class="row border-bottom w-75 mx-auto">
              <h2 class="text-center">Mes compétences</h2>
            </div>
            <div class="row my-4">
              <div
                id="coding"
                class="col-12"
                v-for="(item, index) in myCvData.coding"
                :key="index"
              >
                <div class="row">
                  <div class="col-6">{{ item.key }}</div>
                  <div class="col-6 text-end">{{ item.value }} %</div>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :aria-valuenow="item.value"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="'width: ' + item.value + '%'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="section-formations" class="text-light bg-secondary">
      <!-- experience et diplomes -->
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="row border-dark border-bottom w-75 mx-auto">
              <h2 class="text-center">Mes diplômes</h2>
            </div>
            <div
              class="row my-4"
              v-for="(item, index) in myCvData.diplomas"
              :key="index"
            >
              <div>
                <CustomCard
                  :title="item.title"
                  :body="item.description"
                  :footerLeft="getFormatedDateForDiplomas(item)"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row border-dark border-bottom w-75 mx-auto">
              <h2 class="text-center">Mes experiences</h2>
            </div>
            <div class="row">
              <div
                class="row my-4"
                v-for="(item, index) in myCvData.experiences"
                :key="index"
              >
                <div>
                  <CustomCard
                    :title="item.job"
                    :body="null"
                    :list="item.descriptions"
                    :footerLeft="getFormatedDateForDiplomas(item)"
                    :footerRight="item.business"
                    :link="item.businessWebsite"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="section-know" class="text-dark bg-light">
      <div class="container">
        <!-- mes connaissances -->
        <div class="row border-bottom w-75 mx-auto">
          <h2 class="text-center">Mes connaissances</h2>
        </div>
        <div class="row pb-5" data-aos="zoom-in">
          <div
            class="col-6 col-md-4 text-center p-2"
            v-for="(item, index) in myCvData.knowledge"
            :key="index"
          >
            <img
              :id="item"
              :src="'https://cdn.worldvectorlogo.com/logos/' + item + '.svg'"
              :alt="item"
              height="128"
              class="wow slideInLeft"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { myCvData } from "../assets/data/data";
import { myCsPdfMake } from "../assets/js/pdfMake";
import CustomCard from "../components/custom-card.vue";
export default {
  name: "resume",
  components: { CustomCard },
  data() {
    return {
      myCvData,
      age:
        new Date(new Date() - new Date(myCvData.user.birthDay)).getFullYear() -
        1970,
    };
  },
  methods: {
    dlPdf: function () {
      myCsPdfMake.pdfMake.createPdf(myCsPdfMake.t).download();
      // myCsPdfMake.test();
    },
    getFormatedDateForDiplomas(item) {
      if (item.startDate && item.endDate) {
        return (
          "De " +
          new Date(item.startDate).getFullYear() +
          " à " +
          new Date(item.endDate).getFullYear()
        );
      } else {
        return new Date(item.startDate).getFullYear().toString();
      }
    },
  },
};
</script>

<style scoped>
#page {
  padding-top: 60px;
}

#profil-image {
  height: 150px;
  width: 150px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: double 5px transparent;
  background-image: url("../assets/images/profil.jpg"),
    linear-gradient(to left, var(--bs-success), var(--bs-success));
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.progress-bar {
  width: 0;
  animation: progress 1.5s ease-in;
}

@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

#section-formations {
  background: linear-gradient(0deg, var(--bs-secondary) 0%, black 100%);
}
#section-know {
  background: linear-gradient(
    0deg,
    var(--bs-light) 0%,
    var(--bs-secondary) 100%
  );
}
</style>