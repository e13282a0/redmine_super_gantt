<template>
  <div id="app">
    <gantt-chart>
      <gantt-head-line></gantt-head-line>
      <gantt-row key="2" name="kre">
        <gantt-time-line
          :milestones="[
            { id: 1, date: '2022-02-23', status: 1, title: 'milestone 1' },
            { id: 2, date: '2022-05-16', status: 0, title: 'milestone 2' },
          ]"
        ></gantt-time-line>
      </gantt-row>
      <gantt-row key="1" name="ruc">
        <gantt-bar start="2022-02-17" end="2022-02-22"> </gantt-bar>
        <gantt-bar start="2022-04-01" end="2022-05-07"> </gantt-bar>
        <gantt-bar start="2022-08-01" end="2022-12-05"> </gantt-bar>
        <gantt-bar start="2022-02-28" end="2022-02-28"> </gantt-bar>
      </gantt-row>
      <gantt-row key="3" name="sei"> </gantt-row>
    </gantt-chart>
  </div>
</template>

<script>
import GanttBar from "./components/gantt/GanttBar.vue";
import GanttChart from "./components/gantt/GanttChart.vue";
import GanttRow from "./components/gantt/GanttRow.vue";
import GanttTimeLine from "./components/gantt/GanttTimeLine.vue";
import GanttHeadLine from "./components/gantt/GanttHeadLine.vue";

export default {
  name: "App",
  components: {
    GanttBar,
    GanttChart,
    GanttRow,
    GanttTimeLine,
    GanttHeadLine,
  },
};
</script>

<style></style>
