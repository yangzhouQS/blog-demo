// 双向循环链表
export class ListNode<T> {
    public next: ListNode<T> | null // 当前listNode的后驱
    public prev: ListNode<T> | null // 当前listNode的前驱
    public data: T | undefined// listNode所存储的数据
    public constructor(data: T | undefined = undefined) {
        this.next = this.prev = null
        this.data = data
    }
}

export class List<T> {
    private _headNode: ListNode<T>
    private _length: number = 0

    public constructor() {
        this._headNode = new ListNode<T>()
        this._headNode.next = this._headNode
        this._headNode.prev = this._headNode
        this._length = 0
    }

    public empty(): boolean {
        // 头结点的后驱指向自己链表为空
        return this._headNode.next === this._headNode
        // return this._length === 0
    }

    public get length(): number {
        return this._length
    }

    /**
     * 获取前闭
     * @return {ListNode<T>}
     */
    public begin(): ListNode<T> {
        if (this._headNode.next === null) {
            throw new Error('头节点的next指针必须不为null_')
        }
        return this._headNode.next
    }

    /**
     * 总是返回链表的头部节点
     * @return {ListNode<T>}
     */
    public end(): ListNode<T> {
        return this._headNode
    }

    /**
     * 链表是否包含指定值
     * @param data
     */
    public contains(data: T): boolean {
        let link: ListNode<T> | null = this._headNode.next
        while (link.data) {
            if (link.data !== undefined && link.data == data) {
                return true
            }
            link = link.next
        }
        return false
    }

    // 链表的双向遍历
    /**
     * 链表的双向遍历
     * @param cb 回调函数签名
     */
    public forNext(cb: (data: T) => void): void {
        for (let link: ListNode<T> | null = this._headNode.next; link !== null && link != this._headNode; link = link.next) {
            if (link.data !== undefined) {
                cb(link.data)
            }
        }
    }

    public forPrev(cb: (data: T) => void): void {
        for (let link: ListNode<T> | null = this._headNode.prev; link !== null && link != this._headNode; link = link.prev) {
            if (link.data !== undefined) {
                cb(link.data)
            }
        }
    }

    public insertBefore(node: ListNode<T>, data: T): ListNode<T> {
        // 新建一个需要插入的新节点
        const ret: ListNode<T> = new ListNode<T>(data)

        // 设置新节点的前驱和后驱
        ret.next = node
        ret.prev = node.prev
        if (node.prev !== null) {
            node.prev.next = ret
        }
        node.prev = ret
        this._length++
        return ret
    }

    public remove(node: ListNode<T>): void {
        // 获取需要删除节点的前驱和后驱
        let next: ListNode<T> | null = node.next
        let prev: ListNode<T> | null = node.prev
        if (prev != null) {
            prev.next = next
        }
        if (next != null) {
            next.prev = prev
        }
        this._length--
    }

    /**
     * 尾部插入
     * @param data
     */
    public push(data: T): void {
        this.insertBefore(this.end(), data)
    }

    /**
     * 尾部删除
     * @return {undefined}
     */
    public pop(): T | undefined {
        let prev: ListNode<T> | null = this.end().prev
        if (prev != null) {
            let ret: T | undefined = prev.data
            this.remove(prev)
            return ret
        }
        return undefined
    }

    /**
     * 头部插入
     * @param data
     */
    public push_front(data: T): void {
        this.insertBefore(this.begin(), data)
    }

    /**
     * 头部删除
     * @return {T}
     */
    public pop_front(): T | undefined {
        let ret: T | undefined = this.begin().data
        this.remove(this.begin())
        return ret
    }
}
const list = new List()
debugger
