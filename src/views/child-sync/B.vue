<template>
  <div>
    <div class="item" v-for="(row,index) in data" :key="row.id">{{ index }} -- {{ row.label }}
      <el-button type="danger" size="small" @click="$_handleClickDel(index,row)">删除</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'B',
    props: {
      data: {
        type: Array
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      $_handleClickDel (index, row) {
        this.$emit('update:visible', true)
        this.$emit('deleteItem', index, row)
      }
    }
  }
</script>

<style scoped>

</style>