<template>
  <div id="app">
    <v-app><v-main>
    <gantt-chart>
      <gantt-head-line></gantt-head-line>
      <gantt-row key="2" name="kre">
        <gantt-time-line
          :milestones="[
            { id: 1, date: '2022-02-23', status: 1, title: 'milestone 1' },
            { id: 2, date: '2022-05-22', status: 0, title: 'milestone 2' },
          ]"
        ></gantt-time-line>
      </gantt-row>
      <gantt-row key="1" name="ruc">
        <gantt-bar start_date="2022-02-28" end_date="2022-02-28"> </gantt-bar>
        <gantt-bar start_date="2022-04-01" end_date="2022-05-07"> </gantt-bar>
        <gantt-bar start_date="2022-08-01" end_date="2022-12-04"> </gantt-bar>
      </gantt-row>
      <gantt-row key="3" name="sei"> </gantt-row>

      <gantt-group>
        <gantt-row key="4" name="group elm 1">
          <gantt-bar start_date="2022-02-28" end_date="2022-02-28"> </gantt-bar>
          <gantt-bar start_date="2022-04-01" end_date="2022-05-07"> </gantt-bar>
          <gantt-bar start_date="2022-08-01" end_date="2022-12-04"> </gantt-bar>
        </gantt-row>
        <gantt-row key="5" name="group elm 2">
          <gantt-bar start_date="2022-02-28" end_date="2022-02-28"> </gantt-bar>
          <gantt-bar start_date="2022-04-01" end_date="2022-05-07"> </gantt-bar>
          <gantt-bar start_date="2022-08-01" end_date="2022-12-04"> </gantt-bar>
        </gantt-row>
        <gantt-row key="6" name="group elm 3">
          <gantt-bar start_date="2022-02-28" end_date="2022-02-28"> </gantt-bar>
          <gantt-bar start_date="2022-04-01" end_date="2022-05-07"> </gantt-bar>
          <gantt-bar start_date="2022-08-01" end_date="2022-12-04"> </gantt-bar>
        </gantt-row>
      </gantt-group>
    </gantt-chart>
    </v-main></v-app>
  </div>
</template>

<script>
import GanttBar from "./components/gantt/GanttBar.vue";
import GanttChart from "./components/gantt/GanttChart.vue";
import GanttRow from "./components/gantt/GanttRow.vue";
import GanttTimeLine from "./components/gantt/GanttTimeLine.vue";
import GanttHeadLine from "./components/gantt/GanttHeadLine.vue";
import GanttGroup from "./components/gantt/GanttGroup.vue";

export default {
  name: "App",
  components: {
    GanttBar,
    GanttChart,
    GanttRow,
    GanttTimeLine,
    GanttHeadLine,
    GanttGroup,
  },
};
</script>

<style></style>
