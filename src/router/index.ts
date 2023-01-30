import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import GroupsView from "@/views/Groups/GroupsView.vue";
import LocationsView from "@/views/Locations/LocationsView.vue";
import SpecificGroupView from "@/views/Groups/SpecificGroupView.vue";
import CreateGroupView from "@/views/Groups/CreateGroupView.vue";
import AddStudentToGroupView from "@/views/Groups/AddStudentToGroupView.vue";
import LecturersView from "@/views/Lecturers/LecturersView.vue";
import CreateLecturerView from "@/views/Lecturers/CreateLecturerView.vue";
import { useLecturerStore } from "@/stores/lecturer";
import SpecificLocationView from "@/views/Locations/SpecificLocationView.vue";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/groups",
      name: "Groups",
      component: GroupsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/groups/:id",
      name: "Group",
      component: SpecificGroupView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/create-group",
      name: "Create group",
      component: CreateGroupView,
      meta: { requiresAuth: true },
    },
    {
      path: "/groups/:id/add-student",
      name: "Add student to group",
      component: AddStudentToGroupView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/locations",
      name: "Locations",
      component: LocationsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/locations/:id",
      name: "Location",
      component: SpecificLocationView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/lecturers",
      name: "Lecturers",
      component: LecturersView,
      meta: { requiresAuth: true },
    },
    {
      path: "/create-lecturer",
      name: "Create lecturer",
      component: CreateLecturerView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useLecturerStore();
  document.title = `SMS Service - ${String(to.name)}`;

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next("/login");
  }

  next();
});

export default router;
