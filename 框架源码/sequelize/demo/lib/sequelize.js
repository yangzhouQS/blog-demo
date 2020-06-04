'use strict'
const _ = require('lodash')
const Utils = require('./utils')
const Op = require('./operators');
//
const ModelManager = require('./model-manager')
const Model = require('./model');
const QueryTypes = require('./query-types');

class MySequelize {
  constructor (database, username, password, options) {
    let config

    // 不同的sequelize实例化方式,花样传参数
    if (arguments.length === 1 && typeof database === 'object') {
      // new Sequelize({ ... options })
      options = database

    } else if (arguments.length === 1 && typeof database === 'string' || arguments.length === 2 && typeof username === 'object') {
      // new Sequelize(URI, { ... options })
      config = {}

    } else {
      // new Sequelize(database, username, password, { ... options })
      options = options || {}
      config = { database, username, password }
    }
    // MySequelize.runHooks('beforeInit', config, options)

    // 实例化参数全部挂在实例上
    this.options = {
      dialect: null, // 数据库类型
      dialectModule: null,
      dialectModulePath: null,
      host: 'localhost', // 数据库的主机
      protocol: 'tcp', // 关系数据库协议
      define: {}, // 模型的全局默认配置参数
      query: {}, // sequelize.query的默认选项
      sync: {}, // sequelize.sync的默认选项
      timezone: '+00:00', // 将日期从数据库转换为JavaScript日期时使用的时区。
      clientMinMessages: 'warning',
      standardConformingStrings: true,
      // 每次Sequelize执行的功能都会记录一些内容。函数可以接收多个参数，但仅第一个由来打印console.log。
      // 要打印所有值，请使用(...msg) => console.log(msg)
      logging: console.log,
      omitNull: false,
      native: false,
      replication: false,
      ssl: undefined,
      pool: { // 排序连接池配置
        max: 5,
        min: 0,
        idle: 10000, //连接释放之前可以空闲的最长时间（以毫秒为单位）
        acquire: 60000 // 该池在抛出错误之前将尝试获得连接的最长时间（以毫秒为单位）

      },
      quoteIdentifiers: true,
      hooks: {}, // 在某些生命周期事件之前和之后调用的全局挂钩函数的对象。
      retry: {
        max: 5,
        match: [
          'SQLITE_BUSY: database is locked'
        ]
      },
      // transactionType: Transaction.TYPES.DEFERRED,
      isolationLevel: null,
      databaseVersion: 0,
      typeValidation: false, // 在插入和更新上运行内置的类型验证器，并使用where子句进行选择，例如，验证传递给整数字段的参数是否类似于整数。
      benchmark: false,
      minifyAliases: false,
      logQueryParameters: false,
      dialectOptions: {
        //  带有附加选项的对象，这些选项直接传递给连接库
      },
      ...options
    }
    if (!this.options.dialect) {
      throw new Error('Place Setting Dialect Type...')
    }
    if (this.options.logging === true) {

      this.options.logging = console.log
    }

    // option传递的全局hooks混入
    // this._setupHooks(options.hooks);

    // 示例的config配置参数
    this.config = {
      database: config.database || this.options.database,
      username: config.username || this.options.username,
      password: config.password || this.options.password || null,
      host: config.host || this.options.host,
      port: config.port || this.options.port,
      pool: this.options.pool,
      protocol: this.options.protocol,
      native: this.options.native,
      ssl: this.options.ssl,
      replication: this.options.replication,
      dialectModule: this.options.dialectModule,
      dialectModulePath: this.options.dialectModulePath,
      keepDefaultTimezone: this.options.keepDefaultTimezone,
      dialectOptions: this.options.dialectOptions
    }

    // 需要连接的数据库类型,针对不同数据库导入不同的配置文件
    let Dialect
    switch (this.getDialect()) {
      case 'mysql':
        Dialect = require('./dialects/mysql')
        break
      default:
        throw new Error(`您初始化传入的${ this.getDialect() }不支持`)
    }
    this.dialect = new Dialect(this)

    // 模型验证
    this.dialect.queryGenerator.typeValidation = this.options.typeValidation

    // 基于字符串的运算符别名, 传入的是对象
    if (_.isPlainObject(this.options.operatorsAliases)) {
      // 设置全局的运算符别名
      this.dialect.queryGenerator.setOperatorsAliases(this.options.operatorsAliases)
    } else if (typeof this.options.operatorsAliases === 'boolean') {
      // 传入的是布尔值
    }

    // 查询的接口
    this.queryInterface = this.dialect.queryInterface;


    this.models = {}
    this.modelManger = new ModelManager(this)

    // 连接的管理对象
    this.connectionManager = this.dialect.connectionManager;

    // 运行的钩子函数
    // MySequelize.runHooks('afterInit', this);
  }

