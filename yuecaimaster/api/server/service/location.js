const location = {
	getDistance(lng1, lat1, lng2, lat2) {
		// 根据经纬度计算距离
		const EARTH_RADIUS = 6378.137 //地球半径
		const radLat1 = rad(lat1)
		const radLat2 = rad(lat2)
		var a = radLat1 - radLat2
		var b = rad(lng1) - rad(lng2)
		var s =
			2 *
			Math.asin(
				Math.sqrt(
					Math.pow(Math.sin(a / 2), 2) +
						Math.cos(radLat1) *
							Math.cos(radLat2) *
							Math.pow(Math.sin(b / 2), 2)
				)
			)
		s = s * EARTH_RADIUS
		s = Math.round(s * 10000) / 10000
		return s
	},
	getScale({ distance, from, longitude, latitude, limit, page }) {
		var query = `select *,ROUND(
            6378.138*2*ASIN(
                SQRT(
                    POW(
                        SIN((${latitude}*PI()/180-latitude*PI()/180)/2),2)
                        +COS(${latitude}*PI()/180)
                        *COS(latitude*PI()/180)
                        *POW(
                        SIN((${longitude}*PI()/180-longitude*PI()/180)/2),2)))*1000) 
                            AS distance 
                            FROM ${from} 
                            having distance <= ${distance} 
                            order by distance
                            limit ${limit * (page - 1)},${limit}`
		return query
	},
}

function rad(d) {
	return (d * Math.PI) / 180.0
}

module.exports = location
