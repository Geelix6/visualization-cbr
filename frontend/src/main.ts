import { createApp } from "vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import { primeVueConfig } from "./primevue.config";
import "primeicons/primeicons.css";
import App from "./App.vue";
import "./style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const app = createApp(App);
app.use(router);

app.use(PrimeVue, primeVueConfig);

app.mount("#app");
