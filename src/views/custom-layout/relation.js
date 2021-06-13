// import { sortChildren } from '../utils/vnodes';
function flattenVNodes(vnodes) {
	const result = [];

	function traverse(vnodes) {
		vnodes.forEach((vnode) => {
			result.push(vnode);

			if (vnode.componentInstance) {
				traverse(vnode.componentInstance.$children.map((item) => item.$vnode));
			}

			if (vnode.children) {
				traverse(vnode.children);
			}
		});
	}

	traverse(vnodes);
	return result;
}

function sortChildren(children, parent) {
	const { componentOptions } = parent.$vnode;
	if (!componentOptions || !componentOptions.children) {
		return;
	}

	const vnodes = flattenVNodes(componentOptions.children);
	children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
}

export function ChildrenMixin(parent, options = {}) {
	const indexKey = options.indexKey || 'index';

	return {
		inject: {
			[parent]: {
				default: null,
			},
		},

		computed: {
			parent() {
				if (this.disableBindRelation) {
					return null;
				}

				return this[parent];
			},

			[indexKey]() {
				this.bindRelation();

				if (this.parent) {
					return this.parent.children.indexOf(this);
				}

				return null;
			},
		},

		watch: {
			disableBindRelation(val) {
				if (!val) {
					this.bindRelation();
				}
			},
		},

		mounted() {
			this.bindRelation();
		},

		beforeDestroy() {
			if (this.parent) {
				this.parent.children = this.parent.children.filter(
					(item) => item !== this
				);
			}
		},

		methods: {
			bindRelation() {
				if (!this.parent || this.parent.children.indexOf(this) !== -1) {
					return;
				}

				const children = [...this.parent.children, this];

				sortChildren(children, this.parent);

				this.parent.children = children;
			},
		},
	};
}

export function ParentMixin(parent) {
	return {
		provide() {
			return {
				[parent]: this,
			};
		},

		data() {
			return {
				children: [],
			};
		},
	};
}
