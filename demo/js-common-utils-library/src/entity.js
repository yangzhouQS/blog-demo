const Sequelize = require('@mctech/sequelize-impala')
const { Assert } = require('@mctech/infra-core')
const ErrorCode = require('@mctech/infra-core').ErrorCode
const idGen = require('./common/idGen')
const crypto = require('./common/crypto')
// const { idGen } = require('node-common-utils')

const READ_AT_SNAPSHOT = function () {
  return Object.assign(
    {},
    {
      impala: {
        queryOption: {
          switchs: { kuduReadMode: 'READ_AT_SNAPSHOT' }
        }
      }
    }
  )
}

const inTransaction = function () {
  const cls = Sequelize._cls
  return !!cls.get('transaction')
}

let entities = {}

const entity = (sequelize, model) => {
  let extInfo = {
    entityName: model.name,
    defaultValue: {},
    defaultFn: {},
    defaultEqual: {},
    defaultEqualDest: {},
    updateFn: {},
    props: {},
    isTree: model.fields['parentId'] && model.fields['fullId'] && model.fields['level']
  }
  // 处理数据扩展信息
  for (let prop in model.fields) {
    let propInfo = model.fields[prop]
    let fieldName = prop.replace(/[A-Z]/g, $0 => {
      return `_${$0.toLowerCase()}`
    })
    extInfo.props[prop] = { fieldName, type: propInfo.type.key }
    // 处理默认值
    if (propInfo.defaultValue) {
      extInfo.defaultValue[prop] = 1
    }
    // 处理默认值属性
    if (propInfo.defaultEqual) {
      extInfo.defaultEqualDest[prop] = 1
      if (!extInfo.defaultEqual[propInfo.defaultEqual]) {
        extInfo.defaultEqual[propInfo.defaultEqual] = []
      }
      extInfo.defaultEqual[propInfo.defaultEqual].push(prop)
    }
    // // 处理默认值函数
    if (propInfo.defaultFn) {
      extInfo.defaultFn[prop] = propInfo.defaultFn
    }
    // // 处理更新函数
    if (propInfo.updateFn) {
      extInfo.updateFn[prop] = propInfo.updateFn
    }
  }
  if (model.uniques || model.details || model.duplicateProp) {
    extInfo.constraint = {}
    if (model.uniques) {
      extInfo.constraint.uniques = model.uniques
    }
    if (model.details) {
      extInfo.constraint.details = model.details
    }
    if (model.duplicateProp) {
      extInfo.constraint.duplicateProp = model.duplicateProp
    }
  }

  let result = sequelize.defineModel(model)
  // 给对象添加扩展信息
  result.sequelize = sequelize
  Object.assign(result, extInfo)

  // 继承旧函数
  result.oldFindOne = result.findOne
  result.findOne = findOne
  result.oldFindAll = result.findAll
  result.findAll = findAll
  result.oldFindAndCountAll = result.findAndCountAll
  result.findAndCountAll = findAndCountAll
  result.oldCreate = result.create
  result.create = create
  result.oldBulkCreate = result.bulkCreate
  result.bulkCreate = bulkCreate
  result.oldUpdate = result.update
  result.update = update
  result.oldDestroy = result.destroy
  result.destroy = destroy
  // 添加真正删除的函数
  result.realDestroy = realDestroy

  // 新添加的函数
  result.condition = condition
  // 解析问号传参方式
  result.getCondition = getCondition
  // 解析post传参方式
  result.postCondition = postCondition
  // 李鹏添加（根据配置进行添加修改操作，判断是否存在，存在修改，不存在，添加）
  result.createOrUpdate = createOrUpdate
  // 增加主从同时查询的结构
  result.ylFindOne = ylFindOne
  // 带事务添加
  result.createOrderWithTrans = createOrderWithTrans
  // 带事务修改
  result.updateOrderWithTrans = updateOrderWithTrans
  // 判断表重复数据
  result.queryExistsData = queryExistsData

  result.ylFindAll = ylFindAll
  // 单表的批量添加
  result.ylSingleBulkCreate = ylSingleBulkCreate
  // result.move = move
  // result.duplicate = duplicate
  result.READ_AT_SNAPSHOT = READ_AT_SNAPSHOT

  result.bulkUpdate = bulkUpdate
  // 把自己添加到实体列表中，允许其它实体访问
  entities[model.name] = result
  result.entities = entities

  // 返回当前model
  result.currentModel = currentModel
  // 模型结构
  result.model = model

  // 主从表赋值
  result.setItemVal = setItemVal

  return result
}

/**
 * 格式化query条件 ctx.query或者(ctx.request.body,后续扩展)
 * @param {} options 接收post参数
 */
const condition = function (options) {
  let result = {}
  let { attributes, order, limit, offset } = options
  if (attributes) {
    let arrayAttribute = attributes.split(',')
    for (let i = arrayAttribute.length - 1; i > -1; i--) {
      if (!this.props[arrayAttribute[i]]) {
        arrayAttribute.splice(i, 1)
      }
    }
    result.attributes = arrayAttribute
    delete options.attributes
  }
  if (order) {
    let arrayOrder = order.split(',')
    for (let i = arrayOrder.length - 1; i > -1; i--) {
      arrayOrder[i] = arrayOrder[i].trim()
      if (!this.props[arrayOrder[i].replace('-', '')]) {
        arrayOrder.splice(i, 1)
      }
    }
    result.order = this.sequelize.orderSQL(this.getTableName(), arrayOrder.join(','))
    if (limit && parseInt(limit) > 0) {
      result.page = { limit, offset: offset || 0 }
    }
  }
  delete options.order
  delete options.limit
  delete options.offset
  for (let prop in options) {
    // 去掉不存在的属性
    if (!this.props[prop]) {
      delete options[prop]
    }
  }
  result.where = options
  _validOptions(result, this)
  return result
}

/**
 * 返回options
 * @param {*} options 接收get参数
 */
const getCondition = function (options) {
  let result = {}
  let { attributes, order, limit, offset } = options
  if (attributes) {
    let arrayAttribute = attributes.split(',')
    for (let i = arrayAttribute.length - 1; i > -1; i--) {
      if (!this.props[arrayAttribute[i]]) {
        arrayAttribute.splice(i, 1)
      }
    }
    result.attributes = arrayAttribute
    delete options.attributes
  }
  if (order) {
    let arrayOrder = order.split(',')
    for (let i = arrayOrder.length - 1; i > -1; i--) {
      arrayOrder[i] = arrayOrder[i].trim()
      if (!this.props[arrayOrder[i].replace('-', '')]) {
        arrayOrder.splice(i, 1)
      }
    }
    result.order = this.sequelize.orderSQL(this.getTableName(), arrayOrder.join(','))
  }
  if (offset && parseInt(offset) > 0) {
    result.offset = parseInt(offset)
    result.method = 'findAndCountAll'
  } else {
    result.method = 'findAll'
  }
  if (limit && parseInt(limit) > 0) {
    result.limit = parseInt(limit)
  }
  delete options.order
  delete options.limit
  delete options.offset
  for (let prop in options) {
    // 去掉不存在的属性
    if (!this.props[prop]) {
      delete options[prop]
    }
  }
  result.where = options
  _validOptions(result, this)
  return result
}

