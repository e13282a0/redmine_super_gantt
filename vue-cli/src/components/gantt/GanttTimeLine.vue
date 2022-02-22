<template>
  <div>
    <div
      v-for="milestone in milestones"
      :style="getCssVars(milestone.date)"
      class="milestone"
      :key="milestone.title"
      draggable
      @dragstart="startDrag($event, milestone)"
    >
      • {{ milestone.title }}
    </div>
    <!--<div class="signBar" :style="barCssVars" />-->
  </div>
</template>

<script>
import moment from 'moment';
import {mapState, mapGetters} from 'vuex'; 
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
    ...mapState(['timeBeam']),
    ...mapGetters(['getTimeBeamIndexByDate']),
    barCssVars: function () {
      let min = this.milestones.reduce(function (a, b) {
        return moment(a.date) < moment(b.date) ? a : b;
      });
      let max = this.milestones.reduce(function (a, b) {
        return moment(a.date) > moment(b.date) ? a : b;
      });
      let minIndex = this.getTimeBeamIndexByDate(min.date);
      let maxIndex = this.getTimeBeamIndexByDate(max.date);
      return {
        "--left": minIndex * (this.colWidth + 2) + "px",
        "--width": (maxIndex - minIndex + 1) * (this.colWidth + 4) + "px", // add 2 border pixel
      };
    },
  },
  methods: {
    getCssVars: function (date) {
      let index = this.getTimeBeamIndexByDate(date)
      return {
        "--left": index * (this.colWidth + 2) + "px",
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
  cursor: move;
  top: 5px;
  left: var(--left);
  height: var(--height);
  /*width: var(--colWidth);*/
  line-height: var(--height);
  position: absolute;
  width:200px;
  vertical-align: middle;
  transform-origin: left bottom;
  transform: rotate(-5deg);
  font-size: xx-small;
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
