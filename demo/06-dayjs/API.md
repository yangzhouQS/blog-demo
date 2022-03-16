## 当前时间
dayjs()
## 时间字符串
dayjs('2018-06-03')
## 时间戳
dayjs(1528361259484)
## Date 对象
dayjs(new Date(2018,8,18))
## 复制
dayjs().clone()
## 检测当前 Dayjs 对象是否是一个有效的时间
dayjs().isValid()
## 获取
年 ： dayjs().year()
月 ： dayjs().month()
日 ： dayjs().date()
星期 ： dayjs().day()
时 ： dayjs().hour()
分 ： dayjs().minute()
秒 ： dayjs().second()
毫秒 ： dayjs().millisecond()
## 设置
dayjs().set('year',2017)
dayjs().set('month',9)
## 增加时间并返回一个新的 Dayjs() 对象
dayjs().add(7, 'day')
dayjs().add(7, 'year')
## 减少时间并返回一个新的 Dayjs() 对象
dayjs().subtract(7, 'year')
dayjs().subtract(7, 'month')
## 返回当前时间的开头时间的 Dayjs() 对象，如月份的第一天。
dayjs().startOf('year')
dayjs().startOf('month')
## 返回当前时间的末尾时间的 Dayjs() 对象，如月份的最后一天。
dayjs().endOf('month')
dayjs().endOf('year')
## 格式化
dayjs().format()
dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A')
## 时间差
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'years')
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'day')
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'hour')
Unix 时间戳 (毫秒)
dayjs().valueOf()
Unix 时间戳 (秒)
dayjs().unix()
## 返回月份的天数
dayjs().daysInMonth()
## 返回原生的 Date 对象
dayjs().toDate()
## 返回包含时间数值的数组
dayjs().toArray()
## 当序列化 Dayjs 对象时，会返回 ISO8601 格式的字符串
dayjs().toJSON() //2018-06-08T02:44:30.599Z
## 返回 ISO8601 格式的字符串
dayjs().toISOString() //2018-06-08T02:46:06.554Z
## 返回包含时间数值的对象
dayjs().toObject()
## 字符串
dayjs().toString()
## 检查一个 Dayjs 对象是否在另一个 Dayjs 对象时间之前
dayjs('2018-06-01').isBefore(dayjs('2018-06-02'))
## 检查一个 Dayjs 对象是否和另一个 Dayjs 对象时间相同
dayjs().isSame(dayjs())
## 检查一个 Dayjs 对象是否在另一个 Dayjs 对象时间之后
dayjs().isAfter(dayjs())