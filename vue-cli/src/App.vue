<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-progress-linear indeterminate v-if="!isInit.projects"></v-progress-linear>

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
    return {

    };
  },
  computed: {
    ...mapState(["isInit"]),
  },
  methods:{
    ...mapActions(["initProjects"]),
  },
  mounted() {
    this.initProjects();
  },
};
</script>

<style></style>