/**
 * 返回options
 * @param {*} options 接收post参数
 */
const postCondition = function (options) {
  const CondtionWhere = {}
  options.condtionItems.map((i, index) => {
    if (i.op === 'eq') {
      if (i.relationFieldName) {
        CondtionWhere[Sequelize.Op.or] = [
          { [i.fieldName]: { [Sequelize.Op[i.op]]: i.fieldValue } },
          { [i.relationFieldName]: { [Sequelize.Op[i.op]]: i.fieldValue } }
        ]
      } else {
        CondtionWhere[i.fieldName] = i.fieldValue
      }
    } else {
      if (i.relationFieldName) {
        CondtionWhere[Sequelize.Op.or] = [
          { [i.fieldName]: { [Sequelize.Op[i.op]]: i.fieldValue } },
          { [i.relationFieldName]: { [Sequelize.Op[i.op]]: i.fieldValue } }
        ]
      } else {
        CondtionWhere[i.fieldName] = {
          [Sequelize.Op[i.op]]: i.fieldValue
        }
      }
    }
  })
  if (_isEmpty(options.order)) {
    options.order = [['id']]
  }
  let QueryParams = {
    offset: options.offset,
    limit: options.limit,
    order: options.order,
    attributes: options.attributes,
    where: CondtionWhere
  }
  // isNotReturnCount 默认为undefined
  if (!options.isNotReturnCount) {
    QueryParams.method = 'findAndCountAll'
  } else {
    QueryParams.method = 'findAll'
  }
  // _validOptions(QueryParams.where, this)
  return QueryParams
}

/**
 * 根据where条件查询单条对象
 * @param {*} options 对象条件 { where:{ orgId: orgId }}
 */
const findOne = async function (options) {
  // 修正选项字段内容
  _validOptions(options, this)
  options.where.isRemoved = false
  // 返回结果
  // let result = await this.oldFindOne(options)
  let findOptions = Object.assign({}, options)
  let result = await this.oldFindOne(findOptions)
  result = JSON.parse(JSON.stringify(result))
  return result
}

/**
 * 根据where条件查询单条查询主从关联表 {主表，从表}
 * @param {*} options 对象条件  { where: { id: ctx.params.id }, itemOrder: [['materialId', 'DESC']]} itemOrder 为从表排序
 * @param {*} isComplex 是否为主从对象查询
 */
const ylFindOne = async function (options, isComplex) {
  // 修正选项字段内容
  _validOptions(options, this)
  options.where.isRemoved = false
  let findOptions = Object.assign({}, options)
  // 返回结果
  let result = await this.oldFindOne(findOptions)
  if (result) {
    // 处理细表记录
    if (this.constraint && this.constraint.details) {
      // 循环处理细表记录
      let midResult = {}
      for (let i = 0; i < this.constraint.details.length; i++) {
        let detail = this.constraint.details[i]
        let propName = detail.name + 's'
        // 替换数据
        let where = _detailFilter(result, detail.filter)
        let model = entities[detail.name]

        if (where) {
          where.isRemoved = false
        }
        const itemOrder = options.itemOrder ? options.itemOrder : []
        let items = await model.findAll({ where, order: itemOrder })
        if (items.length > 0) {
          midResult[propName] = items
        } else {
          midResult[propName] = []
        }
        // await _updateVersion(model, currentRecord.orgId)
      }
      midResult[this.entityName] = result
      if (isComplex) {
        midResult['isComplex'] = isComplex
      }
      result = midResult
    }
  }
  result = JSON.parse(JSON.stringify(result))
  return result
}

/**
 * 通过参数对象查询多条数据
 * @param {*} options 对象条件 { where:{ orgId: orgId },limit: 100,offset: 100, order: [ [ 'id' ] ], attributes: ['name','shortName'] }
 */
const findAll = async function (options) {
  // 修正选项字段内容
  _validOptions(options, this)
  // 返回结果
  let findOptions = Object.assign({}, options)
  let result = await this.oldFindAll(findOptions)
  // let result = await this.oldFindAll(options)
  result = JSON.parse(JSON.stringify(result))
  return result
}

/**
 * 根据where条件查询多条对象
 * @param {*} options 对象条件 { where:{ orgId: orgId }}
 */
const ylFindAll = async function (options) {
  // 修正选项字段内容
  _validOptions(options, this)
  let isComplex = false
  // 判断是否是复杂对象，防止传入的字段没有配置
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      isComplex = true
      break
    }
  }
  // 返回结果
  let orderResults = []
  let results = await this.oldFindAll(options)
  results = JSON.parse(JSON.stringify(results))
  if (results) {
    if (results.length) {
      let entityName = this.entityName
      let orderResult = {}
      for (let i = 0; i < results.length; i++) {
        let order = results[i]
        orderResult[entityName] = order
        // 处理细表记录删除信息
        if (this.constraint && this.constraint.details) {
          for (let i = 0; i < this.constraint.details.length; i++) {
            let detail = this.constraint.details[i]
            let propName = detail.name + 's'
            // 替换数据
            let where = _detailFilter(order, detail.filter)
            let model = entities[detail.name]

            let items = await model.findAll({ where })
            if (items.length > 0) {
              orderResult[propName] = items
            } else {
              orderResult[propName] = []
            }
            // await _updateVersion(model, currentRecord.orgId)
          }
        }
        if (isComplex) {
          orderResult['isComplex'] = isComplex
        }
        orderResults.push(orderResult)
      }
    }
  }
  orderResults = JSON.parse(JSON.stringify(orderResults))
  return orderResults
}

/**
 * 返回分页总行数和结果数据
 * @param {*} options 对象条件 { where:{ orgId: orgId }}
 */
const findAndCountAll = async function (options) {
  // 修正选项字段内容
  _validOptions(options, this)
  // 返回结果
  let result = await this.oldFindAndCountAll(options)
  result = JSON.parse(JSON.stringify(result))
  return result
}

/**
 * 添加对象
 * @param {*} values 要添加的对象
 * @param {*} extras 上下文信息ctx.extras
 * @param {*} options 条件对象，添加一般不使用
                 where: 查询数据的条件
                 returnData: 默认为false 表示添加成功后返回数据的id，为true，返回新增的完整数据
                isNotPrimaryQuery: 查询条件是否主键查询，默认值为false，
                会使用options条件额外增加id主键合并联合查询，为true，使用不带id的options查询返回
 */
