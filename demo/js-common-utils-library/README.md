## 常用方法封装说明
### sequelize-func中queryByCondition方法说明
根据post请求传进来的参数进行解析，暂时只支持多个条件间的and操作，不支持or操作，支持同一字段不同值的or操作
```
参数说明：QueryCondtion结构形式：
            {
              limit: 100,//每次查询的条目个数
              offset: 100,//查询跳过的条目数，有此项配置，使用分页查询方法
              order: [ [ 'id' ] ],//进行排序的字段,默认为升序，降序配置为[ [ 'id', 'DESC' ] ]
              attributes: [ 'id', 'name' ],//查询的字段
              isNotReturnCount: false, //默认可以不传，后续版本不需要这个参数，为了兼容以前版本，默认值为undefined
              condtionItems: [ {
                filedName: 'name',//条件字段名称
                op: 'like',//查询符号，eq，like等，具体查看图片1
                filedValue: '%lp%'//条件字段的值
              } ]
            }
```
图片1：
![avatar](/asset/img/md1.png)
```
解析结果对象:
{
  limit: 100,
  offset: 100,
  attributes: ['id','name'],
  order: [ [ 'id' ] ],
  where: {
    name: {
      [Op.like]: '%lp%'
    }
  }
}
```
### 自增id方法调用方式
```
let currId = idGen()
console.log(currId)
```

### entity方法说明
根据模型定义结构通过sequelize进行模型创建，使用小驼峰进行模型定义，entity会自动把小驼峰写法在数据库中解析成下划线，然后对操作模型的方法进行了拦截封装，对参数数据进行类型检查和默认值赋值等操作

