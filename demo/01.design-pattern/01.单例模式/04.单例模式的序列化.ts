// 懒汉式-方式4（静态内部类方式）
//
// 静态内部类单例模式中实例由内部类创建，由于 JVM 在加载外部类的过程中, 是不会加载静态内部类的, 只有内部类的属性/方法被调用时才会被加载, 并初始化其静态属性。静态属性由于被 `static` 修饰，保证只被实例化一次，并且严格保证实例化顺序。
class Singleton {
  private constructor() {
  }

  // 内部类
  private static SingletonHolder = class {
    public static instance: Singleton = new Singleton()
  }

  // 对外提供内部类获取实例
  public static getInstance(): Singleton {
    return this.SingletonHolder.instance;
  }

  public toJSON() {
    return "Singleton"
  }
}

export {}
const single = Singleton.getInstance()
console.log(JSON.stringify(single))

