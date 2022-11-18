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
import { useFirestore } from "vuefire";
const db = useFirestore();
import VueTerminal from "./vue-terminal/VueTerminal";
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
            self.projects.forEach((p) => cmd.out+="<li>" + p.title + "</li>");
            cmd.out += "</ul>";
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
        case "a":
          resolve(["here projects"]);
          break;
        case "projects":
          resolve("here projects");
          break;
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
      this.projects.push({ id: doc.id, ...doc.data() });
    });
    console.log(this.projects[0].description);
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