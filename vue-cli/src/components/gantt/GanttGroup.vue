<template>
  <div>
    <!-- header -->
    <div :style="cssVars" class="gantt-row">
      <div class="left">
          <v-btn icon x-small height="19px" @click="showSlots=!showSlots">
              <v-icon  v-if="showSlots">mdi-chevron-down</v-icon>
              <v-icon  v-if="!showSlots">mdi-chevron-right</v-icon>
              </v-btn>
              {{ title }}
              </div>
      <div class="right" ref="right">
        <div
          v-for="elm in timeBeam"
          :key="'col' + elm.startDate"
          class="col borderTop"
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft',  isToday(elm.startDate) ? 'today':(elm.type == 'day') &&isWeekend(elm.startDate) ? 'weekend':'', ]"
        />
        <gantt-bar :start_date="start_date" :end_date="end_date" />
        <gantt-time-line :milestones="milestones"></gantt-time-line>
      </div>
    </div>
    <!-- content -->
    <div v-if="showSlots">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import formatter from '../../mixins/formatter.js'
export default {
  mixins:[formatter],
  name: "GanttGroup",
  props: ["title","milestones","start_date", "end_date"],
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
      borderSmall: this.$parent.borderSmall,
      borderFat: this.$parent.borderFat,
      actDepth: this.$parent.actDepth + 1,
      showSlots:true,
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
  methods: {
    method() {},
  },
};
</script>

<style scoped>
.gantt-row {
  display: block;
  height: var(--rowHeight);
  overflow: hidden;
}
.left {
  float: left;
  width: var(--leftWidth);
  height: var(--rowHeight);
}
.right {
  width: calc(100% - var(--leftWidth));
  float: left;
  height: var(--rowHeight);
  position: relative;
}

</style>
