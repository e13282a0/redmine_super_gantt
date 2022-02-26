<template>
  <div id="app">
    <v-app>
      <v-main>
        <gantt-chart :ganttdata="chartData">
        </gantt-chart>
      </v-main>
    </v-app>
  </div>
</template>

<script>
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
              descripton: "some text here",
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
              descripton: "some text here",
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
                  descripton: "some text here",
                  start_date: "2022-02-28",
                  due_date: "2022-02-28",
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
                  descripton: "some text here",
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
                      descripton: "some text here",
                      start_date: "2022-02-28",
                      due_date: "2022-02-28",
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
              descripton: "some text here",
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
};
</script>

<style></style>
