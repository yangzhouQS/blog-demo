<template>
  <div class="dy-tab">
    <render-column-item size="small" v-if="isRender" @row-click="rowClick" :columns="columns" height="100%"
                        :border="true" :data.sync="data" :soltConf="soltConf">
      <!--<template v-slot:userName="scope">-->
      <template slot="name" slot-scope="s">
        {{ s.row.name }} - {{ s.$index }}
      </template>
      <template slot="address" slot-scope="s">
        {{ s.row }} - {{ s.$index }}
      </template>
      <template slot="itemRemark" slot-scope="s">
        参数传递删除的删除的
      </template>
      <template slot="age" slot-scope="s">

        {{ s.row }} - {{ s.$index }}
        <template slot="elHeader">

        </template>
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
        data: [],
        // 固定列
        columns: [
          { type: 'index', label: '序号', width: 75 },
          { prop: 'id', label: '操作', width: 175 },
          { prop: 'itemRemark', label: 'AAA', width: 175, scopedSlot: 'itemRemark' },
          { prop: 'datTim', label: '发料时间', width: 175 },
          { prop: 'vehicle', label: '车牌号', width: 175 },
          {
            label: '半成品',
            children: [
              { prop: 'taskNo', label: '匹配前', width: 175 },
              {
                label: '匹配后',
                children: [
                  { prop: 'materialName', label: '材料名称', width: 175 },
                  { prop: 'materialModel', label: '规格型号', width: 175 }
                ]
              }
            ]
          },
          { prop: 'prodMete', label: '生产数量', width: 175 },
          { prop: 'transMete', label: '运单数量', width: 175 },
          { prop: 'materialUnit', label: '单位', width: 175 },
          { prop: 'reciepeNo', label: '配比编号', width: 175 },
          { prop: 'proLine', label: '机组编号', width: 175 },
          { prop: 'operator', label: '操作员', width: 175 },
          {
            label: '收料单位', children: [
              { prop: 'customer', label: '匹配前', width: 180 },
              { prop: 'labourName', label: '匹配后', width: 180 }
            ]
          },
          { prop: 'projectName', label: '工程名称', width: 175 },
          { prop: 'consPos', label: '使用部位', width: 175 },
          { prop: 'station', label: '拌合站名称', width: 175 }
        ],
        soltConf: [
          {
            type: 'inputText',
            name: 'itemRemark',
            elmentConfig: {
              type: 'text',
              size: 'small',
              disabled: false,
              placeholder: '说明'
            },
            eventConf: {
              init: function (option, row) {
              },
              blur: function (node, option, row) {
              },
              change: function (val) {
                console.log(val)
              }
            }
          }
        ],
        columns2: [
          { type: 'index', label: '序号', width: '75', headerAlign: 'center', align: 'center' },
          { prop: 'date', label: '日期', width: '240', headerAlign: 'center', align: 'center' },
          { prop: 'name', label: '姓名', width: '240' },
          { prop: 'age', label: '年龄', width: '440', elHeader: true },
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
        ],
        isRender: true
      }
    },
    mounted () {
      const dynamicColums = []
      const items = [
        {
          'material': '中碎石',
          'materialId': 591154085111265,
          'materialCode': '00019',
          'materialName': '碎石',
          'materialModel': '10-15mm',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 6260,
          'factAmnt': 6262
        }, {
          'material': '粉煤灰',
          'materialId': 591154085111410,
          'materialCode': '00003',
          'materialName': '粉煤灰硅酸盐水泥',
          'materialModel': 'PF-42.5-袋装',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 700,
          'factAmnt': 699.2
        }, {
          'material': '大碎石',
          'materialId': 591154085111283,
          'materialCode': '00037',
          'materialName': '碎石',
          'materialModel': '16.5-31.5mm',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 1930,
          'factAmnt': 1934
        }, {
          'material': '水M1',
          'materialId': 0,
          'materialCode': null,
          'materialName': null,
          'materialModel': null,
          'materialUnit': null,
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 1300,
          'factAmnt': 1298.3
        }, {
          'material': '小碎石',
          'materialId': 591154085111256,
          'materialCode': '00010',
          'materialName': '碎石',
          'materialModel': '0-10mm',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 1440,
          'factAmnt': 1455
        }, {
          'material': '细沙',
          'materialId': 591154085111197,
          'materialCode': '00009',
          'materialName': '河砂',
          'materialModel': '细1.6-2.2mm',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 9510,
          'factAmnt': 9534
        }, {
          'material': '425水泥',
          'materialId': 591154085111361,
          'materialCode': '00002',
          'materialName': '普通硅酸盐水泥',
          'materialModel': 'P·O 42.5袋装',
          'materialUnit': '吨',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'planAmn': 2600,
          'factAmnt': 2597.7
        }
      ]
      const data = [
        {
          'id': 779383044067840,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '15#鲁H87Y72',
          'driver': '东才秀',
          'customer': '曹湾隧道C15填充',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200430234023-5',
          'taskNo': '曹湾C15',
          'consPos': '填充',
          'betLev': '曹湾C15',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': 'C15填充',
          'carAmnt': 10,
          'materialId': 591154085111954,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C15',
          'materialCode': '00057',
          'items': [ {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 6260,
            'factAmnt': 6262
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 700,
            'factAmnt': 699.2
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 1930,
            'factAmnt': 1934
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 1300,
            'factAmnt': 1298.3
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 1440,
            'factAmnt': 1455
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 9510,
            'factAmnt': 9534
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200430234023-5',
            'planAmn': 2600,
            'factAmnt': 2597.7
          } ]
        }, {
          'id': 779383044067841,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '20#甘H38867',
          'driver': '任建伟',
          'customer': '曹湾隧道C15填充',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501000901-10',
          'taskNo': '曹湾C15',
          'consPos': '填充',
          'betLev': '曹湾C15',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': 'C15填充',
          'carAmnt': 10,
          'materialId': 591154085111954,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C15',
          'materialCode': '00057',
          'items': [ {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 700,
            'factAmnt': 697.8
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 9510,
            'factAmnt': 9514
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 6260,
            'factAmnt': 6260
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 1930,
            'factAmnt': 1927
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 2600,
            'factAmnt': 2598.1
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 1300,
            'factAmnt': 1297.3
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501000901-10',
            'planAmn': 1440,
            'factAmnt': 1442
          } ]
        }, {
          'id': 779383044067842,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '16#甘D60832',
          'driver': '苏海军',
          'customer': '曹湾隧道C15填充',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501002213-15',
          'taskNo': '曹湾C15',
          'consPos': '填充',
          'betLev': '曹湾C15',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': 'C15填充',
          'carAmnt': 10,
          'materialId': 591154085111954,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C15',
          'materialCode': '00057',
          'items': [ {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 1376,
            'factAmnt': 1374
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 1440,
            'factAmnt': 1449
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 2600,
            'factAmnt': 2595.4
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 6260,
            'factAmnt': 6265
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 1930,
            'factAmnt': 1918
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 700,
            'factAmnt': 699.2
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501002213-15',
            'planAmn': 9510,
            'factAmnt': 9504
          } ]
        }, {
          'id': 779383044067843,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '11#鲁H39L37',
          'driver': '赵永红',
          'customer': '曹湾隧道C15填充',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501010258-20',
          'taskNo': '曹湾C15',
          'consPos': '填充',
          'betLev': '曹湾C15',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': 'C15填充',
          'carAmnt': 10,
          'materialId': 591154085111954,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C15',
          'materialCode': '00057',
          'items': [ {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 700,
            'factAmnt': 700.9
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 9510,
            'factAmnt': 9541
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 6260,
            'factAmnt': 6253
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 1930,
            'factAmnt': 1940
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 1486,
            'factAmnt': 1483.6
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 1440,
            'factAmnt': 1434
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501010258-20',
            'planAmn': 2600,
            'factAmnt': 2593.7
          } ]
        }, {
          'id': 779383044067846,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '13#鲁H03M02',
          'driver': '赵占龙',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '12005010214442-33',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 1700,
            'factAmnt': 1698
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 4080,
            'factAmnt': 4078.5
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 720,
            'factAmnt': 719.8
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 8200,
            'factAmnt': 8211
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 5640,
            'factAmnt': 5643
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 2820,
            'factAmnt': 2803
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '12005010214442-33',
            'planAmn': 940,
            'factAmnt': 939
          } ]
        }, {
          'id': 779383044067849,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '17#宁D53505',
          'driver': '王亚江',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501024106-44',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 4080,
            'factAmnt': 4071.1
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 1700,
            'factAmnt': 1697.2
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 940,
            'factAmnt': 938
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 5640,
            'factAmnt': 5639
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 2820,
            'factAmnt': 2826
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 8200,
            'factAmnt': 8209
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501024106-44',
            'planAmn': 720,
            'factAmnt': 716.4
          } ]
        }, {
          'id': 779383044067850,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '15#鲁H87Y72',
          'driver': '东才秀',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501030037-49',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 8200,
            'factAmnt': 8198
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 720,
            'factAmnt': 719.1
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 4080,
            'factAmnt': 4090
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 1700,
            'factAmnt': 1697.4
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 940,
            'factAmnt': 951
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 2820,
            'factAmnt': 2828
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030037-49',
            'planAmn': 5640,
            'factAmnt': 5636
          } ]
        }, {
          'id': 779383044067851,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '11#鲁H39L37',
          'driver': '赵永红',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501030948-54',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 720,
            'factAmnt': 721.4
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 8200,
            'factAmnt': 8202
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 5640,
            'factAmnt': 5638
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 2820,
            'factAmnt': 2813
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 4080,
            'factAmnt': 4078.5
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 1724,
            'factAmnt': 1721.4
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501030948-54',
            'planAmn': 940,
            'factAmnt': 941
          } ]
        }, {
          'id': 779383044067853,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '13#鲁H03M02',
          'driver': '赵占龙',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501031747-62',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 8200,
            'factAmnt': 8199
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 720,
            'factAmnt': 718.2
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 5640,
            'factAmnt': 5644
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 2820,
            'factAmnt': 2818
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 4080,
            'factAmnt': 4073.7
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 940,
            'factAmnt': 936
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501031747-62',
            'planAmn': 1730,
            'factAmnt': 1727.9
          } ]
        }, {
          'id': 779383044067854,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '16#甘D60832',
          'driver': '苏海军',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501034013-67',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 4080,
            'factAmnt': 4081.4
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 940,
            'factAmnt': 943
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 1730,
            'factAmnt': 1727.1
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 5640,
            'factAmnt': 5641
          }, {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 2820,
            'factAmnt': 2824
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 720,
            'factAmnt': 718.8
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501034013-67',
            'planAmn': 8200,
            'factAmnt': 8211
          } ]
        }, {
          'id': 779383044067860,
          'station': '代旭波普通测试拌合站一',
          'vehicle': '15#鲁H87Y72',
          'driver': '南亚鹏',
          'customer': '桥梁一处桩基',
          'operator': 'Admin',
          'lands': '',
          'pour': '',
          'qualitor': '无',
          'orgId': 716507510001664,
          'orgName': '代旭波普通测试项目部',
          'proLine': 'Z1',
          'scheduleId': '1200501035041-88',
          'taskNo': 'C30素桩',
          'consPos': '桩基C30',
          'betLev': 'C30素桩',
          'labourId': 750484128936448,
          'labourName': '测试施工队队伍一',
          'pieCnt': 5,
          'projectName': '彭大三期土建二标',
          'datTim': '2020-08-06 15:54:00',
          'planMete': 0,
          'morMete': 0,
          'prodMete': 10,
          'transMete': 10,
          'reciepeNo': '200328001',
          'carAmnt': 10,
          'materialId': 591154085111957,
          'materialUnit': '立方米',
          'materialName': '自拌混凝土',
          'materialModel': 'C30',
          'materialCode': '00060',
          'items': [ {
            'material': '大碎石',
            'materialId': 591154085111283,
            'materialCode': '00037',
            'materialName': '碎石',
            'materialModel': '16.5-31.5mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 2820,
            'factAmnt': 2820
          }, {
            'material': '中碎石',
            'materialId': 591154085111265,
            'materialCode': '00019',
            'materialName': '碎石',
            'materialModel': '10-15mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 5640,
            'factAmnt': 5632
          }, {
            'material': '425水泥',
            'materialId': 591154085111361,
            'materialCode': '00002',
            'materialName': '普通硅酸盐水泥',
            'materialModel': 'P·O 42.5袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 4080,
            'factAmnt': 4080.2
          }, {
            'material': '水M1',
            'materialId': 0,
            'materialCode': null,
            'materialName': null,
            'materialModel': null,
            'materialUnit': null,
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 1728,
            'factAmnt': 1727.5
          }, {
            'material': '小碎石',
            'materialId': 591154085111256,
            'materialCode': '00010',
            'materialName': '碎石',
            'materialModel': '0-10mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 940,
            'factAmnt': 940
          }, {
            'material': '细沙',
            'materialId': 591154085111197,
            'materialCode': '00009',
            'materialName': '河砂',
            'materialModel': '细1.6-2.2mm',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 8200,
            'factAmnt': 8280
          }, {
            'material': '粉煤灰',
            'materialId': 591154085111410,
            'materialCode': '00003',
            'materialName': '粉煤灰硅酸盐水泥',
            'materialModel': 'PF-42.5-袋装',
            'materialUnit': '吨',
            'proLine': 'Z1',
            'scheduleId': '1200501035041-88',
            'planAmn': 720,
            'factAmnt': 718.6
          } ]
        }
      ]

      items.forEach((row, itemIndex) => {
        const { materialName, materialModel, material, materialId } = row
        const column = {
          label: material,
          children: [
            {
              label: `${ materialName }|${ materialId }`,
              children: [
                { prop: `planAmn-${ materialId }`, label: '应耗', width: 175 },
                { prop: `factAmnt-${ materialId }`, label: '实耗', width: 175 }
              ]
            }
          ]
        }
        dynamicColums.push(column)
      })
      this.columns = [ ...this.columns, ...dynamicColums ]

      data.forEach((row, index) => {
        const { items } = row
        items.forEach((item, i) => {
          const { planAmn, factAmnt, materialId } = item
          row[`planAmn-${ materialId }`] = planAmn
          row[`factAmnt-${ materialId }`] = factAmnt
        })
        // row[`planAmn-591154085111265`] = 666
        // row[`factAmnt-591154085111265`] = 888
      })
      this.data = data
      // console.log(JSON.stringify(this.columns, null, 2))
      // console.log('=======================================')
      // console.log(JSON.stringify(this.data, null, 2))
      this.isRender = true
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