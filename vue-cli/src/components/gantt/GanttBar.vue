<template>
  <div v-if="type === 'sum'" :style="cssVars" class="bar">
    <div class="upper-sum" />
    <div class="lower-sum" />
  </div>
  <div v-else :style="cssVars" class="bar" draggable @dragstart="startDrag($event, start)">
    <div class="upper-bar" />
    <div class="lower-bar" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import moment from "moment";
export default {
  props: ["start_date", "end_date", "type"],
  name: "GanttBar",
  data() {
    return {
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
    };
  },
  computed: {
    ...mapState(["timeBeam"]),
    ...mapGetters(["getTimeBeamIndexByDate", "getTimeBeamPositionByDate"]),
    start: function () {
      return this.getTimeBeamPositionByDate(moment(this.start_date).startOf("day"), this.colWidth);
      //return this.getTimeBeamIndexByDate(this.start)
    },
    end: function () {
      return this.getTimeBeamPositionByDate(moment(this.end_date).endOf("day"), this.colWidth);
      //return this.getTimeBeamIndexByDate(this.end)
    },
    cssVars() {
      let left = Math.max(this.start.index * this.colWidth + this.start.offset, 0);
      let width = Math.max((this.end.index - this.start.index) * this.colWidth + this.end.offset - this.start.offset, 0);
      let barHeight = this.rowHeight - 6;
      return {
        "--startIndex": this.start.index,
        "--endIndex": this.end.index,
        "--left": left + "px",
        "--width": width + "px",
        "--top": (this.rowHeight - barHeight) / 2 + "px",
        "--height": barHeight + "px",
      };
    },
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
  },
};
</script>

<style scoped>
.upper-sum {
  height: calc(var(--height)/2);
  background-color: #999;
  top:0px;
  border-left: 2px solid #999;
  border-right: 2px solid #999;
}

.lower-sum {
  height: calc(var(--height)/2);
  top:calc(var(--height)/2)px;
  border-left: 2px solid #999;
  border-right: 2px solid #999;
}


.upper-bar {
  height: calc(var(--height)/2);
  top:0px;
  background-color: rgb(128, 128, 247);
  /*border: 1px solid #d3d3d3;*/
  text-align: center;
  cursor: move;
}

.lower-bar {
  height: calc(var(--height)/2);
  top:calc(var(--height)/2)px;
  background-color: rgb(128, 128, 247);
  /*border: 1px solid #d3d3d3;*/
  text-align: center;
  cursor: move;
}

.bar {
  z-index: 9;
  top: var(--top);
  left: var(--left);
  height: var(--height);
  width: var(--width);
  /*min-width: var(--colWidth);*/
  line-height: var(--height);
  font-size: xx-small;
  border: 0;
}

/*Drgable */

.bar {
  position: absolute;
  /*resize: both; !*enable this to css resize*! */
  overflow: auto;
}

/*Resizeable*/

.popup .resizer-right {
  width: 5px;
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: e-resize;
}
</style>