const create = async function (values, extras, options) {
  const isNotPrimaryQuery = arguments[3]
  const { returnData } = options
  // 修正选项字段内容
  _validOptions(options, this)
  // 数据补充和验证
  await _validData(values, this, extras, options, 'create')
  let result = null
  let queryOptions = {}
  // 添加数据
  await this.oldCreate(values, options)

  if (!isNotPrimaryQuery) {
    queryOptions = Object.assign(queryOptions, { where: { id: values.id } }, options)
  } else {
    queryOptions = Object.assign(queryOptions, options)
  }
  Object.assign(queryOptions, this.READ_AT_SNAPSHOT())
  result = returnData ? await this.findOne(queryOptions) : values
  return result
}

/**
 * 批量添加对象
 * @param {*} datas 数组对象
 * @param {*} extras 上下文信息ctx.extras
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id }, returnData: false }
                  reservedProps:数组对象保留字段值，方法内部不会重新给值
 */
const bulkCreate = async function (datas, extras, options) {
  let reservedProps = arguments[3] || options.reservedProps
  if (datas.length === 0) {
    return []
  }
  const newIds = await idGen(datas.length)
  // 修正选项字段内容
  const { returnData } = options
  if (!reservedProps) {
    reservedProps = new Set()
  } else {
    reservedProps = new Set(reservedProps)
  }
  _validOptions(options, this)
  for (let i = 0; i < datas.length; i++) {
    // 数据补充和验证
    datas[i].id = datas[i].id || parseInt(newIds[i])
    await _validData(datas[i], this, extras, Object.assign({}, options), 'create', reservedProps, true)
  }
  const ids = []
  datas.forEach(data => {
    ids.push(data.id)
  })
  // 执行函数
  await this.oldBulkCreate(datas, options)
  // 返回添加的结果
  const result = returnData ? await this.findAll({ where: { id: { [Sequelize.Op.in]: ids } } }) : ids
  return result
}

/**
 * 单表的批量添加
 * @param {*} datas 数组对象
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
 */
const ylSingleBulkCreate = async function (datas, extras, options) {
  let deleteProps = arguments[3]
  if (datas.length === 0) {
    return {}
  }
  // 修正选项字段内容
  // _validOptions(options, this)
  let ignoreIndex = []
  let updateDatas = []
  let ignoreId = -1
  for (let i = 0; i < datas.length; i++) {
    // 数据补充和验证
    let valid = await _validData(datas[i], this, extras, options, 'create')
    if (valid > 1) {
      ignoreIndex.push(i)
      if (ignoreId === -1) {
        ignoreId = valid
      }
    }
  }
  if (ignoreIndex.length > 0) {
    for (let i = ignoreIndex.length - 1; i > -1; i--) {
      updateDatas.push(datas.splice(ignoreIndex[i], 1))
    }
  }

  if (updateDatas.length > 0) {
    for (let i = 0; i < updateDatas.length; i++) {
      let currItem = updateDatas[i]

      let currOptions = { where: {} }
      if (deleteProps) {
        deleteProps.forEach(prop => {
          currOptions.where[prop] = currItem[prop]
        })
      }
      let updateOptions = Object.assign({}, currOptions, { where: { id: currItem.id } })

      if (deleteProps) {
        deleteProps.forEach(prop => {
          delete currItem[prop]
        })
      }
      delete currItem.id

      await this.oldUpdate(currItem, updateOptions)
    }
  }
  let result
  if (datas.length > 0) {
    await this.oldBulkCreate(datas, options)
    // 更新版本
    // await _updateVersion(this, datas[datas.length - 1].orgId)
    // 返回添加的结果
    result = await this.findOne({ where: { id: datas[datas.length - 1].id } })
  } else {
    result = {}
  }
  return result
}

/**
 * 批量修改
 * @param {*} values 要修改的数组对象
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id },returnData: false ,reservedProps:[],ignoreUnique:false }//returnData是否返回数据，是返回对象数组，否则返回主键id
  第四个参数 reservedProps数组对象 保留字段值，不进行更新的字段列表
  第五个参数:ignoreUnique是否忽略重复判断，常用信息的修改一般使用忽略重复判断
 */
const bulkUpdate = async function (values, extras, options) {
  options = Object(options)
  let reservedProps = arguments[3] || options.reservedProps
  const ignoreUnique = arguments[4] || options.ignoreUnique
  const { returnData } = options
  if (values.length === 0) {
    return []
  }
  let result = null
  // 不需要更新的字段
  const ignoreFields = new Set(['id', 'orgId', 'creatorId', 'creatorName', 'createdAt', 'version', 'modifierId', 'modifierName', 'updatedAt'])
  // 获取要更新的字段
  const mapFields = {}
  const reviserId = extras.userId // 修改
  const reviser = extras.userName ? crypto.decrypt(extras.userName) : '无名'
  const version = await idGen()
  Object.keys(values[0]).forEach(item => {
    if (!ignoreFields.has(item) && this.props[item]) {
      mapFields[item] = []
    }
  })
  const ids = []
  if (!reservedProps) {
    reservedProps = new Set()
  } else {
    reservedProps = new Set(reservedProps)
  }
  reservedProps.add('version')
  reservedProps.add('modifierId')
  reservedProps.add('modifierName')
  reservedProps.add('updatedAt')
  let sql = `UPDATE ${this.getTableName()} SET `
  for (let i = 0; i < values.length; i++) {
    if (values[i].isRemoved === false) {
      delete values[i].isRemoved
      delete mapFields['isRemoved']
    }
    // 数据补充和验证
    await _validData(values[i], this, extras, Object.assign({}, options, { where: { id: values[i].id } }), 'update', reservedProps, ignoreUnique)
    ids.push(values[i].id)
    for (let prop in values[i]) {
      if (!ignoreFields.has(prop) && !mapFields[prop] && this.props[prop]) {
        // 后补的参数，如给了个 parentId，后补上 fullId 和 level
        mapFields[prop] = []
      }
      if (values[i][prop] !== undefined && mapFields[prop]) {
        let value = this.props[prop].type === 'DATE' ? `'${_formatDate(new Date(values[i][prop]))}'` : this.props[prop].type === 'STRING' ? _formatString(values[i][prop]) : values[i][prop]
        // mapFields[prop].push(`WHEN ${values[i].id} THEN ${value}`)
        mapFields[prop].push(`WHEN ${values[i].id} THEN ${this.props[prop].type === 'ABSTRACT' ? `__fn.encrypt(${_formatString(values[i][prop])})` : value}`)
      }
    }
  }
  for (let prop in mapFields) {
    sql += `${this.props[prop].fieldName}=CASE id ${mapFields[prop].join(' ')} ELSE ${this.props[prop].fieldName} END, `
  }
  sql += `version=${version}, modifier_id=${reviserId}, modifier_name='${reviser}', updated_at=NOW() WHERE id IN (${ids.join(', ')})`
  await this.sequelize.query(sql)
  // 返回最后记录的更新结果
  result = returnData ? await this.findOne({ where: { id: values[values.length - 1].id } }) : values[values.length - 1].id
  // 更新版本
  let orgId = values[values.length - 1].orgId
  if (!orgId && options.where) {
    orgId = options.where.orgId || 0
  }
  return result
}