  /**
   * 获取数据库的连接类型
   * @returns {string}
   */
  getDialect () {
    return this.options.dialect
  }

  /**
   * 获取数据库的连接名称
   * @returns {string}
   */
  getDatabaseName(){
    return this.config.database
  }

  /**
   * 返回QueryInterface的实例
   * @returns {*}
   */
  getQueryInterface() {
    return this.queryInterface;
  }

  /**
   * 定义模型的define方法
   * @param {string} modelName 模型名称
   * @param {object} attributes 模型的字段属性
   * @param {object} options 参数
   * @returns {model}
   */
  define(modelName, attributes, options = {}) {

    // 每个模型上的模型名称
    options.modelName = modelName;

    // 每个模型 上的sequelize实例
    options.sequelize = this;

    const model = class extends Model {};

    model.init(attributes, options);

    // 返回初始化完成的模型实例
    return model;
  }

  /**
   * 获取已定义的模型
   * @param modelName
   * @returns {*}
   */
  model(modelName) {
    if (!this.isDefined(modelName)) {
      throw new Error(`${modelName} has not been defined`);
    }

    return this.modelManager.getModel(modelName);
  }

  /**
   * 检查是否定义了具有给定名称的模型
   * @param modelName
   * @returns {boolean}
   */
  isDefined(modelName) {
    return !!this.modelManager.models.find(model => model.name === modelName);
  }

  /**
   * 在数据库上执行查询，可以选择绕过所有Sequelize
   * @param sql 执行的sql
   * @param {object}    [options={}]
   * @param {boolean}    [options.raw]
   * @param {boolean}    [options.transaction=null] 事物操作
   * @returns {Promise<void>}
   */
  async query(sql,options){

  }

  /**
   * 执行查询以设置环境或用户变量
   * @param variables
   * @param options
   * @returns {Promise<void>}
   */
  async set(variables, options) {

    // Prepare options
    options = { ...this.options.set, ...typeof options === 'object' && options };

    if (this.options.dialect !== 'mysql') {
      throw new Error('sequelize.set is only supported for mysql');
    }
    if (!options.transaction || !(options.transaction instanceof Transaction) ) {
      throw new TypeError('options.transaction is required');
    }

    // Override some options, since this isn't a SELECT
    options.raw = true;
    options.plain = true;
    options.type = 'SET';

    // Generate SQL Query
    const query =
      `SET ${
        _.map(variables, (v, k) => `@${k} := ${typeof v === 'string' ? `"${v}"` : v}`).join(', ')}`;

    return await this.query(query, options);
  }

  /**
   * 转义值
   * @param value
   * @returns {*}
   */
  escape(value) {
    return this.dialect.queryGenerator.escape(value);
  }

  /**
   * 创建一个新的数据库架构
   * 在mysql和sqlite中，此命令无效
   * @param schema
   * @param options
   * @returns {Promise<*>}
   */
  async createSchema(schema, options) {
    return await this.getQueryInterface().createSchema(schema, options);
  }

  /**
   * 显示所有定义的模型
   * @param options
   * @returns {Promise<*|Object|Object[]|Array>}
   */
  async showAllSchemas(options) {
    return await this.getQueryInterface().showAllSchemas(options);
  }

  /**
   * 删除单个模型
   * 注意：这是Postgres含义上的架构，而不是数据库表。在mysql和sqlite中，这会删除与模式名称匹配的表
   * @param schema
   * @param options
   * @returns {Promise<*>}
   */
  async dropSchema(schema, options) {
    return await this.getQueryInterface().dropSchema(schema, options);
  }

