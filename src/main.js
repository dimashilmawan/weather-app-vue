import "vue-select/dist/vue-select.css";
import "vue-toastification/dist/index.css";
import "./assets/main.css";
import Toast from "vue-toastification";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(Toast);

app.mount("#app");