/**
 * 修改
 * @param {*} values 要修改的对象
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
  第四个参数 数组对象，形式为[ 'name', 'orgId' ],主键id除外,sequelize中进行修改操作时传入的对象不允许存在主键信息，所以在更新前要对主键列进行删除，默认使用id主键，如果遇到多个字段信息不需要进行更新，就进行删除属性操作
  第五个参数:保留字段值，不进行更新的字段列表['name', 'orgId']
  第六个参数:是否忽略重复判断，常用信息的修改一般使用忽略重复判断
 */
const update = async function (values, extras, options) {
  const deleteProps = arguments[3]
  const reservedProps = arguments[4]
  const ignoreUnique = arguments[5]
  // 修正选项字段内容
  _validOptions(options, this)
  let result = null
  if (Array.isArray(values)) {

  } else {
    // 数据补充和验证
    values = Object.assign({}, options.where, values)
    // let valid = await _validData(values, this, options, 'update', reservedProps)
    await _validData(values, this, extras, options, 'update', reservedProps, ignoreUnique)
    if (!values.id) {
      const records = await this.findOne(options)
      if (records) {
        values.id = records.id
      }
    }
    // 主键不能更新 李鹏备注(对不需要更新的字段进行删除)
    if (deleteProps) {
      deleteProps.forEach(prop => {
        delete values[prop]
      })
    }
    // 默认删除主键属性
    delete values.id
    if (values.isRemoved === false) {
      delete values.isRemoved
    }
    // 判断是否变化了 parentId
    let oldFullInfo = null
    if (values.parentId) {
      const oldData = await this.findOne(options)
      if (oldData.parentId !== values.parentId || (oldData.fullName && oldData.name !== values.name)) {
        oldFullInfo = {
          fullId: oldData.fullId,
          level: oldData.level
        }
        if (oldData.fullName) {
          oldFullInfo.fullName = oldData.fullName
        }
      }
    }

    const execute = async entity => {
      await entity.oldUpdate(values, options)
      // 父节点数据变化，更新子节点
      // if (oldFullInfo) {
      //   let version = await idGen()
      //   await entity.sequelize.query(`
      //     UPDATE
      //       ${entity.getTableName()}
      //     SET
      //       full_id=REPLACE(full_id, '${oldFullInfo.fullId}|', '${values.fullId}|'),
      //       full_id_ex=REPLACE(CONCAT('$mctech$', full_id_ex), '$mctech$|${oldFullInfo.fullId}|', '|${values.fullId}|'),
      //       ${oldFullInfo.fullName ? `full_name=REPLACE(CONCAT('$mctech$', full_name), '$mctech$${oldFullInfo.fullName}|', '${values.fullName}|'), ` : ''}
      //       level=level+${values.level}-${oldFullInfo.level},
      //       reviser=${values.reviser},
      //       version=${version},
      //       updated_at=NOW()
      //     WHERE
      //       full_id LIKE '${oldFullInfo.fullId}|%'`)
      // }
      // 返回更新的结果
      result = await entity.findOne(options)
    }
    // 事务支持
    if (inTransaction()) { // ignoreTransaction
      await execute(this)
    } else {
      const me = this
      await this.sequelize.transaction(async () => {
        await execute(me)
      })
    }
  }
  return result
}

/**
 * 修改主从表带事务（从表不存在添加，存在修改）
 * @param {*} values 主从关系的数组对象
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options 一般使用{ where: { id: ctx.params.id }, returnData: false } //returnData是否返回数据，是返回对象数组，否则返回主键id
 *  数组 修改的是时候要删除主键 ['id','orderId','orgId']
 */
const updateOrderWithTrans = async function (values, extras, options) {
  const deleteProps = arguments[3]
  // 修正选项字段内容
  if (!options) {
    options = {}
  }
  _validOptions(options, this)
  let value = null
  // 判断是否是复杂对象，防止传入的字段没有配置
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      const detail = this.constraint.details[i]
      // 替换数据
      // let where = _detailFilter(currentRecord, detail.filter)
      const propName = detail.name + 's'
      const entitys = values[propName]
      if (entitys) {
        values.isComplex = true
        break
      }
    }
  }
  // 数据补充和验证
  if (values.isComplex) {
    value = values[this.entityName]
  } else {
    value = values
  }
  let isUnique = true
  let uniqueErr = ''
  // 唯一性检测
  if (this.constraint && this.constraint.uniques) {
    const uniques = this.constraint.uniques
    // 构造where条件
    for (let i = 0; i < uniques.length; i++) {
      const uniqueProps = uniques[i].props
      uniqueErr += '[' + uniques[i].memo + ']'
      const uniqueOptions = { where: {} }
      for (let j = 0; j < uniqueProps.length; j++) {
        uniqueOptions.where[uniqueProps[j]] = value[uniqueProps[j]]
      }
      uniqueOptions.where.id = { [Sequelize.Op.ne]: options.where.id }
      const uniqueResult = await this.findOne(uniqueOptions)
      if (uniqueResult && uniques[i].ignoreUnique) {
        isUnique = false
      } else if (!uniqueResult) {
        isUnique = true
      } else {
        isUnique = false
        return { success: false, message: uniqueErr + '不能重复！' }
      }
    }
  }
  if (isUnique) {
    // 判断修改数据是否存在
    const updateeExists = await this.findOne({ where: options.where })
    if (updateeExists) { // 存在修改
      // 主表设置默认值
      await _validData(value, this, extras, options, 'update', null, true)
      value.id = updateeExists.id
      const updateObj = Object.assign({}, updateeExists, value)
      if (deleteProps) {
        deleteProps.forEach(prop => {
          delete updateObj[prop]
        })
      }
      delete updateObj.id

      const insertItem = {} // 添加和修改分开
      const updateItem = {}
      // 处理明细表数据
      if (this.constraint && this.constraint.details) {
        for (let i = 0; i < this.constraint.details.length; i++) {
          const detail = this.constraint.details[i]
          const propName = detail.name + 's'
          const relationFields = detail.relationFields
          const detailValue = values[propName]
          // const detailEntity = entities[detail.name]
          insertItem[propName] = {}
          updateItem[propName] = {}
          if (detailValue) {
            // 循环明细表 给明细表赋值
            const insertArr = []
            const updateArr = []
            for (let j = 0; j < detailValue.length; j++) {
              if (detailValue[j].id > 0) {
                // await _validData(detailValue[j], detailEntity, extras, options, 'update',null, true)
                updateArr.push(detailValue[j])
              } else {
                // await _validData(detailValue[j], detailEntity, extras, options, 'create',null, true)
                insertArr.push(detailValue[j])
              }
              if (relationFields && relationFields.length > 0) {
                relationFields.forEach(element => {
                  detailValue[j][element.subField] = value[element.masterField]
                })
              }
            }
            insertItem[propName].insertArr = insertArr
            updateItem[propName].updateArr = updateArr
          }
        }
      }
      const result = await this.sequelize.transaction(async (t) => {
        // 修改主表
        await this.oldUpdate(updateObj, { where: options.where })
        // 修改从表
        if (this.constraint && this.constraint.details) {
          for (let i = 0; i < this.constraint.details.length; i++) {
            const detail = this.constraint.details[i]
            const propName = detail.name + 's'
            const detailEntity = entities[detail.name]
            // 如果传进来的对象里没有该从表则不更新
            if (values[propName]) {
              // 更新从表信息
              if (updateItem[propName].updateArr.length > 0) {
                await detailEntity.bulkUpdate(updateItem[propName].updateArr, extras, { ignoreUnique: deleteProps })
              }
              // 插入新的从表信息
              if (insertItem[propName].insertArr.length > 0) {
                await detailEntity.bulkCreate(insertItem[propName].insertArr, extras)
              }
            }
          }
        }
        return { success: true }
      }).catch(err => {
        return err
      })
      if (result.success) {
        const resultobj = options.returnData ? await this.ylFindOne({ where: { id: value.id } }) : { [this.entityName]: { id: values[this.entityName].id } }
        resultobj.success = true
        return resultobj
      } else {
        return { success: false, message: result.message }
      }
    } else { // 不存在
      return { success: false, message: '数据不存在，不能修改！' }
    }
  } else {
    return { success: false, message: uniqueErr + '不能重复！' }
  }
}

