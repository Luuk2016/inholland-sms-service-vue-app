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
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        // TODO
      }
    },
  },
};
</script>

<style scoped></style>
