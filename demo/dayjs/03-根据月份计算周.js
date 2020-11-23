/*
0703-0709
0710-0716
0717-0723
0724-0730

0731-0806

0807-0813
0814-0820
0821-0827
0828-0903

0904-0910
0911-0917
0918-0924
0925-1001

1002-1009
1009-1015
1016-1022
1023-1029

1030-1105
1106-1112
1113-1119
1120-1126

1127-1203

* */

/*
实例方法 Getter
Date.prototype.getDate()
根据本地时间返回指定日期对象的月份中的第几天（1-31）。
Date.prototype.getDay()
根据本地时间返回指定日期对象的星期中的第几天（0-6）。
Date.prototype.getFullYear()
根据本地时间返回指定日期对象的年份（四位数年份时返回四位数字）。
Date.prototype.getHours()
根据本地时间返回指定日期对象的小时（0-23）。
Date.prototype.getMilliseconds()
根据本地时间返回指定日期对象的毫秒（0-999）。
Date.prototype.getMinutes()
根据本地时间返回指定日期对象的分钟（0-59）。
Date.prototype.getMonth()
根据本地时间返回指定日期对象的月份（0-11）。
Date.prototype.getSeconds()
根据本地时间返回指定日期对象的秒数（0-59）。
Date.prototype.getTime()
返回从1970-1-1 00:00:00 UTC（协调世界时）到该日期经过的毫秒数，对于1970-1-1 00:00:00 UTC之前的时间返回负值。
Date.prototype.getTimezoneOffset()
返回当前时区的时区偏移。
Date.prototype.getUTCDate()
根据世界时返回特定日期对象一个月的第几天（1-31）.
Date.prototype.getUTCDay()
根据世界时返回特定日期对象一个星期的第几天（0-6）.
Date.prototype.getUTCFullYear()
根据世界时返回特定日期对象所在的年份（4位数）.
Date.prototype.getUTCHours()
根据世界时返回特定日期对象当前的小时（0-23）.
Date.prototype.getUTCMilliseconds()
根据世界时返回特定日期对象的毫秒数（0-999）.
Date.prototype.getUTCMinutes()
根据世界时返回特定日期对象的分钟数（0-59）.
Date.prototype.getUTCMonth()
根据世界时返回特定日期对象的月份（0-11）.
Date.prototype.getUTCSeconds()
根据世界时返回特定日期对象的秒数（0-59）.
Date.prototype.getYear()
根据特定日期返回年份 (通常 2-3 位数). 使用 getFullYear() .
Setter
Date.prototype.setDate()
根据本地时间为指定的日期对象设置月份中的第几天。
Date.prototype.setFullYear()
根据本地时间为指定日期对象设置完整年份（四位数年份是四个数字）。
Date.prototype.setHours()
根据本地时间为指定日期对象设置小时数。
Date.prototype.setMilliseconds()
根据本地时间为指定日期对象设置毫秒数。
Date.prototype.setMinutes()
根据本地时间为指定日期对象设置分钟数。
Date.prototype.setMonth()
根据本地时间为指定日期对象设置月份。
Date.prototype.setSeconds()
根据本地时间为指定日期对象设置秒数。
Date.prototype.setTime()
通过指定从 1970-1-1 00:00:00 UTC 开始经过的毫秒数来设置日期对象的时间，对于早于 1970-1-1 00:00:00 UTC的时间可使用负值。
Date.prototype.setUTCDate()
根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
Date.prototype.setUTCFullYear()
根据世界时设置 Date 对象中的年份（四位数字）。
Date.prototype.setUTCHours()
根据世界时设置 Date 对象中的小时 (0 ~ 23)。
Date.prototype.setUTCMilliseconds()
根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
Date.prototype.setUTCMinutes()
根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
Date.prototype.setUTCMonth()
根据世界时设置 Date 对象中的月份 (0 ~ 11)。
Date.prototype.setUTCSeconds()
根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
Date.prototype.setYear()
setYear() 方法用于设置年份。请使用 setFullYear() 方法代替。
Conversion getter
Date.prototype.toDateString()
以人类易读（human-readable）的形式返回该日期对象日期部分的字符串。
Date.prototype.toISOString()
把一个日期转换为符合 ISO 8601 扩展格式的字符串。
Date.prototype.toJSON()
使用 toISOString() 返回一个表示该日期的字符串。为了在 JSON.stringify() 方法中使用。
Date.prototype.toGMTString()
返回一个基于 GMT (UT) 时区的字符串来表示该日期。请使用 toUTCString() 方法代替。
Date.prototype.toLocaleDateString()
返回一个表示该日期对象日期部分的字符串，该字符串格式与系统设置的地区关联（locality sensitive）。
Date.prototype.toLocaleFormat()
使用格式字符串将日期转换为字符串。
Date.prototype.toLocaleString()
返回一个表示该日期对象的字符串，该字符串与系统设置的地区关联（locality sensitive）。覆盖了 Object.prototype.toLocaleString() 方法。
Date.prototype.toLocaleTimeString()
返回一个表示该日期对象时间部分的字符串，该字符串格式与系统设置的地区关联（locality sensitive）。
Date.prototype.toSource()
返回一个与Date等价的原始字符串对象，你可以使用这个值去生成一个新的对象。重写了 Object.prototype.toSource() 这个方法。
Date.prototype.toString()
返回一个表示该日期对象的字符串。覆盖了Object.prototype.toString() 方法。
Date.prototype.toTimeString()
以人类易读格式返回日期对象时间部分的字符串。
Date.prototype.toUTCString()
把一个日期对象转换为一个以UTC时区计时的字符串。
Date.prototype.valueOf()
返回一个日期对象的原始值。覆盖了 Object.prototype.valueOf() 方法。
* */
// year:年  month:月  day:日
const getWeeks2 = function (year, month, day) {
    d = new Date()
    // 该月第一天
    d.setFullYear(2018, 6, 1)
    let w1 = d.getDay()
    if (w1 === 0) {
        w1 = 7
    }
    // 该月天数
    d.setFullYear(2018, 7, 0)
    dd = d.getDate()
    // 该月第一个周一
    let d1
    if (w1 !== 1) {
        d1 = 7 - w1 + 2
    } else {
        d1 = 1
    }
    WEEK_NUB = Math.ceil((dd - d1 + 1) / 7)
    return WEEK_NUB
}


