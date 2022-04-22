const Sequelize = {
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  DECIMAL(a, b) {
    return `DECIMAL(${ a }, ${ b })`
  },
  DATE: 'DATE',
  BIGINT: 'BIGINT'
}

const mReconciliation = {
  name: 'mReconciliation',
  fields: {
    orgId: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orgName: { type: Sequelize.STRING }, // 组织机构名称
    orderDate: { type: Sequelize.STRING }, // 单据日期
    recordedDate: { type: Sequelize.STRING }, // 入账时间
    orderCode: { type: Sequelize.STRING }, // 单号 OrderCode
    supplierName: { type: Sequelize.STRING }, // 供应商名称
    supplierId: { type: Sequelize.BIGINT }, // 供应商Id
    oriSupplierId: { type: Sequelize.STRING, defaultValue: '' }, // 供应商对接
    oriOrgId: { type: Sequelize.STRING, defaultValue: '' }, // 机构对接
    oriOrderId: { type: Sequelize.STRING, defaultValue: '' }, // 对接收料单ID
    accountor: { type: Sequelize.STRING }, // 对账人'
    accountTim: { type: Sequelize.STRING }, // 对账时间
    entryState: { type: Sequelize.INTEGER, defaultValue: 0 }, // 入账状态
    accountState: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }, // 对账状态
    maker: { type: Sequelize.STRING }, // 制单人
    printTimes: { type: Sequelize.INTEGER }, // 打印次数
    remark: { type: Sequelize.STRING }, // 备注
    isRemoved: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    creatorId: { type: Sequelize.BIGINT, defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING, defaultFn: 'uerName' },
    createdAt: { type: Sequelize.DATE },
    modifierId: { type: Sequelize.BIGINT, updateFn: 'userId' },
    modifierName: { type: Sequelize.STRING, updateFn: 'uerName' },
    updatedAt: { type: Sequelize.DATE },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  }
}

const mReconciliationItem = {
  name: 'mReconciliationItem',
  fields: {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orderId: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
    orgId: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
    orgName: { type: Sequelize.STRING }, // 组织机构名称
    serviceType: { type: Sequelize.INTEGER }, // 业务类型（新增） 调入（20） 收料（10） 调入退（-21） 收料退（-11）预点（30）
    orderType: { type: Sequelize.INTEGER }, // 操作类型（新增）  -1冲红（不考虑预点） 2补录 4正常 -2冲预点（只考虑预点业务）
    materialId: { type: Sequelize.BIGINT }, // 主材主键
    materialCode: { type: Sequelize.STRING }, // 材料编码
    materialName: { type: Sequelize.STRING }, // 材料名称
    materialModel: { type: Sequelize.STRING }, // 规格型号
    materialUnit: { type: Sequelize.STRING }, // 主单位
    classId: { type: Sequelize.BIGINT }, // 材料类别id
    classFullId: { type: Sequelize.STRING }, // 材料类别主键链
    quantity: { type: Sequelize.DECIMAL(28, 4) }, // 数量
    taxRate: { type: Sequelize.DECIMAL(28, 4) }, // 税率
    taxFreePrice: { type: Sequelize.DECIMAL(28, 8) }, // 不含税单价
    taxFreeSum: { type: Sequelize.DECIMAL(28, 4) }, // 不含税金额
    taxIncludedPrice: { type: Sequelize.DECIMAL(28, 8) }, // 含税单价
    taxIncludedSum: { type: Sequelize.DECIMAL(28, 4) }, // 含税金额
    orderBarCode: { type: Sequelize.STRING }, // 条码
    manufacturer: { type: Sequelize.STRING }, // 生产厂商
    batchNo: { type: Sequelize.STRING }, // 炉批号
    storagePlace: { type: Sequelize.STRING }, // 存放地
    itemRemark: { type: Sequelize.STRING }, // 备注
    entryState: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }, // 入账状态
    oriMaterialId: { type: Sequelize.STRING, defaultValue: '' }, // 材料信息varchar主键
    oriClassId: { type: Sequelize.STRING, defaultValue: '' }, // 材料类别varchar主键
    isRemoved: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    creatorId: { type: Sequelize.BIGINT, defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING, defaultFn: 'uerName' },
    sortCode: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE },
    modifierId: { type: Sequelize.BIGINT },
    modifierName: { type: Sequelize.STRING },
    updatedAt: { type: Sequelize.DATE },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  }
}

