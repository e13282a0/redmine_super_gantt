<template>
  <div>
    <div
      v-for="milestone in milestones"
      :style="getCssVars(milestone.date)"
      class="gem"
      :key="milestone.title"
      draggable
      @dragstart="startDrag($event, milestone)"
    >
      <span class="sign">•</span> {{ milestone.title }}
    </div>
    <div class="signBar" :style="barCssVars" />
  </div>
</template>

<script>
import moment from 'moment';
export default {
  //drag drop example
  //https://learnvue.co/2020/01/how-to-add-drag-and-drop-to-your-vuejs-project/#adding-drag-and-drop-functionality

  props: ["milestones"], // [{id, date, status, title},{id, date,status,title}]
  name: "GanttTimeLine",
  data() {
    return {
      timeBeam: this.$parent.timeBeam,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
    };
  },
  computed: {
    barCssVars: function () {
      let min = this.milestones.reduce(function (a, b) {
        return moment(a.date) < moment(b.date) ? a : b;
      });
      let max = this.milestones.reduce(function (a, b) {
        return moment(a.date) > moment(b.date) ? a : b;
      });
      let minIndex = this.getIndex(min.date);
      let maxIndex = this.getIndex(max.date);
      return {
        "--left": minIndex * (this.colWidth + 2) + "px",
        "--width": (maxIndex - minIndex + 1) * (this.colWidth + 2) + "px", // add 2 border pixel
      };
    },
  },
  methods: {
    getCssVars: function (date) {
      let index = this.timeBeam.findIndex(function (elm) {
        return elm.startDate >= moment(date).startOf("day");
      });
      return {
        "--left": index * (this.colWidth + 2) + "px",
        "--height": this.rowHeight - 3 + "px",
      };
    },
    getIndex: function (date) {
      return this.timeBeam.findIndex(function (elm) {
        return elm.startDate >= moment(date).startOf("day");
      });
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
.gem {
  z-index: 9;
  cursor: move;
  top: 2px;
  left: var(--left);
  height: var(--height);
  width: var(--colWidth);
  line-height: var(--height);
  position: absolute;
}

.sign {
  color: red;
  font-weight: bold;
  font-size: 50px;
}

.signBar {
  position: absolute;
  z-index: 8;
  background-color: rgb(128, 128, 247);
  text-align: center;
  top: 7px;
  left: var(--left);
  height: 4px;
  width: var(--width);
}
</style>
