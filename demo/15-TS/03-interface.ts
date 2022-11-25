interface Lib {
    (): void;

    version: string;

    doSomething(): void;
}

let lib: Lib = (() => {
}) as Lib;
lib.version = '';
lib.doSomething = () => {
};

function fn(x: number, y?: number, z?: number): number {
    return x;
}

function fn2(x: number, y = 0, z = 0): number {
    return x + y + z;
}