const qConcreteDevice = {
  name: 'qConcreteDevice',
  fields: {
    orgId: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orgName: { type: Sequelize.STRING }, // 组织机构名称
    carId: { type: Sequelize.BIGINT, defaultValue: 0 }, // 对接车辆id
    carDriver: { type: Sequelize.STRING }, // 操作司机
    deviceName: { type: Sequelize.STRING }, // 设备名称
    deviceType: { type: Sequelize.INTEGER }, // 设备类型 // 6
    deviceTypeName: { type: Sequelize.STRING }, // 设备类型名称
    licenseNumber: { type: Sequelize.STRING }, // 设备名称
    model: { type: Sequelize.STRING }, // 规格型号
    phone: { type: Sequelize.STRING }, // 联系方式
    operationPaper: { type: Sequelize.STRING }, // 特种作业证
    oilRatio: { type: Sequelize.STRING }, // 实时油量
    deviceState: { type: Sequelize.INTEGER }, // 设备状态
    deviceStateName: { type: Sequelize.STRING }, // 设备状态名称 闲置 / 分析 / 工作
    lastSyncTime: { type: Sequelize.STRING }, // 最近一次更新时间
    isRemoved: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    creatorId: { type: Sequelize.BIGINT, defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING, defaultFn: 'uerName' },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    modifierId: { type: Sequelize.BIGINT, defaultEqual: 'creatorId', updateFn: 'userId' },
    modifierName: { type: Sequelize.STRING, defaultEqual: 'creatorName', updateFn: 'uerName' },
    updatedAt: { type: Sequelize.DATE, allowNull: false, updateFn: 'now' },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  }
}
const mGhPlanCheck = {
  name: 'mGhPlanCheck',
  fields: {
    orgId: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orgName: { type: Sequelize.STRING }, // 组织机构名称
    ghId: { type: Sequelize.BIGINT }, // 工号id
    ghName: { type: Sequelize.STRING }, // 工号名称
    ghFullName: { type: Sequelize.STRING }, // 工号全称
    lossRate: { type: Sequelize.DECIMAL(28, 4) }, // 损耗率
    lossNum: { type: Sequelize.DECIMAL(28, 4) }, // 损耗数量
    designQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 图纸设计量
    planQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 复核量(图纸量+复核增减量)
    quantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 计划总数量(图纸量+复核增减量+变更量+损耗量)
    checkQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 复核增减量
    initQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 初始计划量(图纸量+复核增减量+损耗量)
    changeSum: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 变更计划总量(变更总量+损耗量)
    changeQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 变更计划量(不含损耗)
    useQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 使用数量
    bookPrice: { type: Sequelize.DECIMAL(28, 8), defaultValue: 0 }, // 计划价
    bookSum: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 计划金额
    useBookSum: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 已使用金额
    isAudit: { type: Sequelize.BOOLEAN, defaultValue: true }, // 审核（默认为1）
    auditor: { type: Sequelize.STRING, defaultFn: 'uerName' }, // 审核人
    auditDate: { type: Sequelize.STRING, defaultValue: Sequelize.NOW }, // 审核时间
    materialId: { type: Sequelize.BIGINT }, // 主材主键
    materialCode: { type: Sequelize.STRING }, // 材料编码
    materialName: { type: Sequelize.STRING }, // 材料名称
    materialModel: { type: Sequelize.STRING }, // 规格型号
    materialUnit: { type: Sequelize.STRING }, // 主单位
    classId: { type: Sequelize.BIGINT }, // 类别Id
    classFullId: { type: Sequelize.STRING }, // 材料类别主键链
    itemRemark: { type: Sequelize.STRING }, // 详细备注
    oriOrgId: { type: Sequelize.STRING }, // 第三方组织机构id
    oriGhId: { type: Sequelize.STRING }, // 第三方工号
    oriClassId: { type: Sequelize.STRING }, // 对接第三方材料类别
    oriMaterialId: { type: Sequelize.STRING, defaultValue: '' }, // 对接第三方材料信息
    isRemoved: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    isDisable: { type: Sequelize.BOOLEAN, defaultValue: true }, // 对接第三方数据是否启用
    creatorId: { type: Sequelize.BIGINT, allowNull: false, defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING, allowNull: false, defaultFn: 'uerName' },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    modifierId: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'creatorId', updateFn: 'userId' },
    modifierName: { type: Sequelize.STRING, allowNull: false, defaultEqual: 'creatorName', updateFn: 'uerName' },
    updatedAt: { type: Sequelize.DATE, allowNull: false, updateFn: 'now' },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultFn: 'id', updateFn: 'id' }
  }
}