#### 模型定义结构 字段，表名称小驼峰写法
```
 {
  name: 'item',
  fields: {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true, defaultFn: 'id' },
    creatorId: {type: Sequelize.BIGINT, defaultFn: 'userId'}
    creatorName: {type: Sequelize.STRING, defaultFn: 'uerName'}
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    modifierId: {type: Sequelize.BIGINT, defaultEqual: 'creatorId', updateFn: 'userId'}
    modifierName: {type: Sequelize.STRING, defaultEqual: 'creatorName' updateFn: 'uerName'}
    updatedAt: { type: Sequelize.DATE, allowNull: false, updateFn: 'now' },
    version: { type: Sequelize.BIGINT, allowNull: false, defaultEqual: 'id', updateFn: 'id' }
  },
  uniques: [
    {
      props: ['id', 'name'],
      memo: '条目名称',
      ignoreUnique: true or false //判断重复后是否忽略
    }
  ],
  details: [
    {
      name: 'receiveItem',
      filter: '{"orderId":#id#}',
      relationFields: [
                        {
                          masterField:'id',
                          subField:'orderId'
                        },
                        {
                          masterField:'orgId',
                          subField:'orgId'
                        }
                      ]
    }
  ]
}

配置说明：
  字段定义自定义属性说明：
    defaultFn：
    defaultEqual：
    updateFn：
  uniques：
    ignoreUnique: 一般验证出现重复直接输出异常，不继续进行下去，设置此属性为true，则不会输出异常，重复会进行修改操作
  details：
    relationFields:从表中引用的主表的字段，添加或者修改时使用此字段来进行从表引用字段赋值
      masterField: 主表字段
      subField: 从表字段
```
#### sequelize操作模型的主要方法
##### getCondition 解析通过问号传参的方式传进来的参数，形成options对象
```
访问路径:/items?limit=20&order=id&attributes=name,shortName&offset=10   
解析结果对象：
{
  limit: 20,
  order
}
```
##### postCondition 解析通过post方式传进来的参数，形成options
```
参数对象：
{
  condtionItems: [ {
    filedName: 'name',
    op: 'eq',
    filedValue: 'lp'
  } ],
  order: [ [ 'id' ] ],
  limit: 100,
  offset: 100,
  attributes: [ 'name', 'shortName' ],
  isNotReturnCount: false // 新修改增加
}
解析对象：
{

}
```
##### findOne 通过参数对象查询单条数据
```
参数对象options：
{
  where: {
    id: ctx.params.id,
    orgId: ctx.params.orgId
  }
}
```
##### ylFindOne 易龙公司专用，查询主从关联
```
参数说明：
options：查询条件，一般为 { where: { id: ctx.params.id }, itemOrder: [['materialId', 'DESC']]},itemOrder 为从表排序参数
isComplex:是否为主从对象查询
```
##### findAll 通过参数对象查询多条数据
```
参数对象options:
{
  where: {
    id: ctx.params.id
  },
  limit: 100,
  offset: 100,
  order: [ [ 'id' ] ],
  attributes: ['name','shortName']
}
```
##### ylFindAll 易龙公司专用，查询主从表
```
参数对象options:
{
   where: {
    id: ctx.params.id
  },
  limit: 100,
  offset: 100,
  order: [ [ 'id' ] ],
  attributes: ['name','shortName']
}
```
```
返回结构示例：
[
    {
        "mReceiveOrder": {
            "id": 443188462858240,
            "name": "abc1000",
            "orderCode": "R-000100",
            "isRemoved": false,
            "creatorId": 98765,
            "creatorName": "lp",
            "createdAt": "2019-02-28T02:28:39.000Z",
            "modifierId": 98765,
            "modifierName": "lp",
            "updatedAt": "2019-02-28T02:28:39.000Z",
            "version": 443188463529984
        },
        "mReceiveOrderItems": [
            {
                "id": 443188470059008,
                "mReceiveOrderId": 443188462858240,
                "name": "item1-1-1",
                "isRemoved": false,
                "creatorId": 98765,
                "creatorName": "lp",
                "createdAt": "2019-02-28T02:28:39.000Z",
                "modifierId": 98765,
                "modifierName": "lp",
                "updatedAt": "2019-02-28T02:28:39.000Z",
                "version": 443188470460416
            },
            {
                "id": 443188520833024,
                "mReceiveOrderId": 443188462858240,
                "name": "item2-1-1",
                "isRemoved": false,
                "creatorId": 98765,
                "creatorName": "lp",
                "createdAt": "2019-02-28T02:28:45.000Z",
                "modifierId": 98765,
                "modifierName": "lp",
                "updatedAt": "2019-02-28T02:28:45.000Z",
                "version": 443188521373696
            }
        ],
        "mReceiveOrderPhotos": [
            {
                "id": 443188524093440,
                "orderId": 443188462858240,
                "cameraPosition": "车前",
                "isRemoved": false,
                "creatorId": 98765,
                "creatorName": "lp",
                "createdAt": "2019-02-28T02:28:45.000Z",
                "modifierId": 98765,
                "modifierName": "lp",
                "updatedAt": "2019-02-28T02:28:45.000Z",
                "version": 443188524371968
            },
            {
                "id": 443188526731264,
                "orderId": 443188462858240,
                "cameraPosition": "车顶",
                "isRemoved": false,
                "creatorId": 98765,
                "creatorName": "lp",
                "createdAt": "2019-02-28T02:28:46.000Z",
                "modifierId": 98765,
                "modifierName": "lp",
                "updatedAt": "2019-02-28T02:28:46.000Z",
                "version": 443188527337472
            }
        ],
        "isComplex": true
    }
]
```
##### findAndCountAll 分页查找返回总行数与分页后对象
```
参数对象options:
{
  where: {
    id: ctx.params.id
  },
  limit: 100,
  offset: 100,
  order: [ [ 'id' ] ],
  attributes: ['name','shortName']
}
```
##### create  添加操作
```
参数对象说明：
  values：要添加的对象
  extras: 上下文信息，里面有租户id，组织id，用户id，扩展添加用户名称
  options: 条件对象，添加一般不使用
    where: 查询数据的条件
    returnData: 默认为false 表示添加成功后返回数据的id，为true，返回新增的完整数据
  isNotPrimaryQuery: 查询条件是否双主键查询，默认值为false，会使用options条件额外增加id主键合并联合查询，为true，使用不带id的options查询返回
```
##### transCreate 事务中使用的添加操作
```
// 待定
```
##### ylSingleBulkCreate 易龙公司专用 单表大批量添加操作（验证重复，存在修改，不存在添加）
```
// 待定，是否考虑批量添加时存在，忽略修改操作
```
##### update  修改操作
```
参数对象说明：
  values：要添加的对象
  extras: 上下文信息，里面有租户id，组织id，用户id，扩展添加用户名称
  options: 条件对象，一般使用{ where: { id: ctx.params.id } }
  deleteProps: 数组对象，形式为[ 'name', 'orgId' ],主键id除外,sequelize中进行修改操作时传入的对象不允许存在主键信息，所以在更新前要对主键列进行删除，默认使用id主键，如果遇到多个字段信息不需要进行更新，就进行删除属性操作
  reservedProps:保留字段值，不进行更新的字段列表
  ignoreUnique:是否忽略重复判断，常用信息的修改一般使用忽略重复判断
```
##### bulkUpdate 批量修改操作
```
参数对象说明：
  values：要添加的对象
  extras: 上下文信息，里面有租户id，组织id，用户id，扩展添加用户名称
  options: 条件对象，一般使用{ where: { id: ctx.params.id } }
  reservedProps:保留字段值，不进行更新的字段列表
  ignoreUnique:是否忽略重复判断，常用信息的修改一般使用忽略重复判断
```
##### transUpdate 事务中使用的修改操作
```
// 待定
```
##### createOrUpdate 添加或者删除操作，根据配置验证是否存在，存在修改，不存在添加
```
参数对象说明：
 values：要添加的对象
 1)复杂对象的格式，isComplex指定为是否为复杂对象，复杂对象设置这个值为true，别的对象默认为false
 ```
{
	"mReceiveOrder": {
		"id": 13579,
	    "name": "abc1000",
	    "orderCode": "R-000100"
	},
    "mReceiveOrderItems": [
        {
        	"id": 24690,
            "name": "item1-1-1"
        },
        {
        	"id": 12478,
            "name": "item2-1-1"
        }
    ],
    "mReceiveOrderPhoto": [
    	{
    		"id": 98653,
    		"cameraPosition": "车前"
    	},
    	{
    		"id": 98664,
    		"cameraPosition": "车顶"
    	}
    ],
	 "isComplex": true
}
 ```
 extras: 上下文信息，里面有租户id，组织id，用户id，扩展添加用户名称
 options: 条件对象，一般使用{ where: { id: ctx.params.id } }
 deleteProps: 数组对象，形式为[ 'name', 'orgId' ],主键id除外,sequelize中进行修改操作时传入的对象不允许存在主键信息，所以在更新前要对主键列进行删除，默认使用id主键，如果遇到多个字段信息不需要进行更新，就进行删除操作
 isNotPrimaryQuery: 添加成功后会返回添加成功的信息，默认值为false，会使用id+options条件合并联合查询，为false，使用不带主键的options查询返回
```
##### destroy 删除操作，默认为更新isRemoved字段值
```
参数对象说明：
options: 条件对象，一般使用{ where: { id: ctx.params.id } }
extras: 上下文信息，里面有租户id，组织id，用户id，扩展添加用户名称
```
##### realDesctroy 删除操作，真正从数据库删除
```
参数对象说明：
options: 条件对象，一般使用{ where: { id: ctx.params.id } }
```

