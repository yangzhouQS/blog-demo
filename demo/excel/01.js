const projectElectricityPurchas = {
  'import': {
    'datasource': 'bi',
    'dataHeaderCols': [ '项目名称', '采购类型', '订单号', '材料名称', '规格型号', '单位', '数量', '电商采购', '市场采购', '节约情况', '供应商名称', '付款日期', '是否已办理结算财务已入账', '子账号', '供应商联系人', '联系人电话', '备注' ],
    'validCols': [ '项目名称'],
    'tables': {
      'r_electricity_purchas_item': {
        'noOrgId': true,
        'idFn': 'idGen',
        'mapSQLs': { 'org': 'SELECT name AS key, id AS value FROM {tenantCode}_platform.organization WHERE is_removed=false' },
        'fields': {
          'org_name': { 'col': '项目名称', 'sqlQuotes': false },
          'procurement_type': { 'col': '采购类型', 'sqlQuotes': false },
          'transaction_code': { 'col': '订单号', 'sqlQuotes': false },
          'material_name': { 'col': '材料名称' },
          'material_model': { 'col': '规格型号', 'sqlQuotes': false },
          'material_unit': { 'col': '单位', 'sqlQuotes': false },
          'quantity': { 'col': '数量', 'sqlQuotes': false },
          // 'procurement_type': { 'col': '电商采购', 'sqlQuotes': false },
          // 'procurement_type': { 'col': '节约情况', 'sqlQuotes': false },
          // 'procurement_type': { 'col': '供应商名称', 'sqlQuotes': false },
          'payment_date': { 'col': '付款日期', 'sqlQuotes': false },
          'is_settlement': { 'col': '是否已办理结算财务已入账', 'sqlQuotes': false },
          'bypass_account': { 'col': '子账号', 'sqlQuotes': false },
          'supplier_contact': { 'col': '供应商联系人', 'sqlQuotes': false },
          'supplier_phone': { 'col': '联系人电话', 'sqlQuotes': false },
          'remark': { 'col': '备注', 'sqlQuotes': false }
        }
      }
    }
  }
}

const a = {
  'import': {
    'datasource': 'bi',
    'dataHeaderCols': [ '年', '月', '维度类型', '单位名称', '计划指标', '合同额', '总额', '其中：施工', '期中：投资', '铁路', '公路', '城市轨道', '房建', '水利电力', '市政', '机场码头', '其它工程' ],
    'validCols': [ '单位名称', { 'col': '维度类型', 'enums': [ '分子公司维度', '管理区域维度' ] } ],
    'tables': {
      'contract': {
        'noOrgId': true,
        'idFn': 'idGen',
        'mapSQLs': { 'org': 'SELECT name AS key, id AS value FROM {tenantCode}_platform.organization WHERE is_removed=false' },
        'fields': {
          'year': { 'col': '年', 'sqlQuotes': false },
          'month': { 'col': '月', 'sqlQuotes': false },
          'dimensional_type': { 'col': '维度类型', 'enums': { '分子公司维度': 1, '管理区域维度': 2 }, 'sqlQuotes': false },
          'dimensional_id': { 'col': '单位名称', 'refKey': 'org', 'sqlQuotes': false },
          'dimensional_name': { 'col': '单位名称' },
          'plan_index': { 'col': '计划指标', 'sqlQuotes': false },
          'total_amount': { 'col': '合同额', 'sqlQuotes': false },
          'total_main_amount': { 'col': '总额', 'sqlQuotes': false },
          'total_main_construction': { 'col': '其中：施工', 'sqlQuotes': false },
          'total_main_investment': { 'col': '期中：投资', 'sqlQuotes': false },
          'plate_railway': { 'col': '铁路', 'sqlQuotes': false },
          'plate_highway': { 'col': '公路', 'sqlQuotes': false },
          'plate_urban_railway': { 'col': '城市轨道', 'sqlQuotes': false },
          'plate_house': { 'col': '房建', 'sqlQuotes': false },
          'plate_water_electric': { 'col': '水利电力', 'sqlQuotes': false },
          'plate_municipal': { 'col': '市政', 'sqlQuotes': false },
          'plate_airport_wharf': { 'col': '机场码头', 'sqlQuotes': false },
          'plate_other': { 'col': '其它工程', 'sqlQuotes': false }
        }
      }
    }
  }
}

const b = {
  'import': {
    'datasource': 'bi',
    'dataHeaderCols': [ '年', '月', '材料名称', '单位', '数量', '金额元', '平均采购单价', '评估单价', '投标单价' ],
    'validCols': [ '材料名称' ],
    'tables': {
      'project_material_price_section_super': {
        'noOrgId': true,
        'idFn': 'idGen',
        'mapSQLs': { 'org': 'SELECT name AS key, id AS value FROM {tenantCode}_platform.organization WHERE is_removed=false' },
        'fields': {
          'year': { 'col': '年', 'sqlQuotes': false },
          'month': { 'col': '月', 'sqlQuotes': false },
          'material_name': { 'col': '材料名称' },
          'unit': { 'col': '单位' },
          'actual_quantity': { 'col': '数量', 'sqlQuotes': false },
          'actual_amount': { 'col': '金额元', 'sqlQuotes': false },
          'actual_average_unit_price': { 'col': '平均采购单价', 'sqlQuotes': false },
          'assessment_unit_price': { 'col': '评估单价', 'sqlQuotes': false },
          'bid_unit_price': { 'col': '投标单价', 'sqlQuotes': false }
        }
      }
    }
  }
}

const b2 = {
  'export': {
    'validParams': [ 'orgId' ],
    'fileNamePrefix': '目标责任成本量汇总',
    'sheets': {
      '目标责任成本量汇总': {
        'serviceId': 'iquantity-template-service',
        'path': 'proj-liability/proj-liability-summary-excel',
        'tree': true,
        'treeOutlineLevel': true,
        'queryProps': [ 'orgId', 'isMulti' ],
        'rpcMethod': 'get',
        'context': 'basic',
        'headers': 'headers',
        'columns': 'columns',
        'sheetDatas': [ {
          'columns': [ { 'header': '编码', 'key': 'code', 'width': 20 }, {
            'header': '名称',
            'key': 'name',
            'width': 20
          }, { 'header': '项目特征及工作内容', 'key': 'description', 'width': 20 }, {
            'header': '单位',
            'key': 'unit',
            'width': 10
          }, { 'header': '类型', 'key': 'typeName', 'width': 15 }, {
            'header': '清单量',
            'key': 'billQuantity',
            'width': 15
          }, { 'header': '图纸复核量', 'key': 'reviewQuantity', 'width': 15 }, {
            'header': '责任成本量',
            'key': 'liabilityQuantity',
            'width': 15
          } ]
        } ]
      }
    }
  }
}