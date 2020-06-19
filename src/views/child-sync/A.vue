<template>
  <div class="child-a">
    <el-button type="primary" size="small" @click="add">添加</el-button>
    <el-button type="primary" size="small" @click="clear">清除</el-button>

    <p>visible-a :{{ visible }}</p>
    <child-b :data="data" :visible.sync="visible" @deleteItem="deleteItem"></child-b>
  </div>
</template>

<script>
  import childB from './B.vue'

  let newId = 0
  export default {
    name: 'A',
    components: {
      childB
    },
    data () {
      return {
        data: [
          { id: 1, label: 'a' }
        ],
        visible: false
      }
    },
    mounted () {
    },
    methods: {
      add () {
        console.log(newId)
        newId = this.data.length + newId
        console.log(newId)
        this.data.push({ id: newId, label: `新的label${ newId }` })
      },
      clear () {
        this.data = []
      },
      deleteItem (index) {
        this.data.splice(index, 1)
      }
    }
  }
</script>

<style scoped>

</style>