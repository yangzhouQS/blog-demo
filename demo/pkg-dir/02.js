/* eslint-disable no-useless-catch */
const { joincondition, crypto, idGen, common } = require('@yearrow/js-common-utils-library')
const { ErrorCode, Assert } = require('@mctech/infra-core')
const rpcClient = require('@mctech/infra-cloud').getRpcClient()
const moment = require('moment') // 针对一次生成多张主表
// 通过参数获取主表分页数据
async function queryMReceiveOrder (ctx, models) {
  const options = models.mReceiveOrder.postCondition(ctx.request.body)
  const result = await models.mReceiveOrder.findAll(options)
  ctx.body = result
}

// 通过参数获取主表数据
async function queryMReceiveOrderParams (ctx, models) {
  const options = models.mReceiveOrder.postCondition(ctx.request.body)
  const result = await models.mReceiveOrder.findAndCountAll(options)
  ctx.body = result
}

// 通过参数获取从表分页数据
async function queryMReceiveOrderItemParams (ctx, models) {
  const options = models.mReceiveOrderItem.postCondition(ctx.request.body)
  const result = await models.mReceiveOrderItem.findAndCountAll(options)
  ctx.body = result
}

// 查询一条
async function getMReceiveOrder (ctx, models) {
  const result = await models.mReceiveOrder.ylFindOne({
    where: { id: ctx.params.id, orgId: ctx.params.orgId },
    itemOrder: [ [ 'sortCode' ] ]
  }, true)
  ctx.body = result
}

// 获取明细单条数据
async function queryMReceiveItem (ctx, models) {
  const options = models.mReceiveOrderItem.getCondition(ctx.query)
  const result = await models.mReceiveOrderItem.findOne(options)
  ctx.body = result
}

// 添加
async function createMReceiveOrder (ctx, models) {
  const { mReceiveOrder, mReceiveOrderItems, orderCodeCondtion, isComplex } = ctx.request.body
  mReceiveOrder.orderDate = await common.getAccountMonth(mReceiveOrder.recordedDate, { orgId: mReceiveOrder.orgId })
  const newOrderCode = await common.createCodeOrder(orderCodeCondtion)
  const oldOrderCode = mReceiveOrder.orderCode
  if (newOrderCode !== oldOrderCode) {
    mReceiveOrder.orderCode = newOrderCode
  }
  if (mReceiveOrder.serviceType * mReceiveOrder.orderType > 0) {
    for (var i = 0; i < mReceiveOrderItems.length; i++) {
      const barCode = await common.createBarCode('H')
      const mReceiveOrderItems = ctx.request.body.mReceiveOrderItems[i]
      mReceiveOrderItems.itemBarCode = barCode
      mReceiveOrderItems.orderType = mReceiveOrder.orderType
      mReceiveOrderItems.serviceType = mReceiveOrder.serviceType
      mReceiveOrderItems.sortCode = i + 1
    }
  }
  const values = { mReceiveOrder, mReceiveOrderItems, isComplex }
  const result = await models.mReceiveOrder.createOrderWithTrans(values, ctx.extras)
  if (result) {
    result.mReceiveOrder.orderDate = mReceiveOrder.orderDate
    result.mReceiveOrder.orgId = mReceiveOrder.orgId
    result.mReceiveOrder.newOrderCode = newOrderCode
    result.mReceiveOrder.oldOrderCode = oldOrderCode
  }
  ctx.body = result
}

// 修改
async function updateMReceiveOrder (ctx, models) {
  const { id, orgId } = ctx.params
  const { mReceiveOrder, mReceiveOrderItems, orderCodeCondtion, isComplex } = ctx.request.body
  const updateResult = await models.mReceiveOrder.findOne({ where: { orgId: orgId, id: id } })
  let result = null
  if (updateResult) {
    if (updateResult.isAudit) {
      result = { success: false, message: '单据已提交' }
    } else {
      mReceiveOrder.orderDate = await common.getAccountMonth(
        mReceiveOrder.recordedDate, { orgId: mReceiveOrder.orgId }
      )
      const newOrderCode = await common.createCodeOrder(orderCodeCondtion)
      const oldOrderCode = mReceiveOrder.orderCode
      if (newOrderCode !== oldOrderCode) {
        mReceiveOrder.orderCode = newOrderCode
      }
      const values = { mReceiveOrder, mReceiveOrderItems, isComplex }
      for (var i = 0; i < mReceiveOrderItems.length; i++) {
        if (mReceiveOrderItems[i].itemBarCode === '') {
          const barCode = await common.createBarCode('H')
          mReceiveOrderItems[i].itemBarCode = barCode
          mReceiveOrderItems[i].orderType = mReceiveOrder.orderType
          mReceiveOrderItems[i].serviceType = mReceiveOrder.serviceType
          mReceiveOrderItems[i].sortCode = i + 1
        }
      }
      const midResult = await models.mReceiveOrder.updateOrderWithTrans(
        values,
        ctx.extras,
        { where: { orgId: orgId, id: id } },
        [ 'orgId', 'orderId' ]
      )
      if (midResult) {
        midResult.mReceiveOrder.orderDate = mReceiveOrder.orderDate
        midResult.mReceiveOrder.orgId = mReceiveOrder.orgId
        midResult.mReceiveOrder.newOrderCode = newOrderCode
        midResult.mReceiveOrder.oldOrderCode = oldOrderCode
      }
      result = midResult
    }
  } else {
    result = { success: false, message: '单据不存在' }
  }
  ctx.body = result
}

// 删除
async function deleteMReceiveOrder (ctx, models) {
  const { id, orgId } = ctx.params
  const updateResult = await models.mReceiveOrder.findOne({ where: { orgId: orgId, id: id } })
  let result = null
  if (updateResult) {
    if (updateResult.isAudit) {
      result = { success: false, message: '单据已提交' }
    } else {
      await models.mReceiveOrder.destroy({ where: { orgId: orgId, id: id } }, ctx.extras)
      result = { success: true, message: '删除成功' }
    }
  } else {
    result = { success: false, message: '单据不存在' }
  }
  ctx.body = result
}

// 删除从表信息
async function deleteMReceiveOrderItem (ctx, models) {
  const { id, orgId, orderId } = ctx.params
  let result = null
  if (orderId) {
    const updateResult = await models.mReceiveOrder.findOne({ where: { orgId: orgId, id: orderId } })
    if (updateResult) {
      if (updateResult.isAudit) {
        result = { success: false, message: '单据已提交' }
      } else {
        await models.mReceiveOrderItem.destroy({ where: { orgId: orgId, id: id } }, ctx.extras)
        result = { success: true, message: '删除成功' }
      }
    } else {
      result = { success: false, message: '单据不存在' }
    }
  } else {
    await models.mReceiveOrderItem.destroy({ where: { orgId: orgId, id: id } }, ctx.extras)
    result = { success: true, message: '删除成功' }
  }
  ctx.body = result
}

