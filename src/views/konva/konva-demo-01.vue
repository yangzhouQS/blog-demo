<template>
  <div class="konva-demo-01">
    <div id="container"></div>
  </div>
</template>

<script>
import Konva from 'konva'

export default {
  name: 'konva-demo-01',
  data() {
    return {
      stage: null,
      layer: null
    }
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.initStage()
      this.initLayer()
    })
  },
  methods: {
    initLayer() {
      const layer = new Konva.Layer();
      const stage = this.stage
      const circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      });

      layer.add(circle);

      this.stage.add(layer);

      layer.draw();
    },
    initStage() {
      this.stage = new Konva.Stage({
        container: 'container',   // id of container <div>
        width: 500,
        height: 300
      })
    }
  }
}
</script>

<style scoped lang="scss">
.konva-demo-01 {
  #container {
    width: 500px;
    height: 300px;
  }
}
</style>
