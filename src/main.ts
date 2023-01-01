import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.config.globalProperties.baseAPI = "http://localhost:5000";
app.config.globalProperties.messagingAPI = "";

app.use(createPinia());
app.use(router);

app.mount("#app");
