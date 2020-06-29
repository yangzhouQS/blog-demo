const Sequelize = require('./lib/sequelize')


const sequelize = new Sequelize('demo', 'demo', '111111', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})

console.log(sequelize.getDatabaseName())
console.log(sequelize.getDialect())
