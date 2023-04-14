---- 修改在线升级和系统显示图标
UPDATE `weighing_images`.`s_menu` SET `icon` = 'weight xitongpeizhi' WHERE (`id` = '4b830953-8aba-4432-a4dc-7ffb8051dfcb');
UPDATE `weighing_images`.`s_menu` SET `icon` = 'weight a-xitongshengji1' WHERE (`id` = '0922c6b5-70b9-46ff-86c5-a5ba78b37b40');


---- 修改识别类型为选择框
DELETE FROM `weighing_images`.`s_product_params` WHERE (`id` = '7cbf434b-b3db-443d-9456-089d970106f7');
INSERT INTO `weighing_images`.`s_product_params` (`id`, `is_enable`, `group_key`, `group_name`, `function_key`, `function_name`, `params_key`, `params_type`, `params_default_value`, `params_value`, `ui_config`, `sort`, `remark`, `creator_id`, `creator_name`, `created_at`, `modifier_id`, `modifier_name`, `updated_at`, `is_removed`) VALUES ('7cbf434b-b3db-443d-9456-089d970106f7', '1', 'global', '全局设置', 'recognition', '车牌识别', 'recType', 'number', '0', '0', '{\n  \"label\": \"识别类型\",\n  \"comp\": \"selectComp\",\n  \"position\": {\n    \"spanNum\": 6\n  },\n  \"elmentConfig\": {\n    \"disabled\": false,\n    \"size\": \"small\",\n    \"style\": {},\n    \"option\": {},\n    \"model\": {},\n    \"data\": [\n      {\n        \"label\": \"硬识别\",\n        \"value\": 0\n      },\n      {\n        \"label\": \"软识别\",\n        \"value\": 1\n      },\n      {\n        \"label\": \"无车牌识别\",\n        \"value\": 2\n      }\n    ]\n  },\n  \"eventConf\": {\n    \"isOn\": true,\n    \"change\": \"function(node, _this){_this.model.parent(_this.option.name)}\",\n    \"blur\": \"function(node, _this){_this.model.parent(_this.option.name)}\",\n    \"init\": \"function(_this){}\"\n  }\n}', '24001', '识别类型', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-07-05 16:42:39', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-11-04 17:29:08', '0');

---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.1.1', now())
ON DUPLICATE KEY UPDATE version='1.1.1';
UNLOCK TABLES;
