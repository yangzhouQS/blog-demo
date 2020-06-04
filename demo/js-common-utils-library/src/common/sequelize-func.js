const Sequlize = require('@mctech/sequelize-impala')

/**
 * 根据参数查询结果数据
 *
 * @param {*} QueryCondtion
 * @returns
 */
function queryByCondition (QueryCondtion) {
  let CondtionWhere = {}
  QueryCondtion.condtionItems.map((i, index) => {
    if (i.op === 'eq') {
      CondtionWhere[i.fieldName] = i.fieldValue
    } else {
      CondtionWhere[i.fieldName] = {
        [Sequlize.Op[i.op]]: i.fieldValue
      }
    }
  })
  let QueryParams = {
    offset: QueryCondtion.offset,
    limit: QueryCondtion.limit,
    order: QueryCondtion.order,
    attributes: QueryCondtion.attributes,
    where: CondtionWhere
  }
  if (!QueryCondtion.isNotReturnCount) {
    QueryParams.method = 'findAndCountAll'
  } else {
    QueryParams.method = 'findAll'
  }
  return QueryParams
}

module.exports = {
  queryByCondition: queryByCondition
}
