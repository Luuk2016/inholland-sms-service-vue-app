<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Locations</h2>

      <p>The following locations are available:</p>

      <div class="list-group mt-3">
        <a
          v-for="location in locations"
          :key="location.id"
          @click="this.$router.push('/locations/' + location.id)"
          class="list-group-item list-group-item-action"
        >
          <b>{{ location.name }}</b>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios, { API_URL } from "../../../util/axios";
import { useToast } from "vue-toastification";

export default defineComponent({
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
      await axios(API_URL.baseAPI, true)
        .get("/locations")
        .then((result) => {
          if (result.data.length !== 0) {
            this.locations = result.data;
          } else {
            this.toast.info("No locations have been found");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Locations couldn't be retrieved"
          );
        });
    },
  },
});
</script>
