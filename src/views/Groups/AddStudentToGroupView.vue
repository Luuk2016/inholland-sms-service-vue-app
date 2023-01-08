<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mb-4 mt-lg-5">Add student to {{ group.name }}</h2>

      <p>
        Please enter the following information to add a student to this group:
      </p>

      <div class="row g-3">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">Name *</span>
            <input
              type="text"
              class="form-control"
              v-model="student.name"
              placeholder="John Doe"
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text">Phone *</span>
            <input
              type="tel"
              class="form-control"
              v-model="student.phone_number"
              placeholder="+31612345678"
            />
          </div>
        </div>
      </div>

      <div class="input-group mt-4">
        <button
          type="button"
          class="btn btn-primary"
          @click="addStudentToGroup()"
          :disabled="createStudentDisabled"
        >
          Add student
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
import axios from "axios";
import { useLecturerStore } from "@/stores/lecturer";

export default {
  name: "AddStudentToGroupView",
  components: {
    Navigation,
  },
  setup() {
    const lecturerStore = useLecturerStore();

    return { lecturerStore };
  },
  props: {
    id: String,
  },
  data() {
    return {
      group: Object,
      student: {
        name: "",
        phone_number: null,
      },
    };
  },
  async mounted() {
    await this.getGroup();
  },
  computed: {
    createStudentDisabled() {
      return this.student.name === "" || this.student.phone_number === null;
    },
  },
  methods: {
    async getGroup() {
      await axios
        .get("/groups/" + this.id, this.lecturerStore.authHeader)
        .then((result) => {
          this.group = result.data;

          if (this.group.length === 0) {
            console.log("No group could be found.");
          }
        })
        .catch(() => {
          console.log("Group couldn't be retrieved.");
        });
    },
    async addStudentToGroup() {
      console.log(this.student);
      await axios
        .post(
          "/groups/" + this.group.id + "/students",
          this.student,
          this.lecturerStore.authHeader
        )
        .then(() => {
          console.log("Student added to group.");
        })
        .catch(() => {
          console.log("Student couldn't be added to group, please try again.");
        });
    },
  },
};
</script>

<style scoped></style>
