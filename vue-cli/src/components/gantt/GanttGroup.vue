<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      leftWidth: this.$parent.leftWidth,
      colCount: this.$parent.colCount,
      colWidth: this.$parent.colWidth,
      rowHeight: this.$parent.rowHeight,
      borderSmall: this.$parent.borderSmall,
      borderFat: this.$parent.borderFat,
      actDepth: this.$parent.actDepth + 1,
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
.left {
  float: left;
  width: var(--leftWidth);
  height: var(--rowHeight);
  font-size: x-small;
  padding: 0;
  text-align: right;
  line-height: 14px;
}
.right {
  width: calc(100% - var(--leftWidth));
  float: left;
  height: 14px;
}
</style>
