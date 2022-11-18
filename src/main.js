import { createApp } from 'vue'
import { VueFire } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'
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
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
    ],
})

app.use(AOS.init({ once: true, anchorPlacement: "top-top" }));
app.mount('#app');
