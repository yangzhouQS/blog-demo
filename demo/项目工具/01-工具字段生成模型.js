/**
 * 转换为小驼峰
 * @param field
 * @returns {string}
 */
const transRecords = (field = '') => {
  let prop = field.replace(/_(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return prop
}

/**
 * 小驼峰转换为下划线
 * @param str
 * @returns {string}
 */
const transUnderscore = (str = '') => {
  return str.replace(/[A-Z]/g, $0 => {
    return `_${ $0.toLowerCase() }`
  })
}
let columnsStr = `id,org_id,parent_id,full_id,name,full_name,level,is_leaf,start_time,end_time,gh_state,is_delivery,is_check,remark,sort_code,ori_gh_id,ori_org_id,creator_id,creator_name,created_at,modifier_id,modifier_name,updated_at,is_removed,version,delivery_id,delivery_name,delivery_full_name,ori_version,excel_task_id,creator,reviser,full_id_ex,order_no,ori_name,start_pile,end_pile`

const tmpArr = [ 'id', 'creatorId', 'creatorName', 'createdAt', 'modifierId', 'modifierName', 'updatedAt', 'isRemoved', 'version' ]
let ret = columnsStr.split(',').filter(row => {
  if (!tmpArr.includes(row)) {
    // const obj = {type: Sequelize.BIGINT, allowNull: true, field: 'application_id'} // 应用id
    return transRecords(row)
  }
})
// console.log(ret)
const str=`
OriOrgId
`
console.log(transUnderscore(str).substring(2))