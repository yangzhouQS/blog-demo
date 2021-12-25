import "reflect-metadata";

export const SerializeMetaKey = "Serialize";

//序列化装饰器
function Serialize(name?: string) {
  return (target: Object, property: string): void => {
    Reflect.defineMetadata(SerializeMetaKey, name || property, target, property);
  };
}

class Element {

}

class EntityElement extends Element {
  @Serialize()
  public _id: string = "";

  @Serialize()
  public name: string = "";

  @Serialize("desc")
  public description: string = "";

  @Serialize("count")
  public count: number = 0;

  constructor(id: string, name: string) {
    super()
    this._id = `${ id }`;
    this.name = name;
  }

  //序列化
  toJSON(): any {
    const obj = {};
    const k = Object.keys(this)
    console.log(k)
    Object.keys(this).forEach(property => {
      const serialize = Reflect.getMetadata(SerializeMetaKey, this, property);
      if (serialize) {
        if (this[property] instanceof Element) {
          obj[serialize] = this[property].toJSON();
        } else {
          obj[serialize] = this[property];
        }
      }
    });
    return obj;
  }

  //反序列化
  fromJSON(obj) {
    obj && Object.keys(this).forEach(property => {
      const serialize = Reflect.getMetadata(SerializeMetaKey, this, property);
      if (serialize) {
        if (this[property] instanceof Element) {
          this[property].fromJSON(obj[serialize]);
        } else {
          this[property] = obj[serialize];
        }
      }
    });
  }
}

const entity = new EntityElement("10", "sam")
console.log(JSON.stringify(entity))


const TableHints = module.exports = { // eslint-disable-line
  NOLOCK: 'NOLOCK',
  READUNCOMMITTED: 'READUNCOMMITTED',
  UPDLOCK: 'UPDLOCK',
  REPEATABLEREAD: 'REPEATABLEREAD',
  SERIALIZABLE: 'SERIALIZABLE',
  READCOMMITTED: 'READCOMMITTED',
  TABLOCK: 'TABLOCK',
  TABLOCKX: 'TABLOCKX',
  PAGLOCK: 'PAGLOCK',
  ROWLOCK: 'ROWLOCK',
  NOWAIT: 'NOWAIT',
  READPAST: 'READPAST',
  XLOCK: 'XLOCK',
  SNAPSHOT: 'SNAPSHOT',
  NOEXPAND: 'NOEXPAND'
};
