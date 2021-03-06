import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//import VueAxios from "vue-axios";

Vue.use(Vuex);
import moment from "moment";
export default new Vuex.Store({
  state: {
    timeBeam: [],
    projectList: [],
    projects: [],
    loadingStatus: 0,
    isInit: {
      projects: false
    }
  },
  getters: {
    getTimeBeamIndexByDate: (state) => (date) => {
      let index = state.timeBeam.findIndex(function (elm) {
        return elm.startDate >= moment(date).startOf("day");
      });
      return index < 0 ? 0 : index;
    },
    getTimeBeamPositionByDate: (state) => (date, width) => {
      let index = state.timeBeam.findIndex(function (elm) {
        return elm.startDate >= moment(date).startOf("day");
      });
      if (index < 0) return { index: 0, offset: 0 };

      let timeSpan = Math.round(state.timeBeam[index].endDate.diff(state.timeBeam[index].startDate, "minutes"));
      let minutes = moment(date).diff(state.timeBeam[index].startDate, "minutes");
      let offset = Math.round(width * (minutes / timeSpan));
      // eslint-disable-next-line
      //debugger;
      return { index: index, offset: offset };
    },

  },
  mutations: {
    addProject(state, data) {
      state.projects.push(data)
    },
    setProjectList(state, data) {
      state.projectList = data;
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setProjectsInit(state) {
      state.isInit.projects = true;
    },
    resetLoadingStatus(state) {
      state.loadingStatus = 0;
    },
    addLoadingStatus(state, val) {
      state.loadingStatus += val;
    },
    makeTimeBeam(state, config = { days: 35, weeks: 48, months: 12 }) {
      let days = config.days;
      let weeks = config.weeks;
      let months = config.weeks;
      let result = [];
      const today = moment();
      const startDate = today.startOf("isoWeek"); // add one day if startday is sunay
      // days
      for (let i = 0; i < days; i++) {
        result.push({
          type: "day",
          startDate: moment(startDate).add(i, "days").startOf("day"),
          endDate: moment(startDate).add(i, "days").endOf("day"),
          holidays: 0,
          majorSeparator: false,
        });
      }

      // weeks
      for (let i = 0; i < weeks; i++) {
        result.push({
          type: "week",
          startDate: moment(startDate)
            .add(days + i * 7, "days")
            .startOf("day"),
          endDate: moment(startDate)
            .add(days + i * 7 + 7, "days")
            .endOf("day"),
          holidays: 0,
          majorSeparator: i === 0,
        });
      }

      // broken month
      let latestDate = moment(startDate).add(days + weeks * 7, "days");
      result.push({
        type: "broken",
        startDate: latestDate,
        endDate: moment(latestDate).endOf("month").endOf("day"),
        holidays: 0,
        majorSeparator: true,
      });
      let startRegMonth = moment(latestDate).endOf("month").add(1, "day");

      // months
      for (let i = 0; i < months; i++) {
        let _startDate = moment(startRegMonth).add(i, "month").startOf("month");
        let _endDate = moment(startRegMonth).add(i, "month").endOf("month").endOf("day");
        result.push({
          type: "month",
          startDate: _startDate,
          endDate: _endDate,
          holidays: 0,
          majorSeparator: i === 0, // separator for broken month
        });
      }
      // set separators
      for (let index = 0; index < result.length; index++) {
        let elm = result[index];
        let prevElm = result[index - 1];

        elm.newWeek = index === 0 || elm.startDate.isoWeek() != prevElm.startDate.isoWeek();
        elm.newMonth = index === 0 || elm.startDate.month() != prevElm.startDate.month();
        elm.newYear = index === 0 || elm.startDate.year() != prevElm.startDate.year();

        state.timeBeam = result;
      }
    },
  },
  actions: {
    initProjects({ commit }) {
      commit("resetLoadingStatus")
      axios.get("/super_gantt/api/projects").then((response) => {
        let projectList = response.data

        let filteredList = projectList.filter(project => {

          return project["Internal Project Status"] === "In Arbeit" && project["Type"] === "Standard"
        })
        

        let step = 100 / projectList.length;
        commit("setProjectList", filteredList);
        let projectPromises = []

        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        filteredList.forEach((projectElm, index) => {

          projectPromises.push(
            wait(index * 750).then(() => {
              axios.get("/super_gantt/api/projects/" + projectElm.id).then((response) => {
                commit("addProject", response.data);
                commit("addLoadingStatus", step)
              })
            })
          )
        });
        Promise.all(projectPromises).then(() => {
          commit("setProjectsInit")
        });
      });
    },
  },
  modules: {},
});
