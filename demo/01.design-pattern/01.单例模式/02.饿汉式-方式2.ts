// 饿汉式-方式2（静态代码块方式）
class Singleton {
  // 1.私有化构造方法
  private constructor() {
  }

  // 2.声明Singleton类型变量
  private static instance: Singleton;

  // 静态方法进行初始化
  public static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

const s = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s === s2) // true
export {}