  /**
   * 删除所有的模型
   * @param options
   * @returns {Promise<*|void|any[]>}
   */
  async dropAllSchemas(options) {
    return await this.getQueryInterface().dropAllSchemas(options);
  }

  /**
   * 将所有定义的模型同步到数据库
   * @param options
   * @returns {Promise<MySequelize>}
   */
  async sync(options) {
    options = {
      ...this.options,
      ...this.options.sync,
      ...options,
      hooks: options ? options.hooks !== false : true
    };

    if (options.match) {
      if (!options.match.test(this.config.database)) {
        throw new Error(`Database "${this.config.database}" does not match sync match parameter "${options.match}"`);
      }
    }

    if (options.hooks) {
      await this.runHooks('beforeBulkSync', options);
    }
    if (options.force) {
      await this.drop(options);
    }
    const models = [];

    // Topologically sort by foreign key constraints to give us an appropriate
    // creation order
    this.modelManager.forEachModel(model => {
      if (model) {
        models.push(model);
      } else {
        // DB should throw an SQL error if referencing non-existent table
      }
    });

    // no models defined, just authenticate
    if (!models.length) {
      await this.authenticate(options);
    } else {
      for (const model of models) await model.sync(options);
    }
    if (options.hooks) {
      await this.runHooks('afterBulkSync', options);
    }
    return this;
  }

  /**
   * 截断通过sequelize模型定义的所有表。这是通过调用Model.truncate()每个模型来完成的。
   * @param options
   * @returns {Promise<void>}
   */
  async truncate(options) {
    const models = [];

    this.modelManager.forEachModel(model => {
      if (model) {
        models.push(model);
      }
    }, { reverse: false });

    if (options && options.cascade) {
      for (const model of models) model.truncate(options);
    } else {
      await Promise.all(models.map(model => model.truncate(options)));
    }
  }

  /**
   * 删除通过此sequelize实例定义的所有表。这是通过在每个模型上调用Model.drop来完成的。
   * @param options
   * @returns {Promise<void>}
   */
  async drop(options) {
    const models = [];

    this.modelManager.forEachModel(model => {
      if (model) {
        models.push(model);
      }
    }, { reverse: false });

    for (const model of models) await model.drop(options);
  }


  /**
   * 通过尝试进行身份验证来测试连接。它运行SELECT 1+1 AS result查询
   * @param options
   * @returns {Promise<void>}
   */
  async authenticate(options) {
    options = {
      raw: true,
      plain: true,
      type: QueryTypes.SELECT,
      ...options
    };

    await this.query('SELECT 1+1 AS result', options);

    return;
  }

  /**
   * 获取数据库的版本信息
   * @param options
   * @returns {Promise<*>}
   */
  async databaseVersion(options) {
    return await this.getQueryInterface().databaseVersion(options);
  }


  /**
   * 根据方言获取fn
   * @returns {Sequelize.fn}
   */
  random() {
    const dia = this.getDialect();
    if (dia === 'postgres' || dia === 'sqlite') {
      return this.fn('RANDOM');
    }
    return this.fn('RAND');
  }


  /**
   * 创建一个表示数据库功能的对象
   * @param fn
   * @param args
   * @returns {Fn}
   */
  static fn(fn, ...args) {
    return new Utils.Fn(fn, args);
  }


  /**
   * 创建一个表示数据库中列的对象，这允许引用查询中的另一列。与结合使用通常很有用sequelize.fn，因为fn的原始字符串参数将被转义。
   * @param col
   * @returns {Col}
   */
  static col(col) {
    return new Utils.Col(col);
  }

  /**
   * 创建一个表示对强制转换函数的调用的对象
   * @param val
   * @param type
   * @returns {Cast}
   */
  static cast(val, type) {
    return new Utils.Cast(val, type);
  }

  /**
   * 创建一个代表文字的对象，即不会被转义的东西
   * @param val
   * @returns {Literal}
   */
  static literal(val) {
    return new Utils.Literal(val);
  }


  /**
   * and 查询
   * @param args
   * @returns {{}}
   */
  static and(...args) {
    return { [Op.and]: args };
  }

