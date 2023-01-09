<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Lecturers</h2>

      <div class="list-group mt-3">
        <a
          v-for="lecturer in lecturers"
          :key="lecturer.id"
          :href="`mailto:${lecturer.email}`"
          target="_blank"
          class="list-group-item list-group-item-action"
        >
          <p>{{ lecturer.email }}</p>
        </a>
      </div>

      <button
        type="button"
        class="btn btn-primary mt-3"
        @click="this.$router.push('/create-lecturer')"
      >
        Create new lecturer
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
  name: "LecturersView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      lecturers: [],
    };
  },
  async mounted() {
    await this.getLecturers();
  },
  methods: {
    async getLecturers() {
      await axios(true)
        .get("/lecturer")
        .then((result) => {
          this.lecturers = result.data;

          if (this.lecturers.length === 0) {
            this.toast.warning("No lecturers have been found");
          }
        })
        .catch(() => {
          this.toast.error("Lecturers couldn't be retrieved");
        });
    },
  },
});
</script>
