<template>
  <div class="test-demo">
    <cube-tab-bar class='test-tab-bar' v-model="selectedLabel" show-slider @change="changeTab">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
      </cube-tab>
    </cube-tab-bar>
    <!--<div class="head-tab-bar">
      head-tab-bar
    </div>-->
    <div class="test-scroll">
      <keep-alive>
        <component :is="comName"></component>
      </keep-alive>
      <!-- <div v-if="selectedLabel === 'A'">
         A
         <left-scroll />
       </div>
       <div v-else>
         B
         <right-scroll />
       </div>-->
    </div>
  </div>
</template>

<script>
  import DrawerDemo from './drawer-demo'
  import LeftScroll from './left-scroll'
  import RightScroll from './right-scroll'

  export default {
    name: 'test222',
    components: { RightScroll, LeftScroll, DrawerDemo },
    data () {
      return {
        comName: 'LeftScroll',
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
        },
        options2: {
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
        },
        selectedLabel: 'A',
        tabs: [ {
          label: 'A',
          icon: 'cubeic-like',
          heroes: [ '敌法师', '卓尔游侠', '主宰', '米拉娜', '变体精灵', '幻影长矛手', '复仇之魂', '力丸', '矮人狙击手', '圣堂刺客', '露娜', '赏金猎人', '熊战士' ]
        }, {
          label: 'B',
          icon: 'cubeic-star',
          heroes: [ '血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波' ]
        } ],
        items: []
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      changeTab (val) {
        if (val === 'A') {
          this.comName = 'LeftScroll'
          // this.$refs.scrollLeft.refresh()
        } else if (val === 'B') {
          this.comName = 'RightScroll'
          // this.$refs.scrollRight.refresh()
        }
        // refresh()
      },
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
      },
      onPullingDown2 () {
        setTimeout(() => {
          // this.scrollRight.scrollLeft.forceUpdate()
        }, 1000)
      },
      onPullingUp2 () {
        setTimeout(() => {
          // this.scrollRight.scrollLeft.forceUpdate()
        }, 1000)
      }
    }
  }
</script>
<style>
  #app {
    height: 100%;
    width: 100%;
  }
</style>
<style scoped lang="scss">
  .test-demo {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .test-tab-bar {
      height: 35px;
      width: 100%;
    }

    .test-scroll {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>