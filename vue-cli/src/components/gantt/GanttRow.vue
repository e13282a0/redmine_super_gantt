<template>
  <div :style="cssVars" class="gantt-row">
    <div class="left">{{ name }}</div>
    <div class="right" ref="right">
      <div
        v-for="elm in timeBeam"
        :key="'col' + elm.startDate"
        class="col"
        :class="[elm.majorSeparator ? 'fatBorderLeft' : 'borderLeft']"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      ></div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  name: "GanttRow",
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
    };
  },
  computed: {
    timeBeam: function(){ return this.$store.state.timeBeam},
    cssVars() {
      return {
        "--leftWidth": this.leftWidth + "px",
        "--colWidth": this.colWidth + 2 + "px", // add 2 border pixel
        "--rowHeight": this.rowHeight + "px",
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
  padding: 0 0 0 2px;
  border-top: 1px solid #ccc;
}

.borderLeft {
  padding: 0 0 0 1px;
  border-left: 1px solid #ccc;
}

.fatBorderLeft {
  padding: 0;
  border-left: 2px solid #aaa;
}
</style>
