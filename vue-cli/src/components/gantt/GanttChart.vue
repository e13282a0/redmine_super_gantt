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

<style>
.main {
  width: 100%;
}

.headline {
  display: block;
  height: 14px;
  overflow: hidden;
  z-index: 2;
}
.left {
  float: left;
  width: var(--leftWidth);
  height: var(--rowHeight);
  font-size: x-small;
  padding: 0;
  text-align: left;
  line-height: 14px;
}
.right {
  width: calc(100% - var(--leftWidth));
  float: left;
  height: 14px;
}

.col {
  float: left;
  width: var(--colWidth); /* subtract border width*/
  font-size: x-small;
  height: var(--rowHeight);
  vertical-align: top;
  line-height: 14px;
  padding: 0 0 0 var(--borderFat);
}

.borderTop {
  border-top: var(--borderSmall) solid #ccc;
}

.borderBottom {
  border-bottom: var(--borderSmall) solid #ccc;
}

.fatBorderBottom {
  border-bottom: var(--borderFat)solid #ccc;
}

.borderLeft {
  padding: 0 0 0 calc(var(--borderFat) - var(--borderSmall));
  border-left: var(--borderSmall) solid #ccc;
}

.fatBorderLeft {
  padding: 0;
  border-left: var(--borderFat) solid #aaa;
}

.today {
  background-color: lightgreen;
}

.weekend {
  background-color: lightgray;
}

.hover:hover {
  background-color: lightgray;
}
</style>
