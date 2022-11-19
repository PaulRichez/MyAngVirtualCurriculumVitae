<template>
  <div
    id="my-terminal"
    class="w-100"
    v-bind:class="{
      'terminal-maximise': fullScreenTerminal,
    }"
  >
    <div
      id="terminal-header"
      class="d-flex justify-content-between align-items-center px-2"
    >
      <div class="fs-5">
        <i class="bi bi-terminal me-2"></i>
        <span>Terminal</span>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-outline-light btn-sm"
          aria-controls="fullScreen"
          aria-label="terminal-fullScreen-btn"
          v-on:click="fullScreenTerminal = !fullScreenTerminal"
        >
          <i
            class="bi"
            v-bind:class="{
              'bi-arrows-fullscreen': !fullScreenTerminal,
              'bi-fullscreen-exit': fullScreenTerminal,
            }"
          ></i>
        </button>
      </div>
    </div>
    <VueTerminal
      :intro="intro"
      :registerCommand="registerCommand"
      console-sign="$"
      allow-arbitrary
      height="100%"
      caret="|"
      @command="onCliCommand"
    ></VueTerminal>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { myCvData } from "../assets/data/data";
import { useFirestore } from "vuefire";
import router from "../router";
const db = useFirestore();
import VueTerminal from "./vue-terminal/VueTerminal";
import { myCsPdfMake } from "../assets/js/pdfMake";
export default {
  name: "MyTerminal",
  props: {},
  data() {
    var self = this;
    return {
      fullScreenTerminal: false,
      projects: [],
      registerCommand: [
        {
          name: "projects",
          help: "Shows list projects from portfolio",
          method: function (cmd) {
            cmd.out = "<ul>";
            self.projects.forEach(
              (p) => (cmd.out += "<li>" + p.myId + "</li>")
            );
            cmd.out += "</ul>";
            return cmd;
          },
        },
        {
          name: "websiteInfo",
          help: "this website infos",
          method: function (cmd) {
            cmd.out = "Projet développé en vueJS 3 + bootstrap 5.2.2<br />";
            cmd.out += "Dependecies :";
            cmd.out += "<ul>";
            cmd.out += "<li>vue : 3.0.0</li>";
            cmd.out += "<li>vuefire : 3.0.0</li>";
            cmd.out += "<li>firebase : 9.14</li>";
            cmd.out += "<li>pdfmake : 0.2.2</li>";
            cmd.out += "</ul>";
            return cmd;
          },
        },
        {
          name: "downloadCV",
          help: "Download CV",
          method: function (cmd) {
            const fileName = `CV_de_Paul_Richez-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}.pdf`;
            myCsPdfMake.pdfMake.createPdf(myCsPdfMake.t).download(fileName);
            cmd.out = "CV downloaded";
            return cmd;
          },
        },
        {
          name: "mailToPaul",
          help: "Contact me with email",
          method: function (cmd) {
            window.location.href = "mailto:" + myCvData.user.email;
            cmd.out = "Send me an email 😄";
            return cmd;
          },
        },
        {
          name: "visit",
          help:
            "Go somewhere. (example: visit resume)<ul>" +
            "<li>Page name (resume, portfolio)</li>" +
            "<li>Project id (ids in projects command)</li>" +
            "<li>My social network</li></ul>",
          options: [1, ""],
          method: function (cmd) {
            if (["resume", "portfolio"].includes(cmd[1])) {
              router.push(cmd[1]);
            } else if (self.projects.map((p) => p.myId).includes(cmd[1])) {
              router.push({ name: "portfolio", query: { project: cmd[1] } });
            } else if (["github", "linkedin"].includes(cmd[1])) {
              switch (cmd[1]) {
                case "github":
                  window.open(myCvData.user.github);
                  break;
                case "linkedin":
                  window.open(myCvData.user.linkedin);
                  break;
                default:
                  break;
              }
            } else {
              cmd.out = "Command error";
            }
            return cmd;
          },
        },
      ],
      intro: "Bienvenue",
    };
  },
  components: {
    VueTerminal,
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onCliCommand(data, resolve, reject) {
      switch (data.text) {
        default:
          reject("Command unknow");
          break;
      }
    },
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.projects.push(doc.data());
    });
  },
};
</script>

<style>
.terminal-maximise {
  z-index: 1035;
  position: absolute;
  height: calc(100vh - 32px);
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.terminal-maximise > .vue-terminal-wrapper {
  height: 100%;
}
#terminal-header {
  background: var(--bs-green);
  width: 100%;
}
#terminal {
  border: 2px solid var(--bs-green);
}
.vue-terminal-wrapper {
  width: 100%;
  height: 350px;
}
</style>