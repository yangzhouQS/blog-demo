const AbstractDialect = require('../abstract')

class MysqlDialect extends AbstractDialect {
  constructor (sequelize) {
    super()
    this.sequelize = sequelize
    this.connectionManager = {}
    this.queryGenerator = {
      typeValidation: '',
      queryGenerator:{
        escape(value){

        }
      }
    }
    this.queryInterface = new Object(sequelize, this.queryGenerator)
  }

}

MysqlDialect.prototype.supports = {}
MysqlDialect.prototype.defaultVersion = '5.7.0'
MysqlDialect.prototype.Query = 'Query'
MysqlDialect.prototype.QueryGenerator = {
  typeValidation: {},
  setOperatorsAliases: () => {

  }
}
MysqlDialect.prototype.DataTypes = 'DataTypes'
MysqlDialect.prototype.name = 'mysql'
MysqlDialect.prototype.TICK_CHAR = '`'
// MysqlDialect.prototype.TICK_CHAR_LEFT = MysqlDialect.prototype.TICK_CHAR;
// MysqlDialect.prototype.TICK_CHAR_RIGHT = MysqlDialect.prototype.TICK_CHAR;

module.exports = MysqlDialect
