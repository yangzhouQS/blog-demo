/*
const data = [ { 'id': 776036519810048, 'name': '物资报表中心', 'code': 'mreport', 'isTree': false }, { 'id': 776036710814720, 'name': '物资基础数据', 'code': 'cbaseinfo', 'isTree': false }, { 'id': 776036863235072, 'name': '物资账务管理系统', 'code': 'maccount', 'isTree': false }, { 'id': 776037051716608, 'name': '周转材料管理系统', 'code': 'mturnover', 'isTree': false }, { 'id': 776037221192704, 'name': '物资实物管控系统', 'code': 'mquantity', 'isTree': false }, { 'id': 776037648774144, 'name': '物资产品配置', 'code': 'smconfig', 'isTree': false }, {
  'id': 777971828954112,
  'name': '全局设置',
  'code': 'global',
  'isTree': false
}, { 'id': 783921126994944, 'name': '混凝土核算系统', 'code': 'concrete', 'isTree': false }, { 'id': 783921879643136, 'name': '物资移动收发应用', 'code': 'mquantity-rds-app-pack', 'isTree': false } ]
console.log()
const p = []
data.forEach(row=>{
  p.push(row.code)
})
console.log(p.join())*/

const data = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ]
console.log(data.slice(0, 10))
console.log(data.slice(10, 20))
console.log(data.slice(240, 250))
const draw = 2
const offset = 10
const limit = 10
console.log(offset, offset + limit)