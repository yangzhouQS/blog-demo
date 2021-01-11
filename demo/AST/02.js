// https://esprima.org/demo/parse.html#
const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

let sourceCode = 'function add(){}'

const code = `
function createConreteAccountsReportRoute (service, models) {
  service.get('q-conrete-inventory-profit-loss-account-report', async (ctx) => {
    await conreteAccountsReportService.inventoryProfitAndLossAccountReport(ctx, models)
  })
  // 获取时间
  service.get('q-get-last-check-date', async (ctx) => {
    await conreteAccountsReportService.getLastCheckDate(ctx, models)
  })
}
`

let ast = esprima.parse(code)
estraverse.traverse(ast, {
	enter(node) {
		// console.log(node.type)
		if (node.type === 'Program') {
		}
	},
	leave(node) {
		// console.log(Object.prototype.toString.call(node))
		console.log(JSON.stringify(node,null,2))
	}
})

const generated = escodegen.generate(ast);
// console.log(generated);
