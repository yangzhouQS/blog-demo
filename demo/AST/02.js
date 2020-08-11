const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

let sourceCode = 'function add(){}'
let ast = esprima.parse(sourceCode)
estraverse.traverse(ast, {
  enter (node) {
    // console.log(node)
  },
  leave (node) {
    console.log(node)
  }
})
// console.log(ast)

