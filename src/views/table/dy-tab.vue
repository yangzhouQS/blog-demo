<template>
  <div class="dy-tab">
    <render-column-item size="small" @row-click="rowClick" :columns="columns" height="100%" :border="true" :data="data">
      <!--<template v-slot:userName="scope">-->
      <template  slot="name" slot-scope="s">
        {{ s.row }} - {{ s.$index }}
      </template>
      <template  slot="address" slot-scope="s">
        {{ s.row }} - {{ s.$index }}
      </template>
    </render-column-item>
  </div>
</template>

<script>
  import RenderColumnItem from './render-column-item';

  export default {
    name: 'dy-tab',
    components: { RenderColumnItem },
    data () {
      return {
        input: '',
        table: [],
        data: [
          { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }
        ],
        columns: [
          { prop: 'date', label: '日期', width: '240', headerAlign: 'center', align: 'center' },
          { prop: 'name', label: '项目', width: '240' },
          { prop: 'address', label: '地址', slot: 'address' }
          /* {
             prop: 'abc', label: '测试', width: '160',
             children: [
               { prop: 'A', label: '测试A', width: '140' },
               {
                 prop: 'B', label: '测试B', width: '140',
                 children: [
                   { prop: 'C', label: '测试C', width: '140' },
                   { prop: 'D', label: '测试D', width: '140' }
                 ]
               }
             ]
           }*/
        ]
      }
    },
    mounted () {
      this.reload()
    },
    computed: {},
    methods: {
      test (val) {
        console.log('-------------')
        debugger
        console.log(val)
      },
      rowClick () {
        console.log(arguments)
      },
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