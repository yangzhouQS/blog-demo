<template>
  <div class="demo-demo">
    xass
    <p>{{ min }}</p>
    <slider v-model="value" @change="onChange" range :min="min" :max="max"/>
    {{ max }}
    <p>value = {{ value }}</p>
  </div>
</template>

<script>
import Scroller from "@/views/scroller/scroller";
import Slider from "@/views/slider/slider";

export default {
  name: "demo-demo",
  components: { Slider, Scroller },
  data() {
    return {
      min: 10,
      max: 90,
      value: [10, 30]
    }
  },
  mounted() {
  },
  computed: {},
  methods: {
    onChange(value) {
      console.log('当前值：' + value);
    }
  }
}
</script>

<style scoped lang="scss">
.demo-demo {
  width: 100%;
  height: 100%;
}
</style>
