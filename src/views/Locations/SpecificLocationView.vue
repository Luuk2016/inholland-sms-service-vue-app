<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Location: {{ location.name }}</h2>
      <p>The groups at this locations:</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.id">
            <td>
              <b>{{ group.name }}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-secondary"
        @click="this.$router.go(-1)"
      >
        Go back
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios, { API_URL } from "../../../util/axios";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "SpecificLocationView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    id: String,
  },
  data() {
    return {
      location: Object,
      groups: [Object],
    };
  },
  async mounted() {
    await this.getLocation();
    await this.getGroups();
  },
  methods: {
    async getLocation() {
      await axios(API_URL.baseAPI, true)
        .get("/locations/" + this.id)
        .then((result) => {
          if (result.data.length !== 0) {
            this.location = result.data;
          } else {
            this.toast.info("No location could be found");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Location couldn't be retrieved"
          );
        });
    },
    async getGroups() {
      await axios(API_URL.baseAPI, true)
        .get("/locations/" + this.id + "/groups")
        .then((result) => {
          if (result.data.length !== 0) {
            this.groups = result.data;
          } else {
            this.toast.info("No groups could be found at this location");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data ||
              "Groups at this location couldn't be retrieved"
          );
        });
    },
  },
});
</script>
