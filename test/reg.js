const str = `orgId: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, // 组织id',`
console.log(str.match(/(\S*):.*Sequelize.(\S*),/ig))
console.log(str.match(/(.*\S.*): {(.*)}/gi))
console.log(/(.*\S): {/gi.exec(str))
