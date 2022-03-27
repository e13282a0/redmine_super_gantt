<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-progress-linear v-model="loadingStatus" height="25" v-if="!isInit.projects">
          <strong>{{ Math.ceil(loadingStatus) }}%</strong>
        </v-progress-linear>
        <gantt-chart v-else> </gantt-chart>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["isInit", "loadingStatus"]),
  },
  methods: {
    ...mapActions(["initProjects"]),
  },
  mounted() {
    this.initProjects();
  },
};
</script>

<style></style>
