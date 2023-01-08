import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.messagingAPI = "";

axios.defaults.baseURL = "http://localhost:5000";

app.use(createPinia());
app.use(router);
app.use(Toast, {
  timeout: 2000,
});

app.mount("#app");
