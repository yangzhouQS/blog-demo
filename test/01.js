const result = {
  'status': 200,
  'msg': 'OK',
  'data': [
    {
      'id': 1,
      'fid': 0,
      'name': '一号线',
      'createTime': 0,
      'desc': '一号线11111',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 3,
      'fid': 0,
      'name': '去去去',
      'createTime': 0,
      'desc': '555    订单99',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 4,
      'fid': 0,
      'name': '去问问无无群',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 7,
      'fid': 0,
      'name': '嘻嘻嘻嘻嘻嘻',
      'createTime': 0,
      'desc': '0嘻嘻嘻嘻嘻',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 8,
      'fid': 0,
      'name': '111111',
      'createTime': 0,
      'desc': '少时诵诗书',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 9,
      'fid': 0,
      'name': 'hihiHi好hi',
      'createTime': 0,
      'desc': 'hihihihihihihi我him ',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 10,
      'fid': 0,
      'name': '0000',
      'createTime': 0,
      'desc': '0',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 11,
      'fid': 0,
      'name': '111',
      'createTime': 0,
      'desc': '11111',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 12,
      'fid': 0,
      'name': '山西',
      'createTime': 0,
      'desc': '0',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 14,
      'fid': 0,
      'name': '鬼地方个',
      'createTime': 0,
      'desc': '1',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 15,
      'fid': 0,
      'name': 'xxxxx',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 16,
      'fid': 0,
      'name': 'zxxxxx',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 17,
      'fid': 0,
      'name': 'cccc',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 19,
      'fid': 1,
      'name': 'b   ',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 20,
      'fid': 1,
      'name': '添加添加',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 21,
      'fid': 1,
      'name': '休息休息',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 22,
      'fid': 1,
      'name': '男不不不不不不不不不不不不不不',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 23,
      'fid': 1,
      'name': 'ds',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 24,
      'fid': 1,
      'name': 'dedededede',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    },
    {
      'id': 25,
      'fid': 1,
      'name': '123456',
      'createTime': 0,
      'desc': '',
      'isDeleted': 0,
      'districtId': 1
    }
  ]
}
const rootMap = result.data.filter(r => r.fid === 0)
const fidMap = {}
result.data.forEach(row => {
  const key = `${ row.fid }`
  if (fidMap[key]) {
    fidMap[key] = [row, ...fidMap[key]]
  } else {
    fidMap[key] = [row]
  }
})
rootMap.forEach(row => {
  row.children = fidMap[`${ row.id }`] || []
})
console.log(JSON.stringify(rootMap, null, 2))
