<template>
  <div :style="cssVars" class="main">
    <!-- year -->
    <div class="headline">
      <div class="left"></div>
      <div class="right">
        <div
          class="col borderTop borderBottom"
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
          class="col borderTop borderBottom"
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
          class="col borderTop borderBottom"
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
          class="col borderTop borderBottom"
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
          class="col borderTop fatBorderBottom"
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
import formatter from '../../mixins/formatter.js'
export default {
  mixins:[formatter],
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
    
  }
};
</script>

<style scoped>

</style>
