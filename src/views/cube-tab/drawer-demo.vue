<template>
  <div>
    阿萨斯
    <div class="view-wrapper">
      <cube-button @click="showDrawer">Show Drawer</cube-button>
      <cube-drawer
          ref="drawer"
          title="请选择"
          :data="data"
          :selected-index="selectedIndex"
          @change="changeHandler"
          @select="selectHandler"
          @cancel="cancelHandler" />
    </div>
  </div> d d
</template>

<script>
  import { provinceList, cityList, areaList } from '../area.js'

  export default {
    components: {  },
    data () {
      return {
        selectedIndex: [],
        data: [
          provinceList,
          [],
          []
        ]
      }
    },
    methods: {
      showDrawer () {
        this.$refs.drawer.show()
      },
      changeHandler (index, item, selectedVal, selectedIndex, selectedText) {
        // debugger
        setTimeout(() => {
          let data
          if (index === 0) { //
            // procince change, get city data
            data = cityList[item.value]
          } else {
            // city change, get area data
            data = areaList[item.value]
          }
          this.$refs.drawer.refill(index + 1, data)
        }, 200)
      },
      selectHandler (selectedVal, selectedIndex, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${ selectedVal.join(', ') } <br/> - index: ${ selectedIndex.join(', ') } <br/> - text: ${ selectedText.join(' ') }`,
          icon: 'cubeic-alert'
        }).show()
      },
      cancelHandler () {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
