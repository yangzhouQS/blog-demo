const axios = require('axios');
const idGen = require('./id-gen')

function getPlate(total = 5) {
  let stateList = '京津冀晋辽吉沪苏浙皖闽琼赣鲁豫鄂湘粤渝川贵云陕甘蒙黑桂藏青宁新'
  let charList = 'ABCDEFGHJKLMNQPRSTUVWXYZ'
  let numList = '1234567890'
  let halfList = [charList, numList]
  let state = dicingChar(stateList)
  let city = dicingChar(charList)
  let sequence = ''
  while (total--) {
    sequence += dicingChar(halfList[Math.round(Math.random())])
  }
  return `${ state }${ city }${ sequence }`
  // console.log(`${ state }${ city }${ sequence }`)
}

function dicingChar(series) {
  return series[~~(Math.random() * series.length)]
}


const count = 10000
let maxCode = 20220400000 + 1
for (let i = 0; i < count; i++) {
  ;(async function (i) {
    const upData = {
      'qReceive': {
        'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
        'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
        'orgName': '杨周测试项目部',
        'recordedDate': '2021-04-17',
        'orderDate': '2021-11',
        'orderCode': '收料20211100493',
        'serviceType': 10,
        'orderType': 4,
        'weightType': '进料过磅',
        'materialCollection': '',
        'maker': '高亮',
        'makerDate': '2021-04-17',
        'remark': '',
        'printTimes': 1,
        'plateNumber': '蒙J59613',
        'oriSupplierId': '0eec5f1d-65fd-467f-a720-89fd3482e83d',
        'supplierName': 'zzz用料单位123',
        'oriLabourId': '',
        'labourName': '',
        'oriGhId': '',
        'ghFullId': '',
        'ghFullName': '',
        'ghName': '',
        'enterTime': '2021-04-17 15:29:17',
        'exitTime': '2021-04-17 15:33:14',
        'isRed': false,
        'isAudit': true,
        'auditor': '高亮',
        'auditDate': '2021-04-17',
        'orgId': 971365888684544,
        'supplierId': 1225965220434432,
        'ghId': 0,
        'labourId': 0,
        'oriRedId': '',
        'discernPlateNumber': '',
        'stockbinFullName': '',
        'stockbinName': '',
        'oriStockbinId': '',
        'stockbinId': 0,
        'isExit': true,
        'isTare': false,
        'roughQuantity': 48.44,
        'tareQuantity': 19.34,
        'deductRate': 0.0,
        'deductQuantity': 2.0,
        'auxiliaryNetQuantity': 27.1,
        'oriNetQuantity': 0.0,
        'isAffirm': false,
        'isUseOriNetQuantity': false,
        'sortOrderCode': '20211100493',
        'isReturn': false,
        'isRemoved': false,
        'versionCode': 'v3.0',
        'isMultiplication': 'false',
        'clientVersion': '3.1.8',
        'discernMode': '1'
      },
      'qReceiveMoreMaterials': [
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '9c88c073-6a45-43b5-a809-09554fe4e7ee',
          'oriMaterialId': 'b8f7165e-c594-45bd-8fb6-769384378f36',
          'materialCode': '00002',
          'materialName': '混凝土C10',
          'materialModel': 'C10 C10',
          'materialUnit': '立方',
          'auxiliaryUnit': '立方',
          'netQuantity': 27.1,
          'conversionRate': 1.0,
          'oriNetQuantity': 0.0,
          'mainNetQuantity': 27.1,
          'materialId': 973557170901504,
          'classId': 0,
          'orgId': 0,
          'isRed': false,
          'isRemoved': false
        }
      ],
      'qReceivePhotos': [
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '18962cd4-33ff-4686-be6f-7e70fd93c6d8',
          'cameraPosition': '车尾',
          'photoType': '入场',
          'cameraCode': '02',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '53ec107a-ebf0-4c51-a346-49e52379d1a6',
          'cameraPosition': '磅房',
          'photoType': '入场',
          'cameraCode': '04',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '82ed2fea-01b0-4b7c-ab95-68b3fbb0d55d',
          'cameraPosition': '车顶',
          'photoType': '出场',
          'cameraCode': '03',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '88704041-e455-493f-b710-d15babc74547',
          'cameraPosition': '车顶',
          'photoType': '入场',
          'cameraCode': '03',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': 'aff7665a-4f24-40ab-a9c2-ddf48e20330a',
          'cameraPosition': '车前',
          'photoType': '入场',
          'cameraCode': '01',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': 'b842fef8-b6e2-4253-a7ad-f0e5217c9b29',
          'cameraPosition': '车尾',
          'photoType': '出场',
          'cameraCode': '02',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': 'b906077c-b861-4714-9b69-8f1b98d9b9d2',
          'cameraPosition': '磅房',
          'photoType': '出场',
          'cameraCode': '04',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': 'f661a15a-26fc-4560-8ef6-2df7f526de29',
          'cameraPosition': '车前',
          'photoType': '出场',
          'cameraCode': '01',
          'photoUrl': '1649923496630.png',
          'isRemoved': false
        }
      ],
      'qReceiveGpys': [],
      'qReceiveVehicles': [
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '29856af3-bc01-4651-965a-30ef9a903634',
          'photoType': '出场',
          'carNum': '蒙J59613',
          'photoUrl': '1649923546154.png',
          'isRemoved': false
        },
        {
          'oriOrgId': '21a76bcb-c097-46c7-84f2-fb20134399a4',
          'oriOrderId': 'b2cc5645-ef88-496c-a133-f04cc8011386',
          'oriItemId': '70ae6d7d-df13-41de-8c4d-d1935fab40e3',
          'photoType': '入场',
          'carNum': '蒙J59613',
          'photoUrl': '1649923546154.png',
          'isRemoved': false
        }
      ],
      'isComplex': true
    }
    let data = JSON.stringify(upData);

    let config = {
      method: 'post',
      url: 'http://localhost:7878/mp-product/mquantitys-upload?resource=qReceive&tag=weight&version=1',
      headers: {
        'x-tenant-id': '10001',
        'x-org-id': '832499207122944',
        'x-user-id': '98765',
        'x-user-name': 'U2FsdGVkX1/LWVfuOCaK3eKQO/pz0nINp3ZU7t+FAQE=',
        'x-tenant-code': 'gslq4dev',
        'Content-Type': 'application/json',
        'x-product-id': 'smconfig',
        'x-feature-packs': '',
        'x-client-ajax': 'true'
      },
      data: data
    };


    // const response = await axios(config)
    // console.log(`index = ${ i } : `, JSON.stringify(response.data));


    axios(config).then((response) => {
      console.log(`index = ${ i } : `, JSON.stringify(response.data));
    }).catch((error) => {
      console.log(error);
    });
  })(i)
}


/*axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });*/
