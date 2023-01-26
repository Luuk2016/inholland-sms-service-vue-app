<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Send message</h2>

      <div class="row g-3">
          <div class="input-group">
            <span class="input-group-text">Location *</span>
            <select class="form-select" v-model="selected_location" @change="getGroupByLocation()">
              <option :value="null" disabled>Please select a location</option>
              <option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >
                {{ location.name }}
              </option>
            </select>
          </div>
          
        <div class="input-group">
          <input class="form-check-input" type="checkbox" v-model="all_groups" value="Test">
          <label class="form-check-label" for="flexCheckDefault">All groups</label>
        </div>

          <div class="input-group">
            <span class="input-group-text">Group *</span>
            <select class="form-select">
              <option :value="null" disabled>Please select a group</option>
              <option
                v-for="group in groups"
                :key="group.id"
                :value="group.id"
              >
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>

      <p>TODO: Create form here</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios from "../../util/axios";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "HomeView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      message: "",
      locations: [],
      groups: [],
      all_groups: false,
      selected_location: "",
    };
  },
  async mounted() {
    await this.getLocations();
  },
  methods: {
    async getLocations() {
      console.log(this.locations)
      await axios(true)
        .get("/locations")
        .then((result) => {
          if (result.data.length !== 0) {
            this.locations = result.data;
          } else {
            this.toast.info("No locations could be found");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Locations couldn't be retrieved"
          );
        });
  },
  async getGroupByLocation() {
    console.log(this.selected_location);
    
      await axios(true)
        .get("location/ + " + this.selected_location + "/groups")
        .then((result) => {
          if (result.data.length !== 0) {
            this.groups = result.data;
          } else {
            this.toast.info("No locations could be found");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Locations couldn't be retrieved"
          );
        });
  }
}
});
</script>
