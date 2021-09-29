interface IAdapter<T> {
    add(t: T): void;

    remove(): T | undefined;

    clear(): void;

    // 属性
    length: number;
    isEmpty: boolean;
}

// 回调函数类型定义
type Indexer = (len: number, idx: number) => number;

// 从左至右索引号
function IndexerL2R(len: number, idx: number): number {
    return idx;
}

// 从右至左索引号
function IndexerR2L(len: number, idx: number): number {
    return idx;
}

/**
 * 树结构的非递归遍历很适合使用枚举器模式
 */
export interface IEnumerator<T> {

    // 将迭代器重置为初识位置
    reset(): void;

    // 如果没有越界,moveNext将current设置为下一个元素并且返回true
    // 如果越界,返回false
    moveNext(): boolean;

    // 获取当前元素
    readonly current: T | undefined;
}

export class NodeT2BEnumerator<T, IdxFunc extends Indexer,
    Adapter extends IAdapter<TreeNode<T>>> implements IEnumerator<TreeNode<T>> {

    // 头结点指向输入的根节点
    private _node: TreeNode<T> | undefined;

    // 枚举器内部有一个队列或者堆栈的适配器,用于存储遍历元素, 指向泛型参数
    private _adapter!: IAdapter<TreeNode<T>>;

    // 当前正在操作的节点类型
    private _currentNode!: TreeNode<T> | undefined;

    // 当前Indexer,用于选择从左到右还是从右到左遍历,指向泛型参数
    private _indexer!: IdxFunc;

    constructor(node: TreeNode<T> | undefined, func: IdxFunc, adapter: new() => Adapter) {

        // 必须有根节点
        if (node === undefined) {
            return;
        }

        // 头节点
        this._node = node;

        // 设置回调函数
        this._indexer = func;

        // 调用new回调函数
        this._adapter = new adapter();

        // 初始化是将根节点放入队列或者堆栈
        this._adapter.add(this._node);

        // 设置当前node节点为undefined
        this._currentNode = undefined;
    }

    /**
     * 枚举器进行初始化设置
     */
    public reset(): void {
        if (this._node === undefined) {
            return;
        }
        this._currentNode = undefined;
        this._adapter.clear();
        this._adapter.add(this._node);
    }

    /**
     * 实现接口函数moveNext,返回false标识枚举器结束
     */
    public moveNext(): boolean {

        // 当前队列或者栈中没有任何元素,说明遍历已经结束
        if (this._adapter.isEmpty) {
            return false;
        }

        // 弹出头部或者尾部元素,依赖adapter是stack还是queue
        this._currentNode = this._adapter.remove();

        // 当前节点不是undefined
        if (this._currentNode !== undefined) {
            let len: number = this._currentNode.childCount;

            // 遍历所有的儿子节点
            for (let i = 0; i < len; i++) {
                // 儿子节点是从左到右, 还是从右到左进入队列或堆栈
                // 注意_indexer是在这里调用的
                let childIdx: number = this._indexer(len, i);
                let child: TreeNode<T> | undefined = this._currentNode.getChildAt(childIdx);
                if (child !== undefined) {
                    this._adapter.add(child);
                }
            }
        }
        return true;
    }

    public get current(): TreeNode<T> | undefined {
        return this._currentNode;
    }
}

export class NodeB2TEnumerator<T> implements IEnumerator<TreeNode<T>> {
    // 持有一个枚举器
    private _iter: IEnumerator<TreeNode<T>>;

    // 声明一个数组对象
    private _arr!: Array<TreeNode<T> | undefined>;

    // 当前数组索引
    private _arrIdx!: number;

    public constructor(item: IEnumerator<TreeNode<T>>) {
        this._iter = item;
        this.reset();
    }

    moveNext(): boolean {
        this._arrIdx--;
        return (this._arrIdx > 0 && this._arrIdx < this._arr.length);
    }

    reset(): void {
        this._arr = [];
        // 调用根枚举器结果全部存入数组
        while (this._iter.moveNext()) {
            this._arr.push(this._iter.current);
        }

        // 设置_arrId为数组的length
        // 因为后根遍历是先根遍历
        // 的逆操作,所以是从数组尾部向顶部的遍历
        this._arrIdx = this._arr.length;
    }