##### createOrderWithTrans 添加主从表
```
参数对象说明：
 values：要添加的对象
 1)复杂对象的格式，isComplex指定为是否为复杂对象，复杂对象设置这个值为true，别的对象默认为false
 ```
{
	"mReceiveOrder": {
		"id": 13579,
	    "name": "abc1000",
	    "orderCode": "R-000100"
	},
    "mReceiveOrderItems": [
        {
        	"id": 24690,
            "name": "item1-1-1"
        },
        {
        	"id": 12478,
            "name": "item2-1-1"
        }
    ],
    "mReceiveOrderPhoto": [
    	{
    		"id": 98653,
    		"cameraPosition": "车前"
    	},
    	{
    		"id": 98664,
    		"cameraPosition": "车顶"
    	}
    ],
	 "isComplex": true
}
```
{ returnData: true } true 返回主表带从表数据，false 只返回添加成功的ID
```
##### updateOrderWithTrans 修改主从表
##### queryExistsData 查询存在的数据
  ```
  查询重复数据  dataList 数组：里面有存在和不存在的数据  columns:targetColumns 目标表数据比较列, sourceColumns 数据查询比较列, queryColumns 如果要查询指定列的查询列名,ignoreColumns 不作为条件列
  返回：notExistData 不存在的数据 existsData 存在的数据 queryData 指定查询列的数据
  ```
