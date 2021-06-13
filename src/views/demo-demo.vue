<template>
  <div class="demo-demo">
    <div style="height:300px;border:1px solid #333">
      cdscdscdscd
    </div>
  </div>
</template>

<script>
import CellSwipe from "@/views/cell-swipe/cell-swipe";
import Cell from "@/views/cell/cell";
import Row from "@/views/custom-layout/row.vue";
import ACol from "@/views/custom-layout/col.vue";

export default {
  name: "demo-demo",
  components: { Row, Cell, CellSwipe, ACol },
  data() {
    return {
      selectedLabel: 1,
      selectedLabelDefault: 'Vip',
      tabs: [
        {
          label: '水稳混合料',
          type: 1
        },
        {
          label: '沥青混合料',
          type: 2
        }
        /* {
           label: '封、透、粘层',
           type: 3,
         } */
      ],
      input:''
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    _changeTab (val) {
      console.log(this.selectedLabel, val)
    },
    $_change(){
      console.log('change')
    }
  }
}
</script>
<style scoped lang="scss">
.demo-demo {
  .receive-item {
    width: 100%;
    height: 30px;
    border: 1px solid #333;
  }
}
</style>
