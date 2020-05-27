# Sequelize Docs 中文版(v5)



> 此项目同步自 [sequelize](https://github.com/sequelize) / [sequelize](https://github.com/sequelize/sequelize) 项目中的  docs. 除特殊情况, 将保持每月一次的同步频率.
> 
> 更新日志请参阅: [CHANGELOG](CHANGELOG.md)

Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, SQLite 和 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能.

Sequelize 遵从 [SEMVER](http://semver.org). 支持 Node v6 及更高版本以便使用 ES6 功能.

你目前正在查看 Sequelize 的**教程和指南**.你可能还对[API 参考](http://docs.sequelizejs.com/identifiers) (英文)感兴趣.

## 版本

### [v6 中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master)

### [v5 中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/v5)

### [v4 中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/v4)(停止更新)

## 文档(v5)

### 核心概念

- [Getting started - 入门](getting-started.md)
- [Dialects - 方言](dialects.md)
- [Datatypes - 数据类型](data-types.md)
- [Model definition - 模型定义](models-definition.md)
- [Model usage - 模型使用](models-usage.md)
- [Hooks - 钩子](hooks.md)
- [Querying - 查询](querying.md)
- [Instances - 实例](instances.md)
- [Associations - 关联](associations.md)
- [Raw queries - 原始查询](raw-queries.md)

### 其它主题

- [Transactions - 事务](transactions.md)
- [Scopes - 作用域](scopes.md)
- [Read replication - 读取复制](read-replication.md)
- [Migrations - 迁移](migrations.md)
- [Resources - 资源](resources.md)
- [TypeScript](typescript.md)
- [Upgrade to V5 - 升级到 V5](upgrade-to-v5.md)
- [Working with legacy tables - 使用遗留表](legacy.md)

## 简单示例

```js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
```

请通过 [Getting started - 入门](getting-started.md) 来学习更多相关内容. 如果你想要学习 Sequelize API 请通过 [API 参考](http://docs.sequelizejs.com/identifiers) (英文).


