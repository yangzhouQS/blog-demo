// 用于处理merge时无法遍历Date等对象的问题 builtin_object
const BUILTIN_OBJECT: { [key: string]: boolean } = {
    '[object Function]': true,
    '[object RegExp]': true,
    '[object Date]': true,
    '[object Error]': true,
    '[object CanvasGradient]': true,
    '[object CanvasPattern]': true,
    // For node-canvas
    '[object Image]': true,
    '[object Canvas]': true
};

const TYPED_ARRAY: { [key: string]: boolean } = {
    '[object Int8Array]': true,
    '[object Uint8Array]': true,
    '[object Uint8ClampedArray]': true,
    '[object Int16Array]': true,
    '[object Uint16Array]': true,
    '[object Int32Array]': true,
    '[object Uint32Array]': true,
    '[object Float32Array]': true,
    '[object Float64Array]': true
};
const objToString = Object.prototype.toString;


function clone<T extends any>(source: T): T {
    if (source === null || typeof source !== 'object') {
        return source;
    }
    let result = source as any;
    const typeStr = <string>objToString.call(source);

    // 处理数组深度克隆
    if (typeStr === '[object Array]') {
        result = [] as any[];
        for (let i = 0, len = (source as any[]).length; i < len; i++) {
            result[i] = clone((source as any[])[i]);
        }
    } else if (TYPED_ARRAY[typeStr]) {
        if (!isPrimitive(source)) {
            const Ctor = source.constructor as typeof Float32Array;
            if (Ctor.from) {
                result = Ctor.from(source as Float32Array);
            } else {
                result = new Ctor((source as Float32Array).length);
                const len = (source as Float32Array).length;
                for (let i = 0; i < len; i++) {
                    result[i] = clone((source as Float32Array)[i]);
                }
            }
        }
    } else if (BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
        // 对象的深度克隆
        result = {} as any;
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = clone(source[key]);
            }
        }
    }
    return result;
}

const primitiveKey = '__ec_primitive__';

/**
 * Set an object as primitive to be ignored traversing children in clone or merge
 */
export function setAsPrimitive(obj: any) {
    obj[primitiveKey] = true;
}

export function isPrimitive(obj: any): boolean {
    return obj[primitiveKey];
}

export function isDom(value: any): value is HTMLElement {
    return typeof value === 'object' &&
        typeof value.nodeType === 'number' &&
        typeof value.ownerDocument === 'object';
}
