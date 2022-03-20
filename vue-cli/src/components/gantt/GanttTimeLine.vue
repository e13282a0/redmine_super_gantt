<template>
  <div>
    <template v-for="milestone in milestones"  >
      <div :key="milestone.name" draggable @dragstart="startDrag($event, milestone)" class="milestone" :style="getCssVars(milestone.effective_date)">
        <v-icon small>mdi-rhombus</v-icon>
      </div>
      <div class="milestone-caption" :key="'caption' + milestone.name" :style="getCssVars(milestone.effective_date)">
        <a :href="'versions/'+milestone.id" target="_blank">{{ milestone.name }}</a>
      </div>
    </template>
    <!--<div class="signBar" :style="barCssVars" />-->
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
export default {
  //drag drop example
  //https://learnvue.co/2020/01/how-to-add-drag-and-drop-to-your-vuejs-project/#adding-drag-and-drop-functionality

  props: ["milestones"], // [{id, date, status, title},{id, date,status,title}]
  name: "GanttTimeLine",
  data() {
    return {
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
    };
  },
  computed: {
    ...mapState(["timeBeam"]),
    ...mapGetters(["getTimeBeamIndexByDate", "getTimeBeamPositionByDate"]),
  },
  methods: {
    getCssVars: function (date) {
      let elm = this.getTimeBeamPositionByDate(moment(date).startOf("day").hours(12), this.colWidth);
      // eslint-disable-next-line
      // debugger;
      return {
        "--left": elm.index * this.colWidth + elm.offset - 3 + "px", // subtract 3 px for font width of mark
        "--height": this.rowHeight - 3 + "px",
      };
    },
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
  },
};
</script>

<style scoped>
.milestone {
  z-index: 50;
  display: inline;
  cursor: move;
  top: 1px;
  left: var(--left);
  height: var(--height);
  /*width: var(--colWidth);*/
  line-height: var(--height);
  position: absolute;
  vertical-align: middle;
  font-size: xx-small;
}

.milestone-caption {
  z-index: 50;
  display: inline;
  top: 1px;
  left: var(--left);
  height: var(--height);
  /*width: var(--colWidth);*/
  margin-left:2em;
  line-height: var(--height);
  position: absolute;
  width: 200px;
  vertical-align: middle;
  font-size: xx-small;
  transform-origin: left bottom;
  transform: rotate(-5deg);
}

.signBar {
  position: absolute;
  z-index: 8;
  background-color: rgb(128, 128, 247);
  text-align: center;
  top: 7px;
  left: var(--left);
  height: 4px;
  /*width: var(--width);*/
}
</style>
