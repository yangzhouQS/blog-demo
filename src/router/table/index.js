export default [
	{
		path: '/table',
		name: 'table-test',
		component: () => import('@/views/table/test-table.vue')
	},
	{
		path: '/dy-tab',
		name: 'table-dy',
		component: () => import('@/views/table/dy-tab.vue')
	},
	{
		path: '/import',
		name: 'table-import',
		component: () => import('@/views/table/import-table.vue')
	},
	{
		path: '/tree-table',
		name: 'tree-table',
		component: () => import('@/views/table/tree-table.vue')
	},
	{
		path: '/yl-table',
		name: 'xtree-table',
		component: () => import('@/views/table/yl-table-test.vue')
	},
	{
		path: '/x-table',
		name: 'xx-table',
		component: () => import('@/views/table/x-table-test.vue')
	},
]
