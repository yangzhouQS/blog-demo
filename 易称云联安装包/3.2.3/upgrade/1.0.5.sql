---- 修改打印配置


---- 更新版本号
LOCK TABLES `database_version` WRITE;
insert into database_version(version,created_at)
values ('1.0.5', now())
ON DUPLICATE KEY UPDATE version='1.0.5';
UNLOCK TABLES;