// ����ʽ-��ʽ1����̬������ʽ��
class Singleton {
  // 1.˽�л����캯��
  private constructor() {
  }

  // 2.�����д�������
  private static instance: Singleton = new Singleton();

  // 3.��ȡ���ʵ������, ��̬����ֻ�ܻ�ȡ��̬����
  public static getInstance(): Singleton {
    return this.instance;
  }
}

const single = Singleton.getInstance();
const single2 = Singleton.getInstance();
console.log(single === single2) // true


export {}
