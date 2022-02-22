<template>
  <div
    :style="cssVars"
    class="bar"
    draggable
    @dragstart="startDrag($event, start)"
  >
    gallo
  </div>
</template>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
export default {
  props: ["start", "end"],
  name: "GanttBar",
  data() {
    return {
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
    };
  },
  computed: {
    ...mapState(['timeBeam']),
    startIndex: function () {
      let _this = this;
      return this.timeBeam.findIndex(function (elm) {
        //console.log(moment(_this.start)+"|"+elm.startDate+"|"+elm.endDate)+"|"+moment(_this.start) >= elm.startDate+"|"+moment(_this.start) <= elm.endDate
        return elm.startDate >= moment(_this.start).startOf("day");
      });
    },
    endIndex: function () {
      let _this = this;
      return this.timeBeam.findIndex(function (elm) {
        return elm.startDate >= moment(_this.end).endOf("day");
      });
    },
    cssVars() {
      return {
        "--startIndex": this.startIndex,
        "--endIndex": this.endIndex,
        "--left": this.startIndex * (this.colWidth + 2) + "px",
        "--width":
          (this.endIndex - this.startIndex) * (this.colWidth + 2) + "px", // add 2 border pixel
        "--height": this.rowHeight - 3 + "px",
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
.bar {
  z-index: 9;
  background-color: rgb(128, 128, 247);
  border: 1px solid #d3d3d3;
  text-align: center;
  cursor: move;
  top: 2px;
  left: var(--left);
  height: var(--height);
  width: var(--width);
  min-width: var(--colWidth);
  line-height: var(--height);
  font-size: xx-small;
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
