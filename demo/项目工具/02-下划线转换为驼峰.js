const transRecords = (field = '') => {
  let prop = field.replace(/_(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return prop
}
console.log(transRecords('r_bid_procurment'))
const arr = []
let str = `org_id\tid\torder_id\torg_name\tmaterial_id\tmaterial_name\tmaterial_unit\tmaterial_model\tmaterial_code\tclass_id\tclass_full_id\ttype\tbook_last_month_num\tbook_current_month_num\tbook_current_season_num\tbook_total_num\tbook_last_month_sum\tbook_current_month_sum\tbook_current_season_sum\tbook_total_sum\trow_last_month_num\trow_current_month_num\trow_current_season_num\trow_total_num\trow_last_month_sum\trow_current_month_sum\trow_current_season_sum\tbuy_last_month_num\tbuy_current_month_num\tbuy_current_season_num\tbuy_total_num\tbuy_last_month_sum\tbuy_current_month_sum\tbuy_current_season_sum\tfact_last_month_num\tfact_current_month_num\tfact_current_season_num\tfact_total_num\tfact_last_month_sum\tfact_current_month_sum\tfact_current_season_sum\tremark\tis_removed\tcreator_id\tcreator_name\tcreated_at\tmodifier_id\tmodifier_name\tupdated_at\tversion`
str.split('\t').forEach(row => {
  arr.push(transRecords(row))
  // console.log(transRecords(row))
})
// console.log(arr)

arr.forEach(row=>{
  // console.log(`${row}: { type: Sequelize.DECIMAL(28, 4) },  // xx`)
})
// quantity: { type: Sequelize.DECIMAL(28, 4) }, // 数量
console.log(transRecords('ThresholdValue'))