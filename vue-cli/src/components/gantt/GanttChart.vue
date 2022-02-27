<template>
  <div>
    <gantt-head-line />
    <gantt-group
      v-for="project in projects"
      :key="'project' + project.id"
      :title="project.name"
      :milestones="project.milestones"
      :start_date="getStartEndForSubIssues(project.issues).startDate"
      :end_date="getStartEndForSubIssues(project.issues).endDate"
    >
    
      <gantt-row
        v-for="i in project.issues"
        :key="'issue' + i.id"
        :name="i.subject"
      >
        <gantt-bar :start_date="i.start_date" :end_date="i.due_date" />
 
      </gantt-row>
    </gantt-group>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import moment from 'moment'
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
    getStartEndForSubIssues:function(children) {
      let start = children.reduce((prev, curr) => moment(prev.start_date) < moment(curr.start_date) ? prev : curr);
      let end = children.reduce((prev, curr) => moment(prev.due_date) > moment(curr.due_date) ? prev : curr);
      return {'startDate':start.start_date, 'endDate':end.due_date};

    }
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
