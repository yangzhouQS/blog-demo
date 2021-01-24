/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-02-20 22:03:52
 */
import PageHeader from './page-header/page-header.vue'
import PageHeaderItem from './page-header/page-header-item.vue'
import FlexBox from './flex-box/flex-box.vue'
import Panel from './panel/panel.vue'
import ToolBar from './tool-bar/tool-bar.vue'
import TimeBar from './time-bar/time-bar.vue'

import CommonSelect from './common-select/common-select.vue'
import CommonSelectApi from './common-select/common-select-api.vue'

import TreeSelect from './tree-select/tree-select.vue'
import TableEdit from './table-edit/table-edit.vue'
import List from './list/list.vue'
import ListReport from './list/list-report.vue'
import ListNext from './list/list-next.vue'
import Table from './table/table.jsx'
import TableNext from './table/table-next.jsx'
import TableReport from './table/table-report.jsx'
import OnlyTable from './table/only-table.jsx'

// // 业务组件
import Commontree from './common-tree/common-tree.vue'
import Commonpaneltree from './common-tree/common-tree-panel.vue'
import DictionarySelect from './dictionary/dictionary-select.vue'
import DictionaryTree from './dictionary/dictionary-tree.vue'
import UnitDictionaryTree from './dictionary/unit-dictionary-tree.vue'

const components = [
	FlexBox,
	Panel,
	ToolBar,
	TimeBar,
	PageHeader,
	PageHeaderItem,
	CommonSelect,
	CommonSelectApi,
	TreeSelect,
	Commontree,
	Commonpaneltree,
	DictionarySelect,
	DictionaryTree,
	UnitDictionaryTree,
	Table,
	TableNext,
	TableReport,
	OnlyTable,
	TableEdit,
	List,
	ListReport,
	ListNext
]

const install = function (Vue) {
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install,
	FlexBox,
	Panel,
	ToolBar,
	TimeBar,
	PageHeader,
	CommonSelect,
	CommonSelectApi,
	TreeSelect,
	Commontree,
	Commonpaneltree,
	DictionarySelect,
	DictionaryTree,
	UnitDictionaryTree,
	Table,
	TableReport,
	TableNext,
	OnlyTable,
	TableEdit,
	List,
	ListReport,
	ListNext
}
