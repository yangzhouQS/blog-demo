let a = {
  '主合同1': [
    {
      begin_date: '', // 主合同开始
      end_date: '', // 变更合同开始-1
      '数量': 0,
      days: 6,
      price: '25元',
      '材料': [] // 其它信息合并到每条材料
    },
    {
      // 确定变更的唯一识别
      begin_date: '',// 变更合同开始
      end_date: '', // 第二次变更合同开始 - 1
      days: 3,
      '材料': [ {} ]
    },
    {
      days: 4,
      '材料': []
    }
  ],
  '主合同2': {
    '变更ids': [],
    items: [ // ids + 1
      {},// 未变更的
      {} // 变更的
    ]
  }
}

let a = {
  "effectDate": "2020-06-20",
  "realQuantity": 1642.8,
  "endDate": 1996,
  "orderCode": "租入-20200600001",
  "beginDate": "2020-06-15",
  "contractId": 777985309881344, // 合同编号
  "itemType": 2, // 2变更
  "supplierId": 586892811629056,
  "contractName": "dfdsfs",
  "contractCode": "3333333",
  "leaseTaxFreePrice": 45,
  "leaseTaxIncludedPrice": 50.85,
  "taxRate": 13,
  "materialId": 654934782144512,
  "materialCode": "006",
  "materialName": "木杆",
  "materialModel": "",
  "materialUnit": "根",
  "classId": 611735397036898,
  "classFullId": "611735397036876|611735397036895|611735397036898",
  "chargeUnit": "米",
  "chargeMode": "元/天"
}