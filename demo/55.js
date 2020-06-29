function transForm(arrData) {
	const getTimeDifference = (startDate, endDate) => Math.abs(moment(endDate).diff(startDate, 'day')) + 1
	let arr = [] // 未变更数据,主合同数据
	let changeData = [] // 变更数据
	let changeAddData = [] // 变更新增材料数据
	const primaryMap = new Map() // 根据材料唯一性设置key唯一映射
	const addDataMap = new Map()
	
	// 1.按照开始时间排序
	arrData.sort((a, b) => new Date(a.effectDate).getTime() - new Date(b.effectDate).getTime())
	// 2.分解和未分解分离
	for (const row of arrData) {
		const {materialName, materialId, materialUnit} = row
		const $_key = `${ materialName }|${ materialId }|${ materialUnit }`
		row.$_key = $_key
		if (row.itemType === 1) { // 主合同映射
			primaryMap.set($_key, 1)
			row.children = []
			arr.push(row)
		} else if (row.itemType === 2) {
			changeData.push(row)
		}
	}
	changeData.forEach(row => {
		const $_key = row.$_key
		if (!primaryMap.has($_key)) { // 主合同映射不存在,确定为新增材料
			changeAddData.push(row) // 变更新增材料
			if (!addDataMap.has($_key)) { // 变更新增材料排序后,第一次找到
				row.children = []
				addDataMap.set($_key, row)
			} else {
				addDataMap.get($_key).children.push(row)
			}
		}
		arr.forEach(item => {
			if (row.$_key === item.$_key) {
				item.children.push(row)
			}
		})
	})
	
	const flatArray = (data = []) => {
		let len = data.length
		return data.map((row, index) => {
			if (len === 1 || index + 1 === len) {
				let startDate = row.effectDate
				let endDate = row.endDate
				row.beginDate = startDate
				row.endDate = endDate
				row.itemDay = getTimeDifference(startDate, endDate)
				return row
			}
			if (index + 1 < len) {
				let nextData = data[index + 1]
				let startDate = row.effectDate // 自己开始时间
				let endDate = nextData.effectDate // 下一次分解的开始时间为结束时间
				row.beginDate = startDate
				row.endDate = endDate
				row.itemDay = getTimeDifference(startDate, endDate)
				return row
			} else if (index + 1 === len) { // 最后一次变更
			}
		})
	}
	let result = []
	// 3.数据展平
	arr.map(row => {
		// 未变更合同
		if (row.children && row.children.length === 0) {
			row.itemDay = getTimeDifference(row.beginDate, row.endDate)
			result.push(row)
		} else if (row.children && row.children.length > 0) { // 变更合同
			let {beginDate, effectDate} = row.children[0] // effectDate,结束时间
			let days = getTimeDifference(beginDate, effectDate)
			// row._startDate = row.beginDate
			row.endDate = effectDate // 结束时间下次变更时间
			row.itemDay = days // 天数
			let tmp = JSON.parse(JSON.stringify(row))
			delete tmp.children
			result.push(tmp)
			result.push(...flatArray(row.children))
		}
	})
	
	// 变更后新添加材料
	let addArr = Array.from(addDataMap.values())
	addArr.map(row => {
		if (row.children && row.children.length === 0) {
			// row.beginDate = row.effectDate // 自己变更开始时间
			row.itemDay = getTimeDifference(row.beginDate, row.endDate)
			result.push(row)
		} else if (row.children && row.children.length > 0) { // 再次变更
			let {effectDate} = row.children[0] // effectDate,结束时间
			let days = getTimeDifference(row.effectDate, effectDate)
			// row.startDate = row.effectDate
			row.endDate = effectDate
			row.itemDay = days
			let tmp = JSON.parse(JSON.stringify(row))
			delete tmp.children
			result.push(tmp)
			result.push(...flatArray(row.children))
		}
	})
	
	result = result.map(row => {
		row.taxFreeSum = Number((new Decimal(row.quantity).mul(row.taxFreePrice).mul(row.itemDay)).toFixed(2)) // 不含税费用
		row.taxIncludedSum = Number((new Decimal(row.quantity).mul(row.taxIncludedPrice).mul(row.itemDay)).toFixed(2)) //含税费用
		delete row.children
		return row
	})
	return result
}