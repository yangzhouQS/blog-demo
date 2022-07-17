 with qreceive as (
    select a.account_order_id,a.item_bar_code,
    isnull(sum (case when b.service_type*b.order_type>0 then b.net_quantity else -b.net_quantity end),0) delivery_quantity
    from q_receive_more_material a
    left join q_delivery_more_material b
    on a.org_id=b.org_id and a.item_bar_code=b.item_bar_code
    where a.org_id = 8100000000000275
    and b.org_id=8100000000000275
    and b.order_id in (
      select id from q_delivery
      where org_id = 8100000000000275
      and labour_id = 982493025988612
      and gh_id = 1110249386 and is_audit=true and is_removed=false

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
      select id from global_ma.m_delivery_order where org_id = 8100000000000275
      and labour_id = 982493025988612
      and gh_id = 1110249386 and is_audit=true and is_removed=false)
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
      and labour_id = 982493025988612
      and gh_id = 1110249386
    )
  )
  select sum(quantity) ma_quantity, delivery_quantity mq_quantity, order_id,item_bar_code,q_bar_code
  from delivery
  group by order_id,item_bar_code,q_bar_code,mq_quantity


const str = orderList.reduce((arr, list) => {
      const existData = deliveryItemList.find(m => m.qBarCode === list.itemBarCode)
      let balanceQuantity = 0
      if (existData) {
      // 1056864563912848	01159	水泥	P.O42.5散装	吨
        // 151.4200 - 923.880 < 'netQuantity': 62.9, -772.46 < 62.9
        // WZPC1166606901461121	H20211216122041gmrH
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
