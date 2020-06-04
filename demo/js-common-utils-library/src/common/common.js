const $rpc = require('@mctech/infra-cloud').getRpcClient()
const constants = require('./constants')
// eslint-disable-next-line node/no-extraneous-require
const moment = require('moment')
const numbers = '0123456789'
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const specials = '~!@#$%^*()_+-=[]{}|;:,./<>?'

/**
 * 返回org对象
 * @param {*} orgId 组织机构
 * @param {*} tenantId 租户id
 */
async function getOrgById (orgId, tenantId) {
  let org = await $rpc.get(
    {
      path: `/orgs/${orgId}`,
      context: {
        tenantId: tenantId
      }
    },
    {
      serviceId: 'org-service'
    }
  )
  return org
}

/**
 * 获取该节点下的所有非部分字节点,数组[11,22,222]
 * @param {*} orgId
 */
async function getOrgChilds (orgId) {
  const orgIds = await $rpc.get({
    path: `/external/organizations-notgroup-parent?parentId=${orgId}`
  },
  {
    serviceId: 'node-external-mquantity-service'
  })
  return orgIds
}

/**
 * 生成单号
 * @param {*} { orgId: 11,id: null,codeWord: '', recordedDate: recordedDate, tableName: '',
               condtionItems: [ { fieldName: 'orderOrigin',op: 'eq', fieldValue:1}] }
 */
async function createCodeOrder (orderCodeCondtion) {
  const result = await $rpc.post({
    path: `/cbaseinfo/q-orderCode`,
    body: orderCodeCondtion,
    timeout: constants.rpc_timeout
  },
  {
    serviceId: 'node-cbaseinfo-service'
  })
  return result
}

/**
 * 创建条码，前缀加时间和4位随机数
 * @param {*} params 前缀默认是空字符串
 * @param {*} date  传进来的时间(不传默认当前时间)
 */
function createBarCode (params, date) {
  const prefix = params || ''
  date || new Date()
  const code = moment(date).format('YYYYMMDDHHmmss')
  const randomstr = _random(4, {
    specials: false,
    numbers: true,
    letters: true
  })
  return prefix + code + randomstr
}

/**
 * 获取结账日
 */
async function getAccountDay () {
  const result = await $rpc.get(
    {
      path: `/cbaseinfo/g-system-setting-params`
    },
    {
      serviceId: 'node-cbaseinfo-service'
    }
  )
  return result
}

/**
 * 通过结账日获取结账月
 * @param {*} date 传进来的时间(不传默认当前时间)
 */
async function getAccountMonth (date) {
  date || new Date()
  const result = await getAccountDay()
  const accountDay = JSON.parse(result.globalConf).accountDay || 25
  const oriDate = moment(date).date()
  if (oriDate > accountDay) {
    // 月份加一
    return moment(date)
      .add(1, 'months')
      .format('YYYY-MM')
  } else {
    return moment(date).format('YYYY-MM')
  }
}

/**
 * 通过当前时间返回本月结账范围（开始时间和结束时间）
 * @param {*} accountDay 结账日
 * @param {*} date 传进来的时间为（月份或者年月日）(不传默认当前时间)
 */
async function getAccountStartAndEndDate (date) {
  date || new Date()
  const result = await getAccountDay()
  const accountDay = JSON.parse(result.globalConf).accountDay || 25
  const d = moment(date)
  if (d.endOf('month').date() === accountDay) {
    // 结账日就是月末
    return {
      startDate: d.startOf('month').format('YYYY-MM-DD'),
      endDate: d.endOf('month').format('YYYY-MM-DD')
    }
  } else if (d.endOf('month').date() < accountDay) {
    // 传入当前时间的最后一天比结账日大
    const endDate = d.endOf('month').format('YYYY-MM-DD')
    const startMonth = moment(endDate)
      .subtract(1, 'months')
      .format('YYYY-MM')
    let startDate = moment(startMonth)
      .add(accountDay, 'days')
      .format('YYYY-MM-DD')
    if (
      moment(startMonth)
        .endOf('month')
        .date() < accountDay
    ) {
      // 不能直接加加结账日
      startDate = moment(startMonth)
        .endOf('month')
        .add(1, 'days')
        .format('YYYY-MM-DD')
    }
    return {
      startDate: startDate,
      endDate: endDate
    }
  } else {
    // 结账日小于当前传入时间
    let currMonth = d.format('YYYY-MM')
    if (date.length > 7) {
      // 处理月份
      const oriDate = moment(date).date()
      if (oriDate > accountDay) {
        // 月份加一
        currMonth = moment(date)
          .add(1, 'months')
          .format('YYYY-MM')
      } else {
        currMonth = moment(date).format('YYYY-MM')
      }
    }
    // 正常情况当前月份加上结账日就是结账日日期结束时间，（如2月28，但是结账日是30）直接加就不对了
    let endDate = moment(currMonth)
      .add(accountDay - 1, 'days')
      .format('YYYY-MM-DD')
    // 正常算法结束时间的月份减一个月，在加一天就是结账日日期开始时间（如3月，结账日期是30，应该返回的是2月28-3月30）
    let startDate = moment(endDate)
      .subtract(1, 'months')
      .add(1, 'days')
      .format('YYYY-MM-DD')
    const lastMonth = moment(endDate)
      .endOf('month')
      .subtract(1, 'months')
      .format('YYYY-MM')
    const startDay = moment(lastMonth)
      .endOf('month')
      .date()
    if (
      moment(currMonth)
        .endOf('month')
        .date() < accountDay
    ) {
      // 不能直接加加结账日
      endDate = moment(currMonth)
        .endOf('month')
        .format('YYYY-MM-DD') // 获取当前月最后一天
      startDate = moment(currMonth)
        .subtract(1, 'months')
        .add(accountDay, 'days')
        .format('YYYY-MM-DD')
    } else {
      if (startDay < accountDay) {
        //
        startDate = moment(lastMonth)
          .endOf('month')
          .add(1, 'days')
          .format('YYYY-MM-DD')
      }
    }
    return {
      startDate: startDate,
      endDate: endDate
    }
  }
}

/**
 * 时间格式化
 * @param {*} date 时间，不传默认当前时间
 * @param {*} format 格式化字符串
 */
function formatDate (date, format = 'YYYY-MM-DD HH:mm:ss') {
  date || new Date()
  return moment(date).format(format)
}

function _random (length, options) {
  length || (length = 8)
  options || (options = {})

  var chars = ''
  var result = ''

  if (options === true) {
    chars = numbers + letters + specials
  } else if (typeof options === 'string') {
    chars = options
  } else {
    if (options.numbers !== false) {
      chars += typeof options.numbers === 'string' ? options.numbers : numbers
    }

    if (options.letters !== false) {
      chars += typeof options.letters === 'string' ? options.letters : letters
    }

    if (options.specials) {
      chars +=
        typeof options.specials === 'string' ? options.specials : specials
    }
  }

  while (length > 0) {
    length--
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

module.exports = {
  getOrgById,
  getOrgChilds,
  createCodeOrder,
  createBarCode,
  getAccountMonth,
  getAccountStartAndEndDate,
  formatDate
}