  /**
   * Or查询
   *
   * @see
   * {@link Model.findAll}
   *
   * @param {...string|object} args Each argument will be joined by OR
   * @since v2.0.0-dev3
   * @memberof Sequelize
   *
   * @returns {Sequelize.or}
   */
  static or(...args) {
    return { [Op.or]: args };
  }

  /**
   * 创建一个表示postgres / sqlite / mysql json数据类型的嵌套where条件的对象。
   *
   * @see
   * {@link Model.findAll}
   *
   * @param {string|object} conditionsOrPath A hash containing strings/numbers or other nested hash, a string using dot notation or a string using postgres/sqlite/mysql json syntax.
   * @param {string|number|boolean} [value] An optional value to compare against. Produces a string of the form "<json path> = '<value>'".
   * @memberof Sequelize
   *
   * @returns {Sequelize.json}
   */
  static json(conditionsOrPath, value) {
    return new Utils.Json(conditionsOrPath, value);
  }

  /**
   * A way of specifying attr = condition.
   *
   * The attr can either be an object taken from `Model.rawAttributes` (for example `Model.rawAttributes.id` or `Model.rawAttributes.name`). The
   * attribute should be defined in your model definition. The attribute can also be an object from one of the sequelize utility functions (`sequelize.fn`, `sequelize.col` etc.)
   *
   * For string attributes, use the regular `{ where: { attr: something }}` syntax. If you don't want your string to be escaped, use `sequelize.literal`.
   *
   * @see
   * {@link Model.findAll}
   *
   * @param {object} attr The attribute, which can be either an attribute object from `Model.rawAttributes` or a sequelize object, for example an instance of `sequelize.fn`. For simple string attributes, use the POJO syntax
   * @param {symbol} [comparator='Op.eq'] operator
   * @param {string|object} logic The condition. Can be both a simply type, or a further condition (`or`, `and`, `.literal` etc.)
   * @since v2.0.0-dev3
   */
  static where(attr, comparator, logic) {
    return new Utils.Where(attr, comparator, logic);
  }

  /**
   *
   * 开始交易。使用事务时，应在options参数中传递事务，以使查询在该事务下发生@see Transaction
   * 如果启用了CLS，则事务将自动传递给回调中运行的任何查询
   * Start a transaction. When using transactions, you should pass the transaction in the options argument in order for the query to happen under that transaction @see {@link Transaction}
   *
   * If you have [CLS](https://github.com/Jeff-Lewis/cls-hooked) enabled, the transaction will automatically be passed to any query that runs within the callback
   *
   * @example
   *
   * try {
   *   const transaction = await sequelize.transaction();
   *   const user = await User.findOne(..., { transaction });
   *   await user.update(..., { transaction });
   *   await transaction.commit();
   * } catch {
   *   await transaction.rollback()
   * }
   *
   * @example <caption>A syntax for automatically committing or rolling back based on the promise chain resolution is also supported</caption>
   *
   * try {
   *   await sequelize.transaction(transaction => { // Note that we pass a callback rather than awaiting the call with no arguments
   *     const user = await User.findOne(..., {transaction});
   *     await user.update(..., {transaction});
   *   });
   *   // Committed
   * } catch(err) {
   *   // Rolled back
   *   console.error(err);
   * }
   * @example <caption>To enable CLS, add it do your project, create a namespace and set it on the sequelize constructor:</caption>
   *
   * const cls = require('cls-hooked');
   * const namespace = cls.createNamespace('....');
   * const Sequelize = require('sequelize');
   * Sequelize.useCLS(namespace);
   *
   * // Note, that CLS is enabled for all sequelize instances, and all instances will share the same namespace
   *
   * @param {object}   [options] Transaction options
   * @param {string}   [options.type='DEFERRED'] See `Sequelize.Transaction.TYPES` for possible options. Sqlite only.
   * @param {string}   [options.isolationLevel] See `Sequelize.Transaction.ISOLATION_LEVELS` for possible options
   * @param {string}   [options.deferrable] Sets the constraints to be deferred or immediately checked. See `Sequelize.Deferrable`. PostgreSQL Only
   * @param {Function} [options.logging=false] A function that gets executed while running the query to log the sql.
   * @param {Function} [autoCallback] The callback is called with the transaction object, and should return a promise. If the promise is resolved, the transaction commits; if the promise rejects, the transaction rolls back
   *
   * @returns {Promise}
   */
  async transaction(options, autoCallback) {
    if (typeof options === 'function') {
      autoCallback = options;
      options = undefined;
    }

    const transaction = new Transaction(this, options);

    if (!autoCallback) {
      await transaction.prepareEnvironment(false);
      return transaction;
    }

    // autoCallback provided
    return MySequelize._clsRun(async () => {
      try {
        await transaction.prepareEnvironment();
        const result = await autoCallback(transaction);
        await transaction.commit();
        return await result;
      } catch (err) {
        if (!transaction.finished) {
          try {
            await transaction.rollback();
          } catch (err0) {
            // ignore
          }
        }
        throw err;
      }
    });
  }

