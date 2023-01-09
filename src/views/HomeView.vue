<template>
  <navigation />
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Send message</h2>

      <p>TODO: Create form here</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Navigation,
  },
});
</script>
