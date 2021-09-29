// 1.同名的命名空间合并
namespace A {
    export const name: string = 'hello word';
}
namespace A {
    export const age: number = 16;
}
console.log(A); // { name: 'hello word', age: 16 }

// 2.同名接口合并
interface A {
    name: string
}

interface A {
    age: number
    // name: Array<string>
}

// 2.同名接口如果属性名相同,那么属性类型必须一致
class Test implements A {
    age!: number;
    name!: string;

    constructor() {
    }
}

// 3.命名空间和类重名,命名空间导出的方法会合并到类上的方法
class DemoA {
    say() {
        console.log('say');
    }
}

namespace DemoA {
    export const fn = (): void => {
        console.log('fn');
    };
}
const a = DemoA;
console.log(a);
console.dir(DemoA);
