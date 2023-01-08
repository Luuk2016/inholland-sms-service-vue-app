<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Group: {{ group.name }}</h2>
      <p>The students in this group:</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>
              <b>{{ student.name }}</b>
            </td>
            <td>{{ student.phone_number }}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-primary mt-3 me-2"
        @click="this.$router.push('/groups/' + group.id + '/add-student')"
      >
        Add student
      </button>
      <button
        type="button"
        class="btn btn-secondary mt-3"
        @click="this.$router.go(-1)"
      >
        Go back
      </button>
    </div>
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import axios from "axios";

export default {
  name: "SpecificGroupView",
  components: {
    Navigation,
  },
  props: {
    id: String,
  },
  data() {
    return {
      group: Object,
      students: [Object],
    };
  },
  async mounted() {
    await this.getGroup();
    await this.getStudents();
  },
  methods: {
    async getGroup() {
      await axios
        .get("/groups/" + this.id)
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
    async getStudents() {
      await axios
        .get("/groups/" + this.id + "/students")
        .then((result) => {
          this.students = result.data;

          if (this.students.length === 0) {
            console.log("No students could be found in this group.");
          }
        })
        .catch(() => {
          console.log("Students from this group couldn't be retrieved.");
        });
    },
  },
};
</script>

<style scoped></style>
