----- 增加指标
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where order_type <0 and is_audit=1 and is_removed=false and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676de24-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_delivery where is_audit=1 and is_removed =false  and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676e4e2-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where is_audit=1 and is_removed =false  and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676e5fe-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_delivery where is_audit=1 and is_removed =false and order_type=2  and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676e6b2-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where is_audit=1 and is_removed =false and order_type=2  and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676e77e-2ef3-11eb-a188-e0be03121d7e');
UPDATE `weighing_images`.`auto_task_config_item` SET `item_execute_sql` = ' select count(1) num from q_receive where  order_type <0 and is_audit=1 and is_removed=false  and exit_time < DATE_FORMAT(now(),\'%Y-%m-%d 00:00:00\')' WHERE (`id` = 'd676e88e-2ef3-11eb-a188-e0be03121d7e');

---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.1.0', now())
ON DUPLICATE KEY UPDATE version='1.1.0';
UNLOCK TABLES;


