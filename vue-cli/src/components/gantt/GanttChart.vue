<template>
  <div>
    <gantt-head-line></gantt-head-line>
    <gantt-group
      v-for="project in projects"
      :key="'project' + project.id"
      :title="project.name"
      :milestones="project.milestones"
    >
    
      <gantt-row
        v-for="i in project.issues"
        :key="'issue' + i.id"
        :name="i.subject"
      >
        <gantt-bar :start_date="i.start_date" :end_date="i.due_date">
        </gantt-bar>
      </gantt-row>
    </gantt-group>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["ganttdata"],
  name: "GanttChart",
  data() {
    return {
      leftWidth: 200,
      colCount: 90,
      colWidth: 19,
      rowHeight: 18,
      borderSmall: 1,
      borderFat: 2,
      actDepth: 0,
    };
  },
  computed: {
    ...mapState(["timeBeam"]),
    projects: function () {
      return this.ganttdata;
    },
  },
  methods: {
    ...mapMutations(["makeTimeBeam"]),
  },
  mounted: function () {
    this.makeTimeBeam({
      days: 35,
      weeks: 48,
      months: this.colCount - 35 - 48 - 1,
    });
  },
};
</script>

<style scoped></style>
