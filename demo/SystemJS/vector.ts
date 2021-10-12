interface IVector {
    size(): number

    get(r: number): void // 获取秩为r元素的值
    put(r, e): void //e替换r
    insert(r, e): void

    remove(r): void

    disordered(): void

    sort(): void

    find(e): void

    search(e): void

    deduplicate(): void

    uniquify(): void

    traverse(): void
}

export class Vector implements IVector {
    constructor() {
    }

    deduplicate(): void {
    }

    disordered(): void {
    }

    find(e): void {
    }

    get(r: number): void {
    }

    insert(r, e): void {
    }

    put(r, e): void {
    }

    remove(r): void {
    }

    search(e): void {
    }

    size(): number {
        return 0
    }

    sort(): void {
    }

    traverse(): void {
    }

    uniquify(): void {
    }
}
