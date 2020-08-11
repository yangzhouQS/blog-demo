<template>
  <cube-scroll
      style="height: 500px;width: 100%;"
      ref="scroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
    <div>
      <div v-for="(row,index) in 100" :key="index">
        <div style="height: 30px">{{ row }}</div>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  export default {
    name: 'left-scroll',
    data () {
      return {
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: '上拉加载更多...',
              noMore: '没有更多数据...'
            }
          },
          scrollbar: true
        }
      }
    },
    mounted () {
      console.log('left-scroll')
    },
    methods: {
      onPullingDown () {
        let _foods = []
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift(_foods[1])
          } else {
            // 如果没有新数据
            // this.$refs.scrollLeft.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp () {
        let _foods = []
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = _foods.slice(0, 5)
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            // this.$refs.scrollLeft.forceUpdate()
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>