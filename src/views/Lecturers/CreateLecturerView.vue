<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mb-4 mt-lg-5">Create lecturer</h2>

      <p>Please enter the following information to create a lecturer:</p>

      <div class="row g-3">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">E-mail</span>
            <input
              type="text"
              class="form-control"
              v-model="lecturer.email"
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">Password</span>
            <input
                type="password"
                class="form-control"
                v-model="lecturer.password"
            />
          </div>
        </div>
      </div>

      <div class="input-group mt-4">
        <button
          type="button"
          class="btn btn-primary"
          @click="createLecturer()"
          :disabled="createLecturerDisabled"
        >
          Create lecturer
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

<script>
import Navigation from "@/components/Navigation.vue";
import axios from "../../../util/axios";
import { useToast } from "vue-toastification";

export default {
  name: "CreateLecturerView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      lecturer: {
        email: "",
        password: null,
      },
    };
  },
  computed: {
    createLecturerDisabled() {
      return this.lecturer.email === "" || this.lecturer.password === null;
    },
  },
  methods: {
    async createLecturer() {
      await axios(true)
        .post("/lecturer", this.lecturer)
        .then(() => {
          this.toast.success("Lecturer created");
          this.$router.push("lecturers")
        })
        .catch(() => {
          this.toast.error("Lecturer couldn't be created, please try again");
        });
    },
  },
};
</script>

<style scoped></style>
