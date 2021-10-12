let idStart = 0x0907;
type Dictionary<T> = {
  [key: string]: T
}
export type KeyOfDistributive<T> = T extends unknown ? keyof T : never;
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

// 用于处理merge时无法遍历Date等对象的问题
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
const arrayProto = Array.prototype;
const nativeForEach = arrayProto.forEach;
const nativeFilter = arrayProto.filter;
const nativeSlice = arrayProto.slice;
const nativeMap = arrayProto.map;

class Util {
  constructor() {
  }

  static guid(): number {
    return idStart++;
  }

  public static isElement(obj): obj is Element {
    return !!(obj && obj.nodeType === 1)
  }

  static isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

  static isArray(value: any): value is any[] {
    if (Array.isArray) {
      return Array.isArray(value);
    }
    return objToString.call(value) === '[object Array]';
  }

  static isString(value: any): value is string {
    return typeof value === 'string';
  }

  static isStringSafe(value: any): value is string {
    return objToString.call(value) === '[object String]';
  }

  static isNumber(value: any): value is number {
    // Faster than `objToString.call` several times in chromium and webkit.
    // And `new Number()` is rarely used.
    return typeof value === 'number';
  }

  // Usage: `isObject(xxx)` or `isObject(SomeType)(xxx)`
  // Generic T can be used to avoid "ts type gruards" casting the `value` from its original
  // type `Object` implicitly so that loose its original type info in the subsequent code.
  static isObject<T = unknown>(value: T): value is (object & T) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    const type = typeof value;
    return type === 'function' || (!!value && type === 'object');
  }

  static isDom(value: any): value is HTMLElement {
    return typeof value === 'object'
      && typeof value.nodeType === 'number'
      && typeof value.ownerDocument === 'object';
  }

  static trim(str: string): string {
    if (str == null) {
      return null;
    } else if (typeof str.trim === 'function') {
      return str.trim();
    } else {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
  }

  static isBuiltInObject(value: any): boolean {
    return !!BUILTIN_OBJECT[objToString.call(value)];
  }

  static sTypedArray(value: any): boolean {
    return !!TYPED_ARRAY[objToString.call(value)];
  }

  static merge(target: any, source: any, overwrite?: boolean): any {
    // We should escapse that source is string
    // and enter for ... in ...
    if (!this.isObject(source) || !this.isObject(target)) {
      return overwrite ? this.clone(source) : target;
    }

    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        const targetProp = target[key];
        const sourceProp = source[key];

        if (this.isObject(sourceProp)
          && this.isObject(targetProp)
          && !this.isArray(sourceProp)
          && !this.isArray(targetProp)
          && !this.isDom(sourceProp)
          && !this.isDom(targetProp)
          && !this.isBuiltInObject(sourceProp)
          && !this.isBuiltInObject(targetProp)
          && !isPrimitive(sourceProp)
          && !isPrimitive(targetProp)
        ) {
          // 如果需要递归覆盖，就递归调用merge
          this.merge(targetProp, sourceProp, overwrite);
        } else if (overwrite || !(key in target)) {
          // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
          // NOTE，在 target[key] 不存在的时候也是直接覆盖
          target[key] = this.clone(source[key]);
        }
      }
    }

    return target;
  }

  static each<I extends Dictionary<any> | any[] | readonly any[] | ArrayLike<any>, Context>(
    arr: I,
    cb: (
      this: Context,
      // Use unknown to avoid to infer to "any", which may disable typo check.
      value: I extends (infer T)[] | readonly (infer T)[] | ArrayLike<infer T> ? T
        // Use Dictionary<infer T> may cause infer fail when I is an interface.
        // So here use a Record to infer type.
        : I extends Dictionary<any> ? I extends Record<infer K, infer T> ? T : unknown : unknown,
      index?: I extends any[] | readonly any[] | ArrayLike<any> ? number : keyof I & string,  // keyof Dictionary will return number | string
      arr?: I
    ) => void,
    context?: Context
  ) {
    if (!(arr && cb)) {
      return;
    }
    if ((arr as any).forEach && (arr as any).forEach === nativeForEach) {
      (arr as any).forEach(cb, context);
    } else if (arr.length === +arr.length) {
      for (let i = 0, len = arr.length; i < len; i++) {
        // FIXME: should the elided item be travelled? like `[33,,55]`.
        cb.call(context, (arr as any[])[i], i as any, arr);
      }
    } else {
      for (let key in arr) {
        if (arr.hasOwnProperty(key)) {
          cb.call(context, (arr as Dictionary<any>)[key], key as any, arr);
        }
      }
    }
  }

  static clone<T extends any>(source: T): T {
    if (source == null || typeof source !== 'object') {
      return source;
    }

    let result = source as any;
    const typeStr = <string> objToString.call(source);

    if (typeStr === '[object Array]') {
      if (!isPrimitive(source)) {
        result = [] as any;
        for (let i = 0, len = (source as any[]).length; i < len; i++) {
          result[i] = this.clone((source as any[])[i]);
        }
      }
    } else if (TYPED_ARRAY[typeStr]) {
      if (!isPrimitive(source)) {
        const Ctor = source.constructor as typeof Float32Array;
        if (Ctor.from) {
          result = Ctor.from(source as Float32Array);
        } else {
          result = new Ctor((source as Float32Array).length);
          for (let i = 0, len = (source as Float32Array).length; i < len; i++) {
            result[i] = this.clone((source as Float32Array)[i]);
          }
        }
      }
    } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !this.isDom(source)) {
      result = {} as any;
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          result[key] = this.clone(source[key]);
        }
      }
    }

    return result;
  }

  static keys<T extends object>(obj: T): (KeyOfDistributive<T> & string)[] {
    if (!obj) {
      return [];
    }
    // Return type should be `keyof T` but exclude `number`, becuase
    // `Object.keys` only return string rather than `number | string`.
    type TKeys = KeyOfDistributive<T> & string;
    if (Object.keys) {
      return Object.keys(obj) as TKeys[];
    }
    let keyList: TKeys[] = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyList.push(key as any);
      }
    }
    return keyList;
  }

  static extend<T extends Dictionary<any>,
    S extends Dictionary<any>>(target: T, source: S): T & S {
    if (Object.assign) {
      Object.assign(target, source);
    } else {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          (target as S & T)[key] = (source as T & S)[key];
        }
      }
    }
    return target as T & S;
  }

  static curry(func: Function, ...args: any[]): Function {
    return function (this: any) {
      return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
  }

  static createObject<T>(proto?: object, properties?: T): T {
    // Performance of Object.create
    // https://jsperf.com/style-strategy-proto-or-others
    let obj: T;
    if (Object.create) {
      obj = Object.create(proto);
    } else {
      const StyleCtor = function () {
      };
      StyleCtor.prototype = proto;
      obj = new (StyleCtor as any)();
    }
    if (properties) {
      this.extend(obj, properties);
    }

    return obj;
  }

  static hasOwn(own: object, prop: string): boolean {
    return own.hasOwnProperty(prop);
  }

  static noop() {
  }

}

