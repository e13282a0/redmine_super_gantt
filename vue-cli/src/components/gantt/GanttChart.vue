<template>
  <div>

    <div class="rows">
      <slot />
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  props: [],
  name: "GanttChart",
  
  data() {
    return {
      leftWidth: 200,
      colCount: 90,
      colWidth: 19,
      rowHeight: 18,
      borderSmall: 1,
      borderFat:2
    };
  },
  computed: {
    ...mapState(['timeBeam']),
  },
  methods: {
    ...mapMutations(['makeTimeBeam']),
  },
  mounted: function() {
    this.makeTimeBeam({days:35, weeks:48, months:this.colCount-35-48-1})
  }
    
  
};
</script>

<style scoped>



.holiday {
  background-color: #bbb;
}

</style>
