const Sequelize = {
  STRING(v) {
    return `STRING(${ v })`
  },
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  DECIMAL(a, b) {
    return `DECIMAL(${ a }, ${ b })`
  },
  DATE: 'DATE',
  BIGINT: 'BIGINT'
}

// 收料登记主表
const qReceive = {
  name: 'qReceive',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // id
    orgName: { type: Sequelize.STRING(1000), allowNull: true }, // 组织机构名称
    recordedDate: { type: Sequelize.STRING(50), allowNull: true }, // 过磅日期
    orderDate: { type: Sequelize.STRING(50), allowNull: true }, // 账期
    orderCode: { type: Sequelize.STRING(100), allowNull: true }, // 单号
    serviceType: { type: Sequelize.INTEGER, allowNull: true }, // 业务类型
    orderType: { type: Sequelize.INTEGER, allowNull: true }, // 操作类型
    weightType: { type: Sequelize.STRING(50), allowNull: true }, // 过磅类型（普通进料、直进直出、一车多料）
    materialCollection: { type: Sequelize.STRING(100), allowNull: true }, // 物料集（一车多料用）
    maker: { type: Sequelize.STRING(64), allowNull: true }, // 过磅员
    makerDate: { type: Sequelize.STRING(50), allowNull: true }, // 过磅日期
    printTimes: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 }, // 打印次数
    plateNumber: { type: Sequelize.STRING(50), allowNull: true }, // 车牌号
    supplierId: { type: Sequelize.STRING(50), allowNull: true }, // 供应商id
    supplierName: { type: Sequelize.STRING(1000), allowNull: true }, // 供应商
    labourId: { type: Sequelize.STRING(50), allowNull: true }, // 用料单位id
    labourName: { type: Sequelize.STRING(500), allowNull: true }, // 用料单位
    ghId: { type: Sequelize.STRING(50), allowNull: true }, // 工号id
    ghFullId: { type: Sequelize.STRING(1000), allowNull: true }, // 工号主键链
    ghFullName: { type: Sequelize.STRING(5000), allowNull: true }, // 工号全称
    ghName: { type: Sequelize.STRING(1000), allowNull: true }, // 工号
    enterTime: { type: Sequelize.STRING(50), allowNull: true }, // 入场时间
    exitTime: { type: Sequelize.STRING(50), allowNull: true }, // 出场时间
    isRed: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 是否被冲红
    isAudit: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 审核状态
    auditor: { type: Sequelize.STRING(64), allowNull: true }, // 审核人
    auditDate: { type: Sequelize.STRING(50), allowNull: true }, // 审核时间
    oriOrgId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端组织机构
    oriSupplierId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端供应商
    oriGhId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端工号
    oriLabourId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端用料单位
    oriRedId: { type: Sequelize.STRING(50), allowNull: true }, // 冲红单的原始单据id
    isUpload: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 上传状态
    discernPlateNumber: { type: Sequelize.STRING(100), allowNull: true }, // 识别车牌号
    stockbinFullName: { type: Sequelize.STRING(5000), allowNull: true }, // 料仓全称
    stockbinName: { type: Sequelize.STRING(500), allowNull: true }, // 料仓名称
    stockbinId: { type: Sequelize.STRING(50), allowNull: true }, // 料仓id
    oriStockbinId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端料仓id
    isExit: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 出场状态
    isTare: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 是否称皮
    roughQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 毛重
    tareQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 皮重
    deductRate: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 扣率
    deductQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 扣重
    auxiliaryNetQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 净重
    oriNetQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 运单量
    isNotAccounting: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 复称（不计入核算）
    isUseOriNetQuantity: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 运单结算
    sortOrderCode: { type: Sequelize.STRING(100), allowNull: true }, // 单号排序
    isReturn: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 退货状态
    remark: { type: Sequelize.STRING(500), allowNull: true }, // 备注
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true },
    clientVersion: { type: Sequelize.STRING(50), allowNull: true }, // 客户端版本
    discernMode: { type: Sequelize.STRING(50), allowNull: true } // 识别方式
  },
  details: [
    {
      name: 'qReceiveMoreMaterial',
      filter: '{"orgId":#orgId#,"orderId":#id#}', // 删除主表的时候过滤从表的信息
      relationFields: [
        {
          masterField: 'id',
          subField: 'orderId'
        }
      ] // 主表的id值赋值给从表的orderId
    },
    {
      name: 'qReceivePhoto',
      filter: '{"orgId":#orgId#,"orderId":#id#}', // 删除主表的时候过滤从表的信息
      relationFields: [
        {
          masterField: 'id',
          subField: 'orderId'
        }
      ] // 主表的id值赋值给从表的orderId
    },
    {
      name: 'qReceivePhoto',
      filter: '{"orgId":#orgId#,"orderId":#id#}', // 删除主表的时候过滤从表的信息
      relationFields: [
        {
          masterField: 'id',
          subField: 'orderId'
        }
      ] // 主表的id值赋值给从表的orderId
    }
  ]
}