/**
 * @constructor
 * @param {Object} obj Only apply `ownProperty`.
 */
export class HashMap<T, KEY extends string | number = string | number> {

  data: { [key in KEY]: T } = {} as { [key in KEY]: T };

  constructor(obj?: HashMap<T, KEY> | { [key in KEY]?: T } | KEY[]) {
    const isArr = Util.isArray(obj);
    // Key should not be set on this, otherwise
    // methods get/set/... may be overrided.
    this.data = {} as { [key in KEY]: T };
    const thisMap = this;

    (obj instanceof HashMap)
      ? obj.each(visit)
      : (obj && Util.each(obj, visit));

    function visit(value: any, key: any) {
      isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
  }

  // Do not provide `has` method to avoid defining what is `has`.
  // (We usually treat `null` and `undefined` as the same, different
  // from ES6 Map).
  get(key: KEY): T {
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  }

  set(key: KEY, value: T): T {
    // Comparing with invocation chaining, `return value` is more commonly
    // used in this case: `const someVal = map.set('a', genVal());`
    return (this.data[key] = value);
  }

  // Although util.each can be performed on this hashMap directly, user
  // should not use the exposed keys, who are prefixed.
  each<Context>(
    cb: (this: Context, value?: T, key?: KEY) => void,
    context?: Context
  ) {
    for (let key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        cb.call(context, this.data[key], key);
      }
    }
  }

  keys(): KEY[] {
    return Util.keys(this.data);
  }

  // Do not use this method if performance sensitive.
  removeKey(key: KEY) {
    delete this.data[key];
  }
}

export function createHashMap<T, KEY extends string | number = string | number>(
  obj?: HashMap<T, KEY> | { [key in KEY]?: T } | KEY[]
) {
  return new HashMap<T, KEY>(obj);
}


export interface Vector2d {
  x: number;
  y: number;
}

/**
 * Transform constructor.
 * In most of the cases you don't need to use it in your app. Because it is for internal usage in Konva core.
 * But there is a documentation for that class in case you still want
 * to make some manual calculations.
 * @constructor
 * @param {Array} [m] Optional six-element matrix
 * @memberof Konva
 */
export class Transform {
  m: Array<number>;
  dirty = false;

  constructor(m = [ 1, 0, 0, 1, 0, 0 ]) {
    this.m = (m && m.slice()) || [ 1, 0, 0, 1, 0, 0 ];
  }

  reset() {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;
    this.m[4] = 0;
    this.m[5] = 0;
  }

  /**
   * Copy Konva.Transform object
   * @method
   * @name Konva.Transform#copy
   * @returns {Konva.Transform}
   * @example
   * const tr = shape.getTransform().copy()
   */
  copy() {
    return new Transform(this.m);
  }

