<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Groups</h2>

      <p>Click on a group to see more information:</p>

      <div class="list-group mt-3">
        <a
          v-for="group in groups"
          :key="group.id"
          @click="this.$router.push('/groups/' + group.id)"
          class="list-group-item list-group-item-action"
        >
          <b>{{ group.name }}</b>
        </a>
      </div>

      <button
        type="button"
        class="btn btn-primary mt-3"
        @click="this.$router.push('/create-group')"
      >
        Create new group
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
  name: "GroupView",
  components: {
    Navigation,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      groups: [Object],
    };
  },
  async mounted() {
    await this.getGroups();
  },
  methods: {
    async getGroups() {
      await axios(true)
        .get("/groups")
        .then((result) => {
          if (result.data.length !== 0) {
            this.groups = result.data;
          } else {
            this.toast.info("No groups have been found.");
          }
        })
        .catch((error) => {
          this.toast.error(
            error.response?.data || "Groups couldn't be retrieved."
          );
        });
    },
  },
});
</script>
