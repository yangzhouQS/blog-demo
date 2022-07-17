async function unAuditQDeliveryOrder (ctx, models) {
  const tenantCode = ctx.extras.tenantCode
  // 混凝土发料单撤销时使用参数lastOrgId
  let { id, orgId, lastOrgId, userName } = ctx.request.body
  id = (id - 0) || 0
  orgId = (orgId - 0) || 0
  lastOrgId = (lastOrgId - 0) || 0
  const auditDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const version = await idGen()
  let result = null
  const qDelivery = await models.qDelivery.findOne(readAtSnapshot({
    where: {
      orgId: orgId,
      id: id,
      isRemoved: false
    }
  }))
  if (!qDelivery) {
    ctx.body = {
      success: false,
      message: '单据不存在,请刷新后查看！'
    }
    return
  }
  if (!qDelivery.isAudit) {
    ctx.body = {
      success: false,
      message: '数据已经撤销提交了！'
    }
    return
  }
  if (qDelivery.isRed) {
    ctx.body = {
      success: false,
      message: '数据已经被冲红，不能撤销！'
    }
    return
  }
  if (qDelivery.allotId > 0) {
    const allot = await models.qLabourAllot.findOne(readAtSnapshot({
      where: {
        orgId: orgId,
        id: qDelivery.allotId
      }
    }))
    ctx.body = {
      success: false,
      message: '请先撤销单号为【' + allot.orderCode + '】的调拨单！'
    }
    return
  }
  // 如果是退发单，判断库存是否够发
  if (qDelivery.serviceType * qDelivery.orderType < 0) {
    const sql = `select a.material_id,a.item_bar_code,isnull(a.net_quantity,0) net_quantity,isnull(b.quantity,0) quantity
    from q_delivery_more_material a
    left join q_inventory b
    on a.org_id=b.org_id and a.material_id=b.material_id and a.item_bar_code=b.item_bar_code
    where a.org_id=${qDelivery.orgId}
    and a.order_id=${qDelivery.id}
    and a.is_removed=false
    and isnull(a.net_quantity,0) > isnull(b.quantity,0)
    `
    const sqlResult = await models.qDelivery.sequelize.select(sql)
    if (sqlResult.length > 0) {
      let str = ``
      sqlResult.forEach(res => {
        str += res.itemBarCode
      })
      ctx.body = {
        success: false,
        message: `条码为${str}的材料超库存量`
      }
      return
    }
  }
  // 如果本身不是施工队调拨生成的单据，判断施工队库存就可以撤销
  let ghSql = ''
  if (tenantList.includes(tenantCode)) {
    if (qDelivery.ghId > 0) {
      ghSql = ` and b.gh_id = ${qDelivery.ghId}`
    } else {
      ghSql = ' and (b.gh_id is null or b.gh_id = 0)'
    }
  }
  const sql = `with curr_del_items as (
        select item_bar_code,case when order_type >0 then net_quantity else -net_quantity end net_quantity
        from q_delivery_more_material where org_id=:org_id and order_id=:order_id and service_type >0 and service_type=${
    qDelivery.serviceType
  } and is_removed=false
      ),
      all_items as
      (
          select a.item_bar_code,case when a.order_type >0 then a.net_quantity else -a.net_quantity end net_quantity,a.service_type,a.order_type
          from q_delivery_more_material a
          inner join  q_delivery b
          on a.org_id=b.org_id and a.order_id=b.id
          where b.org_id =:org_id
          and a.item_bar_code in (
            select item_bar_code from curr_del_items
            )
          and b.service_type in (${qDelivery.serviceType},${-(qDelivery.serviceType + 1)})
          ${ghSql}
          and a.is_removed=false
          and b.is_removed=false
          and b.is_audit=true
      ),
      items as
      (
      select item_bar_code,sum(del_quantity)-sum(return_quantity) quantity from
      (
          select item_bar_code,net_quantity  del_quantity ,0 return_quantity
          from all_items
          where  service_type >0
          union all
          select item_bar_code,0,net_quantity return_quantity 
          from all_items 
          where service_type <0 
      )a
      group by item_bar_code
      )
      select a.item_bar_code
      from items right join curr_del_items a
      on items.item_bar_code=a.item_bar_code
      where items.quantity<a.net_quantity`
  const deliveryInventory = await models.qDelivery.sequelize.select(sql, {
    replacements: {
      order_id: Number(id),
      org_id: Number(orgId)
    }
  })
  if (deliveryInventory.length > 0) {
    const barCode = []
    deliveryInventory.forEach(item => {
      barCode.push(item.itemBarCode)
    })
    result = {
      success: false,
      message: '条码【' + barCode.join() + '】已经做过退发料，无法撤销！'
    }
  } else {
    let isContinue = true
    if (tenantList.includes(tenantCode)) {
      // 撤销正常发料单是库存增加,发料量减少,撤销前需判断可否撤销
      // 撤销退发料单时库存减少,发料量增加,不需要判断账务列销和实物发料量之间的差额
      const qDeliveryItems = await models.qDeliveryMoreMaterial.findAll(readAtSnapshot({
        where: {
          orgId: orgId,
          orderId: id,
          isRemoved: false
        }
      }))
      if (qDelivery.serviceType * qDelivery.orderType > 0 && qDeliveryItems.length > 0) {
        const compareResult = await queryQuantityBalance(qDelivery, qDeliveryItems, models)
        if (!compareResult.success) {
          isContinue = false
          result = { success: false, message: '撤销提交失败,' + compareResult.message }
        }
      }
    }

    // 定制化验证
    const valid = await unAuditDeliveryValidate(ctx, models, { qDelivery, orgId, id })
    if (!valid.success) {
      isContinue = false
      result = valid
    }
    if (isContinue) {
      const updateSql = `update q_inventory set q_inventory.quantity = cast(q_inventory.quantity+ a.net_quantity as decimal(28,4)),version = __fn.sequence(),updated_at= now()
      from q_inventory 
      inner join  (
        select item_bar_code,case when order_type*service_type >0 then net_quantity else -net_quantity end net_quantity
        from q_delivery_more_material where org_id=:org_id and order_id=:order_id 
        and is_removed=false
      )a
      on a.item_bar_code=q_inventory.item_bar_code
      where q_inventory.org_id=:org_id`
      // 如果是混凝土发料单,撤销时更新混凝土签收主表的发料数量（delivery_quantity）
      let concreteSql = ''
      let updateConcreteSql = ''
      if (qDelivery.deliveryType === 1) {
        const concrete = await models.qDeliveryConcrete.findAll({
          where: {
            orderId: qDelivery.id,
            isRemoved: false
          }
        })
        if (concrete) {
          for (let i = 0; i < concrete.length; i++) {
            concreteSql += `(${concrete[i].orgId} org_id, ${Number(lastOrgId)} last_org_id,${concrete[i].quantity} quantity, ${concrete[i].receiveOrderId} id),`
          }
          concreteSql = concreteSql.length > 0 ? concreteSql.substr(0, concreteSql.length - 1) : ''
          updateConcreteSql = `update q_concrete_receive set delivery_quantity=cast(delivery_quantity-a.quantity as decimal(28,4)),version = __fn.sequence(),updated_at= now() from q_concrete_receive
            inner join (
            select org_id,quantity,id,last_org_id from
            (values ${concreteSql}) b
            ) as a
            on (q_concrete_receive.org_id = a.org_id or q_concrete_receive.org_id = a.last_org_id)
            and q_concrete_receive.id = a.id`
        }
      }
      let sqlList = []
      if (ctx.extras.tenantCode === 'sxlq' || ctx.extras.tenantCode === 'mctech') sqlList = await sxlqUnAudit(ctx, models, { qDelivery, orgId, id })
      result = await models.qDelivery.sequelize.transaction(readAtSnapshot(), async t => {
        await models.qDelivery.sequelize.query(updateSql, {
          replacements: {
            order_id: id,
            org_id: orgId
          },
          type: models.qDelivery.sequelize.QueryTypes.UPDATE
        })
        const sql = `update q_delivery set is_audit=false, auditor =:auditor, audit_date=:audit_date,
          version = __fn.sequence(),updated_at= now()
          where org_id=:orgId and id=:id`
        await models.qDelivery.sequelize.select(sql, {
          replacements: {
            id: id,
            orgId: orgId,
            auditor: userName,
            audit_date: auditDate,
            version: version
          },
          type: models.qDelivery.sequelize.QueryTypes.UPDATE
        })
        if (updateConcreteSql.length > 0) {
          await models.qDelivery.sequelize.select(updateConcreteSql, {
            replacements: {},
            type: models.qDelivery.sequelize.QueryTypes.UPDATE
          })
        }
        // 执行处理好的SQL
        for (let i = 0; i < sqlList.length; i++) {
          const str = sqlList[i]
          await models.qDelivery.sequelize.select(str)
        }
        return { success: true, message: '撤销提交成功！' }
      })
    }
  }

  ctx.body = result
}