const qReceiveWeight = {
  name: 'qReceiveWeight',
  fields: {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orgId: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    waybillWeight: { type: Sequelize.DECIMAL(28, 8), defaultValue: 0 }, // 运单重量
    discernPlateNumber: { type: Sequelize.STRING }, // 识别车牌号（原对账日期）（待定）
    isMultiplication: { type: Sequelize.BOOLEAN }, // 为乘法计算
    isUseOriNetQuantity: { type: Sequelize.BOOLEAN }, // 是否启用原始净重（待定）
    deductionRate: { type: Sequelize.DECIMAL(28, 4) }, // 抵扣系数（暗扣）（待定）
    roughQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 毛重
    tareQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 皮重
    auxiliaryNetQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 辅单位净重
    deductRate: { type: Sequelize.DECIMAL(28, 4) }, // 扣率
    deductQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 扣吨
    stockbinFullName: { type: Sequelize.STRING }, // 料仓全称（待定）
    stockbinName: { type: Sequelize.STRING }, // 料仓名称（待定）
    stockbinId: { type: Sequelize.BIGINT, defaultValue: 0 }, // 料仓ID
    oriStockbinId: { type: Sequelize.STRING, defaultValue: '' }, // 料仓ID
    enterTime: { type: Sequelize.STRING }, // 进场时间（待定）
    exitTime: { type: Sequelize.STRING }, // 进场时间（待定）
    sortTime: { type: Sequelize.STRING }, // 排序时间（待定）
    isReturn: { type: Sequelize.BOOLEAN }, // 是否退料（待定）
    isExit: { type: Sequelize.BOOLEAN }, // 进出场状态（待定）
    isTare: { type: Sequelize.BOOLEAN }, // 是否称皮重（待定）
    orderBarCode: { type: Sequelize.STRING }, // '单据条形码'（待定）
    isAffirm: { type: Sequelize.BOOLEAN, defaultValue: false }, // 是否到料确认（手持机端改状态使用）
    weightType: { type: Sequelize.STRING }, // 区分一车多料、直进直出、普通进料标识
    clientVersion: { type: Sequelize.STRING }, // 客户端版本号
    discernMode: { type: Sequelize.STRING }, // 识别方式
    oriRedId: { type: Sequelize.STRING, defaultValue: '' }, // 过磅系统端上的被冲红单据ID
    weightOffset: { type: Sequelize.DECIMAL(28, 4) }, // 重量偏差量
    isRemoved: { type: Sequelize.BOOLEAN },
    creatorId: { type: Sequelize.BIGINT },
    creatorName: { type: Sequelize.STRING },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifierId: { type: Sequelize.BIGINT },
    modifierName: { type: Sequelize.STRING },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  }
}

