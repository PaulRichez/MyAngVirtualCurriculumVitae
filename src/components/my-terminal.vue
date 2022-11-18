<template>
  <VueTerminal
    :intro="intro"
    :registerCommand="registerCommand"
    console-sign="$"
    allow-arbitrary
    height="500px"
    startCommand="help -a"
    caret="|"
    @command="onCliCommand"
  ></VueTerminal>
</template>

<script>
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useFirestore } from "vuefire";

const db = useFirestore();
// eslint-disable-next-line no-unused-vars
const projects = useCollection(collection(db, "projects"));

import VueTerminal from "./vue-terminal/VueTerminal";
export default {
  name: "MyTerminal",
  props: {},
  firestore: function () {
    return {
      profile: db.collection("projects")
    };
  },
  data() {
    return {
      registerCommand: [
        {
          name: "projects",
          help: "Shows list projects from portfolio",
          method: function (cmd) {
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
      console.log(this.profile)
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
  mounted() {
    console.log(this.registerCommand)
  },
};
</script>

<style scoped>
.vue-terminal-wrapper {
  width: 100%;
  height: 100%;
}
</style>
<style>
#terminal {
  border-radius: 20px !important;
}
</style>