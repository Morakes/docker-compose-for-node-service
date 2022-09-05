const { time } = require("cron")

// 通用方法文件
const func = {
    rmNull(obj) {
        // 删除对象中的null属性，常用于where查询
        let temp = obj
        for (let i in temp) {
            if (!temp[i]) {
                delete temp[i]
            }
        }
        return obj
    },
    raw2Camel(arr) {
        let temp = arr
        // 遍历数组
        temp = temp.map((item) => {
            // 将对象的键转换为数组
            let keys = Object.keys(item)
            // 遍历对象键数组
            keys = keys.map((item) => {
                return item.replace(/\.(\w)/g, (all, letter) => {
                    return letter.toUpperCase();
                });
            })
            let values = Object.values(item)
            let newItem = {}
            for (let i in keys) {
                newItem[keys[i]] = values[i]
            }

            return newItem
        })

        return temp
    },
    getTodayRegion(){
        const todayStart = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} 00:00:00`
        const timeStamp = new Date(todayStart).getTime() + 1*24*60*60*1000
        const todayEnd = `${new Date(timeStamp).getFullYear()}-${new Date(timeStamp).getMonth()+1}-${new Date(timeStamp).getDate()} 00:00:00`
        return {todayStart,todayEnd}
    },
    getYesterdayRegion(){
        const yesterdayEnd = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} 00:00:00`
        const timeStamp = new Date(yesterdayEnd).getTime() - 1*24*60*60*1000
        const yesterdayStart = `${new Date(timeStamp).getFullYear()}-${new Date(timeStamp).getMonth()+1}-${new Date(timeStamp).getDate()} 00:00:00`
        return {yesterdayStart,yesterdayEnd}
    },
    getHoursToday(){
        const str = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} `
        const array = new Array(24)
        for(let i=0;i<=24;i++){
            array[i] = str + `${i<10?'0'+i:i}:00:00`
        }
        return array
    },
    getFullMonth(){
        const day = new Date()
        const year = day.getFullYear()
        const month = day.getMonth()
        const dateCount = new Date(year,month+1,0).getDate()
        const array = []
        for(let i=0;i<=dateCount;i++){
            var temp = new Date(`${year}-${month+1}-${i+1} 00:00:00`)
            array[i] = `${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()}`
        }
        return array
    },
    getFullYear(){
        const year = new Date().getFullYear()
        const array = []
        for(let i=1;i<=13;i++){
            // let date = new Date(`${year}-${i}-01`)
            // array.push(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
            if(i==13){
                array.push(`${year+1}-01-01`)
                continue;
            }
            array.push(`${year}-${i<10?'0'+i:i}-01`)
        }
        return array
    },
    GetDistance1( lng1,  lat1,  lng2,  lat2){
        let radLat1 = lat1*Math.PI / 180.0;
        let radLat2 = lat2*Math.PI / 180.0;
        let a = radLat1 - radLat2;
        let  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s*1000;
      },

      getMaxMinLongitudeLatitude(longitude,latitude,distince){
        console.log("MaxMinLongitudeLatitude",longitude,latitude);
        let r = 6371.393;    // 地球半径千米
        let lng = longitude;
        let lat = latitude;
        let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
        dlng = dlng * 180 / Math.PI;// 角度转为弧度
        let dlat = distince / r;
        dlat = dlat * 180 / Math.PI;
        let minlat = lat - dlat;
        let maxlat = lat + dlat;
        let minlng = lng - dlng;
        let maxlng = lng + dlng;
        return {minlng,maxlng,minlat,maxlat} 
      },
    
}

module.exports = func