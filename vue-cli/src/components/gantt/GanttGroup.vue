<template>
  <div>
    <gantt-row :name="title" expandable="1" v-model="showSlots" :act_depth="actDepth">
      <gantt-bar :start_date="start_date" :end_date="end_date" type="sum"/>
      <gantt-time-line :milestones="milestones"></gantt-time-line>
    </gantt-row>

    <!-- content -->
    <div v-if="showSlots && $slots.default">
      <slot />
    </div>
    <!-- auto redered -->
    <div v-else-if="showSlots && issues.length > 0">
      <!-- draw child issues -->
      <template v-for="issue in issues">
        <!-- issue is a leave -->
        <gantt-row v-if="issue.sub_issues.length === 0" :key="'issue' + issue.id" :name="issue.subject" :act_depth="actDepth+1">
          <gantt-bar :start_date="issue.start_date" :end_date="issue.due_date" />
        </gantt-row>
        <!-- issue is a node -->
        <gantt-group :act_depth="actDepth+1" v-else :key="'group' + issue.id" :title="issue.subject" :start_date="getStartEndForSubIssues(issue.sub_issues).startDate" :end_date="getStartEndForSubIssues(issue.sub_issues).endDate" :issues="issue.sub_issues" />
      </template>

      <!-- draw sub projects -->
      <template v-for="sub_project in sub_projects">
        <gantt-row :key="'project' + sub_project.id" :name="sub_project.name" expandable="1" v-model="showChildSlots[sub_project.id]" :act_depth="actDepth+1">
          <gantt-bar :start_date="start_date" :end_date="end_date" type="sum"/>
          <gantt-time-line :milestones="milestones"></gantt-time-line>
        </gantt-row>
        <div :key="'sub_issues' + sub_project.id" v-if="showChildSlots[sub_project.id] && sub_project.issues.length > 0">
          <template v-for="sub_project_issue in sub_project.issues">
            <!-- issue is a leave -->
            <gantt-row v-if="sub_project_issue.sub_issues.length === 0" :key="'issue' + sub_project_issue.id" :name="sub_project_issue.subject" :act_depth="actDepth+1">
              <gantt-bar :start_date="sub_project_issue.start_date" :end_date="sub_project_issue.due_date" />
            </gantt-row>
            <!-- issue is a node -->
            <gantt-group
              v-else
              :key="'group' + sub_project_issue.id"
              :title="sub_project_issue.subject"
              :start_date="getStartEndForSubIssues(sub_project_issue.sub_issues).startDate"
              :end_date="getStartEndForSubIssues(sub_project_issue.sub_issues).endDate"
              :issues="sub_project_issue.sub_issues"
              :act_depth="act_depth+1"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import formatter from "../../mixins/formatter.js";
import moment from "moment";
export default {
  mixins: [formatter],
  name: "GanttGroup",
  props: ["title", "milestones", "start_date", "end_date", "issues", "sub_projects", "act_depth"],
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
      borderSmall: this.$parent.borderSmall,
      borderFat: this.$parent.borderFat,
      showSlots: true,
      showChildSlots: {},
    };
  },
  computed: {
    ...mapState(["timeBeam"]),
    actDepth:function() {
      return parseInt(this.act_depth)
    }
  },
  methods: {
    getStartEndForSubIssues: function (issues) {
      function _flatIssues(_issues) {
        let result = [];
        _issues.forEach((_issue) => {
          result.push(_issue);
          result = result.concat(_flatIssues(_issue.sub_issues));
        });
        return result;
      }
      let allIssues = _flatIssues(issues);
      let start = allIssues.reduce((prev, curr) => (moment(prev.start_date) < moment(curr.start_date) ? prev : curr));
      let end = allIssues.reduce((prev, curr) => (moment(prev.due_date) > moment(curr.due_date) ? prev : curr));
      return { startDate: start.start_date, endDate: end.due_date };
    },
  },
};
</script>

<style scoped>

</style>