  copyInto(tr: Transform) {
    tr.m[0] = this.m[0];
    tr.m[1] = this.m[1];
    tr.m[2] = this.m[2];
    tr.m[3] = this.m[3];
    tr.m[4] = this.m[4];
    tr.m[5] = this.m[5];
  }

  /**
   * Transform point
   * @method
   * @name Konva.Transform#point
   * @param {Object} point 2D point(x, y)
   * @returns {Object} 2D point(x, y)
   */
  point(point: Vector2d) {
    let m = this.m;
    return {
      x: m[0] * point.x + m[2] * point.y + m[4],
      y: m[1] * point.x + m[3] * point.y + m[5],
    };
  }

  /**
   * Apply translation
   * @method
   * @name Konva.Transform#translate
   * @param {Number} x
   * @param {Number} y
   * @returns {Konva.Transform}
   */
  translate(x: number, y: number) {
    this.m[4] += this.m[0] * x + this.m[2] * y;
    this.m[5] += this.m[1] * x + this.m[3] * y;
    return this;
  }

  /**
   * Apply scale
   * @method
   * @name Konva.Transform#scale
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  scale(sx: number, sy: number) {
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;
    return this;
  }

  /**
   * Apply rotation
   * @method
   * @name Konva.Transform#rotate
   * @param {Number} rad  Angle in radians
   * @returns {Konva.Transform}
   */
  rotate(rad: number) {
    let c = Math.cos(rad);
    let s = Math.sin(rad);
    let m11 = this.m[0] * c + this.m[2] * s;
    let m12 = this.m[1] * c + this.m[3] * s;
    let m21 = this.m[0] * -s + this.m[2] * c;
    let m22 = this.m[1] * -s + this.m[3] * c;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }

  /**
   * Returns the translation
   * @method
   * @name Konva.Transform#getTranslation
   * @returns {Object} 2D point(x, y)
   */
  getTranslation() {
    return {
      x: this.m[4],
      y: this.m[5],
    };
  }

  /**
   * Apply skew
   * @method
   * @name Konva.Transform#skew
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  skew(sx: number, sy: number) {
    let m11 = this.m[0] + this.m[2] * sy;
    let m12 = this.m[1] + this.m[3] * sy;
    let m21 = this.m[2] + this.m[0] * sx;
    let m22 = this.m[3] + this.m[1] * sx;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }

  /**
   * Transform multiplication
   * @method
   * @name Konva.Transform#multiply
   * @param {Konva.Transform} matrix
   * @returns {Konva.Transform}
   */
  multiply(matrix: Transform) {
    let m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
    let m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

    let m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
    let m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

    let dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
    let dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
    return this;
  }

  /**
   * Invert the matrix
   * @method
   * @name Konva.Transform#invert
   * @returns {Konva.Transform}
   */
  invert() {
    let d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
    let m0 = this.m[3] * d;
    let m1 = -this.m[1] * d;
    let m2 = -this.m[2] * d;
    let m3 = this.m[0] * d;
    let m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
    let m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    this.m[0] = m0;
    this.m[1] = m1;
    this.m[2] = m2;
    this.m[3] = m3;
    this.m[4] = m4;
    this.m[5] = m5;
    return this;
  }

  /**
   * return matrix
   * @method
   * @name Konva.Transform#getMatrix
   */
  getMatrix() {
    return this.m;
  }

  /**
   * set to absolute position via translation
   * @method
   * @name Konva.Transform#setAbsolutePosition
   * @returns {Konva.Transform}
   * @author ericdrowell
   */
  setAbsolutePosition(x: number, y: number) {
    let m0 = this.m[0],
      m1 = this.m[1],
      m2 = this.m[2],
      m3 = this.m[3],
      m4 = this.m[4],
      m5 = this.m[5],
      yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2),
      xt = (x - m4 - m2 * yt) / m0;

    return this.translate(xt, yt);
  }

  /**
   * convert transformation matrix back into node's attributes
   * @method
   * @name Konva.Transform#decompose
   * @returns {Konva.Transform}
   */
  decompose() {
    let a = this.m[0];
    let b = this.m[1];
    let c = this.m[2];
    let d = this.m[3];
    let e = this.m[4];
    let f = this.m[5];

    let delta = a * d - b * c;

    let result = {
      x: e,
      y: f,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0,
    };

    // Apply the QR-like decomposition.
    if (a != 0 || b != 0) {
      let r = Math.sqrt(a * a + b * b);
      result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
      result.scaleX = r;
      result.scaleY = delta / r;
      result.skewX = (a * c + b * d) / delta;
      result.skewY = 0;
    } else if (c != 0 || d != 0) {
      let s = Math.sqrt(c * c + d * d);
      result.rotation =
        Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
      result.scaleX = delta / s;
      result.scaleY = s;
      result.skewX = 0;
      result.skewY = (a * c + b * d) / delta;
    } else {
      // a = b = c = d = 0
    }

    // result.rotation = Util._getRotation(result.rotation);

    return result;
  }
}
