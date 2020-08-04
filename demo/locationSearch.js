function querys (s) {
  s = s.substr(1)
  const arr = s.split('&')
  const querys = {}
  for (let i = 0; i < arr.length; i++) {
    const query = arr[i].split('=')
    querys[query[0]] = decodeURI(query[1])
  }
}

const str = 'http://dev.mctech.vip/smconfig/product-install.html?applicationId=74qlnvxaf4&orgId=8pt&a=1&b=2#/?VNK=d3a2c007'
console.log(querys(str));
console.log(str.substr(1).split('&'))