import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import GroupsView from "@/views/GroupsView.vue";
import LocationsView from "@/views/LocationsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/groups",
      name: "Groups",
      component: GroupsView,
    },
    {
      path: "/locations",
      name: "Locations",
      component: LocationsView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `SMS Service - ${String(to.name)}`;
  next();
});

export default router;
