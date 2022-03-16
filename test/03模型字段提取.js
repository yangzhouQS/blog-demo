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


Object.keys(mGhPlanCheck.fields).forEach(v => {
  console.log(v)
})
console.log('---------------')
Object.values(mGhPlanCheck.fields).forEach(v => {
  console.log(v.type)
})
