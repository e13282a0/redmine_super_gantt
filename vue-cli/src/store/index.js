import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import moment from 'moment'
export default new Vuex.Store({
  state: {
    timeBeam:[]
  },
  getters: {},
  mutations: {
    makeTimeBeam: function (state, config={days:35, weeks:48, months:12}) {
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
        let _endDate = moment(startRegMonth)
          .add(i, "month")
          .endOf("month")
          .endOf("day");
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

        elm.newWeek =
          index === 0 || elm.startDate.isoWeek() != prevElm.startDate.isoWeek();
        elm.newMonth =
          index === 0 || elm.startDate.month() != prevElm.startDate.month();
        elm.newYear =
          index === 0 || elm.startDate.year() != prevElm.startDate.year();

        state.timeBeam= result;
      }
    },
  },
  actions: {},
  modules: {},
});
