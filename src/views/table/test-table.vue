<template>
  <div>
    <el-input-number
        v-model.sync="row.purchaseNum"
        size="mini"
        :min="0"
        placeholder="采购数量"
        :controls="false"
        @change="_handleChangeInput(row,$event)"/>
  </div>
</template>

<script>
import xButton from '../../component-src/element-ui/packages/button'
import {changeYearMonthAndClampDate} from '../../component-src/element-ui/src/utils/date-util'

export default {
  name: 'test-table',
  components: {

  },
  data() {
    return {
      row: {
        purchaseNum: 0
      }
    }
  },
  mounted() {
  },
  methods: {
    _toNumber (number, len = 2) {
      return Number(Number(number).toFixed(len)) || 0
    },
    _handleChangeInput(row) {
      this.$nextTick(()=>{
        const ret = this._toNumber(row.purchaseNum)
        row.purchaseNum = ret
      })
    },
    test() {
      console.log(this.$refs['table'])
    }
  }
}
</script>

<style scoped>

</style>