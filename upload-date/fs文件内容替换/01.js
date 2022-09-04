const fs = require('fs')
const obj = {
  orgId: 971365888684544,
  orgName: '杨周测试项目部'
}

const receive = {
  'qReceive': {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'orgName': '昔榆高速LJ4标白道岭隧道拌合站',
    'recordedDate': '2022-07-23',
    'orderDate': '2022-07',
    'orderCode': '收料20220700773',
    'serviceType': 10,
    'orderType': 4,
    'weightType': '直进直出',
    'materialCollection': '',
    'maker': '高亮',
    'makerDate': '2022-07-23',
    'remark': '花峪隧道',
    'printTimes': 1,
    'plateNumber': '晋HT0886',
    'oriSupplierId': '69405a82-1834-41d2-9278-b57be4462013',
    'supplierName': '山西吉宏达贸易有限公司',
    'oriLabourId': 'd6bef140-1f6c-471c-9f3f-6d5a66991831',
    'labourName': '陕西叁团建设工程有限公司',
    'oriGhId': '',
    'ghFullId': '',
    'ghFullName': '',
    'ghName': '',
    'enterTime': '2022-07-23 12:18:10',
    'exitTime': '2022-07-23 13:34:49',
    'isRed': false,
    'isAudit': true,
    'auditor': '高亮',
    'auditDate': '2022-07-23',
    'orgId': 1015814379507712,
    'supplierId': 843781703201280,
    'ghId': 0,
    'labourId': 1032236116425410,
    'oriRedId': '',
    'discernPlateNumber': '',
    'stockbinFullName': '',
    'stockbinName': '',
    'oriStockbinId': '',
    'stockbinId': 0,
    'isExit': true,
    'isTare': false,
    'roughQuantity': 48.86,
    'tareQuantity': 13.98,
    'deductRate': 0,
    'deductQuantity': 0,
    'auxiliaryNetQuantity': 34.88,
    'oriNetQuantity': 0,
    'isAffirm': false,
    'isUseOriNetQuantity': false,
    'sortOrderCode': '20220700773',
    'isReturn': false,
    'isRemoved': false,
    'versionCode': 'v3.0',
    'isMultiplication': 'false',
    'clientVersion': '3.4.6',
    'discernMode': '1'
  },
  'qReceiveMoreMaterials': [{
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': '72cee9fc-75d5-438b-a7b0-40db377810a6',
    'oriMaterialId': 'bb818b94-b6e5-47c9-b844-c0e6f2d27c10',
    'materialCode': '1496307',
    'materialName': ' 热轧普通工字钢',
    'materialModel': 'Q235B16 Q235B16',
    'materialUnit': '吨',
    'auxiliaryUnit': '吨',
    'oriClassId': null,
    'classFullId': null,
    'netQuantity': 34.88,
    'conversionRate': 1,
    'oriNetQuantity': 0,
    'mainNetQuantity': 34.88,
    'remark': null,
    'materialId': 1050424550478848,
    'classId': 0,
    'itemBarCode': 'W20220723121810mfV9',
    'orgId': 0,
    'oriItemRedId': null,
    'isRed': false,
    'isRemoved': false,
    'storagePlace': null,
    'stockbinFullName': null,
    'stockbinId': null,
    'deductQuantity': 0
  }],
  'qReceivePhotos': [{
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': '428608a6-da62-407e-862a-3758a4b6015b',
    'cameraPosition': '磅房',
    'photoType': '入场',
    'cameraCode': '04',
    'photoUrl': 'weight/428608a6da62407e862a3758a4b6015b.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': '8f4de131-7c28-42d1-966a-cac3ab4d4574',
    'cameraPosition': '磅房',
    'photoType': '出场',
    'cameraCode': '04',
    'photoUrl': 'weight/8f4de1317c2842d1966acac3ab4d4574.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': '9423e140-562a-4104-9b55-726e24fe80ec',
    'cameraPosition': '车前',
    'photoType': '入场',
    'cameraCode': '01',
    'photoUrl': 'weight/9423e140562a41049b55726e24fe80ec.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'a80d3d9d-9ce2-4557-b74c-00931325e761',
    'cameraPosition': '车尾',
    'photoType': '出场',
    'cameraCode': '02',
    'photoUrl': 'weight/a80d3d9d9ce24557b74c00931325e761.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'ce14b8df-2363-471d-b04e-ceee89fc9559',
    'cameraPosition': '车顶',
    'photoType': '出场',
    'cameraCode': '03',
    'photoUrl': 'weight/ce14b8df2363471db04eceee89fc9559.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'd41502c0-ab03-47a5-b1a8-a468a608ca95',
    'cameraPosition': '车顶',
    'photoType': '入场',
    'cameraCode': '03',
    'photoUrl': 'weight/d41502c0ab0347a5b1a8a468a608ca95.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'd6ca11f0-09a4-4702-9552-b42b03843d23',
    'cameraPosition': '车前',
    'photoType': '出场',
    'cameraCode': '01',
    'photoUrl': 'weight/d6ca11f009a447029552b42b03843d23.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'e37b335b-cb57-4e6d-a691-a905a8b15933',
    'cameraPosition': '车尾',
    'photoType': '入场',
    'cameraCode': '02',
    'photoUrl': 'weight/e37b335bcb574e6da691a905a8b15933.jpg',
    'isRemoved': false
  }],
  'qReceiveGpys': [],
  'qReceiveVehicles': [{
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'df6a025d-dc3f-43fe-be05-c8ecb65ca1e2',
    'photoType': '入场',
    'carColor': null,
    'carNum': '晋HT0886',
    'bodyColor': null,
    'brand': null,
    'photoUrl': 'weight/df6a025ddc3f43febe05c8ecb65ca1e2.jpg',
    'isRemoved': false
  }, {
    'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
    'oriOrderId': 'acd01d50-93df-4a79-9120-b6d1cb91c4b2',
    'oriItemId': 'ef2eae36-e41f-401f-9390-d838e988fdfc',
    'photoType': '出场',
    'carColor': null,
    'carNum': '晋HT0886',
    'bodyColor': null,
    'brand': null,
    'photoUrl': 'weight/ef2eae36e41f401f9390d838e988fdfc.jpg',
    'isRemoved': false
  }],
  'isComplex': true
}
receive.qReceive = Object.assign(receive.qReceive, {
  ghId: 995585921077248,
  ghFullId: '995585921077248',
  ghFullName: '绕城高速',
  ghName: '绕城高速',
  orgId: obj.orgId,
  orgName: obj.orgName,
  labourId: 1209049236009472,
  labourName: '广州市豌豆服饰有限公司',
  supplierId: 1241566059552256,
  supplierName: '长江存储科技有限责任公司'
})
receive.qReceiveMoreMaterials = receive.qReceiveMoreMaterials.map(row => {
  row.orgId = obj.orgId
  row.orgName = obj.orgName
  row.materialId = 973557170901504
  row.materialCode = '00002'
  row.materialModel = 'C10 C10'
  row.materialName = '混凝土C10'
  row.materialUnit = '立方'
  return row
})
receive.qReceivePhotos = []
receive.qReceiveGpys = []
receive.qReceiveVehicles = []
fs.writeFileSync('./receive.json', JSON.stringify(receive), { flag: 'w' })

