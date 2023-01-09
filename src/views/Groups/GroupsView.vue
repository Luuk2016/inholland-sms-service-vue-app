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

<script>
import Navigation from "@/components/Navigation.vue";
import axios from "../../../util/axios";

export default {
  name: "GroupView",
  components: {
    Navigation,
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
          this.groups = result.data;

          if (this.groups.length === 0) {
            console.log("No groups have been found.");
          }
        })
        .catch(() => {
          console.log("Groups couldn't be retrieved.");
        });
    },
  },
};
</script>

<style scoped></style>