/**
 * 账务列销查询
 * @param order 主表
 * @param orderList 明细表
 * @param models 模型
 * @returns {Promise<{success: boolean, message: string}|{success: boolean}>}
 */
async function queryQuantityBalance (order, orderList, models) {
  const qDelivery = order
  const allMaterialId = []
  const allItemBarCode = []
  orderList.forEach(list => {
    allMaterialId.push(list.materialId)
    allItemBarCode.push(`'${list.itemBarCode}'`)
  })
  // 退发料时需要判断当前材料是否可退,筛选出实物发料和账务发料差<0的材料,
  // 如果存在一条材料数量不够退发则结束查询和提交，否则继续提交
  let ghSql = ''
  if (qDelivery.ghId > 0) {
    ghSql = ` and gh_id = 1110249386 ${qDelivery.ghId}`
  } else {
    ghSql = ' and (gh_id is null or gh_id = 0)'
  }
  const compareSql = ` with qreceive as (
    select a.account_order_id,a.item_bar_code, 
    isnull(sum (case when b.service_type*b.order_type>0 then b.net_quantity else -b.net_quantity end),0) delivery_quantity
    from q_receive_more_material a
    left join q_delivery_more_material b
    on a.org_id=b.org_id and a.item_bar_code=b.item_bar_code
    where a.org_id = ${qDelivery.orgId}
    and b.org_id=${qDelivery.orgId}
    and b.order_id in (
      select id from q_delivery 
      where org_id = ${qDelivery.orgId} 
      and labour_id = ${qDelivery.labourId}
      ${ghSql} and is_audit=true and is_removed=false

    )
    and b.item_bar_code in (${allItemBarCode})
    and a.material_id in (${allMaterialId})
    and b.material_id in (${allMaterialId})
    and a.is_removed=false
    and b.is_removed=false
    and a.service_type>0 and a.order_type>0 
    group by account_order_id,a.item_bar_code
  ),
  delivery as (
    --- 账务预发单
    select (case when a.service_type*a.order_type>0 then quantity else -quantity end) quantity, null order_id,a.item_bar_code, q_bar_code, delivery_quantity 
    from global_ma.m_delivery_order_item a
    inner join  (
      select c.item_bar_code,q_bar_code,delivery_quantity
      from global_ma.m_receive_order_item c
      inner join qreceive d
      on c.q_bar_code = d.item_bar_code
      where (account_order_id is null or account_order_id = 0)
      and order_id in (select id from global_ma.m_receive_order where is_rush != 2 and order_type != -5)
    ) b
    on a.item_bar_code = b.item_bar_code
    where a.material_id in (${allMaterialId})
    and a.is_removed=false
    and a.order_id in (
      select id from global_ma.m_delivery_order where org_id = ${qDelivery.orgId} 
      and labour_id = ${qDelivery.labourId}
      ${ghSql} and is_audit=true and is_removed=false)
    union all
    --- 账务正常发料单
    select (case when a.service_type*a.order_type>0 then a.quantity else -a.quantity end) quantity,b.order_id,a.item_bar_code,c.item_bar_code q_bar_code, c. delivery_quantity from 
    global_ma.m_delivery_order_item a 
    inner join global_ma.m_check_order b 
    on a.delivery_item_id = b.account_id
    inner join qreceive c
    on b.order_id = c.account_order_id
    where b.order_id in (select account_order_id from qreceive where account_order_id > 0)
    and a.material_id in (${allMaterialId})
    and a.is_removed=false
    and a.order_id in (
      select id from global_ma.m_delivery_order
      where is_audit=true
      and labour_id = ${qDelivery.labourId}
      ${ghSql}
    )
  )
  select sum(quantity) ma_quantity, delivery_quantity mq_quantity, order_id,item_bar_code,q_bar_code 
  from delivery
  group by order_id,item_bar_code,q_bar_code,mq_quantity
  `
  const deliveryItemList = await models.qDelivery.sequelize.select(compareSql)
  if (deliveryItemList.length > 0) {
    // 有材料不够退,返回提交失败结果
    // const str = orderList.reduce((arr, list) => {
    //   const balanceQuantity = deliveryItemList.find(m => m.materialId === list.materialId && m.itemBarCode === list.itemBarCode).balanceQuantity
    //   if (balanceQuantity < list.netQuantity) { arr.push(list.materialName + list.itemBarCode) }
    //   return arr
    // }, [])
    const str = orderList.reduce((arr, list) => {
      const existData = deliveryItemList.find(m => m.qBarCode === list.itemBarCode)
      let balanceQuantity = 0
      if (existData) {
        balanceQuantity = Number((existData.mqQuantity - existData.maQuantity).toFixed(4))
        if (balanceQuantity < list.netQuantity) { arr.push(`${list.materialName}(批次：${existData.itemBarCode})`) }
      }
      return arr
    }, [])
    if (str.length > 0) {
      // return { success: false, message: `材料${str.join()}已列销` }
      return { success: false, message: `材料${str.join()}在账务系统已列销` }
    } else {
      return { success: true }
    }
  } else {
    return { success: true }
  }
}