/**
 * 添加主从表带事务
 * @param {*} values 要添加的对象 { mReceiveOrder:{xx}, mReceiveOrderItems:[{ xx},{ xx}],"isComplex": true}复杂对象设置这个值为true，别的对象默认为false
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options  条件对象，一般使用{ where: { id: ctx.params.id }, returnData: false } //returnData是否返回数据，是返回对象数组，否则返回主键id
 */
const createOrderWithTrans = async function (values, extras, options) {
  // let deleteProps = arguments[3]
  // 修正选项字段内容
  if (!options) {
    options = {}
  }
  _validOptions(options, this)
  let value = null
  // 判断是否是复杂对象，防止传入的字段没有配置
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      const detail = this.constraint.details[i]
      // 替换数据
      // let where = _detailFilter(currentRecord, detail.filter)
      const propName = detail.name + 's'
      const entitys = values[propName]
      if (entitys) {
        values.isComplex = true
        break
      }
    }
  }
  // 数据补充和验证
  if (values.isComplex) {
    value = values[this.entityName]
  } else {
    value = values
  }
  let isUnique = true
  let uniqueErr = ''
  // 唯一性检测
  if (this.constraint && this.constraint.uniques) {
    const uniques = this.constraint.uniques
    // 构造where条件
    for (let i = 0; i < uniques.length; i++) {
      const uniqueProps = uniques[i].props
      uniqueErr += '[' + uniques[i].memo + ']'
      const uniqueOptions = { where: {} }
      for (let j = 0; j < uniqueProps.length; j++) {
        uniqueOptions.where[uniqueProps[j]] = value[uniqueProps[j]]
      }
      const uniqueResult = await this.findOne(uniqueOptions)
      if (uniqueResult && uniques[i].ignoreUnique) {
        isUnique = false
      } else if (!uniqueResult) {
        isUnique = true
      } else {
        isUnique = false
        return { success: false, message: uniqueErr + '不能重复！' }
      }
    }
  }
  if (isUnique) {
    // 不存在添加
    if (!value.id || value.id === 0 || value.id === null) {
      // 主表设置默认值
      await _validData(value, this, extras, options, 'create', null, true)
      // 处理明细表
      if (this.constraint && this.constraint.details) {
        for (let i = 0; i < this.constraint.details.length; i++) {
          const detail = this.constraint.details[i]
          const propName = detail.name + 's'
          const relationFields = detail.relationFields
          const detailValue = values[propName]
          // const detailEntity = entities[detail.name]
          if (detailValue) {
            // 循环明细表 给明细表赋值
            for (let j = 0; j < detailValue.length; j++) {
              // 配置中的默认值赋给从表
              // await _validData(detailValue[j], detailEntity, extras, options, 'create', null, true)
              if (relationFields && relationFields.length > 0) {
                relationFields.forEach(element => {
                  detailValue[j][element.subField] = value[element.masterField]
                })
              }
            }
          }
        }
      }
      const result = await this.sequelize.transaction(async (t) => {
        // 添加主表
        await this.oldCreate(value, options)
        // 添加从表
        if (this.constraint && this.constraint.details) {
          for (let i = 0; i < this.constraint.details.length; i++) {
            const detail = this.constraint.details[i]
            const detailEntity = entities[detail.name]
            const propName = detail.name + 's'
            // 如果传进来的对象里没有该从表则不更新
            if (values[propName]) {
              if (values[propName].length > 0) {
                await detailEntity.bulkCreate(values[propName], extras)
              }
            }
          }
        }
        return { success: true }
      }).catch(err => {
        return err
      })
      if (result.success) {
        const resultobj = options.returnData ? await this.ylFindOne({ where: { id: value.id } }) : { [this.entityName]: { id: values[this.entityName].id } }
        resultobj.success = true
        return resultobj
      } else {
        return { success: false, message: result.message }
      }
    } else {
      return { success: false, message: '该条数据已存在！' }
    }
  } else {
    return { success: false, message: uniqueErr + '不能重复！' }
  }
}

/**
 * 添加或修改
 * @param {*} values 要添加的对象 { mReceiveOrder:{xx}, mReceiveOrderItems:[{ xx},{ xx}],"isComplex": true}复杂对象设置这个值为true，别的对象默认为false
 * @param {*} extras 上下文信息 ctx.extras
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
 * 第四个参数 数组 修改的是时候要删除主键 ['id','orderId','orgId']
 * 第五个参数 查询条件是否双主键查询，默认值为false
 */
