import {KeyOfDistributive} from './core/types';

const methods: { [key: string]: Function } = {};

// 重写函数原型上的方法
export function $override(name: string, fn: Function) {
    methods[name] = fn;
}

let idStart = 0x0907;// 2311

export function guid(): number {
    return idStart++;
}

export function logError(...args: any[]) {
    if (typeof console !== 'undefined') {
        console.error.apply(console, args);
    }
}

export function clone() {

}

export function keys<T extends object>(obj: T): (KeyOfDistributive<T & string>)[] {
    if (!obj) {
        return [];
    }
    type TKeys = KeyOfDistributive<T & string>
    if (Object.keys) {
        return Object.keys(obj) as TKeys[];
    }

    // 不支持Object.keys获取key值
    const keyList: TKeys[] = [];
    for (const objKey in obj) {
        if (obj.hasOwnProperty(objKey)) {
            keyList.push(objKey as any);
        }
    }
    return keyList;
}
