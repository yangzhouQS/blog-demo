---- 增加在线升级菜单
DELETE FROM `weighing_images`.`s_menu` WHERE (`id` = '0922c6b5-70b9-46ff-86c5-a5ba78b37b40');
INSERT INTO `weighing_images`.`s_menu` (`id`, `parent_id`, `full_id`, `code`, `name`, `full_name`, `level`, `icon`, `url`, `is_leaf`, `sort_code`, `remark`, `creator_id`, `creator_name`, `created_at`, `modifier_id`, `modifier_name`, `updated_at`, `is_removed`) VALUES ('0922c6b5-70b9-46ff-86c5-a5ba78b37b40', '97910a28-7bb2-4aa6-a3dc-9d8c05bca090', '97910a28-7bb2-4aa6-a3dc-9d8c05bca090|0922c6b5-70b9-46ff-86c5-a5ba78b37b40', 'update', '在线升级', '系统配置|在线升级', '2', 'weight update', '/update', '0', '6', '', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-09-13 14:39:36', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-09-14 14:36:58', '0');

---- 添加在线升级实施人员权限
DELETE FROM `weighing_images`.`s_role_menu_rel` WHERE (`id` = '8b7db8ce-3a73-4700-b2b3-cb46adcdd4d8');
INSERT INTO `weighing_images`.`s_role_menu_rel` (`id`, `role_id`, `menu_id`, `creator_id`, `creator_name`, `created_at`, `modifier_id`, `modifier_name`, `updated_at`, `is_removed`) VALUES ('8b7db8ce-3a73-4700-b2b3-cb46adcdd4d8', '1a7f9f96-78a3-47db-8bbe-4aab5beefe59', '0922c6b5-70b9-46ff-86c5-a5ba78b37b40', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-09-23 15:46:28', '62b7af0c-38e0-481d-bd3b-d57c448e1708', '超级管理员', '2021-09-24 10:59:04', '0');

---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.0.8', now())
ON DUPLICATE KEY UPDATE version='1.0.8';
UNLOCK TABLES;