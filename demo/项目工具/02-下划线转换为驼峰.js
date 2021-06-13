const transRecords = (field = '') => {
  let prop = field.replace(/_(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return prop
}
console.log(transRecords('r_bid_procurment'))
const arr = []
let str = `org_id\tid\torder_id\torg_name\tmaterial_id\tmaterial_name\tmaterial_unit\tmaterial_model\tmaterial_code\tclass_id\tclass_full_id\ttype\tbook_last_month_num\tbook_current_month_num\tbook_current_season_num\tbook_total_num\tbook_last_month_sum\tbook_current_month_sum\tbook_current_season_sum\tbook_total_sum\trow_last_month_num\trow_current_month_num\trow_current_season_num\trow_total_num\trow_last_month_sum\trow_current_month_sum\trow_current_season_sum\tbuy_last_month_num\tbuy_current_month_num\tbuy_current_season_num\tbuy_total_num\tbuy_last_month_sum\tbuy_current_month_sum\tbuy_current_season_sum\tfact_last_month_num\tfact_current_month_num\tfact_current_season_num\tfact_total_num\tfact_last_month_sum\tfact_current_month_sum\tfact_current_season_sum\tremark\tis_removed\tcreator_id\tcreator_name\tcreated_at\tmodifier_id\tmodifier_name\tupdated_at\tversion`
str.split('\t').forEach(row => {
  arr.push(transRecords(row))
  // console.log(transRecords(row))
})
// console.log(arr)

arr.forEach(row=>{
  // console.log(`${row}: { type: Sequelize.DECIMAL(28, 4) },  // xx`)
})
// quantity: { type: Sequelize.DECIMAL(28, 4) }, // 数量
// console.log(transRecords('ThresholdValue'))

const ret = transRecords(`#  混凝土核算
[提取明细表](#废料回收主表)
[提取盘表](#提取盘表)
[提取车表](#提取车表)
[提取手工表](#提取手工表)

## 1. 车表数据上传接口
### q_produce
**提取车表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| org_id | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| org_name | STRING | 组织机构名称 | | | 
| pro_line | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| schedule_id | STRING | 调度号 | | | 
| task_no | STRING | 任务编号 | | | 
| cons_pos | STRING | 施工部位 | | | 
| bet_lev | STRING | 强度等级 | | | 
| material_id | BIGINT| 材料唯一标识 | | | 
| material_code | STRING| 材料编码 | | | 
| material_name | STRING| 材料名称 | | | 
| material_model | STRING| 规格型号 | | | 
| material_unit | STRING| 单位名称 | | | 
| class_id | BIGINT | 类别主键 | | | 
| class_full_id | STRING| 类别主键链 | | | 
| statistic_class_id | BIGINT| 统计类别主键 | | | 
| statistic_class_name | STRING| 统计类别名称 | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pie_cnt | INT| 盘数 | | | 
| project_name | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| dat_tim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| plan_mete | DECIMAL(28, 4) | 计划方量 | | | 
| mor_mete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prod_mete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepe_no | STRING| 配比编号 | | |  
| car_amnt |  DECIMAL(28, 4) | 车方量 | | | 
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| wat_full | DECIMAL(28, 4) | 含水率 | | |   
| accountor | STRING | 对账人 | | | 
| account_tim | TIMESTAMP | 对账时间 | | | 
| account_state | BOOLEAN | 对账人 | | |   
| trans_mete | DECIMAL(28, 4) | 运单方量 | | | 
| ori_org_id | STRING | 对接组织机构 | | |    
| ori_material_id | STRING| 【常用材料】预留 | | | 
| ori_class_id | STRING| 预留对接材料类别ID | | |   
| creator_id | BIGINT| 添加人主键 | | | 
| creator_name | STRING| 添加人 | | | 
| created_at | TIMESTAMP | 创建时间 | | | 
| modifier_id | BIGINT| 修改人主键 | | | 
| modifier_name | STRING| 修改人 | | | 
| updated_at | TIMESTAMP | 修改时间 | | | 
| is_removed | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 

## 2. 原材明细上传接口

### q_dosage
**提取明细表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| org_id | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| org_name | STRING | 组织机构名称 | | | 
| pro_line | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| schedule_id | STRING | 调度号 | | | 
| task_no | STRING | 任务编号 | | | 
| cons_pos | STRING | 施工部位 | | | 
| bet_lev | STRING | 强度等级 | | | 
| hnt_material_id | BIGINT | 材料唯一标识 | | | 
| hnt_material_code | STRING | 材料编码 | | | 
| hnt_material_name | STRING | 材料名称 | | | 
| hnt_material_model | STRING | 规格型号 | | | 
| hnt_material_unit | STRING | 单位名称 | | | 
| hnt_class_id | BIGINT | 类别主键 | | | 
| hnt_class_full_id | STRING | 类别主键链 | | | 
| hnt_statistic_class_id | BIGINT | 统计类别主键 | | | 
| hnt_statistic_class_name | STRING| 统计类别名称 | | |  
| hnt_ori_material_idSTRING | 混凝土【常用材料】预留 | | | 
| hnt_ori_class_id | STRING | 混凝土预留对接材料类别ID | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pie_cnt | INT| 盘数 | | | 
| project_name | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| dat_tim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| plan_mete | DECIMAL(28, 4) | 计划方量 | | | 
| mor_mete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prod_mete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepe_no | STRING| 配比编号 | | |  
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| wat_full | DECIMAL(28, 4) | 含水率 | | |   
| piece_id | STRING | 盘号 | | | 
| pie_amnt | DECIMAL(28, 4) | 盘方量 | | | 
| trans_mete | DECIMAL(28, 4) | 运单方量 | | | 
| dosage_id | STRING | 剂量号 | | | 
| fim_tim | STRING | 打料时间 | | | 
| plan_amn | DECIMAL(28, 4) | 材料计划量 | | | 
| fact_amnt | DECIMAL(28, 4) | 材料实耗量 | | | 
| material | STRING| 原材名称 | | | 
| material_id | BIGINT| 材料唯一标识 | | | 
| material_code | STRING| 材料编码 | | | 
| material_name | STRING| 材料名称 | | | 
| material_model | STRING| 规格型号 | | | 
| material_unit | STRING| 单位名称 | | | 
| auxiliary_unit | STRING| 辅单位 | | | 
| conversion_rate | DECIMAL(28, 4)| 转化率 | | | 
| class_id | BIGINT | 类别主键 | | | 
| class_full_id | STRING| 类别主键链 | | | 
| statistic_class_id | BIGINT| 统计类别主键 | | | 
| statistic_class_name | STRING| 统计类别名称 | | | 
| ori_org_id | STRING | 对接组织机构 | | |    
| ori_material_id | STRING| 【常用材料】预留 | | | 
| ori_class_id | STRING| 预留对接材料类别ID | | |   
| creator_id | BIGINT| 添加人主键 | | | 
| creator_name | STRING| 添加人 | | | 
| created_at | TIMESTAMP | 创建时间 | | | 
| modifier_id | BIGINT| 修改人主键 | | | 
| modifier_name | STRING| 修改人 | | | 
| updated_at | TIMESTAMP | 修改时间 | | |
| is_removed | BOOLEAN | 删除标记 | | |
| version | BIGINT| 版本 | | |

## 3. 手工下料上传数据接口

### q_manual
**提取车表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| org_id | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| org_name | STRING | 组织机构名称 | | | 
| pro_line | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| dat_tim | STRING| 生产时间 | | | 
| material | STRING | 原材名称 | | | 
| fact_amnt | DECIMAL(28, 4) | 材料实耗量 | | | 
| wat_full | DECIMAL(28, 4) | 含水率 | | |   
| operator | STRING | 操作员 | | | 
| dosage_id | STRING | 剂量号 | | | 
| material_id | BIGINT| 材料唯一标识 | | | 
| material_code | STRING| 材料编码 | | | 
| material_name | STRING| 材料名称 | | | 
| material_model | STRING| 规格型号 | | | 
| material_unit | STRING| 单位名称 | | | 
| auxiliary_unit | STRING| 辅单位 | | | 
| conversion_rate  | DECIMAL(28, 4)| 转换率 | | | 
| class_id | BIGINT | 类别主键 | | | 
| class_full_id | STRING| 类别主键链 | | | 
| statistic_class_id | BIGINT| 统计类别主键 | | | 
| statistic_class_name | STRING| 统计类别名称 | | | 
| ori_org_id | STRING| 组织对接id | | | 
| ori_material_id | STRING| 【常用材料】预留 | | | 
| ori_class_id | STRING| 预留对接材料类别ID | | |   
| creator_id | BIGINT| 添加人主键 | | | 
| creator_name | STRING| 添加人 | | | 
| created_at | TIMESTAMP | 创建时间 | | | 
| modifier_id | BIGINT| 修改人主键 | | | 
| modifier_name | STRING| 修改人 | | | 
| updated_at | TIMESTAMP | 修改时间 | | | 
| is_removed | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 

## 4. 盘表上传数据接口

### q_piece
**提取盘表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| org_id | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| org_name | STRING | 组织机构名称 | | | 
| pro_line | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| schedule_id | STRING | 调度号 | | | 
| task_no | STRING | 任务编号 | | | 
| cons_pos | STRING | 施工部位 | | | 
| bet_lev | STRING | 强度等级 | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pie_cnt | INT| 盘数 | | | 
| project_name | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| dat_tim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| plan_mete | DECIMAL(28, 4) | 计划方量 | | | 
| mor_mete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prod_mete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepe_no | STRING| 配比编号 | | |  
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| wat_full | DECIMAL(28, 4) | 含水率 | | |   
| piece_id | STRING | 盘号 | | | 
| pie_amnt | DECIMAL(28, 4) | 盘方量 | | | 
| trans_mete | DECIMAL(28, 4) | 运单方量 | | | 
| ori_org_id | STRING | 对接组织机构 | | |   
| creator_id | BIGINT| 添加人主键 | | | 
| creator_name | STRING| 添加人 | | | 
| created_at | TIMESTAMP | 创建时间 | | | 
| modifier_id | BIGINT| 修改人主键 | | | 
| modifier_name | STRING| 修改人 | | | 
| updated_at | TIMESTAMP | 修改时间 | | | 
| is_removed | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 
| material_id | BIGINT| 材料唯一标识 | | 待删除 | 
| material_code | STRING| 材料编码 | | 待删除 | 
| material_name | STRING| 材料名称 | | 待删除 | 
| material_model | STRING| 规格型号 | | 待删除 | 
| material_unit | STRING| 单位名称 | | 待删除 | 
| class_id | BIGINT | 类别主键 | | 待删除 | 
| class_full_id | STRING| 类别主键链 | | 待删除 | 
| statistic_class_id | BIGINT| 统计类别主键 | | 待删除 | 
| statistic_class_name | STRING| 统计类别名称 | | 待删除 |  
| ori_material_id | STRING| 【常用材料】预留 | | 待删除 | 
| ori_class_id | STRING| 预留对接材料类别ID | | 待删除 |   





`)
const fs = require('fs')
fs.writeSync(fs.openSync('./concrete_demo.md','w'),ret)
console.log(ret)
