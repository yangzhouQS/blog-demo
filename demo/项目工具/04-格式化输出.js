const s = `a.book_total_sum,a.book_total_num,a.book_last_month_sum,a.book_last_month_num,a.book_current_season_sum,a.book_current_season_num,a.book_current_month_sum,a.book_current_month_num,b.row_last_month_num,b.row_last_month_sum,b.row_current_season_num,b.row_current_season_sum,b.row_current_month_num,b.row_current_month_sum,b.row_total_num,b.row_total_sum,  c.buy_total_sum,c.buy_total_num,c.buy_current_season_sum,c.buy_current_season_num,c.buy_last_month_sum,c.buy_last_month_num,c.buy_current_month_sum,c.buy_current_month_num,`
console.log()
const arr = []
s.split(',').forEach(row => {
  const cur = `ifnull(${ row },0),`
  arr.push(cur)
  console.log(cur)
})
