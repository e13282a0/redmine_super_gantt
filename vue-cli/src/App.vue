<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-progress-linear indeterminate v-if="!isInit.projects"></v-progress-linear>

        <gantt-chart :ganttdata="chartData" v-else> </gantt-chart>
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
      chartData: [
        {
          id: 1,
          name: "testproject1",
          milestones: [
            { id: 1, date: "2022-02-23", status: 1, title: "milestone 1" },
            { id: 2, date: "2022-05-22", status: 0, title: "milestone 2" },
          ],
          issues: [
            {
              id: 1,
              subject: "issue 1",
              tracker: "theme",
              description: "some text here",
              start_date: "2022-02-28",
              due_date: "2022-02-28",
              assigned_to: "kre",
              lock_version: 1,
              done_ratio: 33,
              estimed_hours: 200,
              spent_hours: 120,
              closed_on: null,
              sub_issues: [],
            },
            {
              id: 2,
              subject: "issue 2",
              tracker: "theme",
              description: "some text here",
              start_date: "2022-04-01",
              due_date: "2022-05-07",
              assigned_to: "kre",
              lock_version: 1,
              done_ratio: 66,
              estimed_hours: 200,
              spent_hours: 120,
              closed_on: null,
              sub_issues: [
                {
                  id: 11,
                  subject: "sub issue 1",
                  tracker: "epic",
                  description: "some text here",
                  start_date: "2022-04-01",
                  due_date: "2022-05-01",
                  assigned_to: "kre",
                  lock_version: 1,
                  done_ratio: 0,
                  estimed_hours: 12,
                  spent_hours: 0,
                  closed_on: null,
                  sub_issues: [],
                },
                {
                  id: 12,
                  subject: "sub issue 2",
                  tracker: "epic",
                  description: "some text here",
                  start_date: "2022-02-28",
                  due_date: "2022-02-28",
                  assigned_to: "kre",
                  lock_version: 1,
                  done_ratio: 0,
                  estimed_hours: 12,
                  spent_hours: 0,
                  closed_on: null,
                  sub_issues: [
                    {
                      id: 111,
                      subject: "subsub issue 1",
                      tracker: "task",
                      description: "some text here",
                      start_date: "2022-02-28",
                      due_date: "2022-03-17",
                      assigned_to: "kre",
                      lock_version: 1,
                      done_ratio: 0,
                      estimed_hours: 12,
                      spent_hours: 0,
                      closed_on: null,
                      sub_issues: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 3,
              subject: "issue 3",
              tracker: "theme",
              description: "some text here",
              start_date: "2022-08-01",
              due_date: "2022-12-04",
              assigned_to: "ruc",
              lock_version: 1,
              done_ratio: 100,
              estimed_hours: 200,
              spent_hours: 120,
              closed_on: null,
              sub_issues: [],
            },
          ],
        },
      ],
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
