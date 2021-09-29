function log(target: any) {
    console.log(target);
}

function Path(p1: string, ...args: any[]) {
    console.log(p1, args);
    return function (target: Function) {
        target.prototype.__custom__ = '__custom_code_demo__';
    };
}

@Path('/hello', 'name', 123)
@log
class Person2 {
    private _width: number = 0;
    private _height: number = 0;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
}

const p = new Person2(10, 20);
console.log(p.width);

export default Person2;