const qReceiveMoreMaterial = {
  name: 'qReceiveMoreMaterial',
  fields: {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    orgId: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    orderId: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true }, // 主表主键
    serviceType: { type: Sequelize.INTEGER }, // 业务类型 或者0代表调入 1代表收料
    orderType: { type: Sequelize.INTEGER }, // 单据类型默认值（0）1冲红2补录3退料4普通
    isRed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }, // 是否冲红（0）
    itemDataId: { type: Sequelize.BIGINT }, // 冲红时存原始单据明细id
    submitDate: { type: Sequelize.STRING }, // 提交时间
    materialId: { type: Sequelize.BIGINT }, // 主材主键
    materialCode: { type: Sequelize.STRING }, // 材料编码
    materialName: { type: Sequelize.STRING }, // 材料名称
    materialModel: { type: Sequelize.STRING }, // 规格型号
    materialUnit: { type: Sequelize.STRING }, // 主单位
    classId: { type: Sequelize.BIGINT }, // 材料类别id
    classFullId: { type: Sequelize.STRING }, // 材料类别主键链
    receivePrice: { type: Sequelize.DECIMAL(28, 8), defaultValue: 0 }, // '收料单价'
    auxiliaryUnit: { type: Sequelize.STRING }, // 辅单位
    netQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 最终净值（决定是取地磅称重还是手填的净值，确认数量）
    roughQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 原毛重，现在应收数量
    // tareQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 皮重
    conversionRate: { type: Sequelize.DECIMAL(28, 4) }, // 转化率
    deductRate: { type: Sequelize.DECIMAL(28, 4) }, // 扣率
    deductQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 扣吨
    oriNetQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 原始净重（运单）
    auxiliaryNetQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 辅单位净重
    mainNetQuantity: { type: Sequelize.DECIMAL(28, 4) }, // 净重主单位
    waybillWeight: { type: Sequelize.DECIMAL(28, 8) }, // 运单重量
    itemBarCode: { type: Sequelize.STRING }, // '单据条形码'
    manufacturer: { type: Sequelize.STRING, defaultValue: '' }, // 生产厂商
    batchNo: { type: Sequelize.STRING, defaultValue: '' }, // 炉批号
    testReportNo: { type: Sequelize.STRING, defaultValue: '' }, // 实验报告号
    storagePlace: { type: Sequelize.STRING, defaultValue: '' }, // '存放地',
    stockbinId: { type: Sequelize.BIGINT }, // 存放地id
    stockbinFullName: { type: Sequelize.STRING }, // 存放地全称
    oriStockbinId: { type: Sequelize.STRING }, // 存放地第三方id
    skillCardNo: { type: Sequelize.STRING, defaultValue: '' }, // '技证号'
    qualityCertificate: { type: Sequelize.STRING, defaultValue: '' }, // '质量证明文件'
    remark: { type: Sequelize.STRING }, // 备注
    sortCode: { type: Sequelize.BIGINT, defaultValue: 0 }, // 排序
    isAccounted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }, // 对账状态
    accountor: { type: Sequelize.STRING }, // 对账人
    accountDate: { type: Sequelize.STRING }, // 对账时间
    checkState: { type: Sequelize.INTEGER, defaultValue: 0 }, // 核对状态 0未核对  1已核对
    accountOrderId: { type: Sequelize.BIGINT }, // 对账单号ID
    acceptanceRecord: { type: Sequelize.STRING }, // 验收情况记录
    oriMaterialId: { type: Sequelize.STRING, defaultValue: '' }, // 【常用材料】预留
    oriClassId: { type: Sequelize.STRING }, // 预留对接材料类别ID
    oriCommonId: { type: Sequelize.STRING }, // 【通用】预留
    oriItemId: { type: Sequelize.STRING }, // 上传前id
    oriOrderId: { type: Sequelize.STRING }, // 上传之前的磅单主键
    oriOrgId: { type: Sequelize.STRING }, // 对接组织机构
    isRemoved: { type: Sequelize.BOOLEAN },
    taxRate: { type: Sequelize.DECIMAL(28, 4) }, // 税率
    taxFreePrice: { type: Sequelize.DECIMAL(28, 8) }, // 不含税单价
    taxFreeSum: { type: Sequelize.DECIMAL(28, 4) }, // 不含税金额
    taxIncludedPrice: { type: Sequelize.DECIMAL(28, 8) }, // 含税单价
    taxIncludedSum: { type: Sequelize.DECIMAL(28, 4) }, // 含税金额
    taxAmount: { type: Sequelize.DECIMAL(28, 4) }, // 税额
    freight: { type: Sequelize.DECIMAL(28, 4) }, // 运费
    isVoid: { type: Sequelize.BOOLEAN }, // 是否作废
    // statisticClassId: { type: Sequelize.BIGINT }, // 统计类别id
    // statisticClassName: { type: Sequelize.STRING }, // 统计类别名称
    creatorId: { type: Sequelize.BIGINT, allowNull: false, defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING, defaultFn: 'uerName' },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    modifierId: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'creatorId', updateFn: 'userId' },
    modifierName: { type: Sequelize.STRING, defaultEqual: 'creatorName', updateFn: 'uerName' },
    updatedAt: { type: Sequelize.DATE, allowNull: false, updateFn: 'now' },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  },
  uniques: [
    {
      props: ['oriItemId'],
      memo: '',
      ignoreUnique: true
    }
  ]
}

Object.keys(qReceiveMoreMaterial.fields).forEach(v => {
  console.log(v)
})
console.log('---------------')
Object.values(qReceiveMoreMaterial.fields).forEach(v => {
  console.log(v.type)
})
