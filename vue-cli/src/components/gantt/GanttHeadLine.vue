<template>
  <div :style="cssVars" class="main">
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
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft',  isToday(elm.startDate) ? 'today':(elm.type == 'day') &&isWeekend(elm.startDate) ? 'weekend':'', ]"
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
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft', isToday(elm.startDate) ? 'today':(elm.type == 'day') &&isWeekend(elm.startDate) ? 'weekend':'', ]"
          v-for="elm in timeBeam"
          :key="'day' + elm.startDate"
        >
          <template v-if="elm.type == 'day'">{{
            elm.startDate.format("dd")
          }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment'
export default {
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
      borderSmall: this.$parent.borderSmall,
      borderFat: this.$parent.borderFat,
    };
  },
  computed: {
    ...mapState(["timeBeam"]),
    cssVars() {
      return {
        "--leftWidth": this.leftWidth + "px",
        "--colWidth": this.colWidth + "px",
        "--rowHeight": this.rowHeight + "px",
        "--borderSmall": this.borderSmall + "px",
        "--borderFat": this.borderFat + "px",
      };
    },
  },
  methods:{
    isToday:function(date) {
      let diff = moment().diff(date, 'hours');
      return diff > 0 && diff < 24
    },
    isWeekend:function(date) {
      return date.isoWeekday()>5
    }
  }
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
  z-index: 2;
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

.col {
  float: left;
  width: var(--colWidth); /* subtract border width*/
  font-size: x-small;
  height: var(--rowHeight);
  vertical-align: top;
  line-height: 14px;
  padding: 0 0 0 var(--borderFat);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.borderLeft {
  padding: 0 0 0 calc(var(--borderFat) - var(--borderSmall));
  border-left: var(--borderSmall) solid #ccc;
}

.fatBorderLeft {
  padding: 0;
  border-left: var(--borderFat) solid #aaa;
}

.today {
  background-color: lightgreen;
}

.weekend {
  background-color: lightgray;
}
</style>