    public get current(): TreeNode<T> | undefined {
        if (this._arrIdx >= this._arr.length) {
            return undefined;
        } else {
            return this._arr[this._arrIdx];
        }
    }
}

// 使用上面的两个枚举器生产8种产品
export class NodeEnumeratorFactory {

}

export class TreeNode<T> {

    // 指向当前节点的父节点
    private _parent: TreeNode<T> | undefined;

    // 直接儿子节点,叶子节点children为undefined
    private _children: Array<TreeNode<T>> | undefined;
    // _children.length=0

    // 当前节点的名称
    private _name: string;

    // 一个泛型对象,指向一个需要依附到当前节点的对象
    private _data: T | undefined;

    constructor(data: T | undefined, parent: TreeNode<T> | undefined, name: string) {
        this._parent = parent;
        this._children = undefined;
        this._data = data;
        this._name = name;

        // 如果有父节点,则将this节点添加到父节点的儿子列表中
        if (this._parent !== undefined) {
            this._parent.addChild(this);
        }
    }

    public get children(): Array<TreeNode<T>> | undefined {
        return this._children;
    }

    public get name(): string {
        return this._name;
    }

    public get data(): T | undefined {
        return this._data;
    }

    public get parent(): TreeNode<T> | undefined {
        return this._parent;
    }

    /**
     * 获取当前节点儿子个数
     */
    public get childCount(): number {
        if (this._children !== undefined) {
            return this._children.length
        }
        return 0;
    }

    /**
     * 判断当前节点是否有儿子节点
     */
    public hasChild(): boolean {
        return this._children !== undefined && this._children.length > 0;
    }

    /**
     * 从当前节点获取根节点
     * @return {TreeNode<T>}
     */
    public get root(): TreeNode<T> | undefined {
        let cur: TreeNode<T> | undefined = this
        while (cur !== undefined && cur.parent !== undefined) {
            cur = cur.parent;
        }
        // 返回parent为undefined的节点就是root节点
        return cur;
    }

    /**
     * 获取当前节点深度
     */
    public get depth(): number {
        let cur: TreeNode<T> | undefined = this;
        let level: number = 0;
        while (cur !== undefined && cur.parent !== undefined) {
            ++level;
            cur = cur.parent;
        }
        return level;
    }

    /**
     * 获取当前节点的第一个子节点
     */
    public get firstChild(): TreeNode<T> | undefined {
        if (this._children === undefined || this.children.length === 0) {
            return undefined;
        }
        return this._children[0];
    }

    /**
     * 获取当前节点的最后一个子节点
     */
    public get lastChild(): TreeNode<T> | undefined {
        if (this._children === undefined || this.children.length === 0) {
            return undefined;
        }
        return this._children[this._children.length - 1];
    }

    /**
     * 获取当前节点的左兄弟节点
     */
    public get prevSibling(): TreeNode<T> | undefined {
        // 没有父亲节点就没有兄弟节点
        if (this.parent === undefined) {
            return undefined;
        }

        // 当前节点的父亲节点的兄弟节点大于1,才有兄弟节点
        // 如果为1,就是this,没有兄弟节点
        if (this._parent._children !== undefined && this._parent._children.length > 1) {
            // 查询当前节点在节点列表中的索引号
            let index: number = -1;
            for (let i = 0; i < this._parent._children.length; i++) {
                const node = this._parent._children[i];
                if (this === node) {
                    index = i;
                    break;
                }
            }
            // if (index !== this._parent._children.length) {
            if (index !== 0) {

                return this._parent._children[index - 1];
            } else {
                return undefined;
            }
        }
    }

