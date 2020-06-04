const Sequelize = require('@mctech/sequelize-impala')
const { RotatingCacheMap } = require('@mctech/infra-core')
const rpc = require('@mctech/infra-cloud').getRpcClient()

let mapImpala = new RotatingCacheMap()

async function getQueryOption (config, tenantId) {
  let tenant = await rpc.get({ path: `/tenants/${tenantId}` }, { serviceId: 'tenant-service' })
  let database = config.database.replace('{domain}', tenant.domain)
  return { user: `${database.split('_')[0]}_internal_write`, database }
}
const transRecords = records => {
  let mapFields = {}
  if (records.length > 0) {
    for (let field in records[0]) {
      let prop = field.replace(/_(\w)/g, ($0, $1) => {
        return $1.toUpperCase()
      })
      if (field !== prop) {
        mapFields[field] = prop
      }
    }
  }
  for (let record of records) {
    for (let field in mapFields) {
      // 处理字段为布尔值的情况
      record[mapFields[field]] = field.indexOf('is_') === 0 ? (record[field] === null ? null : record[field] !== false && record[field] !== 0) : record[field]
      // 删除带_的字段值
      delete record[field]
    }
  }
}

const select = async function (sql, options) {
  let result = await this.query(sql, Object.assign({ type: Sequelize.QueryTypes.SELECT }, options || {}))
  // _ 转为驼峰
  transRecords(result)
  return result
}

const defineModel = function (model) {
  // 表名使用_规则
  let tableName = model.name.replace(/[A-Z]/g, $0 => {
    return `_${$0.toLowerCase()}`
  })
  // 表中字段使用_规则
  for (let prop in model.fields) {
    model.fields[prop].field = prop.replace(/[A-Z]/g, $0 => {
      return `_${$0.toLowerCase()}`
    })
  }
  // 定义模型对象
  let options = Object.assign(
    {
      freezeTableName: true,
      tableName: tableName
    },
    model.options
  )
  return this.define(model.name, model.fields, options)
}

const orderSQL = function (tableName, fields, defaultFields) {
  let me = this
  let orderGrammar = field => {
    // 是否倒序
    let desc = field.indexOf('-') === 0
    // 是否本地化
    let local = field.indexOf('$') === 0 || field.indexOf('$') === 1
    let fieldName = field.replace('-', '').replace('$', '')
    let result = [fieldName, desc ? `DESC${me.isImpala ? ' NULLS LAST' : ''}` : `ASC${me.isImpala ? ' NULLS FIRST' : ''}`]
    if (local) {
      // todo: 获取本地化编码信息
      let encode = 'GBK'
      tableName = tableName.replace(/([A-Z])/g, '_$1').toLowerCase()
      fieldName = fieldName.replace(/([A-Z])/g, '_$1').toLowerCase()
      let fieldOrder = `CONVERT(\`${tableName}\`.\`${fieldName}\` USING ${encode})`
      result = desc ? [Sequelize.literal(fieldOrder), 'DESC'] : Sequelize.literal(fieldOrder)
    }
    return result
  }

  let result = []
  let fieldList = fields ? fields.split(',') : defaultFields ? defaultFields.split(',') : []
  for (let i = 0; i < fieldList.length; i++) {
    result.push(orderGrammar(fieldList[i]))
  }
  return result
}

module.exports = {
  initImpala: async (_config, tenantId) => {
    let config = _config.datasource
    if (!mapImpala[tenantId]) {
      let userOption = await getQueryOption(config, tenantId)
      const option = {
        // impala服务器地址
        host: config.host,
        // 可省略，impala服务器端口，默认值为21050
        port: config.port,
        // 连接impala服务器验证身份的帐号
        username: config.username,
        // 连接impala服务器验证身份的密码
        password: config.password,
        // 可省略，默认的数据库，默认值为'default'
        database: userOption.database,
        // 表示使用impala查询引擎
        dialect: 'impala',
        // 可省略，告诉impala查询引擎应该使用什么帐号执行sql，sql在哪一个数据库上执行
        // 如果getQueryOption方法没有配置，或者返回的user ,database为空，就使用前面配置的username和database的值
        getQueryOption: async () => {
          return { user: userOption.user, database: userOption.database }
        }
      }
      let impala = new Sequelize(option)
      impala.isImpala = config.dialect === 'impala'
      impala.select = select
      impala.defineModel = defineModel
      impala.orderSQL = orderSQL
      mapImpala[tenantId] = impala
    }
    let instanceImpala = mapImpala[tenantId]
    return instanceImpala
  }
}
