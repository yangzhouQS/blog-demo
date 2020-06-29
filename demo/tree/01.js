let arr = [
  {
    code: '12332',
    id: 778828696679424,
    isGroup: true,
    name: 'test',
    orderNo: 778828696966144,
    parentId: -1,
    reviser: 0,
    statisticalUnit: '元',
    systemCode: 'systemCode1',
    usageType: null,
    children: [
      {
        code: '777',
        id: 778828877485056,
        isGroup: false,
        name: 'test',
        orderNo: 778828877747200,
        parentId: 778828696679424,
        reviser: 0,
        statisticalUnit: '元',
        systemCode: 'systemCode1',
        usageType: null
      }
    ]
  },
  {
    code: '666',
    id: 778828696679426,
    isGroup: true,
    name: 'test',
    orderNo: 778828696966146,
    parentId: -1,
    reviser: 0,
    statisticalUnit: '元',
    systemCode: 'systemCode1',
    usageType: null
  }
]

function getTree (data = [], result = []) {
  data.forEach(row => {
    if (row.children && row.children.length > 0) {
      getTree(row.children,result)
    }else{
      result.push(row)
    }
  })
  return result
}

console.log(getTree(arr))