    /**
     * 获取当前节点的右兄弟节点
     */
    public get nextSibling(): TreeNode<T> | undefined {
        // 没有父亲节点就没有兄弟节点
        if (this.parent === undefined) {
            return undefined;
        }

        // 当前节点的父亲节点的兄弟节点大于1,才有兄弟节点
        // 如果为1,就是this,没有兄弟节点
        if (this._parent._children !== undefined && this._parent.children.length > 1) {
            const pChild = this._parent.children

            // 记录当前节点在父节点列表中的索引号
            let index: number = -1;
            for (let i = 0; i < pChild.length; i++) {
                const node = pChild[i];
                if (this === node) {
                    index = i;
                    break;
                }
            }

            // 索引不是最后一个, 就是索引位置+1还有节点
            if (index !== this._parent.children.length - 1) {
                return this._parent.children[index + 1]

            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    /**
     * 获取最左侧子孙节点
     */
    public get mostLeft(): TreeNode<T> | undefined {
        let node: TreeNode<T> | undefined = this;
        while (true) {
            let subNode: TreeNode<T> | undefined = undefined;
            if (node != undefined) {
                subNode = node.firstChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }

    /**
     * 获取最右侧子孙节点
     */
    public get mostRight(): TreeNode<T> | undefined {
        let node: TreeNode<T> | undefined = this;
        while (true) {
            let subNode: TreeNode<T> | undefined = undefined;
            if (node != undefined) {
                // 只读属性
                subNode = node.lastChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }


    /**
     * 判断当前添加的子节点是否为当前节点的祖先节点
     * @param ancestor 测试ancestor是否为当前节点的祖先节点
     */
    public isDescendantOf(ancestor: TreeNode<T> | undefined): boolean {
        if (ancestor === undefined) {
            return false
        }
        // 从当前节点的父节点开始向上遍历
        let node: TreeNode<T> | undefined = this._parent;
        while (node !== undefined) {
            node = node._parent;
            // 当前节点的祖父等于ancestor,说明当前节点是ancestor的子孙
            if (node === ancestor) {
                return true;
            }
        }
        return false
    }

    /**
     * 根据索引删除指定位置的节点
     * @param index
     */
    public removeChildAt(index: number): TreeNode<T> | undefined {
        if (this._children === undefined) {
            return undefined
        }

        // 根据索引从children数组获取节点
        const child: TreeNode<T> | undefined = this.getChildAt(index);
        if (child === undefined) {
            return undefined
        }
        // 删除指定位置的节点
        this._children.splice(index, 1);
        child._parent = undefined;
        return child;
    }

    public removeChild(child: TreeNode<T> | undefined): TreeNode<T> | undefined {

        // 参数为undefined处理
        if (child === undefined) {
            return undefined;
        }

        // 叶子节点处理
        if (this._children === undefined) {
            return undefined;
        }

        // 数组遍历查找节点是否和传入节点相等
        let index: number = -1;
        for (let i = 0; i < this._children.length; i++) {

            // 根据索引获取指定位置节点和需要移除节点判断
            if (child === this.getChildAt(i)) {
                index = i;
            }
        }
        // 没有找到
        if (index === -1) {
            return undefined;
        }

        // 移除子节点的索引
        return this.removeChildAt(index);
    }

    /**
     * 将当前节点从父节点移除
     */
    public remove(): TreeNode<T> | undefined {
        if (this._parent !== undefined) {
            return this._parent.removeChild(this);
        }
        return undefined;
    }

    /**
     * 根据索引从当前节点获取节点
     * @param index
     */
    public getChildAt(index: number): TreeNode<T> | undefined {
        // 索引越界或者无法获取
        /*if (!this._children || !this._children[index]) {
            return undefined
        }*/
        if (this._children === undefined) {
            return undefined;
        }
        if (index < 0 || index >= this._children.length) {
            return undefined;
        }
        return this._children[index]
    }

    /**
     * 在子节点列表指定位置插入节点
     * @param child
     * @param index
     */
    public addChildAt(child: TreeNode<T>, index: number): TreeNode<T> {

        // 1.判断添加节点是否为当前节点的祖父节点
        if (this.isDescendantOf(child)) {
            return undefined;
        }
        if (this._children === undefined) {
            this._children = []
        }
        if (index > 0 && index < this._children.length) {

            // 2.添加的节点有父节点需要先移除
            if (child._parent !== undefined) {
                child._parent = undefined;
            }
            // 3.添加的节点没有父节点,页不是当前节点的祖父节点
            child._parent = this._parent;
            this._children.splice(index, 0, child);
            return child;
        } else {
            return undefined;
        }
    }

    /**
     * 在子列表末尾添加节点
     * @param child
     */
    public addChild(child: TreeNode<T>): TreeNode<T> | undefined {
        if (child === undefined) {
            this._children = [];
        }
        return this.addChildAt(child, this._children.length)
    }

    public getTreeDepth() {

    }
}
