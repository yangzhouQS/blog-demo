// [ 121.0976, 30.9796 ] [ 121.6023, 30.9563 ]

function getGeoDistance(p1, p2) {
  const [lng1, lat1] = p1
  const [lng2, lat2] = p2
  const radLat1 = lat1 * Math.PI / 180.0
  const radLat2 = lat2 * Math.PI / 180.0
  const a = radLat1 - radLat2
  const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137// EARTH_RADIUS;
  s = (Math.round(s * 10000) / 10000) * 1000
  return s
}

console.log(getGeoDistance([121.0976, 30.9796], [121.6023, 30.9563]))