### implal 测试方法示例
```
'use strict'

const Sequelize = require('..')
const QueryTypes = Sequelize.QueryTypes

const option = {
  host: '192.168.6.128',
  dialect: 'impala',
  username: 'hue',
  password: '123321',
  // host: '192.168.1.205',
  // username: 'root',
  // password: '123321',
  // database: 'dc-test',
  // dialect: 'mysql',

  logging: true,
  pool: {
    max: 5,
    idle: 30000
  },
  impala: {
    transaction: {
      store: 'remote',
      redis: {
        host: '192.168.1.205'
      }
    },
    getQueryOption: async () => {
      return Promise.resolve({ user: 'hdfs', database: 'default' })
    }
  }
}

const sequelize = new Sequelize(option)
const Master = sequelize.define(
  'sequelizeTest',
  {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { field: 'created_at', type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
  },
  {
    updatedAt: false,
    tableName: 'sequelize_test'
  }
)

const Detail = sequelize.define(
  'sequelizeSubTest',
  {
    id: { type: Sequelize.BIGINT, allowNull: false, primaryKey: true },
    parentId: { field: 'parent_id', type: Sequelize.BIGINT, allowNull: false },
    score: { type: Sequelize.DOUBLE, allowNull: false },
    createdAt: { field: 'created_at', type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
  },
  {
    updatedAt: false,
    tableName: 'sequelize_sub_test'
  }
)
Master.hasMany(Detail, { foreignKey: 'parent_id', as: 'details' })
Detail.belongsTo(Master, { foreignKey: 'parent_id', as: 'master' })

async function useModelSingleSample () {
  const newData = {
    id: Date.now(),
    name: '有个人',
    age: 12
  }

  console.log('------------ CREATE ONE -------------------')
  await Master.create(newData, { transaction: t })
  console.log('------------ FIND BY ID -------------------')
  const singleOne = await Master.findById(newData.id)
  console.log(JSON.stringify(singleOne))
  console.log('------------ SAVE -------------------')
  singleOne.age = 34
  await singleOne.save()
  console.log('------------ COUNT -------------------')
  const count = await Master.count({ where: { id: newData.id } })
  console.log(JSON.stringify(count))
  console.log('------------ MAX -------------------')
  const max = await Master.max('age', { where: { id: { [Sequelize.Op.lt]: newData.id } } })
  console.log(JSON.stringify(max))
  console.log('------------ INCREMENT -------------------')
  await Master.increment('age', { where: { id: singleOne.id } })
  console.log('------------ DECREMENT -------------------')
  await Master.decrement('age', { where: { id: singleOne.id } })
  console.log('------------ FIND ONE AFTER DECREMENT -------------------')
  const afterUpdate = await Master.findOne({ where: { id: newData.id } })
  console.log(JSON.stringify(afterUpdate))
  console.log('------------ DELETE ONE -------------------')
  await afterUpdate.destroy()
  console.log('------------ FIND ONE AFTER UPDATE -------------------')
  const afterDestroy = await Master.findById(newData.id)
  console.log(JSON.stringify(afterDestroy))
}

async function useModelBatchSample () {
  const newDatas = []
  const start = Date.now()
  for (let i = 0; i < 10; i++) {
    newDatas.push({
      id: start + i,
      name: '有个人' + i,
      age: 12
    })
  }

  console.log('------------ BULK CREATE -------------------')
  await Master.bulkCreate(newDatas)
  console.log('------------ FIND ALL -------------------')
  const all = await Master.findAll({ where: { id: { [Sequelize.Op.gte]: start } } })
  console.log(JSON.stringify(all))

  console.log('------------ FIND AND COUNT ALL -------------------')
  const countAll = await Master.findAndCountAll({ where: { id: { [Sequelize.Op.gte]: start } } })
  console.log(JSON.stringify(countAll))

  console.log('------------ UPDATE -------------------')
  await Master.update({ name: 'bbb' }, { where: { id: { [Sequelize.Op.gte]: start } } })

  console.log('------------ QUERY USE MODEL AFTER UPDATE -------------------')
  const query1 = await sequelize.query('select * from sequelize_test where id > :start', {
    replacements: { start },
    type: QueryTypes.SELECT,
    model: Master,
    mapToModel: true
  })
  console.log(JSON.stringify(query1))

  console.log('------------ QUERY MAP AFTER UPDATE -------------------')
  const query2 = await sequelize.query('select * from sequelize_test where id > :start', {
    replacements: { start },
    type: QueryTypes.SELECT,
    fieldMap: { created_at: 'createdAt' }
  })
  console.log(JSON.stringify(query2))

  console.log('------------ QUERY RAW AFTER UPDATE -------------------')
  const query3 = await sequelize.query('select * from sequelize_test where id > :start', {
    replacements: { start },
    type: QueryTypes.SELECT,
    raw: true
  })
  console.log(JSON.stringify(query3))
}

async function relationSample () {
  console.log('------------ SAVE RELATION -------------------')
  let start = Date.now()
  const master = await Master.create(
    {
      id: start,
      name: '有个人',
      age: 12,
      details: [
        {
          id: start++,
          parentId: start + 1,
          score: 100
        },
        {
          id: start++,
          parentId: start + 1,
          score: 200
        }
      ]
    },
    {
      include: [{ model: Detail, as: 'details' }]
    }
  )

  console.log('------------ FIND BY ID ONE MANY -------------------')
  const masterFromDB = await Master.findById(master.id, {
    include: [{ model: Detail, as: 'details' }]
  })
  console.log(JSON.stringify(masterFromDB))

  console.log('------------ FIND BY ID MANY ONE -------------------')
  const detailFromDB = await Detail.findById(master.details[0].id, {
    include: [{ model: Master, as: 'master' }]
  })
  console.log(JSON.stringify(detailFromDB))
}

async function useTransactionSample () {
  const newData = {
    id: Date.now(),
    name: '有个人',
    age: 12
  }

  await sequelize.transaction(async t => {
    await Master.create(newData, { transaction: t })
  })

  const o = await Master.findByPk(newData.id)
  console.log(JSON.stringify(o))
}

async function run () {
  // await useModelSingleSample()
  // await useModelBatchSample()
  // await relationSample()
  await useTransactionSample()
}

run()

```