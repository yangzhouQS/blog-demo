
function _toLowerCase (prop) {
  const fieldName = prop.replace(/[A-Z]/g, $0 => {
    return `_${$0.toLowerCase()}`
  })
  return fieldName
}

/**
 * 构造替换的参数值
 * @param {*} condtionItems
 */
function condtionItemsToParams (condtionItems) {
  const params = {}
  if (condtionItems && condtionItems.length) {
    condtionItems.map((i, index) => {
      if (i.fieldValue !== undefined) {
        if (i.op === 'between' || i.op === 'notBetween') {
          params[`${_toLowerCase(i.fieldName)}_start`] = i.fieldValue[0]
          params[`${_toLowerCase(i.fieldName)}_end`] = i.fieldValue[1]
        } else {
          params[_toLowerCase(i.fieldName)] = i.fieldValue
        }
        if (i.relationFieldName !== undefined) {
          params[_toLowerCase(i.relationFieldName)] = i.fieldValue
        }
      }
    })
  }
  return params
}

/**
 * 构造where条件字符串,不含orgId（搭配condtionItemsToParams使用）支持两个字段共用一个值or查询
 * @param {*} condtionItems
 */
function condtionItemsToSql (condtionItems) {
  let orgId = 0
  let whereStr = ''
  if (condtionItems !== undefined && condtionItems.length > 0) {
    condtionItems.map((i, index) => {
      if (i.fieldValue !== undefined) {
        if (i.fieldName === 'orgId') {
          orgId = i.fieldValue
        } else {
          switch (i.op) {
            case 'gt': // // id > 6
              if (i.relationFieldName) {
                whereStr = `${whereStr} and (${_toLowerCase(i.fieldName)}>:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}>:${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = `${whereStr} and ${_toLowerCase(i.fieldName)}>:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'gte': // id >= 6
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}>=:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}>=:${_toLowerCase(i.relationFieldName)}) `
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}>=:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'lt': // id < 10
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}<:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}<:${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}<:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'lte': // id <= 10
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}<=:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}<=:${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}<=:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'ne': // id != 20
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}!=:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}!=:${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}!=:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'eq': // id = 20
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}=:${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)}=:${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}=:${_toLowerCase(i.fieldName)} `
              }
              break
            case 'in': //  // 在 [1, 2] 之中
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)}  in (:${_toLowerCase(i.fieldName)})
                  or ${_toLowerCase(i.relationFieldName)} not in :${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)}  in (:${_toLowerCase(i.fieldName)}) `
              }
              break
            case 'notIn': // 不在 [1, 2] 之中
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)} not in (:${_toLowerCase(i.fieldName)})
                  or ${_toLowerCase(i.relationFieldName)} not in :${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)} not in (:${_toLowerCase(i.fieldName)}) `
              }
              break
            case 'like': // '%hat'
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)} like :${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)} like :${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)} like :${_toLowerCase(i.fieldName)} `
              }
              break
            case 'notLike': // '%hat'       // 不包含 '%hat'
              if (i.relationFieldName) {
                whereStr = ` ${whereStr} and (${_toLowerCase(i.fieldName)} notLike :${_toLowerCase(i.fieldName)}
                  or ${_toLowerCase(i.relationFieldName)} like :${_toLowerCase(i.relationFieldName)})`
              } else {
                whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)} notLike :${_toLowerCase(i.fieldName)} `
              }
              break
            case 'between': // '%hat'       // 不包含 '%hat'
              whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)} between :${_toLowerCase(i.fieldName)}_start  and :${_toLowerCase(i.fieldName)}_end `
              break
            case 'notBetween': // '%hat'       // 不包含 '%hat'
              whereStr = ` ${whereStr} and ${_toLowerCase(i.fieldName)} not between :${_toLowerCase(i.fieldName)}_start  and :${_toLowerCase(i.fieldName)}_end `
              break
          }
        }
      }
    })
  }

  return { whereStr, orgId }
}

module.exports = { condtionItemsToSql, condtionItemsToParams }