const createOrUpdate = async function (values, extras, options) {
  const deleteProps = arguments[3]
  const isNotPrimaryQuery = arguments[4]
  // 修正选项字段内容
  _validOptions(options, this)
  let value = null
  // 判断是否是复杂对象，防止传入的字段没有配置
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      const detail = this.constraint.details[i]
      // 替换数据
      // let where = _detailFilter(currentRecord, detail.filter)
      const propName = detail.name + 's'
      const entitys = values[propName]
      if (entitys) {
        values.isComplex = true
        break
      }
    }
  }
  // 数据补充和验证
  if (values.isComplex) {
    value = values[this.entityName]
  } else {
    value = values
  }
  const valid = await _validData(value, this, extras, options, 'create')
  let result = null
  let queryOptions = {}

  // 不存在添加
  if (valid === 1) {
    // 添加数据
    await this.oldCreate(value, options)
    if (!isNotPrimaryQuery) {
      queryOptions = Object.assign(queryOptions, { where: { id: value.id } }, options)
    } else {
      queryOptions = Object.assign(queryOptions, options)
    }
    // 返回添加的结果 李鹏备注(双主键情况考虑)
    // result = await this.findOne(queryOptions)
  } else { // 存在，修改
    if (!isNotPrimaryQuery) {
      queryOptions = Object.assign(queryOptions, { where: { id: valid } }, options)
    } else {
      queryOptions = Object.assign(queryOptions, options)
    }
    const updateeExists = await this.findOne(queryOptions)
    value.id = updateeExists.id
    const updateObj = Object.assign({}, updateeExists, value)
    if (deleteProps) {
      deleteProps.forEach(prop => {
        delete updateObj[prop]
      })
    }
    delete updateObj.id
    // let optionsWhere = { where: { id: result.id } }
    // Object.assign(options, optionsWhere)
    // value = await this.update(updateObj, extras, queryOptions, deleteProps, null)
    await this.oldUpdate(updateObj, queryOptions)
  }
  // 处理细表表数据
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      const detail = this.constraint.details[i]
      // 替换数据
      // let where = _detailFilter(currentRecord, detail.filter)
      const propName = detail.name + 's'
      const model = entities[detail.name]
      const entitys = values[propName]
      const relationFields = detail.relationFields
      if (entitys) {
        for (let i = 0; i < entitys.length; i++) {
          const entity = entitys[i]
          if (relationFields && relationFields.length > 0) {
            relationFields.forEach(item => {
              entity[item.subField] = value[item.masterField]
            })
          }
          await model.createOrUpdate(entity, extras, null, deleteProps)
        }
      }
    }
  }
  result = await this.ylFindOne(queryOptions, values.isComplex)
  return result
}

/**
 * 主从表赋值
 * @param {*} values  要插入对象
 */
const setItemVal = function (values) {
  // 处理细表表数据
  const value = values[this.entityName]
  if (this.constraint && this.constraint.details) {
    // 循环处理细表记录删除信息
    for (let i = 0; i < this.constraint.details.length; i++) {
      let detail = this.constraint.details[i]
      let propName = detail.name + 's'
      let model = entities[detail.name]
      let entitys = values[propName]
      let relationFields = detail.relationFields
      if (entitys) {
        for (let i = 0; i < entitys.length; i++) {
          let entity = entitys[i]
          if (relationFields && relationFields.length > 0) {
            relationFields.forEach(item => {
              entity[item.subField] = value[item.masterField]
            })
          }
        }
      }
    }
  }
  return values
}

/**
 * 删除操作，默认为更新isRemoved字段值
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
 */
const destroy = async function (options) {
  const extras = arguments[1]
  // let ignoreTransaction = arguments[2]
  // 修正选项字段内容
  _validOptions(options, this)
  // 根据主键查询原始记录
  options.where.isRemoved = false
  // 根据主键查询原始记录
  const currentRecord = await this.findOne(options)
  if (!currentRecord || currentRecord.isRemoved) {
    // 数据可能已被其它用户删除
    return
  }
  delete options.where.isRemoved
  let result
  const execute = async entity => {
    // 处理细表记录删除信息
    if (this.constraint && this.constraint.details) {
      // 循环处理细表记录删除信息
      for (let i = 0; i < this.constraint.details.length; i++) {
        const detail = this.constraint.details[i]
        // 替换数据
        const where = _detailFilter(currentRecord, detail.filter)
        const model = entities[detail.name]
        const data = { isRemoved: true, reviser: extras.userId, version: await idGen() }
        if (model.props['isCascadeRemoved'] && detail.filter.indexOf('like') > -1 && detail.filter.indexOf('fullId') > -1) {
          // 设置级联删除标记
          await model.sequelize.query(`UPDATE ${model.getTableName()} SET is_cascade_removed=!is_removed WHERE full_id LIKE '${currentRecord.fullId}|%'`)
        }
        await model.oldUpdate(data, { where })
        // await _updateVersion(model, currentRecord.orgId)
      }
    }
    // 数据补充和验证
    const values = { isRemoved: true, reviser: extras.userId }
    if (this.props['isCascadeRemoved'] && currentRecord.parentId === -1) {
      values.isCascadeRemoved = true
    }
    // 返回添加的结果
    result = await entity.update(values, extras, options)
  }
  // 事务支持
  if (inTransaction()) {
    await execute(this)
  } else {
    const me = this
    await this.sequelize.transaction(async () => {
      await execute(me)
    })
  }
  return result
}

/**
 * 删除操作，真正从数据库删除
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
 */
const realDestroy = async function (options) {
  // let extras = arguments[1]
  // let ignoreTransaction = arguments[2]
  // 修正选项字段内容
  _validOptions(options, this)
  // 根据主键查询原始记录
  const currentRecord = await this.findOne(options)
  if (!currentRecord || currentRecord.isRemoved) {
    // 数据可能已被其它用户删除
    return
  }
  const execute = async entity => {
    // 处理细表记录删除信息
    if (this.constraint && this.constraint.details) {
      // 循环处理细表记录删除信息
      for (let i = 0; i < this.constraint.details.length; i++) {
        const detail = this.constraint.details[i]
        // 替换数据
        const where = _detailFilter(currentRecord, detail.filter)
        const model = entities[detail.name]
        await model.oldDestroy({ where })
        // await _updateVersion(model, currentRecord.orgId)
      }
    }
    // 返回添加的结果
    await this.oldDestroy(options)
  }
  // 事务支持
  if (inTransaction()) {
    await execute(this)
  } else {
    const me = this
    await this.sequelize.transaction(async () => {
      await execute(me)
    })
  }
}
/**
 * 查询重复数据 返回：notExistData 不存在的数据 existsData 存在的数据 queryData 指定查询列的数据
 * @param {*} dataList 数组：里面有存在和不存在的数据
 * @param {*} columns targetColumns 目标表数据比较列, sourceColumns 数据查询比较列,  
 *                    queryColumns 如果要查询指定列的查询列名,ignoreColumns 不作为条件列
 * @param {*} whereString 查询条件
 * @param {*} options 条件对象，一般使用{ where: { id: ctx.params.id } }
 */
