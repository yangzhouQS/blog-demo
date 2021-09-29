import {List} from 'list-node.ts'

interface IAdapter<T> {
    add(t: T): void;

    remove(): T | undefined;

    clear(): void;

    length: number;

    isEmpty: boolean;
}

export abstract class AdapterBase<T> implements IAdapter<T> {
    protected _arr: Array<T> | List<T>
    length: number

    public constructor(useList: boolean) {
        if (useList === true) {
            this._arr = new List<T>()
        } else {
            this._arr = new Array<T>()
        }
    }

    add(t: T): void {
        this._arr.push(t)
    }

    clear(): void {
        if (this._arr instanceof List) {
            this._arr = new List<T>()
        } else {
            this._arr = new Array<T>()
        }
    }

    public get isEmpty(): boolean {
        return this._arr.length === 0
    }

    /**
     * 子类需要重写的方法
     */
    public abstract remove(): T | undefined

}

/**
 * 队列数据结构
 */
export class Queue<T> extends AdapterBase<T> {
    public remove(): T | undefined {
        if (this._arr.length > 0) {
            if (this._arr instanceof List) {
                this._arr.pop_front()
            } else {
                return this._arr.shift()
            }
        } else {
            return undefined
        }
    }
}

/**
 * 栈数据结构
 */
export class Stack<T> extends AdapterBase<T> {
    public remove(): T | undefined {
        if (this._arr.length > 0) {
            this._arr.pop()
        } else {
            return undefined
        }
    }
}