// 收料登记材料明细表
const qReceiveMoreMaterial = {
  name: 'qReceiveMoreMaterial',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // id
    id: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // 主键
    materialId: { type: Sequelize.STRING(50), allowNull: true }, // 材料信息
    materialCode: { type: Sequelize.STRING(500) }, // 材料编码
    materialName: { type: Sequelize.STRING(500) }, // 材料名称
    materialModel: { type: Sequelize.STRING(500) }, // 规格型号
    materialUnit: { type: Sequelize.STRING(50) }, // 单位
    classId: { type: Sequelize.STRING(50) }, // 类别id
    classFullId: { type: Sequelize.STRING(1000) }, // 类别全称
    netQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 确认量
    conversionRate: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 转换率
    oriNetQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 运单量
    mainNetQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 }, // 实际量
    oriMaterialId: { type: Sequelize.STRING(500) }, // 平台端材料id
    oriClassId: { type: Sequelize.STRING(500) }, // 平台端类别id
    itemBarCode: { type: Sequelize.STRING(50) }, // 条码
    oriOrgId: { type: Sequelize.STRING(500) }, // 平台端组织id
    oriItemRedId: { type: Sequelize.STRING(50) }, // 冲红来源明细id
    isRed: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 被冲红状态
    remark: { type: Sequelize.STRING(500) }, // 备注
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true },
    stockbinFullName: { type: Sequelize.STRING(5000), allowNull: true }, // 料仓全称
    stockbinName: { type: Sequelize.STRING(500), allowNull: true }, // 料仓名称
    stockbinId: { type: Sequelize.STRING(50), allowNull: true }, // 料仓id
    oriStockbinId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端料仓id
    deductQuantity: { type: Sequelize.DECIMAL(28, 4), defaultValue: 0 } // 扣吨
  }
}

// 收料登记照片表
const qReceivePhoto = {
  name: 'qReceivePhoto',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // id
    id: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // 主键
    cameraPosition: { type: Sequelize.STRING(50) }, // 摄像机位置
    photoType: { type: Sequelize.STRING(50) }, // 进场或出场
    cameraCode: { type: Sequelize.STRING(100) }, // 摄像机编码
    photoUrl: { type: Sequelize.STRING(500) }, // 上传到平台端的路径
    localUrl: { type: Sequelize.STRING(500) }, // 本地文件路径
    isUpload: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 上传状态
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true }
  }
}

// 收料登记高拍仪
const qReceiveGpy = {
  name: 'qReceiveGpy',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // id
    id: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // 主键
    gpyRemark: { type: Sequelize.STRING(500) }, // 照片名称
    photoUrl: { type: Sequelize.STRING(500) }, // 上传到平台端的路径
    localUrl: { type: Sequelize.STRING(500) }, // 本地文件路径
    isUpload: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 上传状态
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true }
  }
}