const queryExistsData = async function (dataList, columns, whereString, options) {
  let { targetColumns, sourceColumns, queryColumns, ignoreColumns } = columns
  if (!sourceColumns) {
    sourceColumns = targetColumns
  }
  if (!whereString) {
    whereString = ''
  }
  if (!ignoreColumns) {
    ignoreColumns = {}
  }
  // datalist去重复
  const notRepeatData = []
  const notRepeatObj = {}
  for (let i = 0; i < dataList.length; i++) {
    // 判断是否存在
    let rightStr = ''
    for (let k = 0; k < sourceColumns.length; k++) {
      if (!ignoreColumns[sourceColumns[k]]) {
        rightStr += String(dataList[i][sourceColumns[k]]) + '|'
      }
    }
    if (!notRepeatObj[rightStr]) {
      notRepeatData.push(dataList[i])
      notRepeatObj[rightStr] = true
    }
  }
  // 列去重复
  targetColumns = Array.from(new Set(targetColumns))
  sourceColumns = Array.from(new Set(sourceColumns))
  const notExistData = []
  const existsData = []
  let queryData = []
  if (targetColumns.length === sourceColumns.length) {
    // 构造sql
    let asql = ``
    let onsql = ``
    for (let i = 0; i < targetColumns.length; i++) {
      asql += ' a.' + this.props[targetColumns[i]].fieldName + ','
      if (!ignoreColumns[targetColumns[i]]) {
        onsql += ' and a.' + this.props[targetColumns[i]].fieldName + ' = b.' + columnToLower(sourceColumns[i])
      }
    }
    // 判断是不是存在需要指定查询的列
    let aquerysql = `,`
    if (queryColumns && queryColumns.length > 0) {
      for (let i = 0; i < queryColumns.length; i++) {
        aquerysql += ' a.' + this.props[queryColumns[i]].fieldName + ','
      }
    }
    let bsql = ``
    for (let i = 0; i < notRepeatData.length; i++) {
      bsql += `(`
      for (let j = 0; j < sourceColumns.length; j++) {
        const valueStr = constructValue(notRepeatData[i][sourceColumns[j]])
        let columnsStr = ''
        if (i === 0) {
          columnsStr = columnToLower(sourceColumns[j])
        }
        bsql += `${valueStr} ${columnsStr},`
      }
      bsql = bsql.length > 0 ? bsql.substr(0, bsql.length - 1) : ''
      bsql += `),`
    }
    bsql = bsql.length > 0 ? bsql.substr(0, bsql.length - 1) : ''
    asql = asql.length > 0 ? asql.substr(0, asql.length - 1) : ''
    aquerysql = aquerysql.length > 0 ? aquerysql.substr(0, aquerysql.length - 1) : ''
    // 执行sql
    if (asql.length > 0 && bsql.length > 0 && onsql.length > 0) {
      const sql = `select ${asql + aquerysql} from ${this.getTableName()} a inner join (values ${bsql} ) b on 1=1 ${onsql} ${whereString}`
      const existInfo = await this.sequelize.select(sql, options)
      if (existInfo.length) {
        for (let i = 0; i < dataList.length; i++) {
          const obj = dataList[i]
          let isExists = false
          for (let j = 0; j < existInfo.length; j++) {
            // 判断是否存在
            let leftStr = ''
            let rightStr = ''
            for (let k = 0; k < targetColumns.length; k++) {
              if (!ignoreColumns[targetColumns[k]]) {
                leftStr += String(existInfo[j][targetColumns[k]]) + '|'
              }
              if (!ignoreColumns[sourceColumns[k]]) {
                rightStr += String(obj[sourceColumns[k]]) + '|'
              }
            }
            if (leftStr === rightStr) {
              isExists = true
              break
            }
          }
          // 不存在push
          if (!isExists) {
            notExistData.push(dataList[i])
          } else {
            existsData.push(dataList[i])
          }
        }
      } else {
        notExistData.push(...dataList)
      }
      queryData = existInfo
    }
  }
  return { notExistData, existsData, queryData }
}

// 验证参数对象，对类型进行处理，
// 例如：问号传参中整数值接受默认为字符串，需要转换成数字
// 日期值进行格式化
// 浮点数进行字符串转换浮点
const _validOptions = function (options, entity) {
  if (!options) {
    return
  }
  for (let prop in options.where) {
    if (entity.props[prop] && typeof options.where[prop] === 'string' && entity.props[prop].type !== 'STRING') {
      if (entity.props[prop].type === 'DATE') {
        options.where[prop] = _formatDate(options.where[prop])
        options.where[prop] = options.where[prop] ? `${options.where[prop]}` : null
      } else if (entity.props[prop].type === 'BOOLEAN') {
        options.where[prop] = options.where[prop] === 'null' ? null : options.where[prop] === 'true'
      } else if (entity.props[prop].type === 'DOUBLE PRECISION') {
        options.where[prop] = parseFloat(options.where[prop])
      } else if (entity.props[prop].type !== 'ABSTRACT') {
        // 应该就剩下整数了
        // if (entity.props[prop].type === 'BIGINT' || entity.props[prop].type === 'INTEGER') {
        options.where[prop] = parseInt(options.where[prop])
      }
    }
  }
}

const _formatDate = date => {
  date = date || null
  if (date === null) {
    return null
  }
  date = new Date(date)
  var match = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  let result = 'yyyy-MM-dd hh:mm:ss'
  result = result.replace('yyyy', date.getFullYear() + '')
  for (let key in match) {
    if (new RegExp('(' + key + ')').test(result)) {
      result = result.replace(RegExp.$1, ('00' + match[key]).substr(('' + match[key]).length))
    }
  }
  return result
}

const _isEmpty = obj => {
  return obj === undefined || obj === null
}

