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
        class="btn btn-primary me-2"
        @click="$router.push('/groups/' + group.id + '/add-student')"
      >
        Add student
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        @click="$router.go(-1)"
      >
        Go back
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import axios from "../../../util/axios";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "SpecificGroupView",
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
  data(): {
    group: {
      id: string;
      name: string;
    };
    students: Array<any>;
  } {
    return {
      group: {
        id: "",
        name: "",
      },
      students: [],
    };
  },
  async mounted() {
    await this.getGroup();
    await this.getStudents();
  },
  methods: {
    async getGroup() {
      await axios(true)
        .get("/groups/" + this.id)
        .then((result) => {
          if (result.data.length !== 0) {
            this.group = result.data;
          } else {
            this.toast.info("No group could be found");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Group couldn't be retrieved"
          );
        });
    },
    async getStudents() {
      await axios(true)
        .get("/groups/" + this.id + "/students")
        .then((result) => {
          if (result.data.length !== 0) {
            this.students = result.data;
          } else {
            this.toast.info("No students could be found in this group");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data ||
              "Students from this group couldn't be retrieved"
          );
        });
    },
  },
});
</script>