  /**
   * 将CLS与Sequelize一起使用。提供的CLS命名空间存储为Sequelize._cls
   *
   * Use CLS with Sequelize.
   * CLS namespace provided is stored as `Sequelize._cls`
   *
   * @param {object} ns CLS namespace
   * @returns {object} Sequelize constructor 序列化构造函数
   */
  static useCLS(ns) {
    // check `ns` is valid CLS namespace
    if (!ns || typeof ns !== 'object' || typeof ns.bind !== 'function' || typeof ns.run !== 'function') throw new Error('Must provide CLS namespace');

    // save namespace as `Sequelize._cls`
    this._cls = ns;

    // return Sequelize for chaining
    return this;
  }

  /**
   * Run function in CLS context.
   * If no CLS context in use, just runs the function normally
   *
   * @private
   * @param {Function} fn Function to run
   * @returns {*} Return value of function
   */
  static _clsRun(fn) {
    const ns = MySequelize._cls;
    if (!ns) return fn();

    let res;
    ns.run(context => res = fn(context));
    return res;
  }

  log(...args) {
    let options;

    const last = _.last(args);

    if (last && _.isPlainObject(last) && Object.prototype.hasOwnProperty.call(last, 'logging')) {
      options = last;

      // remove options from set of logged arguments if options.logging is equal to console.log
      // eslint-disable-next-line no-console
      if (options.logging === console.log) {
        args.splice(args.length - 1, 1);
      }
    } else {
      options = this.options;
    }

    if (options.logging) {
      if (options.logging === true) {
        deprecations.noTrueLogging();
        // eslint-disable-next-line no-console
        options.logging = console.log;
      }

      // second argument is sql-timings, when benchmarking option enabled
      // eslint-disable-next-line no-console
      if ((this.options.benchmark || options.benchmark) && options.logging === console.log) {
        args = [`${args[0]} Elapsed time: ${args[1]}ms`];
      }

      options.logging(...args);
    }
  }

  /**
   * 关闭此sequelize实例使用的所有连接，并释放所有引用，以便可以垃圾回收该实例。
   *    通常，这是在进程退出时完成的，因此，如果您要创建多个实例，并且想对其中的一些实例进行垃圾回收，则只需调用此方法。
   * Close all connections used by this sequelize instance, and free all references so the instance can be garbage collected.
   *
   * Normally this is done on process exit, so you only need to call this method if you are creating multiple instances, and want
   * to garbage collect some of them.
   *
   * @returns {Promise}
   */
  close() {
    return this.connectionManager.close();
  }

  normalizeDataType(Type) {
    let type = typeof Type === 'function' ? new Type() : Type;
    const dialectTypes = this.dialect.DataTypes || {};

    if (dialectTypes[type.key]) {
      type = dialectTypes[type.key].extend(type);
    }

    if (type instanceof DataTypes.ARRAY) {
      if (!type.type) {
        throw new Error('ARRAY is missing type definition for its values.');
      }
      if (dialectTypes[type.type.key]) {
        type.type = dialectTypes[type.type.key].extend(type.type);
      }
    }

    return type;
  }