// 对添加和修改时传进来的参数实体对象的默认值，默认相等字段值，保留值，更新值进行默认赋值处理
// 参数说明：values:添加或者修改传进来的对象
// entity:对应的模型实体对象
// options:添加或者修改的条件参数对象
// operate: create或者update
// reservedProps:保留字段列表,值不进行处理
// ignoreUnique:是否忽略唯一性判断
const _validData = async function (values, entity, extras, options, operate, reservedProps, ignoreUnique) {
  // console.log({ values, options, operate, reservedProps, ignoreUnique })
  // 添加数据填充
  if (operate === 'create') {
    // 添加时设置默认值
    for (let prop in entity.defaultFn) {
      if (_isEmpty(values[prop])) {
        values[prop] = await _fieldValue[entity.defaultFn[prop]](values, entity, extras)
      }
    }
    // 添加时设置默认值(对应默认相等字段值)
    for (let prop in entity.defaultEqual) {
      entity.defaultEqual[prop].forEach(item => {
        if (_isEmpty(values[item])) {
          values[item] = values[prop]
        }
      })
    }
    // 设置更新值，有默认相等字段或默认值的时候在添加时忽略更新值
    for (let prop in entity.updateFn) {
      if ((!reservedProps || !reservedProps.has(prop)) && !entity.defaultEqualDest[prop] && !entity.defaultValue[prop]) {
        values[prop] = await _fieldValue[entity.updateFn[prop]](values, entity, extras)
      }
    }
  } else {
    // 删除和修改都是对数据进行修改
    for (let prop in entity.updateFn) {
      if (reservedProps && reservedProps.has(prop)) {
        continue
      }
      // 修改时有fullId字段或者level字段，但是没有定义parentId字段，则对fullId或者level字段不进行默认赋值
      if ((prop === 'fullId' || prop === 'level') && !values.parentId) {
        continue
      }
      if (values.hasOwnProperty(prop)) {
        values[prop] = await _fieldValue[entity.updateFn[prop]](values, entity, extras)
      }
    }
  }
  // 唯一性检测
  if (!ignoreUnique && (operate === 'create' || operate === 'update')) {
    if (entity.constraint && entity.constraint.uniques) {
      for (let i = 0; i < entity.constraint.uniques.length; i++) {
        let uniqueInfo = entity.constraint.uniques[i]
        let needCheck = !_isEmpty(values[uniqueInfo.props[uniqueInfo.props.length - 1]])
        if (uniqueInfo.all) {
          uniqueInfo.props.forEach(item => {
            // 有一个不为空就检测
            if (!_isEmpty(values[item])) {
              needCheck = true
            }
          })
        }
        if (!needCheck) {
          continue
        }
        let uniqueDatas = { isRemoved: false }
        // 修改时，判断重复忽略自己
        if (options && options.where) {
          uniqueDatas.id = { [Sequelize.Op.ne]: options.where.id }
        }
        let getFieldValue = []
        // 判断重复判断的字段是否有值
        uniqueInfo.props.forEach(item => {
          if (values[item] === undefined) {
            getFieldValue.push(item)
          } else {
            uniqueDatas[item] = values[item]
          }
        })
        if (getFieldValue.length > 0) {
          let record = null
          // 获取未设置的检测值
          if (options && options.where) {
            record = await entity.findOne(options)
          } else {
            let currOptions = { where: { id: values.id } }
            record = await entity.findOne(currOptions)
          }
          if (record) {
            getFieldValue.forEach(item => {
              uniqueDatas[item] = record[item]
            })
          } else {
            // 用来重复判断的字段没有值,一般不会出现这种情况
          }
        }
        // 获取验证结果
        let findRecord = await entity.findOne({ where: uniqueDatas })
        // 重复验证（不重复的情况下）
        if (findRecord === null) {
          // 修改情况
          if (options && options.where) {
            let record = await entity.findOne(options)
            if (record) {
              return record.id
            }
          }
        } else {
          // 重复情况下，忽略重复验证, 常用信息修改维护时，需要设置ignoreUnique为true
          if (findRecord && uniqueInfo.ignoreUnique) {
            // 返回重复判断数据
            return findRecord.id
          }
        }
        Assert.mustEmpty(findRecord, new ErrorCode('must_unique', '{0}不能重复'), uniqueInfo.memo)
      }
    } else {
      // 不进行重复判断情况下，进行修改操作时,判断对象是否存在
      // else 不进行重复判断的情况下，进行添加操作时,或者是从表进行修改时
      if (options && options.where) {
        let uniqueDatas = options
        uniqueDatas.where.isRemoved = false
        // 获取验证结果
        let findRecord = await entity.findOne(uniqueDatas)
        if (findRecord) {
          // 存在，返回此对象
          return findRecord.id
        }
      } else {
        let currOptions = { where: { id: values.id } }
        currOptions.where.isRemoved = false
        let findRecord = await entity.findOne(currOptions)
        if (findRecord) {
          // 该数据需要忽略
          return findRecord.id
        }
      }
    }
  }
  return 1
}

const _detailFilter = function (values, filter) {
  let result = filter
  for (let prop in values) {
    let partten = `#${prop}#`
    result = result.replace(new RegExp(partten, 'g'), values[prop])
  }
  result = JSON.parse(result)
  // 处理特殊标记
  for (let key in result) {
    // 处理 like
    if (result[key].like) {
      result[key][Sequelize.Op.like] = result[key].like
      delete result[key].like
    }
    // 处理 in
    if (result[key].in) {
      result[key][Sequelize.Op.in] = Sequelize.literal(`(${result[key].in})`)
      delete result[key].in
    }
  }
  return result
}
// 数据转换为 SQL 内容格式
const _formatString = value => {
  if (value === null) {
    return null
  }
  const ESCAPE_CHARS = new Map([['\\', '\\\\'], ['\r', '\\r'], ['\n', '\\n'], ['\0', '\\0'], ['\x1a', '\\0'], ["'", "\\'"], ['"', '\\"']])
  value = `${value}`
  let pos = 0
  const len = value.length

  const buf = ["'"]
  for (let index = 0; index < len; index++) {
    const ch = value.charAt(index)
    if (!ESCAPE_CHARS.has(ch)) {
      continue
    }
    if (index - pos >= 1) {
      // 至少存在1个字符
      buf.push(value.substring(pos, index))
    }
    buf.push(ESCAPE_CHARS.get(ch))
    pos = index + 1
  }
  if (len - pos >= 1) {
    buf.push(value.substring(pos, len))
  }
  buf.push("'")
  let result = buf.join('')
  return result
}

const _fieldValue = {
  id: async () => {
    let result = await idGen()
    return result
  },
  now: () => {
    return new Date()
  },
  userId: (values, entity, extras) => {
    return extras.userId
  },
  uerName: (values, entity, extras) => {
    if (extras.userName) {
      return crypto.decrypt(extras.userName)
    }
    return '无名'
  },
  fullId: async (values, entity) => {
    if (values.parentId === -1) {
      return `${values.id}`
    } else {
      let parent = await entity.findOne({ where: { id: values.parentId } })
      return `${parent.fullId}|${values.id}`
    }
  },
  fullName: async (values, entity) => {
    if (values.parentId === -1) {
      return `${values.name}`
    } else {
      let parent = await entity.findOne({ where: { id: values.parentId } })
      return `${parent.fullName}|${values.name}`
    }
  },
  level: values => {
    if (values.fullId) {
      return values.fullId.split('|').length
    } else {
      return 0
    }
  }
}
// 处理值
function constructValue (value) {
  const typeStr = typeof value
  let result = ''
  switch (typeStr) {
    case 'number':
      result = value
      break
    case 'string':
      result = "'" + value + "'"
      break
    case 'object':
      result = value
      break
    case 'undefined':
      result = null
      break
    default:
      result = value
  }
  return result
}
// 转换小驼峰为_小写字母
function columnToLower (val) {
  return val.replace(/[A-Z](\w)/g, ($0) => {
    return '_' + $0.toLowerCase()
  })
}

const currentModel = function () {
  const model = {}
  for (const key in this.props) {
    model[key] = null
  }
  return model
}
module.exports = entity
