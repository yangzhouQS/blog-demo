const $request = require('request-promise-native')

;(async function () {
  const remoteConfig = await $request({
    baseUrl: `http://8.141.167.146:8181`,
    url: '/node-mp-common-service-dev.yml',
    json: true
  })
  console.log(remoteConfig)
})()





