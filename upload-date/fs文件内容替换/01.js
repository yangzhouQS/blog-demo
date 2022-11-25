const fs = require('fs')
const obj = {
  orgId: 971365888684544,
  orgName: '杨周测试项目部'
}

let receive = {
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
receive = {"qReceive":{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","orgName":"山西路桥昔榆高速LJ11标","recordedDate":"2022-07-18","orderDate":"2022-07","orderCode":"收料20220700413","serviceType":10,"orderType":4,"weightType":"直进直出","materialCollection":"","maker":"常世平","makerDate":"2022-07-18","remark":"","printTimes":1,"plateNumber":"冀A881AP","oriSupplierId":"47795c62-24b6-4b2d-ae30-296683b3c7a3","supplierName":"山西锦华钢绞线机械制造有限公司","oriLabourId":"364fb3db-d8be-402a-b5f6-886c40741539","labourName":"河南山地建筑工程有限公司","oriGhId":"1c1321c6-5fe4-4bd9-8d8c-c1f6f246d883","ghFullId":"1010369692334592|1010369692334593","ghFullName":"梁场临建|1#梁场临建","ghName":"1#梁场临建","enterTime":"2022-07-18 17:39:40","exitTime":"2022-07-18 20:03:47","isRed":true,"isAudit":true,"auditor":"常世平","auditDate":"2022-07-18","orgId":811382170128384,"supplierId":843782344118784,"ghId":1010369692334593,"labourId":1027287596472832,"oriRedId":"","discernPlateNumber":"","stockbinFullName":"","stockbinName":"","oriStockbinId":"","stockbinId":0,"isExit":true,"isTare":false,"roughQuantity":50.86,"tareQuantity":15.88,"deductRate":0,"deductQuantity":0,"auxiliaryNetQuantity":34.98,"oriNetQuantity":35091,"isAffirm":false,"isUseOriNetQuantity":true,"sortOrderCode":"20220700413","isReturn":false,"isRemoved":false,"versionCode":"v3.0","isMultiplication":"false","clientVersion":"3.4.6","discernMode":"1"},"qReceiveMoreMaterials":[{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"401ecce0-7636-48c5-ab32-0880e89f20c8","oriMaterialId":"eb5e5306-53bc-4cad-b23a-f5fb6d646ce6","materialCode":"","materialName":"预应力混凝土用钢绞线","materialModel":"合金结构钢 1860MPa （1×7）C（15.2mm）","materialUnit":"吨","auxiliaryUnit":"吨","oriClassId":null,"classFullId":null,"netQuantity":35091,"conversionRate":1,"oriNetQuantity":35091,"mainNetQuantity":34.98,"remark":null,"materialId":1027459626645581,"classId":0,"itemBarCode":"W20220718173940Sc10","orgId":0,"oriItemRedId":null,"isRed":true,"isRemoved":false,"storagePlace":null,"stockbinFullName":null,"stockbinId":null,"deductQuantity":0}],"qReceivePhotos":[{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"0bfefdd6-bca1-4f46-9b66-bb24a0ded721","cameraPosition":"车尾","photoType":"出场","cameraCode":"02","photoUrl":"weight/0bfefdd6bca14f469b66bb24a0ded721.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"38d38942-e963-46c9-aab2-ba9013dbc4ef","cameraPosition":"磅房","photoType":"出场","cameraCode":"04","photoUrl":"weight/38d38942e96346c9aab2ba9013dbc4ef.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"631ad492-d120-45e6-b26e-e901f866a9f7","cameraPosition":"车前","photoType":"入场","cameraCode":"01","photoUrl":"weight/631ad492d12045e6b26ee901f866a9f7.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"6375705d-bac2-44fc-bc81-2a9ad13afed5","cameraPosition":"磅房","photoType":"入场","cameraCode":"04","photoUrl":"weight/6375705dbac244fcbc812a9ad13afed5.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"75afeb7f-f29a-4c92-9ca7-e0f32540de38","cameraPosition":"车尾","photoType":"入场","cameraCode":"02","photoUrl":"weight/75afeb7ff29a4c929ca7e0f32540de38.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"93166801-edde-4c59-8ef0-0fa2d45ce179","cameraPosition":"车顶","photoType":"出场","cameraCode":"03","photoUrl":"weight/93166801edde4c598ef00fa2d45ce179.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"a5b89fe3-1fdc-460a-99bf-35e24b559a4d","cameraPosition":"车顶","photoType":"入场","cameraCode":"03","photoUrl":"weight/a5b89fe31fdc460a99bf35e24b559a4d.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"c5fb4f8b-d4ca-42d1-ab89-fc1f0385a195","cameraPosition":"车前","photoType":"出场","cameraCode":"01","photoUrl":"weight/c5fb4f8bd4ca42d1ab89fc1f0385a195.jpg","isRemoved":false}],"qReceiveGpys":[],"qReceiveVehicles":[{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"34e3f1ae-eb8c-48ee-9458-a06ab7728fdb","photoType":"入场","carColor":null,"carNum":"冀A881AP","bodyColor":null,"brand":null,"photoUrl":"weight/34e3f1aeeb8c48ee9458a06ab7728fdb.jpg","isRemoved":false},{"oriOrgId":"21a76bcb-c097-46c7-84f2-fb20134399a4","oriOrderId":"dfe42e9a-a4c9-4b04-a889-5e40d265802c","oriItemId":"a2f70bb8-90d0-4548-b308-68979b37f0a4","photoType":"出场","carColor":null,"carNum":"冀A881AP","bodyColor":null,"brand":null,"photoUrl":"weight/a2f70bb890d04548b30868979b37f0a4.jpg","isRemoved":false}],"isComplex":true}
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


// 上传数据伪造