// 提交
async function auditMReceiveOrder (ctx, models) {
  const { id, orgId, userName } = ctx.request.body
  let result = null
  let updateDataSql = ``
  const options = {
    where: { orgId: orgId, id: id, isRemoved: false }
  }
  if (ctx.request.body.readSnapshot === true) {
    Object.assign(options, {
      impala: {
        queryOption: {
          switchs: { kuduReadMode: 'READ_AT_SNAPSHOT' }
        }
      }
    })
  }
  const qReceive = await models.mReceiveOrder.findOne(options)
  if (qReceive.isAudit) {
    result = { success: false, message: '数据已经提交了！' }
  } else {
    const auditDate = common.formatDate()
    const version = await idGen()
    const sql = `select org_id,material_id,material_code,material_name,material_model,material_unit,class_id,class_full_id,quantity,book_price,book_sum,item_bar_code,store_room_id,
    store_room_name,store_room_full_name,manufacturer,batch_no,storage_room,item_remark,ori_material_id,ori_class_id,ori_common_id
    from m_receive_order_item  
    where org_id = :orgId and order_id =:id and is_removed=false`
    const itemOptions = {
      replacements: { id: id, orgId: orgId }
    }
    if (ctx.request.body.readSnapshot === true) {
      Object.assign(itemOptions, {
        impala: {
          queryOption: {
            switchs: { kuduReadMode: 'READ_AT_SNAPSHOT' }
          }
        }
      })
    }
    const orderList = await models.mReceiveOrder.sequelize.select(sql, itemOptions)
    orderList.forEach(element => {
      element.supplierId = qReceive.supplierId
      element.supplierName = qReceive.supplierName
      element.orderDate = qReceive.recordedDate
      element.taxDeduction = qReceive.taxDeduction
    })
    const columns = { targetColumns: [ 'orgId', 'itemBarCode' ] }
    const { existsData, notExistData } = await models.mInventory.queryExistsData(orderList, columns)
    // 构造更新sql脚本
    let updatesql = ``
    // 条码
    let exportBaracode = ''
    if (qReceive.orderType * qReceive.serviceType > 0) {
      if (existsData.length > 0) {
        for (let i = 0; i < existsData.length; i++) {
          updateDataSql += `(${ existsData[i].orgId } org_id,${ existsData[i].itemBarCode } item_bar_code,${ existsData[i].quantity } quantity,${ existsData[i].bookSum } book_sum),`
        }
        updateDataSql = updateDataSql.length > 0 ? updateDataSql.substr(0, updateDataSql.length - 1) : ''
        updatesql = `update m_inventory set m_inventory.quantity= cast (m_inventory.quantity+ a.quantity as decimal(28,4)),
    m_inventory.book_sum =  cast (m_inventory.book_sum+ a.book_sum as decimal(28,4))
    from m_inventory inner join (
      select org_id,item_bar_code,sum(quantity)quantity,sum(book_sum)book_sum from
      (values ${ updateDataSql }) b
      group by org_id,item_bar_code
    ) as a
    on m_inventory.org_id=a.org_id
    and m_inventory.item_bar_code=a.item_bar_code`
      }
    } else {
      // 构造更新sql脚本 orderType * serviceType < 0 时；
      const columns = {
        targetColumns: [ 'orgId', 'itemBarCode', 'quantity', 'useQuantity' ],
        ignoreColumns: { quantity: true, useQuantity: true }
      }
      const whereString = 'where b.quantity <= a.quantity-a.use_quantity'
      data = await models.mInventory.queryExistsData(
        orderList,
        columns,
        whereString
      )
      if (data.notExistData.length <= 0) {
        if (data.existsData.length > 0) {
          for (let i = 0; i < data.existsData.length; i++) {
            updateDataSql += `(${ data.existsData[i].orgId } org_id,'${ data.existsData[i].itemBarCode }' item_bar_code,${ data.existsData[i].quantity } quantity,${ data.existsData[i].bookSum } book_sum),`
          }
          updateDataSql =
            updateDataSql.length > 0
              ? updateDataSql.substr(0, updateDataSql.length - 1)
              : ''
          updatesql = `update m_inventory set m_inventory.use_quantity=cast(m_inventory.use_quantity+a.quantity AS DECIMAL(28,4)),
          m_inventory.use_book_sum=cast(m_inventory.use_book_sum+a.book_sum AS DECIMAL(28,4))
        from m_inventory inner join (
        select org_id,item_bar_code,sum(quantity)quantity,sum(book_sum) book_sum from
        (values ${ updateDataSql }) b
        group by org_id,item_bar_code
        ) as a
        on m_inventory.org_id=a.org_id
        and m_inventory.item_bar_code=a.item_bar_code`
        }
      } else {
        for (let z = 0; z < data.notExistData.length; z++) {
          exportBaracode += data.notExistData[z].itemBarCode + ' 、'
        }
        exportBaracode = exportBaracode.substr(0, exportBaracode.length - 1)
        result = {
          success: false,
          message:
            '提交失败！条码为【' + exportBaracode + '】的材料不能超库存量！'
        }
      }
    }
    if (qReceive.orderType * qReceive.serviceType < 0 && data.notExistData.length > 0) {
      result = { success: false, message: '提交失败！条码为【' + exportBaracode + '】的材料不能超库存量！' }
    } else {
      result = await models.mReceiveOrder.sequelize.transaction(async t => {
        // 如库存--更新已存在的数据
        if (qReceive.orderType * qReceive.serviceType > 0) {
          if (updatesql.length > 0) {
            await models.mReceiveOrder.sequelize.query(updatesql, {
              replacements: {},
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
          } else {
            // 插入不存在的数据
            await models.mInventory.bulkCreate(notExistData, ctx.extras)
          }
        } else {
          if (updatesql.length > 0) {
            await models.mReceiveOrder.sequelize.query(updatesql, {
              replacements: {},
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
            // 更新原单据状态
            await models.mReceiveOrder.sequelize.query(`UPDATE m_receive_order SET is_refund=1,version=${ version }
          WHERE id=${ qReceive.orderDataId }`)
          }
        }
        // 更新主表状态
        const sql = `update m_receive_order set is_audit=true, auditor =:auditor, audit_date=:audit_date,version=:version
          where id=:id`
        await models.mReceiveOrder.sequelize.query(sql, {
          replacements: {
            id: id,
            auditor: userName,
            audit_date: auditDate,
            version: version
          }, type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
        })
        return { success: true, message: '提交成功！' }
      }).catch(err => {
        return { success: false, message: '提交失败！', error: err.message }
      })
    }
  }
  ctx.body = result
}

// 撤销提交
async function unAuditMReceiveOrder (ctx, models) {
  const { id, orgId, userName } = ctx.request.body
  const auditDate = common.formatDate()
  const version = await idGen()
  let result = null
  let exportBaracode = ``
  const mReceiveOrder = await models.mReceiveOrder.findOne({
    where: { orgId: orgId, id: id }
  })
  if (!mReceiveOrder.isAudit) {
    result = { success: false, message: '该单据已经撤销提交了！' }
  } else if (mReceiveOrder.isRush === 1) {
    result = { success: false, message: '该单据已经冲红了！' }
  } else if (mReceiveOrder.isRefund === 1) {
    result = { success: false, message: '该单据已经退货了！' }
  } else if (mReceiveOrder.isRush === 2) {
    result = { success: false, message: '该单据被冲预点了！' }
  } else if (mReceiveOrder.isSummary) {
    result = { success: false, message: '该单据已做点验汇总单！' }
  } else {
    let deleteSql = ``
    let updatesql = ``
    let inventExistsData = ``
    const sql = `select org_id,quantity,book_sum,material_name,material_model,material_unit,item_bar_code
                  from m_receive_order_item
                  where order_id =:id and is_removed=false`
    const orderList = await models.mReceiveOrder.sequelize.select(sql, { replacements: { id: id, orgId: orgId } })
    if (mReceiveOrder.orderType * mReceiveOrder.serviceType < 0) {
      const columns = {
        targetColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
        queryColumns: [ 'id' ],
        ignoreColumns: { quantity: true }
      }
      inventExistsData = await models.mInventory.queryExistsData(
        orderList,
        columns
      )
      if (inventExistsData.notExistData.length <= 0) {
        if (inventExistsData.existsData.length > 0) {
          let updateDataSql = ``
          for (let i = 0; i < inventExistsData.existsData.length; i++) {
            updateDataSql += `(${ inventExistsData.existsData[i].orgId } org_id,${ inventExistsData.existsData[i].quantity } quantity,
              ${ inventExistsData.existsData[i].bookSum } book_sum ,'${ inventExistsData.existsData[i].itemBarCode }' item_bar_code),`
          }
          updateDataSql =
            updateDataSql.length > 0
              ? updateDataSql.substr(0, updateDataSql.length - 1)
              : ''
          updatesql = `update m_inventory set use_quantity=cast(m_inventory.use_quantity-a.quantity AS DECIMAL(28,4)),
            m_inventory.use_book_sum=cast(m_inventory.use_book_sum-a.book_sum AS DECIMAL(28,4))
          from m_inventory inner join (
            select org_id,item_bar_code,sum(quantity)quantity,sum(book_sum) book_sum  from
            (values ${ updateDataSql }) b
            group by org_id,item_bar_code
          ) as a
          on m_inventory.org_id=a.org_id
          and m_inventory.item_bar_code=a.item_bar_code`
        }
      }
    } else {
      const whereString = 'where b.quantity <=a.quantity-a.use_quantity'
      const columns = {
        targetColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
        queryColumns: [ 'id' ],
        ignoreColumns: { quantity: true }
      }
      inventExistsData = await models.mInventory.queryExistsData(
        orderList,
        columns,
        whereString
      )
      if (inventExistsData.notExistData.length <= 0) {
        const ids = []
        const orgs = []
        if (inventExistsData.queryData.length > 0) {
          for (let i = 0; i < inventExistsData.queryData.length; i++) {
            ids.push(inventExistsData.queryData[i].id)
            orgs.push(inventExistsData.queryData[i].orgId)
          }
          deleteSql = `delete from m_inventory where org_id=${ orgId } and id in (${ ids.join() })`
        }
      }
    }
    if (inventExistsData.notExistData.length > 0) {
      for (let z = 0; z < inventExistsData.notExistData.length; z++) {
        exportBaracode += inventExistsData.notExistData[z].itemBarCode + ' 、'
      }
      exportBaracode = exportBaracode.substr(0, exportBaracode.length - 1)
    }
    if (mReceiveOrder.orderType * mReceiveOrder.serviceType > 0 && inventExistsData.notExistData.length > 0) {
      result = {
        success: false,
        message: '撤销提交失败！条码为【' + exportBaracode + '】的材料已经发料或已退货！'
      }
    } else if (mReceiveOrder.orderType * mReceiveOrder.serviceType < 0 && inventExistsData.notExistData.length > 0) {
      result = {
        success: false,
        message:
          '撤销提交失败！条码为【' + exportBaracode + '】已超库存量！'
      }
    } else {
      result = await models.mReceiveOrder.sequelize
        .transaction(async t => {
          // 删除库存数据
          if (mReceiveOrder.orderType * mReceiveOrder.serviceType > 0) {
            if (inventExistsData.notExistData.length <= 0) {
              if (deleteSql.length > 0) {
                await models.mReceiveOrder.sequelize.query(deleteSql, {
                  replacements: {},
                  type: models.mReceiveOrder.sequelize.QueryTypes.DELETE
                })
              }
            }
          } else {
            if (inventExistsData.notExistData.length <= 0) {
              if (updatesql.length > 0) {
                await models.mReceiveOrder.sequelize.query(`UPDATE m_receive_order SET is_refund=0,version=${ version }
                  WHERE id=${ mReceiveOrder.orderDataId }`)
                await models.mReceiveOrder.sequelize.query(updatesql, {
                  replacements: {},
                  type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
                })
              }
            }
          }
          // 更新主表状态
          const sql = `update m_receive_order set is_audit=false, auditor =:auditor, audit_date=:audit_date,version=:version
            where org_id=:orgId and id=:id`
          await models.mReceiveOrder.sequelize.select(sql, {
            replacements: {
              id: id,
              orgId: orgId,
              auditor: userName,
              audit_date: auditDate,
              version: version
            },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
          return { success: true, message: '撤销提交成功！' }
        })
        .catch(err => {
          return { success: false, message: '撤销提交失败！', error: err.message }
        })
    }
  }
  ctx.body = result
}


// 冲预点
async function offsetPreMReceiveOrder (ctx, models) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  // 获取预点主表信息
  const order = await models.mReceiveOrder.ylFindOne({ where: { id: id } }, true)
  if (order.mReceiveOrder.isAudit) {
    const returnDeliveryOrder = await _getReturnDeliveryOrder(ctx, models, order)
    const deliveryOrder = await _getDeliveryOrder(ctx, models, order)
    const returnInAllOrder = await _getReturnInAllOrder(ctx, models, order)
    const inAllOrder = await _getInAllOrder(ctx, models, order)
    const returnOutAllOrder = await _getReturnOutAllOrder(ctx, models, order)
    const outAllOrder = await _getOutAllOrder(ctx, models, order)
    const scrpOrder = await _getScrpOrder(ctx, models, order)
    const receiveOrder = await _getReceiveOrder(ctx, models, order)
    const rebarDeilvery = await _getRebarDeilvery(ctx, models, order)
    const data = []
    receiveOrder.preOrder.mReceiveOrder.labourName = receiveOrder.preOrder.mReceiveOrder.supplierName
    data.push(receiveOrder.preOrder.mReceiveOrder, ...deliveryOrder.delInsertData.order, ...returnDeliveryOrder.refundDelInsertData.order, ...inAllOrder.inAllInsertData.order, ...returnInAllOrder.refundInAllInsertData.order, ...outAllOrder.outAllInsertData.order, ...returnOutAllOrder.refundOutAllInsertData.order, ...scrpOrder.scrpInsertData.order, ...rebarDeilvery.rebInsertData.order)
    const result = await models.mDeliveryOrder.sequelize.transaction(async (t) => {
      // 1.生成冲发料单
      if (deliveryOrder.delOrderList.length > 0) {
        await models.mDeliveryOrder.bulkCreate(deliveryOrder.delInsertData.order, ctx.extras)
        await models.mDeliveryOrderItem.bulkCreate(deliveryOrder.delInsertData.items, ctx.extras)
        await models.mDeliveryOrderAfterItem.bulkCreate(deliveryOrder.limitDelivery, ctx.extras)
        // 更新原发料单明细的冲预点状态
        await models.mReceiveOrder.sequelize.query(` update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
        where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = 10 and is_rush = 0 and order_type != -1`,
          {
            replacements: {
              id: id,
              prepoint_id: order.mReceiveOrder.id,
              prepoint_code: order.mReceiveOrder.orderCode,
              version: version
            },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
      }
      // 1-1 生成钢筋发料单
      if (rebarDeilvery.rebarDeilveryList.length > 0) {
        await models.mRebarDelivery.bulkCreate(rebarDeilvery.rebInsertData.order, ctx.extras)
        await models.mRebarDeliveryItem.bulkCreate(rebarDeilvery.rebInsertData.items, ctx.extras)
        // 更新原发料单明细的冲预点状态
        await models.mReceiveOrder.sequelize.query(` update m_rebar_delivery_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
        where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = 10 and is_rush = 0 and order_type != -1`,
          {
            replacements: {
              id: id,
              prepoint_id: order.mReceiveOrder.id,
              prepoint_code: order.mReceiveOrder.orderCode,
              version: version
            },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
        // 111
        // 2.生成冲预退发料单
        if (returnDeliveryOrder.refundDelOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(returnDeliveryOrder.refundDelInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(returnDeliveryOrder.refundDelInsertData.items, ctx.extras)
          await models.mDeliveryOrderAfterItem.bulkCreate(returnDeliveryOrder.refundLimitDelivery, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
          where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = -11 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        // 3.生成冲内调
        if (inAllOrder.inAllOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(inAllOrder.inAllInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(inAllOrder.inAllInsertData.items, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
        where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = 20 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        // 4.生成冲退内调
        if (returnInAllOrder.refundInAllOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(returnInAllOrder.refundInAllInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(returnInAllOrder.refundInAllInsertData.items, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
      where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = -21 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        // 5.生成冲外调
        if (outAllOrder.outAllOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(outAllOrder.outAllInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(outAllOrder.outAllInsertData.items, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
      where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = 30 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        // 6.生成冲退外调
        if (returnOutAllOrder.refundOutAllOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(returnOutAllOrder.refundOutAllInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(returnOutAllOrder.refundOutAllInsertData.items, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
      where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = -31 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        // 7.生成冲废料
        if (scrpOrder.scrpOrderList.length > 0) {
          await models.mDeliveryOrder.bulkCreate(scrpOrder.scrpInsertData.order, ctx.extras)
          await models.mDeliveryOrderItem.bulkCreate(scrpOrder.scrpInsertData.items, ctx.extras)
          // 更新原发料单明细的冲预点状态
          await models.mReceiveOrder.sequelize.query(`update m_delivery_order_item set is_rush = 2 ,prepoint_id=:prepoint_id ,prepoint_code=:prepoint_code,version=:version
      where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id ) and service_type = 40 and is_rush = 0 and order_type != -1`,
            {
              replacements: {
                id: id,
                prepoint_id: order.mReceiveOrder.id,
                prepoint_code: order.mReceiveOrder.orderCode,
                version: version
              },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            }
          )
        }
        // 5.更新库存数量
        await models.mReceiveOrder.sequelize.query(`update m_inventory set  use_quantity=quantity,use_book_sum=book_sum,version=:version
      where item_bar_code in (select item_bar_code from m_receive_order_item where order_id=:id )`,
          {
            replacements: { id: id, version: version },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          }
        )
        // 6.生成冲预点单
        await models.mReceiveOrder.create(receiveOrder.preOrder.mReceiveOrder, ctx.extras)
        await models.mReceiveOrderItem.bulkCreate(receiveOrder.preOrder.mReceiveOrderItems, ctx.extras)
        // 7.更新预点单状态
        await models.mReceiveOrder.sequelize.query(`update m_receive_order set is_rush = 2,order_data_id = ${ receiveOrder.preOrder.mReceiveOrder.id } ,order_data_code='${ receiveOrder.preOrder.mReceiveOrder.orderCode }',version=${ version }
      where  id=${ id } and org_id = ${ orgId }`)
        return { success: true, message: '冲预点成功' }
      }
    )
    ctx.body = { result, data }
  } else {
    result = { message: '该单据未提交！', success: false }
    data = []
    ctx.body = { result, data }
  }
}

//冲预点-从表找发料信息
async function _getDeliveryOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找发料信息===================================================
  let sql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
   where item_bar_code in (select item_bar_code from m_receive_order_item 
   where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
   and is_removed= false and service_type =10 and order_type != -1 and is_rush = 0
   group by order_id
  ),
  audititems as (
  select b.is_production_org,b.service_type,b.order_type,a.order_id,b.org_id,b.order_data_type,b.labour_id,b.ori_labour_id,b.labour_name,b.gh_id,b.ori_gh_id,b.gh_name,b.gh_full_name,a.book_sum from delitems a inner join m_delivery_order b
  on a.order_id = b.id and b.service_type = 10 and b.order_type != -1 and b.is_rush != 1
  where b.is_audit = true and b.is_approved = true
  )
  select is_production_org,service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,gh_id,ori_gh_id,gh_name,gh_full_name,sum(book_sum) book_sum from audititems
  group by is_production_org,service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name,gh_id,ori_gh_id,gh_name,gh_full_name`
  const delOrderList = await models.mReceiveOrder.sequelize.select(sql, { replacements: { id: id, org_id: orgId } })
  // 找出限额发料的计划材料;
  let planSql = `with delitems as (select org_id,material_id,order_id from m_delivery_order_item
    where item_bar_code in (select item_bar_code from m_receive_order_item 
    where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
    and is_removed= false and service_type =10 and order_type != -1 and is_rush = 0
   ),
   deliverySum as (select org_id,material_id,isnull(sum(quantity),0)quantity from m_delivery_order_item
    where item_bar_code in (select item_bar_code from m_receive_order_item 
    where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
    and is_removed= false and service_type =10 and order_type != -1 and is_rush = 0
    group by org_id,material_id
   ),
   plan as (
     select  id,material_id,org_id,order_id,isnull(quantity,0)quantity from m_delivery_order_after_item
             where order_id in (select order_id from delitems)
   ),
   result as(select material_id,org_id,sum(quantity)quantity from plan where order_id in (
            select id from m_delivery_order where service_type = 10 and order_type != -1 and is_rush != 1 
            and is_audit = true and is_approved = true and order_data_type = 1)
            group by material_id,org_id)
    select a.material_id,a.org_id,null as id,b.quantity as quantity from result a left join deliverySum b
            on a.material_id = b.material_id
            and a.org_id = b.org_id
            `
  const limitDelivery = await models.mReceiveOrder.sequelize.select(planSql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })
  const delOrderIds = await idGen(delOrderList.length)
  const delInsertData = { order: [], items: [] }
  for (let i = 0; i < delOrderList.length; i++) {
    const delorder = {}
    // 发料单赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.orderType = -5
    delorder.isRush = 2
    delorder.serviceType = 10
    delorder.printTimes = 0
    delorder.isProductionOrg = delOrderList[i].isProductionOrg
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.orderDataType = delOrderList[i].orderDataType
    delorder.totalAmount = delOrderList[i].bookSum
    delorder.orgId = delOrderList[i].orgId
    delorder.labourId = delOrderList[i].labourId
    delorder.oriLabourId = delOrderList[i].oriLabourId
    delorder.labourName = delOrderList[i].labourName
    delorder.ghId = delOrderList[i].ghId
    delorder.oriGhId = delOrderList[i].oriGhId
    delorder.ghName = delOrderList[i].ghName
    delorder.ghFullName = delOrderList[i].ghFullName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.auditor = userName
    delorder.id = delOrderIds[i]
    const codeObj = getCode({
      id: delOrderIds[i],
      orgId: delOrderList[i].orgId,
      codeWord: '发料-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: delOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
    (
    select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
    b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
    b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
    b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
    from m_delivery_order_item b
    inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
    where b.service_type = 10 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
    and a.service_type =:service_type and a.order_type != -1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
    )
    select 10 service_type, -5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
    b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.quantity,b.book_price, b.book_sum,
    b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
    b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
    from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
    where a.labour_id = :labour_id and a.gh_id=:gh_id`
    const itemReplace = {
      order_id: delOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      order_code: order.mReceiveOrder.orderCode,
      labour_id: delOrderList[i].labourId,
      gh_id: delOrderList[i].ghId,
      service_type: 10
    }

    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    delInsertData.order.push(delorder)
    delInsertData.items = [ ...delInsertData.items, ...items ]
  }
  if (limitDelivery.length > 0) {
    for (let z = 0; z < limitDelivery.length; z++) {
      limitDelivery[z].id = null
      limitDelivery[z].orderId = delInsertData.order[0].id
    }
  }
  return { delInsertData, delOrderList, limitDelivery }
}

//冲预点-从表找退发料信息
async function _getReturnDeliveryOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找退发料信息===================================================
  let turDelsql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
  where item_bar_code in (select item_bar_code from m_receive_order_item 
  where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type =30 and order_type !=-1 )
  and is_removed= false and service_type =-11 and order_type != -1 and is_rush = 0
  group by order_id
  ),
  audititems as (
  select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,
  b.gh_id,b.ori_gh_id,b.gh_name,b.gh_full_name,a.book_sum from delitems a inner join m_delivery_order b
  on a.order_id = b.id and b.service_type = -11 and b.order_type != -1 and b.is_rush != 1
  where b.is_audit = true and b.is_approved = true
  )
  select service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,gh_id,ori_gh_id,gh_name,gh_full_name,sum(book_sum) book_sum from audititems
  group by service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name,gh_id,ori_gh_id,gh_name,gh_full_name`
  refundDelOrderList = await models.mReceiveOrder.sequelize.select(turDelsql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })
  // 找出限额发料的计划材料;
  let planSql = `with delitems as (select org_id,material_id,order_id from m_delivery_order_item
    where item_bar_code in (select item_bar_code from m_receive_order_item 
    where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
    and is_removed= false and service_type =-11 and order_type != -1 and is_rush = 0
   ),
   deliverySum as (select org_id,material_id,isnull(sum(quantity),0)quantity from m_delivery_order_item
            where item_bar_code in (select item_bar_code from m_receive_order_item 
            where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
            and is_removed= false and service_type =-11 and order_type != -1 and is_rush = 0
            group by org_id,material_id
    ),
   plan as (
     select  store_id id,material_id,org_id,order_id,isnull(quantity,0)quantity from m_delivery_order_after_item
             where order_id in (select order_id from delitems)
   ),
   result as (select material_id,org_id,sum(quantity)quantity from plan where order_id in (
            select id from m_delivery_order where service_type = -11 and order_type != -1 and is_rush != 1 
            and is_audit = true and is_approved = true and order_data_type = 1)
            group by material_id,org_id
        )
     select a.material_id,a.org_id,null as id,b.quantity as quantity from result a left join deliverySum b
                    on a.material_id = b.material_id
                    and a.org_id = b.org_id`
  const refundLimitDelivery = await models.mReceiveOrder.sequelize.select(planSql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })

  // 给每一张主表生成主键ID
  const refundDelOrderIds = await idGen(refundDelOrderList.length)
  refundDelInsertData = { order: [], items: [] }
  for (let i = 0; i < refundDelOrderList.length; i++) {
    const delorder = {}
    // 退发料单赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.orderType = -5
    delorder.serviceType = -11
    delorder.isRush = 2
    delorder.printTimes = 0
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.totalAmount = refundDelOrderList[i].bookSum
    delorder.orgId = refundDelOrderList[i].orgId
    delorder.orderDataType = refundDelOrderList[i].orderDataType
    delorder.labourId = refundDelOrderList[i].labourId
    delorder.oriLabourId = refundDelOrderList[i].oriLabourId
    delorder.labourName = refundDelOrderList[i].labourName
    delorder.ghId = refundDelOrderList[i].ghId
    delorder.oriGhId = refundDelOrderList[i].oriGhId
    delorder.ghName = refundDelOrderList[i].ghName
    delorder.ghFullName = refundDelOrderList[i].ghFullName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.id = refundDelOrderIds[i]
    const codeObj = getCode({
      id: refundDelOrderIds[i],
      orgId: refundDelOrderList[i].orgId,
      codeWord: '退发料-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: refundDelOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
    (
      select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
      from m_delivery_order_item b
      inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
      where b.service_type = -11 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
      and a.service_type =:service_type and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
      )
      select  -11 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.is_offset,b.quantity,b.book_price, b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
      from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
      where a.labour_id = :labour_id and a.gh_id=:gh_id`
    const itemReplace = {
      order_id: refundDelOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      order_code: order.mReceiveOrder.orderCode,
      labour_id: refundDelOrderList[i].labourId,
      gh_id: refundDelOrderList[i].ghId,
      service_type: -11
    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    refundDelInsertData.order.push(delorder)
    refundDelInsertData.items = [ ...refundDelInsertData.items, ...items ]
  }
  if (refundLimitDelivery.length > 0) {
    for (let z = 0; z < refundLimitDelivery.length; z++) {
      refundLimitDelivery[z].id = null
      refundLimitDelivery[z].orderId = refundDelInsertData.order[0].id
    }
  }
  return { refundDelInsertData, refundDelOrderList, refundLimitDelivery }
}

//冲预点-从表找内调信息
async function _getInAllOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找内调拨信息===================================================
  let allSql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
    where item_bar_code in (select item_bar_code from m_receive_order_item 
    where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type != -1) 
    and is_removed= false and service_type = 20 and order_type != -1 and is_rush = 0
    group by order_id
    ),
    audititems as (
    select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,a.book_sum from delitems a inner join m_delivery_order b
    on a.order_id = b.id and b.service_type = 20 and b.order_type != -1 and b.is_rush != 1
    where b.is_audit = true and b.is_approved = true
    )
    select service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,sum(book_sum) book_sum from audititems
    group by service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name`
  inAllOrderList = await models.mReceiveOrder.sequelize.select(allSql, { replacements: { id: id, org_id: orgId } })
  // 给每一张主表生成主键ID
  const inAllOrderIds = await idGen(inAllOrderList.length)
  inAllInsertData = { order: [], items: [] }
  for (let i = 0; i < inAllOrderList.length; i++) {
    const delorder = {}
    // 内调拨赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.printTimes = 0
    delorder.totalAmount = inAllOrderList[i].bookSum
    delorder.orgId = inAllOrderList[i].orgId
    delorder.labourId = inAllOrderList[i].labourId
    delorder.orderDataType = inAllOrderList[i].orderDataType
    delorder.oriLabourId = inAllOrderList[i].oriLabourId
    delorder.labourName = inAllOrderList[i].labourName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.orderType = -5
    delorder.serviceType = 20
    delorder.isRush = 2
    delorder.id = inAllOrderIds[i]
    const codeObj = getCode({
      id: inAllOrderIds[i],
      orgId: inAllOrderList[i].orgId,
      codeWord: '内调-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: inAllOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
  (
  select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
  b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
  b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
  b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
  from m_delivery_order_item b
  inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
  where b.service_type = 20 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
  and a.service_type =:service_type and a.order_type !=-1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
  )
  select  2 is_rush,20 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
  b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.is_offset,b.quantity,b.book_price, b.book_sum,
  b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
  b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
  from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
  where a.labour_id = :labour_id`
    const itemReplace = {
      order_id: inAllOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      order_code: order.mReceiveOrder.orderCode,
      labour_id: inAllOrderList[i].labourId,
      service_type: 20
    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    inAllInsertData.order.push(delorder)
    inAllInsertData.items = [ ...inAllInsertData.items, ...items ]
  }
  return { inAllInsertData, inAllOrderList }
}

//冲预点-从表找退内调信息
async function _getReturnInAllOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找退内调拨信息===================================================
  let turAllSql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
   where item_bar_code in (select item_bar_code from m_receive_order_item 
   where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type =30 and order_type !=-1)
   and is_removed= false and service_type =-21 and order_type != -1 and is_rush = 0
   group by order_id
 ),
 audititems as (
 select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,a.book_sum from delitems a inner join m_delivery_order b
 on a.order_id = b.id and b.service_type = -21 and b.order_type != -1 and b.is_rush != 1
 where b.is_audit = true and b.is_approved = true
 )
 select service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,sum(book_sum) book_sum from audititems
 group by service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name`
  refundInAllOrderList = await models.mReceiveOrder.sequelize.select(turAllSql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })
  // 给每一张主表生成主键ID
  const refundAllOrderIds = await idGen(refundInAllOrderList.length)
  refundInAllInsertData = { order: [], items: [] }
  for (let i = 0; i < refundInAllOrderList.length; i++) {
    const delorder = {}
    // 调拨赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.printTimes = 0
    delorder.totalAmount = refundInAllOrderList[i].bookSum
    delorder.orgId = refundInAllOrderList[i].orgId
    delorder.orderDataType = refundInAllOrderList[i].orderDataType
    delorder.labourId = refundInAllOrderList[i].labourId
    delorder.oriLabourId = refundInAllOrderList[i].oriLabourId
    delorder.labourName = refundInAllOrderList[i].labourName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.orderType = -5
    delorder.serviceType = -21
    delorder.isRush = 2
    delorder.id = refundAllOrderIds[i]
    const codeObj = getCode({
      id: refundAllOrderIds[i],
      orgId: refundInAllOrderList[i].orgId,
      codeWord: '退调拨-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: refundInAllOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
     (
       select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
       b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
       b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
       b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
       from m_delivery_order_item b
       inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
       where b.service_type = -21 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
       and a.service_type =:service_type and a.order_type !=-1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
       )
       select -21 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
       b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.is_offset,b.quantity,b.book_price, b.book_sum,
       b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
       b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
       from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
       where a.labour_id = :labour_id`
    const itemReplace = {
      order_id: refundAllOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      order_code: order.mReceiveOrder.orderCode,
      labour_id: refundInAllOrderList[i].labourId,
      service_type: -21
    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    refundInAllInsertData.order.push(delorder)
    refundInAllInsertData.items = [ ...refundInAllInsertData.items, ...items ]
  }
  return { refundInAllInsertData, refundInAllOrderList }
}

//冲预点-从表找外调信息
async function _getOutAllOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找外调拨信息===================================================
  let outAllSql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
        where item_bar_code in (select item_bar_code from m_receive_order_item 
        where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1)
        and is_removed= false and service_type =30 and order_type != -1 and is_rush = 0
        group by order_id
        ),
        audititems as (
        select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,a.book_sum from delitems a inner join m_delivery_order b
        on a.order_id = b.id and b.service_type = 30 and b.order_type != -1 and b.is_rush != 1
        where b.is_audit = true and b.is_approved = true
        )
        select service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,sum(book_sum) book_sum from audititems
        group by service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name`

  outAllOrderList = await models.mReceiveOrder.sequelize.select(outAllSql, { replacements: { id: id, org_id: orgId } })
  // 给每一张主表生成主键ID
  const outOrderIds = await idGen(outAllOrderList.length)
  outAllInsertData = { order: [], items: [] }
  for (let i = 0; i < outAllOrderList.length; i++) {
    const delorder = {}
    // 调拨赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.printTimes = 0
    delorder.totalAmount = outAllOrderList[i].bookSum
    delorder.orgId = outAllOrderList[i].orgId
    delorder.orderDataType = outAllOrderList[i].orderDataType
    delorder.labourId = outAllOrderList[i].labourId
    delorder.oriLabourId = outAllOrderList[i].oriLabourId
    delorder.labourName = outAllOrderList[i].labourName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.orderType = -5
    delorder.serviceType = 30
    delorder.isRush = 2
    delorder.id = outOrderIds[i]
    const codeObj = getCode({
      id: outOrderIds[i],
      orgId: outAllOrderList[i].orgId,
      codeWord: '外调-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: outAllOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
    (
      select b.org_id,b.org_name,b.service_type,b.order_type,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
      from m_delivery_order_item b
      inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
      where b.service_type = 30 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
      and a.service_type =:service_type and a.order_type !=-1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
      )
      select 30 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.quantity,b.book_price, b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
      from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
      where a.labour_id = :labour_id`
    const itemReplace = {
      order_id: outOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      labour_id: outAllOrderList[i].labourId,
      order_code: order.mReceiveOrder.orderCode,
      service_type: 30,
      is_rush: 2
    }
    const items = await models.mDeliveryOrderItem.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    outAllInsertData.order.push(delorder)
    outAllInsertData.items = [ ...outAllInsertData.items, ...items ]
  }
  return { outAllInsertData, outAllOrderList }
}

//冲预点-从表找退外调信息
async function _getReturnOutAllOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找退外调拨信息===================================================
  let turOutAllSql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
      where item_bar_code in (select item_bar_code from m_receive_order_item 
      where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type != -1)
      and is_removed= false and service_type =-31 and order_type != -1 and is_rush = 0
      group by order_id
      ),
      audititems as (
      select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,a.book_sum from delitems a inner join m_delivery_order b
      on a.order_id = b.id and b.service_type = -31 and b.order_type != -1 and b.is_rush != 1
      where b.is_audit = true and b.is_approved = true
      )
      select service_type,order_type,org_id,labour_id,order_data_type,labour_name,ori_labour_id,sum(book_sum) book_sum from audititems
      group by service_type,order_type,org_id,labour_id,order_data_type,ori_labour_id,labour_name`
  refundOutAllOrderList = await models.mReceiveOrder.sequelize.select(turOutAllSql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })
  // 给每一张主表生成主键ID
  const refundOutOrderIds = await idGen(refundOutAllOrderList.length)
  refundOutAllInsertData = { order: [], items: [] }
  for (let i = 0; i < refundOutAllOrderList.length; i++) {
    const delorder = {}
    // 调拨赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.printTimes = 0
    delorder.totalAmount = refundOutAllOrderList[i].bookSum
    delorder.orgId = refundOutAllOrderList[i].orgId
    delorder.orderDataType = refundOutAllOrderList[i].orderDataType
    delorder.labourId = refundOutAllOrderList[i].labourId
    delorder.oriLabourId = refundOutAllOrderList[i].oriLabourId
    delorder.labourName = refundOutAllOrderList[i].labourName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.orderType = -5
    delorder.serviceType = -31
    delorder.isRush = 2
    delorder.id = refundOutOrderIds[i]
    const codeObj = getCode({
      id: null,
      orgId: refundOutAllOrderList[i].orgId,
      codeWord: '退外调-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: refundOutAllOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
     (
      select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
      from m_delivery_order_item b
      inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
      where b.service_type = -31 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
      and a.service_type =:service_type and a.order_type !=-1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
      )
      select  -31 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.is_offset,b.quantity,b.book_price, b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
      from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
      where a.labour_id = :labour_id`
    const itemReplace = {
      order_id: refundOutOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      labour_id: refundOutAllOrderList[i].labourId,
      order_code: order.mReceiveOrder.orderCode,
      service_type: -31

    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    refundOutAllInsertData.order.push(delorder)
    refundOutAllInsertData.items = [ ...refundOutAllInsertData.items, ...items ]
  }
  return { refundOutAllInsertData, refundOutAllOrderList }
}

//冲预点-从表找报废信息
async function _getScrpOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找报废信息===================================================
  let scpSql = `with delitems as (select order_id,sum(book_sum)book_sum from m_delivery_order_item
        where item_bar_code in (select item_bar_code from m_receive_order_item 
        where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type =30 and order_type != -1) 
        and is_removed= false and service_type =40 and order_type != -1 and is_rush = 0
        group by order_id
        ),
        audititems as (
        select b.service_type,b.order_type,a.order_id,b.order_data_type,b.org_id,b.labour_name,a.book_sum from delitems a inner join m_delivery_order b
        on a.order_id = b.id and b.service_type = 40 and b.order_type != -1 and b.is_rush != 1
        where b.is_audit = true and b.is_approved = true
        )
        select service_type,order_type,org_id,order_data_type,labour_name,sum(book_sum) book_sum from audititems
        group by service_type,order_type,org_id,labour_name,order_data_type`

  scrpOrderList = await models.mReceiveOrder.sequelize.select(scpSql, { replacements: { id: id, org_id: orgId } })
  // 给每一张主表生成主键ID
  const scrpOrderIds = await idGen(scrpOrderList.length)
  scrpInsertData = { order: [], items: [] }
  for (let i = 0; i < scrpOrderList.length; i++) {
    const delorder = {}
    // 报废单赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.auditDate = auditDate
    delorder.auditor = userName
    delorder.totalAmount = scrpOrderList[i].bookSum
    delorder.orgId = scrpOrderList[i].orgId
    delorder.orderDataType = scrpOrderList[i].orderDataType
    delorder.labourId = 0
    delorder.printTimes = 0
    delorder.oriLabourId = ''
    delorder.labourName = scrpOrderList[i].labourName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isAudit = true
    delorder.isApproved = true
    delorder.orderType = -5
    delorder.serviceType = 40
    delorder.isRush = 2
    delorder.id = scrpOrderIds[i]
    const codeObj = getCode({
      id: scrpOrderIds[i],
      orgId: scrpOrderList[i].orgId,
      codeWord: '报废-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_delivery_order',
      tenantCode: ctx.extras.tenantCode,
      index: i,
      orderDataType: scrpOrderList[i].orderDataType
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
    (
      select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,true as is_offset,b.quantity,b.book_price,b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
      from m_delivery_order_item b
      inner join m_delivery_order a on b.order_id=a.id and b.org_id = a.org_id
      where b.service_type = 40 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
      and a.service_type =:service_type and a.order_type !=-1 and a.is_audit = true and a.is_approved = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
      )
      select  40 service_type,-5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.store_room_name,
      b.store_room_full_name,b.store_room_id,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.is_offset,b.quantity,b.book_price, b.book_sum,
      b.lssue_price,b.lssue_sum,b.difference,b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,
      b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
      from items b inner join m_delivery_order a on a.id=b.order_id and a.org_id = b.org_id
      where a.labour_name = :labour_name`
    const itemReplace = {
      order_id: scrpOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      labour_name: scrpOrderList[i].labourName,
      order_code: order.mReceiveOrder.orderCode,
      service_type: 40
    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    scrpInsertData.order.push(delorder)
    scrpInsertData.items = [ ...scrpInsertData.items, ...items ]
  }
  return { scrpInsertData, scrpOrderList }
}

//冲预点-从钢筋发料中找出相对应的材料
async function _getRebarDeilvery (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  // ==================================================从表找发料信息===================================================
  let sql = `with delitems as (select order_id,sum(book_sum)book_sum from m_rebar_delivery_item
   where item_bar_code in (select item_bar_code from m_receive_order_item 
   where order_id =:id and org_id=:org_id and is_removed= false and is_rush= 0 and service_type = 30 and order_type !=-1 ) 
   and is_removed= false and service_type =10 and order_type != -1 and is_rush = 0
   group by order_id
  ),
  audititems as (
  select b.service_type,b.order_type,a.order_id,b.org_id,b.labour_id,b.ori_labour_id,b.labour_name,b.gh_id,b.ori_gh_id,b.gh_name,b.gh_full_name,a.book_sum from delitems a inner join m_rebar_delivery b
  on a.order_id = b.id and b.service_type = 10 and b.order_type != -1 and b.is_rush != 1
  where b.is_submit = true
  )
  select service_type,order_type,org_id,labour_id,labour_name,ori_labour_id,gh_id,ori_gh_id,gh_name,gh_full_name,sum(book_sum) book_sum from audititems
  group by service_type,order_type,org_id,labour_id,ori_labour_id,labour_name,gh_id,ori_gh_id,gh_name,gh_full_name`
  const rebarDeilveryList = await models.mDeliveryOrder.sequelize.select(sql, {
    replacements: {
      id: id,
      org_id: orgId
    }
  })
  // 给每一张主表生成主键ID
  const rebOrderIds = await idGen(rebarDeilveryList.length)
  const rebInsertData = { order: [], items: [] }
  for (let i = 0; i < rebarDeilveryList.length; i++) {
    const delorder = {}
    // 发料单赋值
    delorder.orderDate = newOrderDate
    delorder.orgName = order.mReceiveOrder.orgName
    delorder.orderType = -5
    delorder.isRush = 2
    delorder.serviceType = 10
    delorder.printTimes = 0
    delorder.prepointId = order.mReceiveOrder.id
    delorder.prepointCode = order.mReceiveOrder.orderCode
    delorder.submitDate = auditDate
    delorder.bookSum = rebarDeilveryList[i].bookSum
    delorder.orgId = rebarDeilveryList[i].orgId
    delorder.labourId = rebarDeilveryList[i].labourId
    delorder.oriLabourId = rebarDeilveryList[i].oriLabourId
    delorder.labourName = rebarDeilveryList[i].labourName
    delorder.ghId = rebarDeilveryList[i].ghId
    delorder.oriGhId = rebarDeilveryList[i].oriGhId
    delorder.ghName = rebarDeilveryList[i].ghName
    delorder.ghFullName = rebarDeilveryList[i].ghFullName
    delorder.recordedDate = orderDate
    delorder.remark = order.mReceiveOrder.remark
    delorder.maker = order.mReceiveOrder.maker
    delorder.makerDate = auditDate
    delorder.isSubmit = true
    delorder.submittor = userName
    delorder.id = rebOrderIds[i]
    const codeObj = getCode({
      id: rebOrderIds[i],
      orgId: rebarDeilveryList[i].orgId,
      codeWord: '钢筋发-冲预-',
      orderDate: newOrderDate,
      tableName: 'm_rebar_delivery',
      tenantCode: ctx.extras.tenantCode,
      index: i
    })
    const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
    delorder.orderCode = coderesult[0].orderCode
    delorder.orderNumber = delorder.orderCode.substring(delorder.orderCode.length - 11)
    // 给主表存从表数据
    const itemsql = `with items as
    (
    select b.org_id,b.org_name,b.service_type,b.order_type,b.is_rush,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.item_bar_code,:prepoint_id as prepoint_id,:order_code as prepoint_code,b.quantity,b.book_price,b.book_sum,
    b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,b.total_length,b.rebar_length,b.theory_weight,b.loss_rate,b.weight_kg,b.weight_ton,
    b.sort_code,b.ori_material_id,b.ori_class_id,b.order_id
    from m_rebar_delivery_item b
    inner join m_rebar_delivery a on b.order_id=a.id and b.org_id = a.org_id
    where b.service_type = 10 and b.order_type !=-1 and b.is_rush=0 and b.item_bar_code in (select item_bar_code from m_receive_order_item where order_id = :id and is_removed=false and service_type = 30 and is_rush = 0)
    and a.service_type =:service_type and a.order_type != -1 and a.is_submit = true and b.is_removed=false  and a.is_removed=false and a.is_rush != 1
    )
    select 10 service_type, -5 order_type,b.org_id,b.org_name,b.material_id,b.material_code,b.material_name,b.material_model,b.material_unit,b.item_bar_code,b.prepoint_id,b.prepoint_code,b.quantity,b.book_price, b.book_sum,
    b.manufacturer,b.batch_no,b.storage_room,b.info_remark,b.item_remark,b.class_id,b.class_full_id,b.total_length,b.rebar_length,b.theory_weight,b.loss_rate,b.weight_kg,b.weight_ton,
    b.sort_code,b.ori_material_id,b.ori_class_id ,:order_id as order_id 
    from items b inner join m_rebar_delivery a on a.id=b.order_id and a.org_id = b.org_id
    where a.labour_id = :labour_id and a.gh_id=:gh_id`
    const itemReplace = {
      order_id: rebOrderIds[i],
      id: id,
      prepoint_id: order.mReceiveOrder.id,
      order_code: order.mReceiveOrder.orderCode,
      labour_id: rebarDeilveryList[i].labourId,
      gh_id: rebarDeilveryList[i].ghId,
      service_type: 10
    }
    const items = await models.mReceiveOrder.sequelize.select(itemsql, { replacements: itemReplace })
    // 构造主从表
    items.forEach(element => {
      element.isRush = 2
    })
    rebInsertData.order.push(delorder)
    rebInsertData.items = [ ...rebInsertData.items, ...items ]
  }
  return { rebInsertData, rebarDeilveryList }
}

//冲预点-冲预点数据
async function _getReceiveOrder (ctx, models, order) {
  const { orgId, id, userName, orderDate } = ctx.request.body
  const version = await idGen()
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  const auditDate = common.formatDate()
  const preOrder = JSON.parse(JSON.stringify(order))
  // 生成冲预点单
  preOrder.mReceiveOrder.serviceType = -32
  preOrder.mReceiveOrder.orderDate = newOrderDate
  preOrder.mReceiveOrder.orderDataId = order.mReceiveOrder.id
  preOrder.mReceiveOrder.orderDataCode = order.mReceiveOrder.orderCode
  preOrder.mReceiveOrder.recordedDate = orderDate
  preOrder.mReceiveOrder.auditDate = auditDate
  preOrder.mReceiveOrder.makerDate = auditDate
  preOrder.mReceiveOrder.printTimes = 0
  preOrder.mReceiveOrder.maker = userName
  preOrder.mReceiveOrder.auditor = userName
  preOrder.mReceiveOrder.id = await idGen()
  const codeObj = getCode({
    id: null,
    orgId: preOrder.mReceiveOrder.orgId,
    codeWord: '冲预点-',
    orderDate: newOrderDate,
    tableName: 'm_receive_order',
    tenantCode: ctx.extras.tenantCode,
    index: 0
  })
  const coderesult = await models.mReceiveOrder.sequelize.select(codeObj.sql, { replacements: codeObj.replacements })
  preOrder.mReceiveOrder.orderCode = coderesult[0].orderCode
  preOrder.mReceiveOrder.orderNumber = preOrder.mReceiveOrder.orderCode.substring(preOrder.mReceiveOrder.orderCode.length - 11)
  // 处理明细数据
  preOrder.mReceiveOrderItems.forEach(element => {
    element.serviceType = preOrder.mReceiveOrder.serviceType
    element.itemDataId = element.id
    element.id = null
    element.orderId = preOrder.mReceiveOrder.id
    element.serviceType = -32
    element.isRush = 2
  })
  return { preOrder }
}

// 获取单号的sql字符串构造
function getCode (options) {
  if (options.dataBaseInfo === undefined || options.dataBaseInfo === null || options.dataBaseInfo === '') {
    options.dataBaseInfo = 'mtlp'
  }
  // index处理单号重复
  const { id, orgId, codeWord, orderDate, tableName, dataBaseInfo, tenantCode, index, orderDataType } = options
  // 把OrderDate处理开始和结束时间,构造时间的sql语句
  // 额外参数
  let condtionSql = ''
  if (orderDataType !== undefined) {
    condtionSql = `and order_data_type = :order_data_type`
  }
  let dateWhereStr = ''
  if (orderDate.length === 7) {
    dateWhereStr = ` and order_date= :order_date `
  } else {
    const beginDate = moment(new Date(orderDate).setDate(1)).format('YYYY-MM-DD 00:00:00'.substr(0, orderDate.length))
    const year = new Date(orderDate).getFullYear()
    const month = new Date(orderDate).getMonth() + 1
    const endDate = moment(new Date(year, month, 0)).format('YYYY-MM-DD 23:59:59'.substr(0, orderDate.length))
    dateWhereStr = ` and order_date >= '${ beginDate }' and order_date<= '${ endDate }'`
  }
  // 查询未修改月份，则返回原单号，如果修改了月份，则生成新单号
  const sql = `select concat(:code_word, 
  REPLACE(left(:order_date,7),'-',''),
  right(concat('000000',cast( ifnull(cast(right(ifnull(max(ifnull(right(order_code,5),'0')),'000000'),5) as int),0)+1+${ index } as string)),5)) as order_code
  from ${ tenantCode }_${ dataBaseInfo }.${ tableName }
  where  (case when (select count(*) from ${ tenantCode }_${ dataBaseInfo }.${ tableName } where id =:id and org_id=org_id  ${ dateWhereStr })>0 then 2 else 1 end)=1
  and org_id=:org_id ${ dateWhereStr } ${ condtionSql }`
  return {
    sql: sql,
    replacements: { id: id, org_id: orgId, order_date: orderDate, code_word: codeWord, order_data_type: orderDataType }
  }
}

// 获取冲预点状态值
async function receiveOrderRushPointStatus (ctx, models) {
  let { orgId, orderDate } = ctx.request.body
  if (orderDate) {
    orderDate = await common.getAccountMonth(orderDate, { orgId })
  }
  const result = await models.mReceiveOrder.sequelize.select(`SELECT count(id) count FROM m_receive_order WHERE org_id=${ orgId } and order_type=-2 and is_offset=true
    ${ orderDate ? ` AND order_date='${ orderDate }'` : `` }`)
  ctx.body = result[0].count
}

// 退货
async function receiveReturnOrder (ctx, models) {
  const { orgId, id, orderDate } = ctx.request.body
  const { mReceiveOrder, mReceiveOrderItems } = await models.mReceiveOrder.ylFindOne({
    where: {
      orgId: orgId,
      id: id
    }
  }, true)
  let result = null
  if (mReceiveOrder) {
    if (mReceiveOrder.isRefund === 1) { //已退货
      result = { success: false, message: '单据已退货' }
    } else {
      if (mReceiveOrderItems.length > 0) {
        let barcodes = ''
        mReceiveOrderItems.forEach(e => {
          barcodes = barcodes + ',\'' + e.itemBarCode + '\''
        })
        // 发料表是否有业务相关的数据
        const sqlDer = `select  order_id
                         from  m_delivery_order_item
                         where org_id =:org_id 
                            and item_bar_code IN (${ barcodes.substr(1) })
                            and is_removed = false and service_type>0 and  order_type>0
                            and is_rush=0 and is_refund=0`
        const deliveryList = await models.mReceiveOrder.sequelize.select(sqlDer, {
          replacements: {
            id: id,
            org_id: orgId
          }
        })
        let deliveryOrders = []
        if (deliveryList.length > 0) {
          const ids = deliveryList.map(e => e.orderId).join()
          const sql = `
                  select org_id,id,org_name,order_code,order_date,recorded_date,
                        labour_id,labour_name,gh_full_name,is_refund
                  from m_delivery_order 
                  where org_id =:org_id  and id in(${ ids }) and is_removed = false and is_audit=true `
          deliveryOrders = await models.mDeliveryOrder.sequelize.select(sql, {
            replacements: {
              id: id,
              org_id: orgId
            }
          })
        }
        // 返回发生业务的单据
        const receiveSql = ` 
                  SELECT org_id,id,org_name,order_code,order_date,recorded_date,supplier_id,supplier_name,service_type
                  from m_receive_order
                  where  org_id =:org_id and id=:id and is_removed = false and
                        is_audit=true and is_refund=0 `
        const recieveList = await models.mReceiveOrder.sequelize.select(receiveSql, {
          replacements: {
            id: id,
            org_id: orgId
          }
        })
        if ((deliveryOrders && deliveryOrders.length > 0)) {
          result = { success: true, deliveryOrders: deliveryOrders, receiveOrders: recieveList }
        } else {
          result = await _createReturnOrder(ctx, models, mReceiveOrder, mReceiveOrderItems)
        }
      } else {
        result = { success: false, message: '单据没有要退的材料' }
      }
    }
  } else {
    result = { success: false, message: '单据已不存在' }
  }
  ctx.body = result
}

// 常用材料带成本科目
async function queryMaterialsStoreParmas (ctx, models) {
  let { offset, limit, order, dictType, categoryName, classId, condtionItems } = ctx.request.body
  const { whereStr, orgId } = joincondition.condtionItemsToSql(condtionItems)
  const replaceParams = joincondition.condtionItemsToParams(condtionItems)
  const tenantCode = ctx.extras.tenantCode
  if (offset === undefined) {
    offset = 0
  }
  if (limit === undefined) {
    limit = 20
  }
  if (order === undefined) {
    order = [ [ 'id' ] ]
  }
  Assert.notNullOrUndefined(
    orgId,
    new ErrorCode('invalid_service_parameter', 'orgId必须传值')
  )

  let dictSql = ''
  if (classId && classId !== -1) {
    const arr = await rpcClient.get({ path: '/material-categories;childIds/' + classId }, { serviceId: 'material-service' })
    arr.push(classId)
    if (arr.length) {
      dictSql = `${ dictSql } and class_id in(${ arr.toString() })`
    }
  }

  const sql =
    `with
  material as (
  SELECT id, org_id, material_code, material_name, material_model, material_unit, first_conversion_rate, 
        first_auxiliary_unit, second_conversion_rate, second_auxiliary_unit, class_id, class_full_id, bid_price, 
        cost_price, purchase_price, is_weight, is_confirm, deduction_rate, loss_rate, ori_material_id, 
        ori_class_id, ori_org_id, remark,use_count 
   FROM c_material 
   where class_id in (select id from ${ tenantCode }_platform.material_category where type= 0 and is_removed=false)
   and org_id=${ orgId } and  is_removed=false ${ dictSql } 
    ),
  statistic as (
    SELECT material_category_id,category_full_name as store_room_full_name,category_name as store_room_name,category_id as store_room_id
     FROM g_statistic_items
    where is_removed=FALSE and category_id in (SELECT id FROM g_statistic_category
      where is_removed=FALSE and dict_type='storeRoom' and is_leaf=true)
      ${ replaceParams.category_name ? 'and category_name = :category_name' : '' }
    )
  select a.*,b.store_room_name,b.store_room_full_name,b.store_room_id
      FROM material a 
      left join (select * from  statistic) as b
      on a.class_id = b.material_category_id
      where org_id=${ orgId } ${ whereStr }
  order by use_count desc limit ${ limit } offset ${ offset }`
  const sqlCount = `
    SELECT count(id) as count from  c_material 
    where class_id in (select id from ${ tenantCode }_platform.material_category where type= 0 and is_removed=false)
    and org_id=${ orgId } and  is_removed=false ${ dictSql }
    ${ whereStr }`

  const result = await models.mReceiveOrder.sequelize.select(sql, { replacements: replaceParams })
  const resultCount = await models.mReceiveOrder.sequelize.select(sqlCount, { replacements: replaceParams })
  ctx.body = { rows: result, count: resultCount[0].count }
}


// 冲预点时获取与该单据发生过所以关系的所有明细数据
async function receiveOrderRushPointDate (ctx, models) {
  const { orgId, id } = ctx.request.body
  const itemSql = `with
      receiveItem  as(
               select  id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,
                       quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark
                       from  m_receive_order_item
               where org_id =:org_id and is_removed = false
                     and item_bar_code in (select item_bar_code from m_receive_order_item
                     where org_id =:org_id and is_removed = false and order_id = :id and is_refund = 0 and is_rush = 0)
                     and order_type != -1 and (service_type != -31 or service_type != -32)       
              ),
      receiveOrder as (
              select a.*,order_code,order_date from  receiveItem a 
              inner join (select id,org_id,order_code,order_date from m_receive_order where org_id= :org_id
                        and is_removed = false and is_audit = true and is_refund = 0 and is_rush = 0
                        and order_type != -1 and (service_type != -31 or service_type != -32))b
              on a.order_id = b.id
              and a.org_id = b.org_id
              ),
      deliveryItem as (
              select  id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,
                      quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark
                      from  m_delivery_order_item
              where org_id =:org_id and is_removed = false
                    and item_bar_code in (select item_bar_code from m_receive_order_item
                    where org_id =:org_id and is_removed = false and order_id = :id and is_rush = 0 and (order_type !=-1 or order_type !=-5))

        ),
       deliveryOrder as (
               select a.*,order_code,order_date from  deliveryItem a 
               inner join (select id,org_id,order_code,order_date from m_delivery_order where org_id= :org_id
                         and is_removed = false and is_audit = true and is_rush != 1 and (order_type !=-1 or order_type !=-5))b
               on a.order_id = b.id
               and a.org_id = b.org_id
               )
              select  order_code,order_date,id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark from receiveOrder 
              union 
              select  order_code,order_date,id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark from deliveryOrder 
            `
  const itemlist = await models.mReceiveOrder.sequelize.select(itemSql, { replacements: { id: id, org_id: orgId } })
  ctx.body = itemlist
}


/**
 * 分页获取合同供应商信息
 */
async function queryMReceiveSuppliersData (ctx, models) {
  let { offset, limit, condtionItems } = ctx.request.body
  const replaceParams = joincondition.condtionItemsToParams(condtionItems)
  if (offset === undefined) {
    offset = 0
  }
  if (limit === undefined) {
    limit = 20
  }
  replaceParams.offset = offset
  replaceParams.limit = limit
  const tenantCode = ctx.extras.tenantCode
  let sqlStr = ''
  if (replaceParams.supplier_name) {
    sqlStr = 'and supplier_name like :supplier_name'
  }
  if (replaceParams.org_id === undefined) {
    replaceParams.org_id = ctx.extras.orgId
  }
  const sql = `select distinct supplier_id,supplier_name,ori_supplier_id
                from m_receive_order  
                where org_id in (select child_org_id from ${ tenantCode }_platform.org_relation where org_id=:org_id and child_type='project')
                    and is_removed=false  ${ replaceParams.is_audit ? 'and is_audit = :is_audit' : '' }  ${ sqlStr }
               order by supplier_id limit :limit offset :offset`
  const result = await models.mReceiveOrder.sequelize.select(sql, {
    replacements: replaceParams
  })
  let newResult = { count: 0, rows: [] }
  if (result) {
    newResult = { count: result.length, rows: result }
  }
  ctx.body = newResult
}

/**
 * 获取冲红数据列表
 * @param {*} ctx
 * @param {*} models
 */
async function getReceiveOrderRedData (ctx, models) {
  const { orgId, id, orderDate } = ctx.request.body
  const { mReceiveOrder, mReceiveOrderItems } = await models.mReceiveOrder.ylFindOne({
    where: {
      orgId: orgId,
      id: id
    }
  }, true)
  let result = null
  if (mReceiveOrder) {
    if (mReceiveOrder.isRush === 1) { //已冲红
      result = { success: false, message: '单据已冲红' }
    } else {
      // 冲红（不考虑预点）
      if (mReceiveOrder.serviceType === -32) {
        result = { success: false, message: '此单据是冲预点单不可以冲红' }
      } else {
        if (mReceiveOrderItems.length > 0) {
          let barcodes = ''
          mReceiveOrderItems.forEach(e => {
            barcodes = barcodes + ',\'' + e.itemBarCode + '\''
          })
          //查看发料表有发生业务数据吗
          const sqlDer = `select  order_id
                         from  m_delivery_order_item
                         where org_id =:org_id 
                            and item_bar_code IN (${ barcodes.substr(1) })
                            and is_removed = false and service_type>0 and  order_type>0
                            and is_rush=0 and is_refund=0`
          const deliveryList = await models.mReceiveOrder.sequelize.select(sqlDer, {
            replacements: {
              id: id,
              org_id: orgId
            }
          })
          let deliveryOrders = []
          if (deliveryList.length > 0) {
            const ids = deliveryList.map(e => e.orderId).join()
            const sql = `
                  select org_id,id,org_name,order_code,order_date,recorded_date,
                        labour_id,labour_name,gh_full_name,is_rush,'delivery' table_name
                  from m_delivery_order 
                  where org_id =:org_id  and id in(${ ids }) and is_removed = false and is_audit=true 
                  order by order_code desc,order_date `
            deliveryOrders = await models.mDeliveryOrder.sequelize.select(sql, {
              replacements: {
                id: id,
                org_id: orgId
              }
            })
          }
          // 返回发生业务的单据
          const receiveSql = ` 
                  SELECT org_id,id,org_name,order_code,order_date,recorded_date,supplier_id,supplier_name,service_type, 'receive' table_name
                  from m_receive_order
                  where  org_id =:org_id and order_data_id=:id and is_removed = false and
                        is_audit=true and is_rush=0 `
          const recieveList = await models.mReceiveOrder.sequelize.select(receiveSql, {
            replacements: {
              id: id,
              org_id: orgId
            }
          })

          mReceiveOrder.tableName = 'receive'
          if (deliveryOrders.length > 0 || recieveList.length > 0) {
            recieveList.push(mReceiveOrder)
            result = { success: true, deliveryOrders: deliveryOrders, receiveOrders: recieveList }
          } else {
            result = { success: true, receiveOrders: [ mReceiveOrder ] }
            // result = await _createRedOrder(ctx, models, mReceiveOrder, mReceiveOrderItems)
          }
        } else {
          result = { success: false, message: '单据没有要冲的材料' }
        }
      }
    }
  } else {
    result = { success: false, message: '单据已不存在' }
  }
  ctx.body = result
}

/* 冲红操作
* @param {*} ctx
* @param {*} models
*/
async function receiveOrderRedState (ctx, models) {
  const { orgId, id, orderDate } = ctx.request.body
  const { mReceiveOrder, mReceiveOrderItems } = await models.mReceiveOrder.ylFindOne({
    where: {
      orgId: orgId,
      id: id
    }
  }, true)
  let result = null
  if (mReceiveOrder) {
    if (mReceiveOrder.isRush === 1) { //已冲红
      result = { success: false, message: '单据已冲红' }
    } else if (mReceiveOrder.isSummary) { //已汇总
      const sql = `select order_code from m_receive_summary where id in (
                      select order_id from m_receive_summary_item where org_id=:org_id and receive_order_id=:id and is_removed=false
                    ) and is_submit=true`
      const orderCode = await models.mReceiveOrder.sequelize.select(sql, { replacements: { id: id, org_id: orgId } })
      result = { success: false, message: orderCode }
    } else {
      // 冲红（不考虑预点）
      if (mReceiveOrder.serviceType === -32) {
        result = { success: false, message: '此单据是冲预点单不可以冲红' }
      } else {
        if (mReceiveOrderItems.length > 0) {
          result = await _createRedOrder(ctx, models, mReceiveOrder, mReceiveOrderItems)
        } else {
          result = { success: false, message: '单据没有要冲的材料' }
        }
      }
    }
  } else {
    result = { success: false, message: '单据已不存在' }
  }
  ctx.body = result
}

async function _createRedOrder (ctx, models, mReceiveOrder, mReceiveOrderItems) {
  const { orgId, id, orderDate } = ctx.request.body
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  let result = null
  //serviceType  收料（10） 退货（-11）, 调入（20） 退调入（-21）, 预点（30） 退预点(-31)
  // 判断一下库存数量够退不
  // 正常单据库存必须和点验单的数量一致。退货冲，库存数量为0
  let whereString = 'where a.use_quantity=0'
  if (mReceiveOrder.serviceType < 0) {
    whereString = 'where b.quantity = a.use_quantity'
  }
  const columns = {
    targetColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
    sourceColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
    ignoreColumns: { quantity: true }
  }
  const { existsData, notExistData } = await models.mInventory.queryExistsData(
    mReceiveOrderItems,
    columns,
    whereString
  )
  const code = mReceiveOrder.orderCode.split('-')
  mReceiveOrder.orderCode = await common.createCodeOrder({
    id: null,
    orgId: orgId,
    codeWord: code[0] + '-冲红-',
    recordedDate: newOrderDate,
    tableName: 'm_receive_order',
    dateFormat: 'YYYYMM'
  })
  mReceiveOrder.orderNumber = mReceiveOrder.orderCode.substring(mReceiveOrder.orderCode.length - 11)
  if (notExistData.length === 0) {
    // 直接冲红, 生产新的冲红单，修改原来的状态
    const redOrder = Object.assign({}, mReceiveOrder)
    const redOrderItems = []
    redOrder.isRefund = 0
    redOrder.isRush = 0
    redOrder.orderType = -1 // 冲红
    delete redOrder.id
    delete redOrder.version
    redOrder.printTimes = 0
    redOrder.orderDataId = mReceiveOrder.id
    redOrder.orderDataCode = mReceiveOrder.orderCode
    redOrder.id = redOrder.version = await idGen()
    redOrder.recordedDate = orderDate
    redOrder.orderDate = await common.getAccountMonth(redOrder.recordedDate, { orgId: redOrder.orgId })
    const now = common.formatDate()
    redOrder.auditDate = redOrder.makerDate = now
    redOrder.auditor = redOrder.maker = ctx.extras.userName ? crypto.decrypt(ctx.extras.userName) : '无名'
    mReceiveOrderItems.forEach(e => {
      const redItem = Object.assign({}, e)
      redItem.isRefund = 0
      redItem.isRush = 0
      redItem.orderType = -1 // 冲红
      redItem.orderId = redOrder.id
      delete redItem.id
      delete redItem.version
      redOrderItems.push(redItem)
    })
    // 更新库存脚本

    let updateDataSql = ``
    existsData.forEach(i => {
      updateDataSql += `(${ i.orgId } org_id,
      '${ i.itemBarCode }' item_bar_code,
      ${ i.quantity } quantity,
      ${ i.bookSum } book_sum),`
    })
    updateDataSql = updateDataSql.length > 0 ? updateDataSql.substr(0, updateDataSql.length - 1) : ''
    let updateSql = ``
    let originOrderSql = ``
    // 正常单据库存
    if (mReceiveOrder.serviceType < 0) { // 冲退货功能，减发
      // 冲退货要去改他的原始单据的退标记为0
      originOrderSql = `update m_receive_order set is_refund=0 where  org_id =:org_id  and id=:id `
      updateSql = `update m_inventory 
                  set m_inventory.use_quantity = cast (m_inventory.use_quantity - a.quantity as decimal(28,4)),
                        m_inventory.use_book_sum =  cast (m_inventory.use_book_sum -a.book_sum as decimal(28,4))
                  from m_inventory 
                  inner join (select org_id,item_bar_code,sum(quantity) quantity,sum(book_sum) book_sum
                              from(values ${ updateDataSql }) b group by org_id,item_bar_code) 
                  as a
                  on m_inventory.org_id=a.org_id
                  and m_inventory.item_bar_code=a.item_bar_code`
    } else { // 冲正常收
      updateSql = `update m_inventory 
                  set m_inventory.use_quantity = cast (m_inventory.use_quantity + a.quantity as decimal(28,4)),
                    m_inventory.use_book_sum =  cast (m_inventory.use_book_sum + a.book_sum as decimal(28,4))
                  from m_inventory 
                  inner join (select org_id,item_bar_code,sum(quantity) quantity,sum(book_sum) book_sum
                            from(values ${ updateDataSql }) b group by org_id,item_bar_code) 
                  as a
                  on m_inventory.org_id=a.org_id
                  and m_inventory.item_bar_code=a.item_bar_code`
    }

    result = await models.mReceiveOrder.sequelize
      .transaction(async t => {
        // 更新库存数据
        await models.mDeliveryOrder.sequelize.query(updateSql, {
          replacements: {},
          type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
        })
        //生产新的冲红单据
        await models.mReceiveOrder.create(redOrder, ctx.extras)
        // 生产新的冲红单据明细
        await models.mReceiveOrderItem.bulkCreate(redOrderItems, ctx.extras)
        // 修改原来的单据冲红标记
        await models.mDeliveryOrder.sequelize.query('update m_receive_order set is_rush =1 where  org_id =:org_id  and id=:id ',
          {
            replacements: { id: id, org_id: orgId },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
        // 修改原来的单据冲红标记
        await models.mDeliveryOrder.sequelize.query('update m_receive_order_item  set is_rush=1  where  org_id =:org_id  and id=:id ',
          {
            replacements: { id: id, org_id: orgId },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })

        if (mReceiveOrder.serviceType < 0) {  // 冲退货要去改他的原始单据的退标记为0
          await models.mDeliveryOrder.sequelize.query('update m_receive_order set is_refund =0 where  org_id =:org_id  and id=:id ',
            {
              replacements: { id: mReceiveOrder.orderDataId, org_id: orgId },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
          await models.mDeliveryOrder.sequelize.query('update m_receive_order_item  set is_refund=0  where  org_id =:org_id  and id=:id ',
            {
              replacements: { id: mReceiveOrder.orderDataId, org_id: orgId },
              type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
            })
        }
        return { success: true, message: `冲红成功新的冲红单为${ redOrder.orderCode }`, id: mReceiveOrder.id }
      })
      .catch(err => {
        return { success: false, message: '冲红失败！', error: err.message }
      })
  } else {
    const exportBaracode = notExistData.map(e => e.itemBarCode).join()
    result = {
      success: false,
      message:
        '冲红失败！条码为【' + exportBaracode + '】的材料不能超库存量！'
    }
  }
  return result
}

async function _createReturnOrder (ctx, models, mReceiveOrder, mReceiveOrderItems) {
  const { orgId, id, orderDate } = ctx.request.body
  const newOrderDate = await common.getAccountMonth(orderDate, { orgId })
  let result = null
  //serviceType  收料（10） 退货（-11）, 调入（20） 退调入（-21）, 预点（30） 退预点(-31)
  // 判断一下库存数量够退不
  // 正常单据库存必须和点验单的数量一致。退货，库存数量为0
  let whereString = 'where a.use_quantity=0'
  if (mReceiveOrder.serviceType < 0) {
    whereString = 'where b.quantity = a.use_quantity'
  }
  const columns = {
    targetColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
    sourceColumns: [ 'orgId', 'itemBarCode', 'quantity' ],
    ignoreColumns: { quantity: true }
  }
  const { existsData, notExistData } = await models.mInventory.queryExistsData(
    mReceiveOrderItems,
    columns,
    whereString
  )
  const code = mReceiveOrder.orderCode.split('-')
  mReceiveOrder.orderCode = await common.createCodeOrder({
    id: null,
    orgId: orgId,
    codeWord: '退' + code[0] + '-',
    recordedDate: newOrderDate,
    tableName: 'm_receive_order',
    dateFormat: 'YYYYMM'
  })
  mReceiveOrder.orderNumber = mReceiveOrder.orderCode.substring(mReceiveOrder.orderCode.length - 11)
  if (mReceiveOrder.serviceType === 10) {
    mReceiveOrder.serviceType = -11
  } else if (mReceiveOrder.serviceType === 20) {
    mReceiveOrder.serviceType = -21
  } else {
    mReceiveOrder.serviceType = -31
  }
  if (notExistData.length === 0) {
    // 直接退货, 生产新的退货单，修改原来的状态

    const returnOrder = Object.assign({}, mReceiveOrder)
    const returnOrderItems = []
    returnOrder.isRefund = 0
    returnOrder.isRush = 0
    // const code = mReceiveOrder.orderCode.split('-')
    // returnOrder.orderCode = '退' + mReceiveOrder.orderCode

    returnOrder.orderDate = newOrderDate
    returnOrder.serviceType = mReceiveOrder.serviceType // 退货
    delete returnOrder.id
    delete returnOrder.version
    returnOrder.printTimes = 0
    returnOrder.orderDataId = mReceiveOrder.id
    returnOrder.orderDataCode = mReceiveOrder.orderCode
    returnOrder.id = returnOrder.version = await idGen()
    returnOrder.recordedDate = orderDate
    const now = common.formatDate()
    returnOrder.auditDate = returnOrder.makerDate = now
    returnOrder.auditor = returnOrder.maker = ctx.extras.userName ? crypto.decrypt(ctx.extras.userName) : '无名'


    mReceiveOrderItems.forEach(e => {
      const returnItem = Object.assign({}, e)
      returnItem.isRefund = 0
      returnItem.isRush = 0
      returnItem.serviceType = returnOrder.serviceType // 退货
      returnItem.orderId = returnOrder.id
      delete returnItem.id
      delete returnItem.version
      returnOrderItems.push(returnItem)
    })
    // 更新库存脚本

    let updateDataSql = ``
    existsData.forEach(i => {
      updateDataSql += `(${ i.orgId } org_id,
      '${ i.itemBarCode }' item_bar_code,
      ${ i.quantity } quantity,
      ${ i.bookSum } book_sum),`
    })
    updateDataSql = updateDataSql.length > 0 ? updateDataSql.substr(0, updateDataSql.length - 1) : ''
    let updateSql = ``
    // 退正常收
    updateSql = `update m_inventory 
      set m_inventory.use_quantity = cast (m_inventory.use_quantity + a.quantity as decimal(28,4)),
        m_inventory.use_book_sum =  cast (m_inventory.use_book_sum + a.book_sum as decimal(28,4))
      from m_inventory 
      inner join (select org_id,item_bar_code,sum(quantity) quantity,sum(book_sum) book_sum
                from(values ${ updateDataSql }) b group by org_id,item_bar_code) 
      as a
      on m_inventory.org_id=a.org_id
      and m_inventory.item_bar_code=a.item_bar_code`
    result = await models.mReceiveOrder.sequelize
      .transaction(async t => {
        // 更新库存数据
        await models.mReceiveOrder.sequelize.query(updateSql, {
          replacements: {},
          type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
        })
        //生产新的退货单据
        await models.mReceiveOrder.create(returnOrder, ctx.extras)
        // 生产新的退货单据明细
        await models.mReceiveOrderItem.bulkCreate(returnOrderItems, ctx.extras)
        // 修改原来的单据退货标记
        await models.mReceiveOrder.sequelize.query('update m_receive_order set is_refund =1 where  org_id =:org_id  and id=:id ',
          {
            replacements: { id: id, org_id: orgId },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
        // 修改原来的单据明细退货标记
        await models.mReceiveOrder.sequelize.query('update m_receive_order_item set is_refund=1  where  org_id =:org_id  and id=:id ',
          {
            replacements: { id: id, org_id: orgId },
            type: models.mReceiveOrder.sequelize.QueryTypes.UPDATE
          })
        return { success: true, message: `退货成功新的退货单为${ returnOrder.orderCode }`, id: mReceiveOrder.id }
      })
      .catch(err => {
        return { success: false, message: '退货失败！', error: err.message }
      })

  } else {
    const exportBaracode = notExistData.map(e => e.itemBarCode).join()
    result = {
      success: false,
      message:
        '退货失败！条码为【' + exportBaracode + '】的材料不能超库存量！'
    }
  }
  return result
}

// 获取退货数据列表
async function getReceiveOrderReturnData (ctx, models) {
  const { orgId, id, orderDate } = ctx.request.body
  const { mReceiveOrder, mReceiveOrderItems } = await models.mReceiveOrder.ylFindOne({
    where: {
      orgId: orgId,
      id: id
    }
  }, true)
  let result = null
  if (mReceiveOrder) {
    if (mReceiveOrder.isRefund === 1) { //已退货
      result = { success: false, message: '单据已退货' }
    } else {
      if (mReceiveOrderItems.length > 0) {
        let barcodes = ''
        mReceiveOrderItems.forEach(e => {
          barcodes = barcodes + ',\'' + e.itemBarCode + '\''
        })
        // 发料表是否有业务相关的数据
        const sqlDer = `select  order_id
                         from  m_delivery_order_item
                         where org_id =:org_id 
                            and item_bar_code IN (${ barcodes.substr(1) })
                            and is_removed = false and service_type>0 and  order_type>0
                            and is_rush=0 and is_refund=0`
        const deliveryList = await models.mReceiveOrder.sequelize.select(sqlDer, {
          replacements: {
            id: id,
            org_id: orgId
          }
        })
        let deliveryOrders = []
        if (deliveryList.length > 0) {
          const ids = deliveryList.map(e => e.orderId).join()
          const sql = `
                  select order_data_type,org_id,id,org_name,order_code,order_date,recorded_date,service_type,
                        labour_id,labour_name,gh_full_name,is_refund
                  from m_delivery_order 
                  where org_id =:org_id  and id in(${ ids }) and is_removed = false and is_audit=true `
          deliveryOrders = await models.mDeliveryOrder.sequelize.select(sql, {
            replacements: {
              id: id,
              org_id: orgId
            }
          })
        }
        // 返回发生业务的单据
        const receiveSql = ` 
                  SELECT org_id,id,org_name,order_code,order_date,recorded_date,supplier_id,supplier_name,'receive' table_name
                  from m_receive_order
                  where  org_id =:org_id and order_data_id=:id and is_removed = false and
                        is_audit=true and is_refund=0 and is_rush=0`
        const recieveList = await models.mReceiveOrder.sequelize.select(receiveSql, {
          replacements: {
            id: id,
            org_id: orgId
          }
        })
        mReceiveOrder.tableName = 'receive'
        if (deliveryOrders.length > 0 || recieveList.length > 0) {
          recieveList.push(mReceiveOrder)
          result = { success: true, deliveryOrders: deliveryOrders, receiveOrders: recieveList }
        } else {
          result = { success: true, receiveOrders: [ mReceiveOrder ] }
        }
      } else {
        result = { success: false, message: '单据没有要退的材料' }
      }
    }
  } else {
    result = { success: false, message: '单据已不存在' }
  }
  ctx.body = result
}

// 退货操作
async function receiveOrderReturnState (ctx, models) {
  const { orgId, id, orderDate } = ctx.request.body
  const { mReceiveOrder, mReceiveOrderItems } = await models.mReceiveOrder.ylFindOne({
    where: {
      orgId: orgId,
      id: id
    }
  }, true)
  let result = null
  if (mReceiveOrder) {
    if (mReceiveOrder.isRefund === 1) { //已退货
      result = { success: false, message: '单据已退货' }
    } else {
      if (mReceiveOrderItems.length > 0) {
        result = await _createReturnOrder(ctx, models, mReceiveOrder, mReceiveOrderItems)
      } else {
        result = { success: false, message: '单据没有要退的材料' }
      }

    }
  } else {
    result = { success: false, message: '单据已不存在' }
  }
  ctx.body = result
}


// 修改收料明细信息时获取该条码发生过所有发、退货信息列表
async function deliveryOrderList (ctx, models) {
  const { orgId, itemBarCode } = ctx.request.body
  const itemSql = `with
      receiveItem  as(
              select  id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,
                      quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark
                      from  m_receive_order_item
              where org_id =:org_id and is_removed = false
                    and item_bar_code = :item_bar_code and service_type != 10 and service_type != 20 and service_type != 30         
              ),
      receiveOrder as (
              select a.*,order_code,order_date from  receiveItem a 
              inner join (select id,org_id,order_code,order_date from m_receive_order where org_id= :org_id
                        and is_removed = false and is_audit=false  and service_type != 10 and service_type != 20 and service_type != 30)b
              on a.order_id = b.id
              and a.org_id = b.org_id
              ),
      deliveryItem as (
              select  id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,
                      quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark
                      from  m_delivery_order_item
              where org_id =:org_id and is_removed = false 
                    and item_bar_code = :item_bar_code 
        ),
       deliveryOrder as (
               select a.*,order_code,order_date from  deliveryItem a 
               inner join (select id,org_id,order_code,order_date from m_delivery_order where org_id= :org_id
                         and is_removed = false and is_audit=false )b
               on a.order_id = b.id
               and a.org_id = b.org_id
               )
              select  order_code,order_date,id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark from receiveOrder 
              union 
              select  order_code,order_date,id,order_id,org_id,material_id, material_code, material_name, material_model, material_unit, class_id,quantity, book_price, book_sum, manufacturer, batch_no, storage_room, item_remark from deliveryOrder 
            `
  const itemlist = await models.mReceiveOrder.sequelize.select(itemSql, {
    replacements: {
      item_bar_code: itemBarCode,
      org_id: orgId
    }
  })
  ctx.body = itemlist
}

// 更新发料表、和退货表中is_removed状态
async function updateOrderList (ctx, models) {
  const { orgId, itemBarCode } = ctx.request.body
  const returnReceiveSql = `update m_receive_order_item set is_removed=true  where  org_id =:org_id  and item_bar_code=:item_bar_code and service_type != 10 and service_type != 20 and service_type != 30`
  await models.mReceiveOrder.sequelize.select(returnReceiveSql, {
    replacements: {
      item_bar_code: itemBarCode,
      org_id: orgId
    }
  })
  const delieverySql = `update m_delivery_order_item set is_removed=true  where  org_id =:org_id  and item_bar_code=:item_bar_code`
  await models.mReceiveOrder.sequelize.select(delieverySql, {
    replacements: {
      item_bar_code: itemBarCode,
      org_id: orgId
    }
  })
  ctx.body = 1
}

// 获取有价料凭证数据
async function receiveOrderVoucherParams (ctx, models) {
  const { id, orgId, orgName, supplierName, serviceType } = ctx.request.body
  const sql = `select store_room_full_name,sum(difference) difference,sum(book_sum) book_sum,sum(tax_amount) tax_amount
   from m_receive_order_item where order_id=${ id } and is_removed=false group by store_room_full_name`
  const result = await models.mReceiveOrder.sequelize.select(sql)
  let data = []
  let sortCode = 0
  for (let i = 0; i < result.length; i++) {
    let a = {}
    a.name = '材料设备/' + (result[i].storeRoomFullName === null ? '' : result[i].storeRoomFullName)
    a.abstract = serviceType === 10 ? ('应收-' + supplierName + '材料款') : ('收入-' + orgName + '材料款')
    a.debit = result[i].bookSum !== null ? result[i].bookSum : 0
    a.credit = 0
    a.sortCode = sortCode++
    data.push(a)
    let b = {}
    let c = {}
    if (serviceType === 10) {
      b.name = '材料成本差异/' + (result[i].storeRoomFullName === null ? '' : result[i].storeRoomFullName)
      b.abstract = '支出-' + supplierName + '材料款差异'
      b.debit = result[i].difference !== null ? result[i].difference : 0
      b.credit = 0
      b.sortCode = sortCode++
      data.push(b)
      c.name = '进项税额'
      c.abstract = '应交进项税额'
      c.debit = result[i].taxAmount !== null ? result[i].taxAmount : 0
      c.credit = 0
      c.sortCode = sortCode++
      data.push(c)
    }
    let d = {}
    d.name = serviceType === 10 ? ('往来/供应商/' + supplierName) : ('往来/' + supplierName)
    d.abstract = (serviceType === 10 ? '应付' : '应付-') + supplierName + '材料款'
    d.debit = 0
    d.credit = serviceType === 10 ? (a.debit + b.debit + c.debit) : (a.debit)
    d.sortCode = sortCode++
    data.push(d)
  }
  ctx.body = data
}

// 获取单据对应的汇总单单号
async function queryReceiveSummaryOrdercode (ctx, models) {
  const { id, orgId } = ctx.request.body
  const sql = `select order_code from m_receive_summary where id in (
                    select order_id from m_receive_summary_item where org_id=:org_id and receive_order_id=:id and is_removed=false
                ) and is_submit=true`
  const result = await models.mReceiveOrder.sequelize.select(sql, { replacements: { id: id, org_id: orgId } })
  ctx.body = result
}

// 通过合同编号获取供应商
async function getMContractSupplier (ctx, models) {
  const { orgId, contractCode, receiptsType } = ctx.request.body
  const sql = `select supplier_id,supplier_name,ori_supplier_id from m_contract where org_id=:org_id and contract_code=:contract_code
  and is_audit=true and is_closed = false and receipts_type = :receipts_type and is_removed=false`
  const result = await models.mReceiveOrder.sequelize.select(sql, {
    replacements: {
      org_id: Number(orgId),
      contract_code: contractCode,
      receipts_type: receiptsType
    }
  })
  ctx.body = result
}

// 获取对账模式合同数据
async function queryMContractDataBySupplier (ctx, models) {
  let { offset, limit, condtionItems } = ctx.request.body
  const replaceParams = joincondition.condtionItemsToParams(condtionItems)
  if (offset === undefined) {
    offset = 0
  }
  if (limit === undefined) {
    limit = 20
  }
  const sql = `with
  mContract as 
     (
      select id,purchase_method,supplier_id,supplier_name,ori_supplier_id,contract_name,contract_code from m_contract 
      where org_id = :org_id and is_removed = false and is_audit = true and is_closed = false and receipts_type = 0
      ${ replaceParams.supplier_id ? `and supplier_id = :supplier_id` : '' }
     ),
  mReconciliation as
     (
      select distinct supplier_id,supplier_name,ori_supplier_id from m_reconciliation  
    where org_id = :org_id and is_removed=false and id in (
     select order_id from m_reconciliation_item where org_id = :org_id and is_removed = false
     ${ replaceParams.service_type ? 'and service_type = :service_type' : '' }
     ${ replaceParams.order_type ? 'and order_type = :order_type' : '' }
     ${ replaceParams.supplier_id ? 'and supplier_id = :supplier_id' : '' }
     ))
  select id,purchase_method,contract_name,contract_code from mContract as a
     inner join mReconciliation as b
     on a.supplier_id = b.supplier_id
     where 1=1 ${ replaceParams.contract_name ? `and contract_name like :contract_name` : '' }
     group by id,purchase_method,contract_name,contract_code
     order by id limit ${ limit } offset ${ offset }`
  const result = await models.mReceiveOrder.sequelize.select(sql, { replacements: replaceParams })
  ctx.body = { rows: result }
}

// 获取点验单供应商对应的合同数据
async function getMReceiveContract (ctx, models) {
  let { offset, limit, condtionItems } = ctx.request.body
  const replaceParams = joincondition.condtionItemsToParams(condtionItems)
  if (offset === undefined) {
    offset = 0
  }
  if (limit === undefined) {
    limit = 20
  }
  let table = ''
  if (replaceParams.receipts_type && replaceParams.receipts_type !== 0) {
    table = 't_receive_order where is_removed=false and is_submit=true and receipts_type = :receipts_type'
  } else {
    table = 'm_receive_order where is_removed=false and is_audit=true'
  }
  const sql = `select id,contract_code,contract_name,supplier_name from m_contract 
    where id in (
      select contract_id from ${ table } and org_id=:org_id and contract_id > 0
      ${ replaceParams.service_type ? `and service_type = :service_type` : '' }
      ${ replaceParams.order_type ? `and order_type = :order_type` : '' }
      ${ replaceParams.supplier_id ? `and supplier_id = :supplier_id` : '' }
    )
    and org_id=:org_id and is_audit=true and is_removed=false and is_closed=false and receipts_type = :receipts_type
    order by contract_name,contract_code limit ${ limit } offset ${ offset }`
  const result = await models.mReceiveOrder.sequelize.select(sql, { replacements: replaceParams })
  ctx.body = { rows: result }
}

async function updateMaccountPrintTime (ctx, models) {
  let { orgId, id, name } = ctx.params
  name = name.replace(/([A-Z])/g, '_$1').toLowerCase()
  const updateItem = `update ${ name } set print_times=CAST(isnull(print_times,0)+1 AS INT) where org_id =${ orgId } and id=${ id }  `
  await models.mReceiveOrder.sequelize.select(updateItem)
  ctx.body = 0
}

// 批量删除
async function deleteMReceiveAllMaterials (ctx, models) {
  let { idItem, orderId, orgId } = ctx.request.body
  const ids = idItem.map(item => `${ item.id }`).join()
  const sql = `update m_receive_order_item set is_removed=true 
  where id in (${ ids }) and order_id = :order_id and org_id = :org_id`
  await models.mReceiveOrderItem.sequelize.select(sql, {
    replacements: {
      order_id: Number(orderId),
      org_id: Number(orgId)
    }
  })
  ctx.body = { success: true, message: '删除成功' }
}

module.exports = {
  queryMReceiveOrderParams,
  queryMReceiveOrderItemParams,
  queryMReceiveOrder,
  getMReceiveOrder,
  createMReceiveOrder,
  updateMReceiveOrder,
  deleteMReceiveOrder,
  deleteMReceiveOrderItem,
  auditMReceiveOrder,
  unAuditMReceiveOrder,
  offsetPreMReceiveOrder,
  receiveOrderRushPointStatus,
  queryMaterialsStoreParmas,
  receiveOrderRushPointDate,
  queryMReceiveSuppliersData,
  receiveOrderRedState,
  receiveReturnOrder,
  getReceiveOrderRedData,
  getReceiveOrderReturnData,
  receiveOrderReturnState,
  deliveryOrderList,
  updateOrderList,
  queryMReceiveItem,
  receiveOrderVoucherParams,
  queryReceiveSummaryOrdercode,
  getMContractSupplier,
  queryMContractDataBySupplier,
  getMReceiveContract,
  updateMaccountPrintTime,
  deleteMReceiveAllMaterials
}
