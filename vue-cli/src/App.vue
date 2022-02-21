<template>
  <div id="app">
        <gantt-chart>
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

export default {
  name: "App",
  components: {
    GanttBar,
    GanttChart,
    GanttRow,
    GanttTimeLine,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
