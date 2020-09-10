<template>
  <div class="demo">
    <div class="demo01">
      <row :gutter="10">
        <yl-col :span="6">
          45665654
        </yl-col>
        <yl-col :span="6">
          45665654
        </yl-col>
        <yl-col :span="6">
          45665654
        </yl-col>
        <yl-col :span="6">
          45665654
        </yl-col>
      </row>
      <row :gutter="20">
        <yl-col :span="12">12</yl-col>
        <yl-col :span="12">12</yl-col>
      </row>
      <row :gutter="20">
        <yl-col :span="3" :offset="9">3</yl-col>
        <yl-col :span="3" :offset="9">3</yl-col>
      </row>
    </div>
    <div style="width: 300px; display: flex;height: 20px;background: #42b983"></div>
    <div class="demo02">
      <el-row :gutter="10">
       <el-col :span="6">10</el-col>
       <el-col :span="6">10</el-col>
       <el-col :span="6">10</el-col>
       <el-col :span="6">10</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Row from './row';
  import Col from './col'

  export default {
    name: 'yl-flex',
    components: {
      Row,
      ylCol: Col
    },
    data () {
      return {}
    },
    mounted () {
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
        this.getData()
      },
      getData () {
      }
    }
  }
</script>

<style scoped>

</style>