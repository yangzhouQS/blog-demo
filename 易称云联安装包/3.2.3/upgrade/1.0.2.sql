-- 更新统计指标项
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where order_type <0 and is_audit=1 and is_removed=false' WHERE (`id` = 'd676de24-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_delivery where is_audit=1 and is_removed =false' WHERE (`id` = 'd676e4e2-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where is_audit=1 and is_removed =false' WHERE (`id` = 'd676e5fe-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_delivery where is_audit=1 and is_removed =false and order_type=2' WHERE (`id` = 'd676e6b2-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where is_audit=1 and is_removed =false and order_type=2' WHERE (`id` = 'd676e77e-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where  order_type <0 and is_audit=1 and is_removed=false' WHERE (`id` = 'd676e88e-2ef3-11eb-a188-e0be03121d7e');

-- 新增统计指标项
INSERT INTO `weighing_images`.`auto_task_config_item` (`id`, `task_id`, `item_task_name`, `item_task_code`, `item_execute_sql`, `sort_code`, `created_at`, `updated_at`, `is_removed`, `version`, `is_upload`) VALUES ('32c6234b-ea9f-11eb-83af-fa163e3ac892', 'f92de132-2eeb-11eb-a188-e0be03121d7e', '识别方式', 'discernMode', 'select discern_mode from (select  discern_mode, created_at from q_receive  where is_removed = false and discern_mode is not null  union all select  discern_mode, created_at from q_delivery  where is_removed = false and discern_mode is not null ) as c order by  created_at desc limit 1  ', '7', '2020-11-25 15:57:17', '2020-11-25 15:57:17', '0', '0', '0');
INSERT INTO `weighing_images`.`auto_task_config_item` (`id`, `task_id`, `item_task_name`, `item_task_code`, `item_execute_sql`, `sort_code`, `created_at`, `updated_at`, `is_removed`, `version`, `is_upload`) VALUES ('36522bd2-ea9f-11eb-83af-fa163e3ac892', 'f92de132-2eeb-11eb-a188-e0be03121d7e', '客户端版本', 'clientVersion', 'select client_version from (select  client_version, created_at from q_receive  where is_removed = false and discern_mode is not null  union all select  client_version, created_at from q_delivery  where is_removed = false and client_version is not null ) as c order by  created_at desc limit 1  ', '8', '2020-11-25 15:57:17', '2020-11-25 15:57:17', '0', '0', '0');

-- 更新统计指标间隔时间
UPDATE `weighing_images`.`auto_task_config` SET `task_execute_interval` = '1800000', `task_state` = 1 WHERE (`id` = 'f92de132-2eeb-11eb-a188-e0be03121d7e');
-- 更新版本号
insert into database_version(version,created_at)
values ('1.0.2', now())
ON DUPLICATE KEY UPDATE version='1.0.2';

