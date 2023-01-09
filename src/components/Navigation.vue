<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" active-class="active">
        SMS Service
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/groups" class="nav-link" active-class="active">
              Groups
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/locations" class="nav-link" active-class="active">
              Locations
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/lecturers" class="nav-link" active-class="active">
              Lecturers
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" type="button" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLecturerStore } from "@/stores/lecturer";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Navigation",
  setup() {
    const lecturerStore = useLecturerStore();
    const router = useRouter();

    return { lecturerStore, router };
  },
  methods: {
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        this.lecturerStore.logout();
        this.router.push({ path: "/login" });
      }
    },
  },
});
</script>
