import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// components
import GanttBar from "./components/gantt/GanttBar.vue";
import GanttChart from "./components/gantt/GanttChart.vue";
import GanttRow from "./components/gantt/GanttRow.vue";
import GanttTimeLine from "./components/gantt/GanttTimeLine.vue";
import GanttHeadLine from "./components/gantt/GanttHeadLine.vue";
import GanttGroup from "./components/gantt/GanttGroup.vue";
Vue.component('gantt-bar',GanttBar);
Vue.component('gantt-chart',GanttChart);
Vue.component('gantt-row',GanttRow);
Vue.component('gantt-time-line',GanttTimeLine);
Vue.component('gantt-head-line',GanttHeadLine);
Vue.component('gantt-group',GanttGroup);


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
