import { createApp } from 'vue'
import App from './App.vue'

// import VueGtag from "vue-gtag";

import router from './router'

// importing AOS
import AOS from 'aos'
import 'aos/dist/aos.css'


const app = createApp(App);
/*app.use(VueGtag, {
    config: { id: "G-RJR2PEKFVM" }
});*/
app.use(router);
app.use(AOS.init({ once: true, anchorPlacement: "top-top" }));
app.mount('#app');
