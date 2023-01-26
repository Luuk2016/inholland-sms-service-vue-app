<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Send message</h2>

      <div class="row g-3">
        <div class="input-group">
          <span class="input-group-text">Location *</span>
          <select
            class="form-select"
            v-model="selected_location"
            @change="getGroupByLocation()"
          >
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
          <input
            class="form-check-input"
            type="checkbox"
            v-model="all_groups"
            value="test"
            @change="getGroupByLocation()"
          />
          <label class="form-check-label" for="flexCheckDefault"
            >All groups</label
          >
        </div>

        <div class="input-group">
          <span class="input-group-text">Group *</span>
          <select
            class="form-select"
            v-model="selected_group"
            :disabled="all_groups"
          >
            <option :value="null" disabled>Please select a group</option>
            <option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <span class="input-group-text">Message *</span>
          <input type="text" class="form-control" v-model="SMS.Message" />
        </div>

        <div class="input-group">
          <span class="input-group-text">Schedule message</span>
          <Datepicker v-model="SMS.Scheduled_at"></Datepicker>
        </div>

        <div class="input-group">
          <button type="button" class="btn btn-primary" @click="sendMessage()">
            Send message
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios from "../../util/axios";
import { useToast } from "vue-toastification";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "HomeView",
  components: {
    Navigation,
    Datepicker,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      SMS: {
        Message: "",
        Scheduled_at: new Date(),
        From_phone_number: "012345678",
      },
      locations: [],
      groups: [],
      all_groups: false,
      selected_location: "",
      selected_group: "",
      url: "",
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
      this.groups = [];
      await axios(true)
        .get("locations/" + this.selected_location + "/groups")
        .then((result) => {
          if (result.data.length !== 0) {
            this.groups = result.data;
          } else {
            this.toast.info("No groups could be found for this location");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Groups couldn't be retrieved"
          );
        });

      if (this.all_groups) {
        this.groups = [];
        return;
      }
    },
    async sendMessage() {
      if (
        this.selected_location == "" ||
        (!this.all_groups && this.selected_group == "") ||
        this.SMS.Message == ""
      ) {
        this.toast.error("Please fill in all fields");
        return;
      }

      if (this.all_groups) {
        this.url =
          "http://127.0.0.1:3000/send/locations/" + this.selected_location;
      } else {
        this.url = "http://127.0.0.1:3000/send/groups/" + this.selected_group;
      }

      if (this.SMS.Scheduled_at == null) {
        // Set date to today if it's empty
        this.SMS.Scheduled_at = new Date();
      }

      await axios(false)
        .post(this.url, this.SMS)
        .then(() => {
          this.toast.success("SMS send.");
          this.initialState();
        })
        .catch((error) => {
          this.toast.error(error.response?.data || "Something went wrong");
        });
    },
    initialState() {
      this.selected_group = "";
      this.selected_location = "";
      this.SMS.Message = "";
      this.SMS.Scheduled_at = new Date();
    },
  },
});
</script>
