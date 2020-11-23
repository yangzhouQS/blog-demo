/**
 * 观察者模式
 *  观察者和被观察者
 *
 *  将所有观察者放在被观察者中 (基于发布订阅)
 */

/**
 * 被观察者
 */
class Subject {
    constructor(name) {
        this.name = name;
        this.observers = [];
        this._state = '玩呢';
    }

    /**
     * 被观察者中存放观察者
     * @param o
     */
    attach(o) {
        this.observers.push(o);
    }

    get state() {
        return this._state;
    }

    set state(value) {
        if (this._state !== value) {
            this._state = value;
            this.observers.forEach(o => o.update(this))
        }
    }
}

/**
 *
 */
class Observer {
    constructor(name) {
        this.name = name
    }

    update(boby) {
        console.log(`${baby.name} 对 ${this.name} 说 ${baby.state}`)
    }
}

const baby = new Subject("小宝宝");
const o1 = new Observer("妈妈");
const o2 = new Observer("爸爸");
baby.attach(o1)
baby.attach(o2)

// 的状态在改变
baby.state = "哭"









