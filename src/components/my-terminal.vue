<template>
  <VueTerminal
    :intro="intro"
    :registerCommand="registerCommand"
    console-sign="$"
    allow-arbitrary
    height="500px"
    caret="|"
    @command="onCliCommand"
  ></VueTerminal>
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
          name: "downloadCV",
          help: "Download CV",
          method: function (cmd) {
            const fileName = `CV_de_Paul_Richez-${new Date().getMonth()}-${new Date().getFullYear()}.pdf`;
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
          name: "goTo",
          help:
            "Go somewhere. (example: goTo resume)<ul>" +
            "<li>Page name (resume, portfolio)</li>" +
            "<li>Project (from projects command)</li>" +
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
    test() {
      console.log("test");
    },
    // eslint-disable-next-line no-unused-vars
    onCliCommand(data, resolve, reject) {
      switch (data.text) {
        default:
          reject("Commande inconnue");
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

<style scoped>
.vue-terminal-wrapper {
  width: 100%;
  height: 350px;
}
</style>
<style>
#terminal {
  border-radius: 20px !important;
}
</style>