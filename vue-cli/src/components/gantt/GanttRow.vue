<template>
  <div :style="cssVars" class="gantt-row">
    <div v-if="!expandable" class="left noicon"><a :href="link" target="_bank">{{ name }}</a></div>
    <div v-else class="left icon">
        <v-btn icon x-small height="19px" @click="invertValue">
          <v-icon v-if="value" height="18px" width="18px">mdi-chevron-down</v-icon>
          <v-icon v-if="!value">mdi-chevron-right</v-icon>
        </v-btn>
        <a :href="link" target="_bank">{{ name }}</a>
      </div>

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
  props: ["name", "expandable", "value", "act_depth", "link"],
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
    };
  },
  computed: {
    ...mapState(['timeBeam']),
    actDepth:function() {
      return parseInt(this.act_depth)
    },
    cssVars() {
      return {
        "--leftWidth": this.leftWidth + "px",
        "--colWidth": this.colWidth + "px", 
        "--rowHeight": this.rowHeight + "px",
        "--borderSmall": this.borderSmall + "px",
        "--borderFat": this.borderFat + "px",
        "--paddingLeftIcon" : (this.actDepth*12)+10+"px",
        "--paddingLeftNoIcon" : (this.actDepth*12)+22+"px",
      };
    },
  },
  methods: {
    invertValue () {
      this.$emit('input', !this.value)
    },
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
.icon {
  padding-left:var(--paddingLeftIcon);
}

.noicon {
  padding-left:var(--paddingLeftNoIcon);
}
.left {
  float: left;
  width: var(--leftWidth);
  height: var(--rowHeight);
  vertical-align: middle;
  line-height: var(--rowHeight);
}
.right {
  width: calc(100% - var(--leftWidth));
  float: left;
  height: var(--rowHeight);
  position: relative;
}

</style>
