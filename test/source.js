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
    modifierId: { type: Sequelize.STRING(50), allowNull: true, field: 'modifier_id', defaultEqual: 'creatorId', updateFn: 'userId' },
    modifierName: { type: Sequelize.STRING(64), allowNull: true, field: 'modifier_name', defaultFn: 'userName', updateFn: 'userName' },
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
