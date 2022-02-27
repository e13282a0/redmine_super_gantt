<template>
  <div :style="cssVars" class="gantt-row">
    <div class="left">{{ name }}</div>
    <div class="right" ref="right">
      <div
        v-for="elm in timeBeam"
        :key="'col' + elm.startDate"
        class="col borderTop hover"
        :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft',  isToday(elm.startDate) ? 'today':(elm.type == 'day') &&isWeekend(elm.startDate) ? 'weekend':'', ]"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      ></div>
      <slot />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import formatter from '../../mixins/formatter.js'
export default {
  mixins:[formatter],
  props: ["name"],
  name: "GanttRow",
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
      borderSmall: this.$parent.borderSmall,
      borderFat:this.$parent.borderFat,
      startDate: this.$parent.startDate,
      actDepth: this.$parent.actDepth,
    };
  },
  computed: {
    ...mapState(['timeBeam']),
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
    onDrop(evt, list) {
      //const itemID = evt.dataTransfer.getData("itemID");
      console.log(list);
      //const item = this.items.find(item => item.id == itemID)
      //item.list = list
    },
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
