
-- 增加版本号记录表
CREATE TABLE if not exists `database_version` (
  `version` varchar(500) NOT NULL COMMENT '当前版本',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据库版本表';


-- 更新版本号
insert into database_version(version,created_at)
values ('1.0.0', now())
ON DUPLICATE KEY UPDATE version='1.0.0';
