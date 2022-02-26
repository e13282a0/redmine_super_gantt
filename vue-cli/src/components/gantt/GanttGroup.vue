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
          class="col"
          :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft']"
        ></div>
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
export default {
  name: "GanttGroup",
  props: ["title"],
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

.col:hover {
  background-color: #eee;
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
}

.borderLeft {
  padding: 0 0 0 calc(var(--borderFat) - var(--borderSmall));
  border-left: var(--borderSmall) solid #ccc;
}

.fatBorderLeft {
  padding: 0;
  border-left: var(--borderFat) solid #aaa;
}
</style>
