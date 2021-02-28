<template>
  <div class="demo-demo">
    <div id="kaka-grid">

    </div>
  </div>
</template>

<script>
import kakaGrid from '@mctech/kaka-grid'

var allData = function () {
  var data = [
    {
      ID: 40,
      parentID: null,
      State: "ChinaBeijingBeijingBeijingBeijing\nBeijing",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: true,
      path: "/40"
    },
    {
      ID: 30,
      parentID: null,
      State: "France",
      Latitude: 46.1274793,
      Longitude: -2.288454,
      isLeaf: false,
      path: "/30"
    },
    {
      ID: 31,
      parentID: 30,
      State: "Paris",
      Latitude: 48.8588376,
      Longitude: 2.2773459,
      isLeaf: true,
      path: "/30/31"
    },
    {
      ID: 20,
      parentID: null,
      State: "USA",
      Latitude: 36.2161472,
      Longitude: -113.6866279,
      isLeaf: false,
      path: "/20"
    },
    {
      ID: 1,
      parentID: 20,
      State: "New York",
      Latitude: 40.7055651,
      Longitude: -74.118086,
      isLeaf: false,
      path: "/20/1"
    },
    {
      ID: 2,
      parentID: 1,
      State: "Albany",
      Latitude: 42.6681345,
      Longitude: -73.846419,
      isLeaf: true,
      path: "/20/1/2"
    },
    {
      ID: 3,
      parentID: 1,
      State: "Syracuse",
      Latitude: 43.0352286,
      Longitude: -76.1742994,
      isLeaf: true,
      path: "/20/1/3"
    },
    {
      ID: 4,
      parentID: 20,
      State: "California",
      Latitude: 37.1870791,
      Longitude: -123.762638,
      isLeaf: false,
      path: "/20/4"
    },
    {
      ID: 5,
      parentID: 4,
      State: "Alameda",
      Latitude: 37.8759458,
      Longitude: -122.2981316,
      isLeaf: true,
      path: "/20/4/5"
    },
    {
      ID: 6,
      parentID: 4,
      State: "Orange",
      Latitude: 33.5482634,
      Longitude: -117.8447927,
      isLeaf: false,
      path: "/20/4/6"
    },
    {
      ID: 60,
      parentID: 6,
      State: "Anaheim",
      Latitude: 33.5482634,
      Longitude: -117.8447927,
      isLeaf: true,
      path: "/20/4/6/60"
    },
    {
      ID: 61,
      parentID: 6,
      State: "Laguna",
      Latitude: 33.5482634,
      Longitude: -117.8447927,
      isLeaf: true,
      path: "/20/4/6/61"
    },
    {
      ID: 62,
      parentID: 6,
      State: "Irvine",
      Latitude: 33.5482634,
      Longitude: -117.8447927,
      isLeaf: true,
      path: "/20/4/6/62"
    },
    {
      ID: 7,
      parentID: 4,
      State: "Ventura",
      Latitude: 36.5943628,
      Longitude: -121.9025183,
      isLeaf: false,
      path: "/20/4/7"
    },
    {
      ID: 70,
      parentID: 7,
      State: "Anaheim",
      Latitude: 36.5943628,
      Longitude: -121.9025183,
      isLeaf: true,
      path: "/20/4/7/70"
    },
    {
      ID: 71,
      parentID: 7,
      State: "Garden Grove",
      Latitude: 36.5943628,
      Longitude: -121.9025183,
      isLeaf: true,
      path: "/20/4/7/71"
    },
    {
      ID: 72,
      parentID: 7,
      State: "Irvine",
      Latitude: 36.5943628,
      Longitude: -121.9025183,
      isLeaf: false,
      path: "/20/4/7/72"
    },
    {
      ID: 73,
      parentID: 72,
      State: "Monterey",
      Latitude: 36.5943628,
      Longitude: -121.9025183,
      isLeaf: true,
      path: "/20/4/7/72/73"
    },
    {
      ID: 8,
      parentID: 20,
      State: "Fullerton",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: false,
      path: "/20/8"
    },
    {
      ID: 9,
      parentID: 8,
      State: "Boston",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: true,
      path: "/20/8/9"
    },
    {
      ID: 10,
      parentID: 8,
      State: "Worcester",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: true,
      path: "/20/8/10"
    },
    {
      ID: 11,
      parentID: 8,
      State: "Lowell",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: false,
      path: "/20/8/11"
    },
    {
      ID: 12,
      parentID: 11,
      State: "Pudding Lane",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: true,
      path: "/20/8/11/12"
    },
    {
      ID: 50,
      parentID: null,
      State: "Canada",
      Latitude: 42.6369691,
      Longitude: -71.3618803,
      isLeaf: true,
      path: "/50"
    }
  ];
  return data;
};

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
      const treeRecords = allData()
      const getRecordsWithAjax = function (parentKey, all) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            if (all) {
              // 展开parentKey下全部内容
              var allRecords = treeRecords.filter(function (rec) {
                return rec.path.indexOf((parentKey || "") + "/");
              });

              console.log(records)
              resolve(allRecords);
            } else {
              // 只展开parentKey下的内容
              var records = treeRecords.filter(function (rec) {
                return rec.parentID === parentKey;
              });
              console.log(records)
              if (parentKey === 20) { // 当展开 id为20 的节点时，
                var expandedKeys = [1]; // 默认展开其子节点中 id为1 的节点
                records.push.apply(records, treeRecords.filter(function (rec) {
                  return expandedKeys.indexOf(rec.parentID) >= 0;
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
        keyField: "ID",
        parentKeyField: "parentID",
        // expandedKeys: [30], // 默认展开的节点 keyField 值数组
        hasChildren: function (rec) { // <- 此方法会频繁触发
          // 返回当前记录（rec）是否有字节点
          let ret = rec ? !rec.isLeaf : true;
          return ret;
        },
        getChildren: function (rec, all) { // <- 此方法只有当rec有子节点且treeDataSource找不到子节点数据时才触发
          // 返回当前记录（rec）的子节点记录数组
          // all为false表示只返回一级子节点；为true则表示返回全部的子节点
          var parentKey = rec ? rec.ID : null;
          if (!loadedData[parentKey]) {
            const ret = getRecordsWithAjax(parentKey, all).then(function (records) {
              if (Array.isArray(records)) {
                data.push.apply(data, records);
              } else {
                data.push.apply(data, records.records);
              }
              cachedDataSource.length = data.length;
              return records;
            });
            loadedData[parentKey] = ret
          }
          return loadedData[parentKey];
        }
      });
      new kakaGrid.ListGrid({
        parentElement: document.getElementById("kaka-grid"),
        header: [
          /*{
            caption: '序号',
            type: 'no',
            width: 60
          },*/
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
            field: "parentID",
            caption: "parentID",
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
