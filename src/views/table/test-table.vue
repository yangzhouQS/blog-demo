<template>
  <div>
    <!--<el-table
        :data="data"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width="180">
      </el-table-column>
    </el-table>-->
    <div style="height: 600px">
      <el-table
          height="100%"
          :data="data" style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <template slot="append">
          <div class="append-content" style="height: 48px;">
            append 区域始终出现在视图内
          </div>
        </template>
      </el-table>
    </div>

  </div>
</template>

<script>
  // import xButton from './button'
  import xButton from '../../component-src/element-ui/packages/button'

  export default {
    name: 'test-table',
    components: {
      xButton
    },
    data () {
      return {
        data: [
          { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' } ,
          ],
        data2: [
          { id: 1, name: '李四', age: 26 },
          { id: 2, name: '小王', age: 22 },
          { id: 3, name: '王八羔子', age: 12 }
        ]
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style scoped>

</style>