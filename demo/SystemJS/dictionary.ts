// 字典对象
export class Dictionary<T> {

    // 封装通过对象或者map存储数据
    private _items: ({ [k: string]: T }) | Map<string, T>;

    // 跟踪目前元素个数,insert后增加,remove后减小
    private _count: number = 0;

    public constructor(useES6Map: boolean = true) {
        if (useES6Map) {
            this._items = new Map<string, T>();
        } else {
            this._items = {};
        }
    }

    public get length(): number {
        return this._count;
    }

    // 判断某个键是否存在
    public contains(key: string): boolean {
        if (this._items instanceof Map) {
            return this._items.has(key);
        } else {
            return this._items[key] !== undefined;
        }
    }

    // 根据key找值
    public find(key: string): T | undefined {
        if (this._items instanceof Map) {
            return this._items.get(key);
        } else {
            return this._items[key];
        }
    }

    public insert(key: string, value: T): void {
        if (this._items instanceof Map) {
            this._items.set(key, value);
            this._count = this._items.size;
        } else {
            this._items[key] = value;
            this._count = Object.keys(this._items).length;
        }
    }

    public remove(key: string): boolean {
        if (this.find(key) === undefined) {
            return false;
        }
        if (this._items instanceof Map) {
            this._items.delete(key)
        } else {
            delete this._items[key];
        }
        this._count--;
        return true;
    }

    public get keys(): string[] {
        const keys: string[] = []
        if (this._items instanceof Map) {
            this._items.forEach((value, key) => {
                keys.push(key)
            })
        } else {
            for (const itemsKey in this._items) {
                if (this._items.hasOwnProperty(itemsKey)) {
                    keys.push(itemsKey)
                }
            }
        }
        return keys;
    }

    public get values(): T[] {
        const values: T[] = [];
        if (this._items instanceof Map) {
            const vArray = this._items.values()
            this._items.forEach((value) => {
                values.push(value)
            })
        } else {
            for (const itemsKey in this._items) {
                if (this._items.hasOwnProperty(itemsKey)) {
                    values.push(this._items[itemsKey])
                }
            }
        }
        return values;
    }

    public toString(): void {
        if (this._items instanceof Map) {
            console.log(Array.from(this._items.keys()))
            console.log(Array.from(this._items.values()))
        } else {
            console.log(this._items)
        }
    }
}

/*let dict: Dictionary<string> = new Dictionary<string>(true);
dict.insert("a", "a");
dict.insert("b", "2");
dict.insert("c", "c");
dict.insert("d", "d");
dict.insert("e", "hello");
dict.remove('c')
console.log(dict.length)
console.log(dict.find('c'))
console.log(dict.contains('a'))
dict.toString()
console.log(dict.keys)
console.log(dict.values)*/
