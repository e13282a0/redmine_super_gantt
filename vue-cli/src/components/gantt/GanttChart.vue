<template>
  <div :style="cssVars" class="main" ref="main">
    <!-- year -->
    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col"
          :class="[
            elm.majorSeparator
              ? 'fatBorderLeft'
              : elm.newYear
              ? 'borderLeft'
              : 'col',
            elm,
          ]"
          v-for="elm in timeBeam"
          :key="'year' + elm.startDate"
        >
          <template v-if="elm.newYear">{{
            elm.startDate.format("YYYY")
          }}</template>
        </div>
      </div>
    </div>
    <!-- month -->
    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col"
          :class="[
            elm.majorSeparator
              ? 'fatBorderLeft'
              : elm.newMonth
              ? 'borderLeft'
              : 'col',
            elm,
          ]"
          v-for="elm in timeBeam"
          :key="'month' + elm.startDate"
        >
          <template v-if="elm.newMonth || elm.type === 'broken'">{{
            elm.startDate.format("MMM")
          }}</template>
        </div>
      </div>
    </div>
    <!-- week -->
    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col"
          :class="[
            elm.majorSeparator
              ? 'fatBorderLeft'
              : elm.newWeek
              ? 'borderLeft'
              : 'col',
            elm,
          ]"
          v-for="elm in timeBeam"
          :key="'week' + elm.startDate"
        >
          <template
            v-if="elm.newWeek && (elm.type == 'day' || elm.type == 'week')"
            >{{ elm.startDate.format("WW") }}</template
          >
        </div>
      </div>
    </div>

    <!-- day -->
    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col"
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft']"
          v-for="elm in timeBeam"
          :key="'date' + elm.startDate"
        >
          <template>{{ elm.startDate.format("DD.") }}</template>
        </div>
      </div>
    </div>

    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col"
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft']"
          v-for="elm in timeBeam"
          :key="'day' + elm.startDate"
        >
          <template v-if="elm.type == 'day'">{{
            elm.startDate.format("dd")
          }}</template>
        </div>
      </div>
    </div>

    <div class="rows">
      <slot />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: [],
  name: "GanttChart",
  data() {
    return {
      leftWidth: 200,
      colCount: 90,
      colWidth: 17,
      rowHeight: 18,
      timeBeam: this.getTimeBeam(),
    };
  },
  computed: {
    cssVars() {
      return {
        "--leftWidth": this.leftWidth + "px",
        "--colWidth": this.colWidth + 2 + "px", // add 2 border pixel
        "--rowHeight": this.rowHeight + "px",
      };
    },
  },
  methods: {
    getTimeBeam: function () {
      let days = 35;
      let weeks = 48;
      let months = 100 - days - weeks - 1; //subtract 1 for the broken month
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
      //debugger;
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

        // switch (elm.type) {
        //   case "day":
        //     elm.minorSeparator = index > 0 && elm.startDate.isoWeekday() === 1;
        //     break;
        //   case "week":
        //     elm.minorSeparator =
        //       prevElm.type !== "day" &&
        //       elm.startDate.month() !== prevElm.startDate.month();
        //     break;
        //   case "month":
        //     elm.minorSeparator =
        //       prevElm.type !== "week" &&
        //       elm.startDate.year() !== prevElm.startDate.year();
        //     break;
        // }
      }
      //this.endDate = result[result.length - 1].endDate;
      //debugger;
      return result;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
}
.headline {
  display: block;
  height: 14px;
  overflow: hidden;
}
.left {
  float: left;
  width: var(--leftWidth);
  height: var(--rowHeight);
  font-size: x-small;
  padding: 0;
  text-align: right;
  line-height: 14px;
}
.right {
  width: calc(100% - var(--leftWidth));
  float: left;
  height: 14px;
}

.headline > .right > .col {
  float: left;
  width: var(--colWidth); /* subtract border width*/
  font-size: x-small;
  height: var(--rowHeight);
  vertical-align: top;
  line-height: 14px;
  padding: 0 0 0 2px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.headline > .right > .borderLeft {
  padding: 0 0 0 1px;
  border-left: 1px solid #ccc;
}

.headline > .right > .fatBorderLeft {
  padding: 0;
  border-left: 2px solid #aaa;
}

.holiday {
  background-color: #bbb;
}
</style>
