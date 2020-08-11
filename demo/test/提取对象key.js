const obj = {
  service: {
    input: 'src/controllers/index.js',
      output: 'dist/app.js'
  },
  homePage: {
    title: '首页',
      input: 'src/web-content/modules/home-page/index.js',
      output: 'dist/web-content/assets/home-page.js'
  },
  // 合同管理
  contractManageChange: {
    title: '合同管理',
      input: 'src/web-content/modules/contract-manage-change/index.js',
      output: 'dist/web-content/assets/contract-manage-change.js'
  },
  // 支付管理
  paymentManage: {
    title: '支付管理',
      input: 'src/web-content/modules/payment-manage/index.js',
      output: 'dist/web-content/assets/payment-manage.js'
  },
  // 扣款管理(新增)
  deductionManage: {
    title: '扣款管理',
      input: 'src/web-content/modules/deduction-manage/index.js',
      output: 'dist/web-content/assets/deduction-manage.js'
  },
  // 合同台账
  contractLedger: {
    title: '合同台账',
      input: 'src/web-content/modules/contract-ledger/index.js',
      output: 'dist/web-content/assets/contract-ledger.js'
  },
  // 付欠款统计（项目部）
  paymentStatisticsProject: {
    title: '付欠款统计',
      input: 'src/web-content/modules/payment-statistics-project/index.js',
      output: 'dist/web-content/assets/payment-statistics-project.js'
  },
  // 付欠款统计(公司级)
  paymentStatisticsCompany: {
    title: '付欠款统计',
      input: 'src/web-content/modules/payment-statistics-company/index.js',
      output: 'dist/web-content/assets/payment-statistics-company.js'
  },
  // 材料组件(对账模式)
  checkMaterialPrice: {
    title: '材料组价',
      input: 'src/web-content/modules/check-material-price/index.js',
      output: 'dist/web-content/assets/check-material-price.js'
  },
  // 材料对账(对账模式)
  checkMaterialAccount: {
    title: '物资对账',
      input: 'src/web-content/modules/check-material-account/index.js',
      output: 'dist/web-content/assets/check-material-account.js'
  },
  // 点验单（普通模式）
  receiveOrder: {
    title: '点验单',
      input: 'src/web-content/modules/receive-order/index.js',
      output: 'dist/web-content/assets/receive-order.js'
  },
  // 点验单（对账模式）
  receiveOrderCheck: {
    title: '点验单',
      input: 'src/web-content/modules/receive-order-check/index.js',
      output: 'dist/web-content/assets/receive-order-check.js'
  },
  // 点验汇总单(新增) 暂屏蔽，完成了放开
  receiveSummarySheet: {
    title: '点验汇总单',
      input: 'src/web-content/modules/receive-summary-sheet/index.js',
      output: 'dist/web-content/assets/receive-summary-sheet.js'
  },
  // 收料综合统计
  receiveStatistics: {
    title: '收料综合统计',
      input: 'src/web-content/modules/receive-statistics/index.js',
      output: 'dist/web-content/assets/receive-statistics.js'
  },
  // 发料单（普通模式非限额模式）
  deliveryOrder: {
    title: '发料单',
      input: 'src/web-content/modules/delivery-order/index.js',
      output: 'dist/web-content/assets/delivery-order.js'
  },
  // 发料单（普通模式限额模式）
  deliveryOrderLimitmode: {
    title: '发料单',
      input: 'src/web-content/modules/delivery-order-limitmode/index.js',
      output: 'dist/web-content/assets/delivery-order-limitmode.js'
  },
  // 发料单（对账模式非限额）
  deliveryOrderCheck: {
    title: '发料单',
      input: 'src/web-content/modules/delivery-order-check/index.js',
      output: 'dist/web-content/assets/delivery-order-check.js'
  },
  // 超量发料单
  deliveryOrderOvershoot: {
    title: '超量发料单',
      input: 'src/web-content/modules/delivery-order-overshoot/index.js',
      output: 'dist/web-content/assets/delivery-order-overshoot.js'
  },
  // 限额发料单
  deliveryOrderLimit: {
    title: '限额发料单',
      input: 'src/web-content/modules/delivery-order-limit/index.js',
      output: 'dist/web-content/assets/delivery-order-limit.js'
  },
  // 废旧物资处理(新增)
  wasteManage: {
    title: '废旧物资处理',
      input: 'src/web-content/modules/waste-manage/index.js',
      output: 'dist/web-content/assets/waste-manage.js'
  },
  // 发料汇总单(新增)
  deliverySummarySheet: {
    title: '发料汇总单',
      input: 'src/web-content/modules/delivery-summary-sheet/index.js',
      output: 'dist/web-content/assets/delivery-summary-sheet.js'
  },
  // 支出综合统计
  deliveryStatistics: {
    title: '支出综合统计',
      input: 'src/web-content/modules/delivery-statistics/index.js',
      output: 'dist/web-content/assets/delivery-statistics.js'
  },
  // 物资明细账
  materialsCard: {
    title: '物资明细账',
      input: 'src/web-content/modules/materials-card/index.js',
      output: 'dist/web-content/assets/materials-card.js'
  },
  // 物资明细账（对账模式）
  materialsCardCheck: {
    title: '物资明细账',
      input: 'src/web-content/modules/materials-card-check/index.js',
      output: 'dist/web-content/assets/materials-card-check.js'
  },
  // 库存统计
  inventoryStatistics: {
    title: '库存统计',
      input: 'src/web-content/modules/inventory-statistics/index.js',
      output: 'dist/web-content/assets/inventory-statistics.js'
  },
  // 资金动态表普通模式
  materialsDynamic: {
    title: '资金动态表',
      input: 'src/web-content/modules/materials-dynamic/index.js',
      output: 'dist/web-content/assets/materials-dynamic.js'
  },
  // 资金动态表对账模式
  materialsDynamicCheck: {
    title: '资金动态表',
      input: 'src/web-content/modules/materials-dynamic-check/index.js',
      output: 'dist/web-content/assets/materials-dynamic-check.js'
  },
  // 用料单位核算表
  labourAccounting: {
    title: '用料单位核算表',
      input: 'src/web-content/modules/labour-accounting/index.js',
      output: 'dist/web-content/assets/labour-accounting.js'
  },
  // 资金动态表（暂不加）materials-dynamic-company

  // 工队月节超分析(录入分析合并tab显示)
  labourAnalyze: {
    title: '工队月节超分析',
      input: 'src/web-content/modules/labour-analyze/index.js',
      output: 'dist/web-content/assets/labour-analyze.js'
  },
  // 工号月节超分析(录入分析合并tab显示)
  ghAnalyze: {
    title: '工号月节超分析',
      input: 'src/web-content/modules/gh-analyze/index.js',
      output: 'dist/web-content/assets/gh-analyze.js'
  },
  // 收料预警
  receiveWarning: {
    title: '收料预警',
      input: 'src/web-content/modules/receive-warning/index.js',
      output: 'dist/web-content/assets/receive-warning.js'
  },
  // 发料预警
  deliveryWarning: {
    title: '发料预警',
      input: 'src/web-content/modules/delivery-warning/index.js',
      output: 'dist/web-content/assets/delivery-warning.js'
  }
}

console.log(Object.keys(obj).join())