// 临时过磅
const qTemporary = {
  name: 'qTemporary',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // id
    orgName: { type: Sequelize.STRING(1000), allowNull: true }, // 组织机构名称
    recordedDate: { type: Sequelize.STRING(50), allowNull: true }, // 过磅日期
    orderDate: { type: Sequelize.STRING(50), allowNull: true }, // 账期
    orderCode: { type: Sequelize.STRING(100), allowNull: true }, // 单号
    maker: { type: Sequelize.STRING(64), allowNull: true }, // 过磅员
    makerDate: { type: Sequelize.STRING(50), allowNull: true }, // 过磅日期
    printTimes: { type: Sequelize.INTEGER, allowNull: true }, // 打印次数
    plateNumber: { type: Sequelize.STRING(50), allowNull: true }, // 车牌号
    supplierName: { type: Sequelize.STRING(1000), allowNull: true }, // 供应商
    entrustProject: { type: Sequelize.STRING(1000), allowNull: true }, // 委托方
    materialName: { type: Sequelize.STRING(1000), allowNull: true }, // 材料信息
    enterTime: { type: Sequelize.STRING(50), allowNull: true }, // 入场时间
    exitTime: { type: Sequelize.STRING(50), allowNull: true }, // 出场时间
    isAudit: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 审核状态
    auditor: { type: Sequelize.STRING(64), allowNull: true }, // 审核人
    auditDate: { type: Sequelize.STRING(50), allowNull: true }, // 审核时间
    oriOrgId: { type: Sequelize.STRING(500), allowNull: true }, // 平台端组织机构
    discernPlateNumber: { type: Sequelize.STRING(100), allowNull: true }, // 识别车牌号
    isExit: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 出场状态
    isTare: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 是否称皮
    roughQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 毛重
    tareQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 皮重
    deductRate: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 扣率
    deductQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 扣重
    auxiliaryNetQuantity: { type: Sequelize.DECIMAL(28, 4), allowNull: true }, // 净重
    sortOrderCode: { type: Sequelize.STRING(100), allowNull: true }, // 单号排序
    remark: { type: Sequelize.STRING(500), allowNull: true }, // 备注
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true }
  },
  details: []
}

// 临时过磅照片
const qTemporaryPhoto = {
  name: 'qTemporaryPhoto',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // id
    id: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // 主键
    cameraPosition: { type: Sequelize.STRING(50) }, // 摄像机位置
    photoType: { type: Sequelize.STRING(50) }, // 进场或出场
    cameraCode: { type: Sequelize.STRING(100) }, // 摄像机编码
    localUrl: { type: Sequelize.STRING(500) }, // 本地文件路径
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true }
  }
}

// 临时过磅车
const qTemporaryVehicle = {
  name: 'qTemporaryVehicle',
  fields: {
    orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id
    orderId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // id
    id: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true, defaultFn: 'id' }, // 主键
    photoType: { type: Sequelize.STRING(50) }, // 进场或出场
    carColor: { type: Sequelize.STRING(500) }, // 车辆颜色
    carNum: { type: Sequelize.STRING(500) }, // 车牌号
    bodyColor: { type: Sequelize.STRING(500) }, // 车身颜色
    brand: { type: Sequelize.STRING(500) }, // 车牌
    photoUrl: { type: Sequelize.STRING(500) }, // 上传到平台端的路径
    localUrl: { type: Sequelize.STRING(500) }, // 本地文件路径
    isUpload: { type: Sequelize.BOOLEAN, defaultValue: 0 }, // 上传状态
    creatorId: { type: Sequelize.STRING(50), allowNull: true, field: 'creator_id', defaultFn: 'userId' },
    creatorName: { type: Sequelize.STRING(64), allowNull: true, field: 'creator_name', defaultFn: 'userName' },
    createdAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'created_at' },
    modifierId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'modifier_id',
      defaultEqual: 'creatorId',
      updateFn: 'userId'
    },
    modifierName: {
      type: Sequelize.STRING(64),
      allowNull: true,
      field: 'modifier_name',
      defaultFn: 'userName',
      updateFn: 'userName'
    },
    updatedAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW, field: 'updated_at' },
    isRemoved: { type: Sequelize.BOOLEAN, defaultValue: 0, field: 'is_removed' },
    version: { type: Sequelize.BIGINT, allowNull: true }
  }
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
Object.keys(mReconciliation.fields).forEach(v => {
  // console.log(v)
})
console.log('---------------')
Object.values(mReconciliation.fields).forEach(v => {
  console.log(v.type)
})
