SET SQL_SAFE_UPDATES = 0;

---- 增加收料明细表扣吨上传
UPDATE `weighing_images`.`auto_task_config_item` SET `item_field_mapping_relation` = '[{\"OriProName\":\"org_id\",\"DesProName\":\"oriOrgId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"order_id\",\"DesProName\":\"oriOrderId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"id\",\"DesProName\":\"oriItemId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"material_id\",\"DesProName\":\"oriMaterialId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"material_code\",\"DesProName\":\"materialCode\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"material_name\",\"DesProName\":\"materialName\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"material_model\",\"DesProName\":\"materialModel\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"material_unit\",\"DesProName\":\"materialUnit\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"\",\"DesProName\":\"auxiliaryUnit\",\"IsMap\":false,\"DefaultValue\":\"吨\"},{\"OriProName\":\"class_id\",\"DesProName\":\"oriClassId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"class_full_id\",\"DesProName\":\"classFullId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"net_quantity\",\"DesProName\":\"netQuantity\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"conversion_rate\",\"DesProName\":\"conversionRate\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"ori_net_quantity\",\"DesProName\":\"oriNetQuantity\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"main_net_quantity\",\"DesProName\":\"mainNetQuantity\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"remark\",\"DesProName\":\"remark\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"ori_material_id\",\"DesProName\":\"materialId\",\"IsMap\":true,\"DefaultValue\":\"\",\"IsValueHandle\":true,\"HandleType\":3},{\"OriProName\":\"ori_class_id\",\"DesProName\":\"classId\",\"IsMap\":true,\"DefaultValue\":\"\",\"IsValueHandle\":true,\"HandleType\":3},{\"OriProName\":\"item_bar_code\",\"DesProName\":\"itemBarCode\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"ori_org_id\",\"DesProName\":\"orgId\",\"IsMap\":true,\"DefaultValue\":\"\",\"IsValueHandle\":true,\"HandleType\":3},{\"OriProName\":\"ori_item_red_id\",\"DesProName\":\"oriItemRedId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"is_red\",\"DesProName\":\"isRed\",\"IsMap\":true,\"DefaultValue\":\"\",\"IsValueHandle\":true,\"HandleType\":4},{\"OriProName\":\"is_removed\",\"DesProName\":\"isRemoved\",\"IsMap\":true,\"DefaultValue\":\"\",\"IsValueHandle\":true,\"HandleType\":4},{\"OriProName\":\"stockbin_name\",\"DesProName\":\"storagePlace\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"stockbin_full_name\",\"DesProName\":\"stockbinFullName\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"ori_stockbin_id\",\"DesProName\":\"stockbinId\",\"IsMap\":true,\"DefaultValue\":\"\"},{\"OriProName\":\"deduct_quantity\",\"DesProName\":\"deductQuantity\",\"IsMap\":true,\"DefaultValue\":\"\"}]' WHERE (`id` = '7bba5e14-2ef0-11eb-a188-e0be03121d7e');

---- 修改更新后的一车多料上传状态
UPDATE `weighing_images`.`q_receive` SET is_upload  =  0 where weight_type = '一车多料'  and created_at > '2021-12-13 22:00:00';

---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.1.3', now())
ON DUPLICATE KEY UPDATE version='1.1.3';
UNLOCK TABLES;