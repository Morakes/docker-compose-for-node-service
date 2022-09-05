// 一天
export var Today = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
]

// 一个星期
export var Week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// 一个月
/*获取一个月的天数 */
function getCountDays() {
  var curDate = new Date()
  var curMonth = curDate.getMonth()
  curDate.setMonth(curMonth + 1)
  curDate.setDate(0)
  return curDate.getDate()
}
var day = getCountDays() //总天数
export var Month = []
for (let i = 1; i <= day; i++) {
  Month.push(i)
}
// 全年
export var Year = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

// 两个时间段之间的天数
export var days = (start, end) => {
  var startTime = new Date(start).getTime()
  var expTime = new Date(end).getTime()
  var day = (expTime - startTime) / (60 * 60 * 24 * 1000)
  var dayArr = []
  for (let i = 1; i <= day; i++) {
    dayArr.push(i)
  }
  return dayArr
}
