<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Locations</h2>

      <p>The following locations are available:</p>

      <ul class="list-group mt-3">
        <li
          v-for="location in locations"
          :key="location.id"
          class="list-group-item"
        >
          <b>{{ location.name }}</b>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import axios from "../../util/axios";
import { useToast } from "vue-toastification";

export default {
  name: "LocationView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      locations: [],
    };
  },
  async mounted() {
    await this.getLocations();
  },
  methods: {
    async getLocations() {
      await axios(true)
        .get("/locations")
        .then((result) => {
          this.locations = result.data;

          if (this.locations.length === 0) {
            this.toast.info("No locations have been found.");
          }
        })
        .catch(() => {
          this.toast.error("Locations couldn't be retrieved.");
        });
    },
  },
};
</script>
