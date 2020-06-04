module.exports = {
  rpc_timeout: 20 * 1000,
  server_mq: {
    yl_topic: 'INTEGRATION_MQUANTITY',
    tags: {
      weight: 'weight',
      pda: 'pda',
      mix: 'mix'
    },
    currVersion: 1
  },
  receiveServiceType: { // 调入（20） 收料（10） 调入退（-21） 收料退（-11）
    receive: 10,
    receiveReturn: -11,
    allot: 20,
    allotReturn: -21
  },
  deliveryServiceType: { // 发料（10） 内调（20） 外调（30） 报废 （40） 发退（-11） 内退（-21） 外退（-31）
    delivery: 10,
    deliveryReturn: -11,
    allotIn: 20,
    allotInReturn: -21,
    allotOut: 30,
    allotOutReturn: -31,
    scrap: 40
  },
  orderType: { // 1冲红（-1）2补录3退料（不用）4正常
    rushRed: -1,
    addRecording: 2,
    normal: 4
  }
}
