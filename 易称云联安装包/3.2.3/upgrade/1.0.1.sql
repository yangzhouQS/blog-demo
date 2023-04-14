-- 收料表添加识别方式和客户端版本字段
ALTER TABLE `q_receive` add column(
  `client_version` varchar(100) DEFAULT '' COMMENT '客户端版本号',
  `discern_mode` varchar(100) DEFAULT '' COMMENT '识别方式'
);


-- 发料表添加识别方式和客户端版本字段
ALTER TABLE  `q_delivery` add column(
  `client_version` varchar(100) DEFAULT '' COMMENT '客户端版本号',
  `discern_mode` varchar(100) DEFAULT '' COMMENT '识别方式'
);


-- 更新版本号
insert into database_version(version,created_at)
values ('1.0.1', now())
ON DUPLICATE KEY UPDATE version='1.0.1';

