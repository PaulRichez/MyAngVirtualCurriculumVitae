<template>
  <div
    id="my-terminal"
    class="w-100"
    v-bind:class="{
      'terminal-maximise': fullScreenTerminal,
    }"
  >
    <div id="terminal" style="height: 350px"></div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { EasyTerminal } from "easy-terminal";
import { myCvData } from "../assets/data/data";
import { useFirestore } from "vuefire";
import router from "../router";
const db = useFirestore();
import { myCsPdfMake } from "../assets/js/pdfMake";
export default {
  name: "MyTerminal",
  props: {},
  data() {
    return {
      fullScreenTerminal: false,
      projects: [],
      intro: "Bienvenue",
    };
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
    const terminalElement = window.document.getElementById("terminal"); // div where you want the terminal
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.projects.push(doc.data());
    });
    const projects = this.projects;
    new EasyTerminal({
      elementHtml: terminalElement,
      window: { show: true, title: "EasyTerminal" },
      nativeCommands: true,
      welcome: "Bienvenue",
      history: true,
      noEmptyCommand: true,
      customCommands: [
        {
          name: "projects",
          help: "Shows list projects from portfolio",
          method: async function (cmd) {
            const choice = await cmd.select(
              projects.map((p) => {
                return {
                  label: p.title,
                  value: p.myId,
                };
              })
            );
            router.push({
              name: "portfolio",
              query: { project: choice.value },
            });
            return cmd;
          },
        },
        {
          name: "websiteInfo",
          help: "this website infos",
          method: function (cmd) {
            cmd.echo("Projet développé en vueJS 3 + bootstrap 5.2.2<br />");
            cmd.echo("Dependecies :");
            cmd.echo("<ul>");
            cmd.echo("<li>vue : 3.0.0</li>");
            cmd.echo("<li>vuefire : 3.0.0</li>");
            cmd.echo("<li>firebase : 9.14</li>");
            cmd.echo("<li>pdfmake : 0.2.2</li>");
            cmd.echo("</ul>");
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
            cmd.echo("CV downloaded");
            return cmd;
          },
        },
        {
          name: "mailToPaul",
          help: "Contact me with email",
          method: function (cmd) {
            window.location.href = "mailto:" + myCvData.user.email;
            cmd.echo("Send me an email 😄");
            return cmd;
          },
        },
        {
          name: "visit",
          help:
            "Go somewhere. (example: visit resume)<ul>" +
            "<li>Page name (resume, portfolio)</li>" +
            "<li>My social network</li></ul>",
          method: function (cmd) {
            const arg = cmd.options.info.args[0];
            if (!arg) cmd.echo("Error");
            if (["resume", "portfolio"].includes(arg)) {
              router.push(arg);
            } else if (["github", "linkedin"].includes(arg)) {
              switch (arg) {
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
              cmd.echo("Command error");
            }
            return cmd;
          },
        },
      ],
    });
  },
};
</script>

<style>
</style>