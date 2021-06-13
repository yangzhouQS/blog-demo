<template>
  <div class="demo-demo">
    <div id="kaka-grid">

    </div>
  </div>
</template>

<script>
import kakaGrid from '@mctech/kaka-grid'

const allData = [
  {
    'currentGhName': '2345',
    'ghId': 1235,
    'isCheck': true,
    'isDelivery': false,
    'isLeaf': true,
    'jc': -66717,
    'jcLoss': 0,
    'leaf': false,
    'parentId': 793079082340864,
    'quantity': 0,
    'receiveQuantity': 66717,
  },
  {
    'leaf': false,
    'quantity': 0,
    'jc': -66717,
    'ghId': 793079082340864,
    'currentGhName': '444444444444444444444',
    'isDelivery': false,
    'isCheck': true,
    'parentId': -1,
    'receiveQuantity': 66717,
    'jcLoss': 0,
    'isLeaf': false
  },
  {
    'leaf': false,
    'quantity': 4444,
    'jc': -21204,
    'ghId': 793079005114880,
    'currentGhName': '22222222222222222222',
    'isDelivery': false,
    'isCheck': true,
    'parentId': -1,
    'receiveQuantity': 25648,
    'jcLoss': -477.14,
    'isLeaf': true
  },
  {
    'leaf': false,
    'quantity': 0,
    'jc': -222242,
    'ghId': 793078939365888,
    'currentGhName': '11111111111111111111111111',
    'isDelivery': false,
    'isCheck': true,
    'parentId': -1,
    'receiveQuantity': 222242,
    'jcLoss': 0,
    'isLeaf': true
  },
  {
    'leaf': false,
    'quantity': 78521.98,
    'jc': -266423.69,
    'ghId': 609535200268288,
    'currentGhName': '西安地铁9号线1',
    'isDelivery': false,
    'isCheck': false,
    'parentId': -1,
    'receiveQuantity': 344945.67,
    'jcLoss': -339.3,
    'isLeaf': true
  },
  {
    'leaf': false,
    'quantity': 12000,
    'jc': 5962,
    'ghId': 793079044551168,
    'currentGhName': '3333333333333333333333333333335666666666666666666666666666666666666666666666656666666666666',
    'isDelivery': false,
    'isCheck': true,
    'parentId': -1,
    'receiveQuantity': 6038,
    'jcLoss': 49.68,
    'isLeaf': true
  },
  {
    'leaf': false,
    'quantity': 260.6,
    'jc': -607.4,
    'ghId': 937367852871680,
    'currentGhName': '节超2',
    'isDelivery': true,
    'isCheck': false,
    'parentId': -1,
    'receiveQuantity': 868,
    'jcLoss': -233.08,
    'isLeaf': true
  },
  {
    'leaf': false,
    'quantity': 0,
    'jc': -1410,
    'ghId': 793079122629120,
    'currentGhName': '555555555555555555555',
    'isDelivery': false,
    'isCheck': true,
    'parentId': -1,
    'receiveQuantity': 1410,
    'jcLoss': 0,
    'isLeaf': true
  }
]
export default {
  name: "demo-demo",
  components: {},
  data() {
    return {
      active: 0
    }
  },
  beforeMount() {
  },
  mounted() {
    this._initFunc()
    console.log(kakaGrid)
  },
  computed: {},
  methods: {
    _initFunc() {
      const treeRecords = allData
      const getRecordsWithAjax = function (parentKey, all) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            if (all) {
              // 展开parentKey下全部内容
              var allRecords = treeRecords.filter(function (rec) {
                return rec.path.indexOf((parentKey || "") + "/");
              });
              resolve(allRecords);
            } else {
              // 只展开parentKey下的内容
              var records = treeRecords.filter(function (rec) {
                console.log(parentKey)
                console.log(JSON.stringify(rec))
                return rec.parentId === parentKey;
              });

              if (parentKey === 20) { // 当展开 id为20 的节点时，
                var expandedKeys = [1]; // 默认展开其子节点中 id为1 的节点
                records.push.apply(records, treeRecords.filter(function (rec) {
                  return expandedKeys.indexOf(rec.parentId) >= 0;
                }));
                resolve({
                  records: records,
                  expandedKeys: expandedKeys
                });
              } else {
                resolve(records);
              }
            }
          }, 500);
        });
      };

      var data = []; // 全部已加载数据内容
      var loadedData = {}; // 懒加载节点的Promise缓存，防止重复请求数据
      var cachedDataSource = kakaGrid.data.CachedDataSource.ofArray(data);
      var treeDataSource = new kakaGrid.data.TreeDataSource(cachedDataSource, {
        keyField: "ghId",
        parentKeyField: "parentId",
        // expandedKeys: [30], // 默认展开的节点 keyField 值数组
        hasChildren: function (rec) { // <- 此方法会频繁触发
          let ret = rec ? !rec.isLeaf : true; // 返回当前记录（rec）是否有字节点
          return ret;
        },
        // <- 此方法只有当rec有子节点且treeDataSource找不到子节点数据时才触发
        getChildren: function (rec, all) {
          // 返回当前记录（rec）的子节点记录数组
          // all为false表示只返回一级子节点；为true则表示返回全部的子节点
          var parentKey = rec ? rec.ghId : -1;
          if (!loadedData[parentKey]) {
            const ret = getRecordsWithAjax(parentKey, all).then(function (records) {
              if (Array.isArray(records)) {
                data.push.apply(data, records);
              } else {
                data.push.apply(data, records.records);
              }
              cachedDataSource.length = data.length;
              console.log(records)
              return records;
            });
            loadedData[parentKey] = ret
          }
          return loadedData[parentKey];
        }
      });
      console.log(treeDataSource)
      new kakaGrid.ListGrid({
        parentElement: document.getElementById("kaka-grid"),
        header2: [
          {
            field: "check",
            caption: "",
            width: 50,
            columnType: "check",
            action: "check"
          },
          {
            field: "State",
            caption: "State",
            width: 200,
            columnType: new kakaGrid.columns.type.TreeColumn({
              canToggle: function (e) {
                if (e.type !== "over") {
                  console.log("before toggle - type:" + e.type + " col:" + e.col + " row:" + e.row);
                }
                return true;
              },
              toggled: function (e) {
                console.log("after toggle - type:" + e.type + " col:" + e.col + " row:" + e.row);
              },
              multilineText: true
            }),
            action: new kakaGrid.columns.action.InlineInputEditor({
              type: "text",
              disableInput: function (rec) {
                // 禁止输入
                return true;
              },
              action: function (rec) {
                // 动作按钮点击回调
                alert(JSON.stringify(rec));
              }
            }),
            tooltip: function (rec) { // 提示内容为：回调函数
              return ""; // 返回空，表示使用默认
            },
            style: {
              lineHeight: "1em", // 多行文本行高
              autoWrapText: false, // 多行文本自动换行
              lineClamp: "auto", // 多行文本行数限制，'auto'为自动、数值为行数
              textOverflow: "ellipsis", // 文本益处时：'ellipsis'为显示省略号、'clip'为截断
              appearance: function (active) {
                // 动作按钮图标
                return {
                  color: active ? "rgba(0, 0, 0, .54)" : "rgba(0, 0, 0, 1)",
                  path: "M5.2,10.8c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,9.6,5.2,10.1,5.2,10.8z M5.2,1.2c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0C7.6,0.5,7,0,6.4,0C5.7,0,5.2,0.5,5.2,1.2z M5.2,6c0,0.7,0.5,1.2,1.2,1.2S7.6,6.7,7.6,6c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,4.8,5.2,5.3,5.2,6z",
                  width: 12
                };
              }
            }
          },
          {
            field: "ID",
            caption: "ID",
            width: 100
          },
          {
            field: "parentId",
            caption: "parentId",
            width: 100
          },
          { /* multiple header */
            caption: "Latitude and longitude",
            columns: [{
              action: new kakaGrid.columns.action.InlineInputEditor({
                type: "number",
                classList: ["al-right"]
              }),
              field: "Latitude",
              caption: "Latitude",
              columnType: new kakaGrid.columns.type.NumberColumn({
                format: new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 20 })
              }),
              width: 200
            }, {
              action: new kakaGrid.columns.action.InlineInputEditor({
                type: "number",
                classList: ["al-right"]
              }),
              field: "Longitude",
              caption: "Longitude",
              columnType: new kakaGrid.columns.type.NumberColumn({
                format: new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 20 })
              }),
              width: 200
            }]
          }],
        header: [
          {
            caption: '序号',
            type: 'no',
            width: 100,
            headerStyle: {
              textAlign: 'center',
              fontSize: 12
            },
            style: {
              textAlign: 'center',
              fontSize: 12
            }
          },
          {
            field: "currentGhName",
            caption: "currentGhName",
            width: 300,
            columnType: new kakaGrid.columns.type.TreeColumn({
              canToggle: function (e) {
                if (e.type !== "over") {
                  console.log("before toggle - type:" + e.type + " col:" + e.col + " row:" + e.row);
                }
                return true;
              },
              toggled: function (e) {
                console.log("after toggle - type:" + e.type + " col:" + e.col + " row:" + e.row);
              },
              multilineText: true
            }),
            action: new kakaGrid.columns.action.InlineInputEditor({
              type: "text",
              disableInput: function (rec) {
                // 禁止输入
                return true;
              },
              action: function (rec) {
                // 动作按钮点击回调
                alert(JSON.stringify(rec));
              }
            }),
            tooltip: function (rec) { // 提示内容为：回调函数
              return ""; // 返回空，表示使用默认
            },
            style: {
              lineHeight: "1em", // 多行文本行高
              autoWrapText: false, // 多行文本自动换行
              lineClamp: "auto", // 多行文本行数限制，'auto'为自动、数值为行数
              textOverflow: "ellipsis", // 文本益处时：'ellipsis'为显示省略号、'clip'为截断
              appearance: function (active) {
                // 动作按钮图标
                return {
                  color: active ? "rgba(0, 0, 0, .54)" : "rgba(0, 0, 0, 1)",
                  path: "M5.2,10.8c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,9.6,5.2,10.1,5.2,10.8z M5.2,1.2c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0,0,0,0,0,0C7.6,0.5,7,0,6.4,0C5.7,0,5.2,0.5,5.2,1.2z M5.2,6c0,0.7,0.5,1.2,1.2,1.2S7.6,6.7,7.6,6c0,0,0,0,0,0c0-0.7-0.5-1.2-1.2-1.2C5.7,4.8,5.2,5.3,5.2,6z",
                  width: 12
                };
              }
            }
          },
          {
            field: 'materialModel',
            caption: '规格型号',
            width: 150,
            headerStyle: {
              textAlign: 'center'
            }
          },
          {
            field: 'receiveQuantity',
            caption: '实际用量',
            width: 120,
            headerStyle: {
              textAlign: 'center'
            }
          },
          {
            field: 'quantity',
            caption: '设计用量',
            width: 120,
            headerStyle: {
              textAlign: 'center'
            }
          },
          {
            field: 'jc',
            caption: '节超（+节、-超）',
            width: 180,
            headerStyle: {
              textAlign: 'center'
            }
          },
          {
            field2: 'jcLoss',
            field: rec => rec.jcLoss + '%',
            caption: '节超率（+节、-超）',
            width: 180,
            headerStyle: {
              textAlign: 'center'
            }
          }
        ],
        frozenColCount: 2,
        dataSource: treeDataSource
      });
    },
    onChange(value) {
      console.log('当前值：' + value);
    }
  }
}
</script>

<style scoped lang="scss">
#kaka-grid {
  width: 100%;
  height: 100%;
}

.demo-demo {
  width: 100%;
  height: 400px;
  border: 1px crimson solid;

  .btn {
    border: none;
    border: 1px solid #0ec6e1;
    padding: 5px 6px;
    margin-right: 10px;
  }
}
</style>
