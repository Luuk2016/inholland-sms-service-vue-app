<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mb-4 mt-lg-5">Create group</h2>

      <p>Please enter the following information to create a group:</p>

      <div class="row g-3">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">Name *</span>
            <input
              type="text"
              class="form-control"
              v-model="group.name"
              placeholder="IT4A"
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">Location *</span>
            <select class="form-select" v-model="group.location_id">
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
        </div>
      </div>

      <div class="input-group mt-4">
        <button
          type="button"
          class="btn btn-primary"
          @click="createGroup()"
          :disabled="createGroupDisabled"
        >
          Create group
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="this.$router.go(-1)"
        >
          Cancel
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios from "@/util/axios";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "CreateGroupView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      group: {
        name: "",
        location_id: null,
      },
      locations: [],
    };
  },
  async mounted() {
    await this.getLocations();
  },
  computed: {
    createGroupDisabled() {
      return this.group.name === "" || this.group.location_id === null;
    },
  },
  methods: {
    async getLocations() {
      await axios(import.meta.env.VITE_BASE_API_URL, true)
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
    async createGroup() {
      await axios(import.meta.env.VITE_BASE_API_URL, true)
        .post("/groups", this.group)
        .then(() => {
          this.toast.success("Group created.");
        })
        .catch((error) => {
          this.toast.error(error.response?.data || "Group couldn't be created");
        });
    },
  },
});
</script>
