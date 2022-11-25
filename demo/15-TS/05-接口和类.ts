interface Alarm {
    alert(): void
}

interface Light {
    lightOn(): void

    lightOff(): void

    alert(): boolean
}

class Car implements Alarm, Light {
    alert(): void;
    alert(): boolean;
    alert(): void | boolean {
        return undefined;
    }

    lightOff(): void {
    }

    lightOn(): void {
    }
}

interface A {
    name: string
}

interface A {
    age: number
}

class AB implements A {
    age: number;
    name: string;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

}