function getYear(date) {
    return new Date(date).getFullYear()
}

function getMonth(date) {
    return new Date(date).getMonth() + 1
}

function getDay(date) {
    return new Date(date).getDate()
}

const now = new Date()
// console.log(`${getYear(now)}${getMonth(now)}${getDay(now)}`)
// console.log(new Date().getDay())

const getMonthWeek = function (a, b, c) {
    /* 
    a = d = 当前日期 
    b = 6 - w = 当前周的还有几天过完(不算今天) 
    a + b 的和在除以7 就是当天是当前月份的第几周 
    */
    const date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
    return Math.ceil(
        (d + 6 - w) / 7
    );
};
const getYearWeek = function (a, b, c) {
    /* 
    date1是当前日期 
    date2是当年第一天 
    d是当前日期是今年第多少天 
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
    */
    const date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil(
        (d + ((date2.getDay() + 1) - 1)) / 7
    );
};
const today = new Date();//获取当前时间
const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();
// console.log(("今天是", m, "月的第 ", getMonthWeek(y, m, d), " 周"))
// console.log(`今天是${y}年${m}月份的第${getMonthWeek(y, m, d)}周`)

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function format(date) {
    var nowDate = new Date(date)
    var year = nowDate.getFullYear()
    var month = String(nowDate.getMonth()+1).padStart(2, 0)
    var day = String(nowDate.getDate()).padStart(2, 0)
    return year + "-" + month + "-" + day
}

console.log(format('2020-02-03'));
function format(date) {
    var nowDate = new Date(date)
    var year = nowDate.getFullYear()
    var month = String(nowDate.getMonth()+1).padStart(2, 0)
    var day = String(nowDate.getDate()).padStart(2, 0)
    return year + "-" + month + "-" + day
}
// 本月的每一周（从上周五到本周四为一周）
function allWeeks(now_month) {
    let week_array = [];
    let today = new Date(Date.parse(now_month));
    let year = today.getFullYear();
    let month = today.getMonth();
    let i = 0;

    let start = new Date(year, month, 1); // 得到当月第一天
    let end = new Date(year, month + 1, 0); // 得到当月最后一天
    let start_day = start.getDay(); // 当月第一天是周几
    // console.log(start.format("yyyy-MM-dd"), end.format("yyyy-MM-dd")); // 每月的起始日期
    switch (start_day) {
        case 0:
            i = 0 - 1;
            break;
        case 1:
            i = 0 - 2;
            break;
        case 2:
            i = 0 - 3;
            break;
        case 3:
            i = 0 - 4;
            break;
        case 4:
            i = 0 - 5;
            break;
        case 5:
            i = 1;
            break;
        case 6:
            i = 0;
            break;
    }

    while (new Date(year, month, i + 6) <= end) {
        week_array.push([format(new Date(year, month, i)),
                format(new Date(year, month, i + 6))
            ]
        )
        i += 7;
    }
    console.log(week_array)
    return week_array;
}

allWeeks('2020-01')
allWeeks('2020-02')
allWeeks('2020-03')
allWeeks('2020-04')
allWeeks('2020-05')
allWeeks('2020-06')
allWeeks('2020-07')
allWeeks('2020-08')
allWeeks('2020-09')
allWeeks('2020-10')
allWeeks('2020-11')
allWeeks('2020-12')