  normalizeAttribute(attribute) {
    if (!_.isPlainObject(attribute)) {
      attribute = { type: attribute };
    }

    if (!attribute.type) return attribute;

    attribute.type = this.normalizeDataType(attribute.type);

    if (Object.prototype.hasOwnProperty.call(attribute, 'defaultValue')) {
      if (typeof attribute.defaultValue === 'function' && (
        attribute.defaultValue === DataTypes.NOW ||
        attribute.defaultValue === DataTypes.UUIDV1 ||
        attribute.defaultValue === DataTypes.UUIDV4
      )) {
        attribute.defaultValue = new attribute.defaultValue();
      }
    }

    if (attribute.type instanceof DataTypes.ENUM) {
      // The ENUM is a special case where the type is an object containing the values
      if (attribute.values) {
        attribute.type.values = attribute.type.options.values = attribute.values;
      } else {
        attribute.values = attribute.type.values;
      }

      if (!attribute.values.length) {
        throw new Error('Values for ENUM have not been defined.');
      }
    }

    return attribute;
  }

}

// 别名
// Aliases
MySequelize.prototype.fn = MySequelize.fn;
MySequelize.prototype.col = MySequelize.col;
MySequelize.prototype.cast = MySequelize.cast;
MySequelize.prototype.literal = MySequelize.literal;
MySequelize.prototype.and = MySequelize.and;
MySequelize.prototype.or = MySequelize.or;
MySequelize.prototype.json = MySequelize.json;
MySequelize.prototype.where = MySequelize.where;
MySequelize.prototype.validate = MySequelize.prototype.authenticate;

// 版本号
MySequelize.version = '0.0.1'//require('../package.json').version;

MySequelize.options = { hooks: {} };


// MySequelize 工具函数
MySequelize.Utils = Utils;

// 操作运算符
MySequelize.Op = Op;




/**
 * Available table hints to be used for querying data in mssql for table hints
 *
 * @see {@link TableHints}
 */
// MySequelize.TableHints = TableHints;

/**
 * Available index hints to be used for querying data in mysql for index hints
 *
 * @see {@link IndexHints}
 */
// MySequelize.IndexHints = IndexHints;

/**
 * A reference to the sequelize transaction class. Use this to access isolationLevels and types when creating a transaction
 *
 * @see {@link Transaction}
 * @see {@link Sequelize.transaction}
 */
// MySequelize.Transaction = Transaction;

/**
 * A reference to Sequelize constructor from sequelize. Useful for accessing DataTypes, Errors etc.
 *
 * @see {@link Sequelize}
 */
MySequelize.prototype.MySequelize = MySequelize;

/**
 * query查询参数
 * Available query types for use with `sequelize.query`
 *
 * @see {@link QueryTypes}
 */
MySequelize.prototype.QueryTypes = MySequelize.QueryTypes = QueryTypes;

/**
 * Exposes the validator.js object, so you can extend it with custom validation functions. The validator is exposed both on the instance, and on the constructor.
 *
 * @see https://github.com/chriso/validator.js
 */
// MySequelize.prototype.Validator = Sequelize.Validator = Validator;

// MySequelize.Model = Model;

/*Sequelize.DataTypes = DataTypes;
for (const dataType in DataTypes) {
  Sequelize[dataType] = DataTypes[dataType];
}*/

/**
 * A reference to the deferrable collection. Use this to access the different deferrable options.
 *
 * @see {@link Transaction.Deferrable}
 * @see {@link Sequelize#transaction}
 */
// Sequelize.Deferrable = Deferrable;

/**
 * A reference to the sequelize association class.
 *
 * @see {@link Association}
 */
// Sequelize.prototype.Association = Sequelize.Association = Association;

/**
 * Provide alternative version of `inflection` module to be used by `Utils.pluralize` etc.
 *
 * @param {object} _inflection - `inflection` module
 */
// MySequelize.useInflection = Utils.useInflection;

/**
 * Allow hooks to be defined on Sequelize + on sequelize instance as universal hooks to run on all models
 * and on Sequelize/sequelize methods e.g. Sequelize(), Sequelize#define()
 */
// Hooks.applyTo(Sequelize);
// Hooks.applyTo(Sequelize.prototype);

/**
 * Expose various errors available
 */

// expose alias to BaseError
// MySequelize.Error = sequelizeErrors.BaseError;

/*for (const error of Object.keys(sequelizeErrors)) {
  Sequelize[error] = sequelizeErrors[error];
}*/




module.exports.MySequelize = MySequelize;
module.exports = MySequelize
module.exports.default = MySequelize;







