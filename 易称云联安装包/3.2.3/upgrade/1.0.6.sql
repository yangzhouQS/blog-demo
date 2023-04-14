--- 增加收料明细表细表扣吨
alter table weighing_images.q_receive_more_material add deduct_quantity decimal(28,4);


---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.0.6', now())
ON DUPLICATE KEY UPDATE version='1.0.6';
UNLOCK TABLES;