import {buildTree as _buildTree} from '../../utils'
import {TablePipeline} from '../pipeline'

export function buildTree(idProp: string, parentIdProp: string) {
  return (pipeline: TablePipeline) => pipeline.mapDataSource((rows) => _buildTree(idProp, parentIdProp, rows))
}


const _ = require('lodash')

const sleep = async time => new Promise(r => setTimeout(r, time))

~(async function main() {
  while (true) {
    console.log('lodash map exists:', typeof _.map)
    await sleep(1000)
  }
})()
