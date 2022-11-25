#  混凝土核算
[提取明细表](#废料回收主表)
[提取盘表](#提取盘表)
[提取车表](#提取车表)
[提取手工表](#提取手工表)

## 1. 车表数据上传接口
### qProduce
**提取车表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| orgId | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| orgName | STRING | 组织机构名称 | | | 
| proLine | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| scheduleId | STRING | 调度号 | | | 
| taskNo | STRING | 任务编号 | | | 
| consPos | STRING | 施工部位 | | | 
| betLev | STRING | 强度等级 | | | 
| materialId | BIGINT| 材料唯一标识 | | | 
| materialCode | STRING| 材料编码 | | | 
| materialName | STRING| 材料名称 | | | 
| materialModel | STRING| 规格型号 | | | 
| materialUnit | STRING| 单位名称 | | | 
| classId | BIGINT | 类别主键 | | | 
| classFullId | STRING| 类别主键链 | | | 
| statisticClassId | BIGINT| 统计类别主键 | | | 
| statisticClassName | STRING| 统计类别名称 | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pieCnt | INT| 盘数 | | | 
| projectName | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| datTim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| planMete | DECIMAL(28, 4) | 计划方量 | | | 
| morMete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prodMete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepeNo | STRING| 配比编号 | | |  
| carAmnt |  DECIMAL(28, 4) | 车方量 | | | 
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| watFull | DECIMAL(28, 4) | 含水率 | | |   
| accountor | STRING | 对账人 | | | 
| accountTim | TIMESTAMP | 对账时间 | | | 
| accountState | BOOLEAN | 对账人 | | |   
| transMete | DECIMAL(28, 4) | 运单方量 | | | 
| oriOrgId | STRING | 对接组织机构 | | |    
| oriMaterialId | STRING| 【常用材料】预留 | | | 
| oriClassId | STRING| 预留对接材料类别ID | | |   
| creatorId | BIGINT| 添加人主键 | | | 
| creatorName | STRING| 添加人 | | | 
| createdAt | TIMESTAMP | 创建时间 | | | 
| modifierId | BIGINT| 修改人主键 | | | 
| modifierName | STRING| 修改人 | | | 
| updatedAt | TIMESTAMP | 修改时间 | | | 
| isRemoved | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 

## 2. 原材明细上传接口

### qDosage
**提取明细表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| orgId | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| orgName | STRING | 组织机构名称 | | | 
| proLine | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| scheduleId | STRING | 调度号 | | | 
| taskNo | STRING | 任务编号 | | | 
| consPos | STRING | 施工部位 | | | 
| betLev | STRING | 强度等级 | | | 
| hntMaterialId | BIGINT | 材料唯一标识 | | | 
| hntMaterialCode | STRING | 材料编码 | | | 
| hntMaterialName | STRING | 材料名称 | | | 
| hntMaterialModel | STRING | 规格型号 | | | 
| hntMaterialUnit | STRING | 单位名称 | | | 
| hntClassId | BIGINT | 类别主键 | | | 
| hntClassFullId | STRING | 类别主键链 | | | 
| hntStatisticClassId | BIGINT | 统计类别主键 | | | 
| hntStatisticClassName | STRING| 统计类别名称 | | |  
| hntOriMaterialIdSTRING | 混凝土【常用材料】预留 | | | 
| hntOriClassId | STRING | 混凝土预留对接材料类别ID | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pieCnt | INT| 盘数 | | | 
| projectName | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| datTim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| planMete | DECIMAL(28, 4) | 计划方量 | | | 
| morMete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prodMete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepeNo | STRING| 配比编号 | | |  
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| watFull | DECIMAL(28, 4) | 含水率 | | |   
| pieceId | STRING | 盘号 | | | 
| pieAmnt | DECIMAL(28, 4) | 盘方量 | | | 
| transMete | DECIMAL(28, 4) | 运单方量 | | | 
| dosageId | STRING | 剂量号 | | | 
| fimTim | STRING | 打料时间 | | | 
| planAmn | DECIMAL(28, 4) | 材料计划量 | | | 
| factAmnt | DECIMAL(28, 4) | 材料实耗量 | | | 
| material | STRING| 原材名称 | | | 
| materialId | BIGINT| 材料唯一标识 | | | 
| materialCode | STRING| 材料编码 | | | 
| materialName | STRING| 材料名称 | | | 
| materialModel | STRING| 规格型号 | | | 
| materialUnit | STRING| 单位名称 | | | 
| auxiliaryUnit | STRING| 辅单位 | | | 
| conversionRate | DECIMAL(28, 4)| 转化率 | | | 
| classId | BIGINT | 类别主键 | | | 
| classFullId | STRING| 类别主键链 | | | 
| statisticClassId | BIGINT| 统计类别主键 | | | 
| statisticClassName | STRING| 统计类别名称 | | | 
| oriOrgId | STRING | 对接组织机构 | | |    
| oriMaterialId | STRING| 【常用材料】预留 | | | 
| oriClassId | STRING| 预留对接材料类别ID | | |   
| creatorId | BIGINT| 添加人主键 | | | 
| creatorName | STRING| 添加人 | | | 
| createdAt | TIMESTAMP | 创建时间 | | | 
| modifierId | BIGINT| 修改人主键 | | | 
| modifierName | STRING| 修改人 | | | 
| updatedAt | TIMESTAMP | 修改时间 | | |
| isRemoved | BOOLEAN | 删除标记 | | |
| version | BIGINT| 版本 | | |

## 3. 手工下料上传数据接口

### qManual
**提取车表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| orgId | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| orgName | STRING | 组织机构名称 | | | 
| proLine | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| datTim | STRING| 生产时间 | | | 
| material | STRING | 原材名称 | | | 
| factAmnt | DECIMAL(28, 4) | 材料实耗量 | | | 
| watFull | DECIMAL(28, 4) | 含水率 | | |   
| operator | STRING | 操作员 | | | 
| dosageId | STRING | 剂量号 | | | 
| materialId | BIGINT| 材料唯一标识 | | | 
| materialCode | STRING| 材料编码 | | | 
| materialName | STRING| 材料名称 | | | 
| materialModel | STRING| 规格型号 | | | 
| materialUnit | STRING| 单位名称 | | | 
| auxiliaryUnit | STRING| 辅单位 | | | 
| conversionRate  | DECIMAL(28, 4)| 转换率 | | | 
| classId | BIGINT | 类别主键 | | | 
| classFullId | STRING| 类别主键链 | | | 
| statisticClassId | BIGINT| 统计类别主键 | | | 
| statisticClassName | STRING| 统计类别名称 | | | 
| oriOrgId | STRING| 组织对接id | | | 
| oriMaterialId | STRING| 【常用材料】预留 | | | 
| oriClassId | STRING| 预留对接材料类别ID | | |   
| creatorId | BIGINT| 添加人主键 | | | 
| creatorName | STRING| 添加人 | | | 
| createdAt | TIMESTAMP | 创建时间 | | | 
| modifierId | BIGINT| 修改人主键 | | | 
| modifierName | STRING| 修改人 | | | 
| updatedAt | TIMESTAMP | 修改时间 | | | 
| isRemoved | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 

## 4. 盘表上传数据接口

### qPiece
**提取盘表**

所在库： **mtlp**

字段说明：

| 属性名         | 类型           | 名称 |  主键 |  说明 |
|:------------- |:-------------| :-----|:-----|:-----|
| orgId | BIGINT | 组织机构主键 | 是 | |      
| id | BIGINT | 主键 | 是 | |  
| orgName | STRING | 组织机构名称 | | | 
| proLine | STRING | 生产线 | | | 
| station | STRING | 拌合站名称 | | | 
| scheduleId | STRING | 调度号 | | | 
| taskNo | STRING | 任务编号 | | | 
| consPos | STRING | 施工部位 | | | 
| betLev | STRING | 强度等级 | | | 
| vehicle | STRING | 车牌 | | | 
| driver | STRING | 司机 | | | 
| pieCnt | INT| 盘数 | | | 
| projectName | STRING| 工程名称 | | | 
| customer | STRING| 客户名称 | | | 
| datTim | STRING| 生产时间 | | |    
| operator | STRING | 操作员 | | | 
| lands | STRING | 坍塌度 | | | 
| planMete | DECIMAL(28, 4) | 计划方量 | | | 
| morMete | DECIMAL(28, 4) | 砂浆方量 | | | 
| prodMete | DECIMAL(28, 4) | 生产方量 | | | 
| reciepeNo | STRING| 配比编号 | | |  
| pour | STRING| 卸料方式 | | | 
| qualitor | STRING | 质检员 | | | 
| watFull | DECIMAL(28, 4) | 含水率 | | |   
| pieceId | STRING | 盘号 | | | 
| pieAmnt | DECIMAL(28, 4) | 盘方量 | | | 
| transMete | DECIMAL(28, 4) | 运单方量 | | | 
| oriOrgId | STRING | 对接组织机构 | | |   
| creatorId | BIGINT| 添加人主键 | | | 
| creatorName | STRING| 添加人 | | | 
| createdAt | TIMESTAMP | 创建时间 | | | 
| modifierId | BIGINT| 修改人主键 | | | 
| modifierName | STRING| 修改人 | | | 
| updatedAt | TIMESTAMP | 修改时间 | | | 
| isRemoved | BOOLEAN | 删除标记 | | | 
| version | BIGINT| 版本 | | | 
| materialId | BIGINT| 材料唯一标识 | | 待删除 | 
| materialCode | STRING| 材料编码 | | 待删除 | 
| materialName | STRING| 材料名称 | | 待删除 | 
| materialModel | STRING| 规格型号 | | 待删除 | 
| materialUnit | STRING| 单位名称 | | 待删除 | 
| classId | BIGINT | 类别主键 | | 待删除 | 
| classFullId | STRING| 类别主键链 | | 待删除 | 
| statisticClassId | BIGINT| 统计类别主键 | | 待删除 | 
| statisticClassName | STRING| 统计类别名称 | | 待删除 |  
| oriMaterialId | STRING| 【常用材料】预留 | | 待删除 | 
| oriClassId | STRING| 预留对接材料类别ID | | 待删除 |   





