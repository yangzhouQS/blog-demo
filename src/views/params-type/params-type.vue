<template>
  <el-select v-model="newValue" :placeholder="placeholder" :size="size" @change="_handleChange" value-key="id">
    <el-option
        v-for="item in paramsTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: () => 'small'
      },
      placeholder: {
        type: String,
        default: () => '参数键类型'
      },
      paramsTypeList: {
        type: Array,
        default: () => {
          return [
            {id: 1, label: '字符串', value: 'string'},
            {id: 2, label: '数字', value: 'number'},
            {id: 3, label: '布尔值', value: 'boolean'}
          ]
        }
      },
      value:[Object,String]
    },
    name: 'params-type',
    data() {
      return {
        newValue:''
      }
    },
    mounted(){
      this.newValue = this.value
      console.log(this.value)
    },
    methods: {
      _handleChange(item) {
        console.log(JSON.stringify(item))
        this.$emit('update:value',item)
        this.$emit('selectItem',item)
      }
    }
  }
</script>

<style scoped>

</style>