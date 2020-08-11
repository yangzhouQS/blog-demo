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
    options.order = [ [ 'id' ] ]
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

module.exceeds = postCondition