// 饿汉式-方式1（静态变量方式）
class Singleton {
  // 1.私有化构造函数
  private constructor() {
  }

  // 2.在类中创建本例
  private static instance: Singleton = new Singleton();

  // 3.获取类的实例对象, 静态方法只能获取静态属性
  public static getInstance(): Singleton {
    return this.instance;
  }
}

const single = Singleton.getInstance();
const single2 = Singleton.getInstance();
console.log(single === single2) // true


export {}
