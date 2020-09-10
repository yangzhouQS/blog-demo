const data = {
  'itemId': 526116276203520,
  'code': '01',
  'name': '上部结构',
  'type': '分部',
  'startPile': '',
  'endPile': '',
  'mileage': null,
  'isRemoved': false,
  'children': [
    {
      'itemId': 526153121157120,
      'code': '0101',
      'name': '预制箱梁',
      'type': '分项',
      'startPile': '',
      'endPile': '',
      'mileage': null,
      'isRemoved': false,
      'children': [
        {
          'itemId': 824261225542144,
          'code': null,
          'name': '特同时',
          'type': '部位',
          'startPile': null,
          'endPile': null,
          'mileage': null,
          'isRemoved': false,
          'children': [
            { 'itemId': 6666, children: [ { 'itemId': 5555 } ] }
          ]
        }
      ]
    },
    {
      'itemId': 526153533730816,
      'code': '0102',
      'name': '安装箱梁',
      'type': '分项',
      'startPile': '',
      'endPile': '',
      'mileage': null,
      'isRemoved': false,
      'children': [
        {
          'itemId': 824261266428416,
          'code': null,
          'name': 'test',
          'type': '部位',
          'startPile': null,
          'endPile': null,
          'mileage': null,
          'isRemoved': false,
          'children': []
        }
      ]
    },
    {
      'itemId': 526153233788928,
      'code': '0103',
      'name': '预制横梁',
      'type': '分项',
      'startPile': '',
      'endPile': '',
      'mileage': null,
      'isRemoved': false,
      'children': [
        {
          'itemId': 824261310116352,
          'code': null,
          'name': '特斯特',
          'type': '部位',
          'startPile': null,
          'endPile': null,
          'mileage': null,
          'isRemoved': false,
          'children': []
        }
      ]
    },
    {
      'itemId': 526153867595776,
      'code': '0104',
      'name': '现浇横梁',
      'type': '分项',
      'startPile': '',
      'endPile': '',
      'mileage': null,
      'isRemoved': false,
      'children': [
        {
          'itemId': 824261426983424,
          'code': null,
          'name': 'test001',
          'type': '部位',
          'startPile': null,
          'endPile': null,
          'mileage': null,
          'isRemoved': false,
          'children': []
        }
      ]
    },
    {
      'itemId': 824261164020224,
      'code': null,
      'name': 'test',
      'type': '部位',
      'startPile': null,
      'endPile': null,
      'mileage': null,
      'isRemoved': false,
      'children': []
    }
  ]
}

function getParentId (data = {}) {
  const parentId = data.parentId || -1
  if (data.children && data.children.length > 0) {
    data.parentId = parentId
    setParentId(data.children, data.itemId)
  }
}

function setParentId (dataChildren, dataId) {
  for (let i = 0; i < dataChildren.length; i++) {
    const row = dataChildren[i];
    row.parenId = dataId
    if (row.children && row.children.length > 0) {
      setParentId(row.children, row.itemId)
    }
  }
}

getParentId(data)
console.log(JSON.stringify(data, null, 3))









