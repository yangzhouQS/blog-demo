import { AssetPromise, AssetPromiseStatus } from "../src/asset/AssetPromise";

describe("Asset Promise Test", function () {
  it("test promise all", () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      const promise = new AssetPromise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, 1000);
      });
      promises.push(promise);
    }
    let out = 0.1;
    //@ts-ignore
    const allPromise = AssetPromise.all(promises).onProgress((p) => {
      expect(p).toBeCloseTo(out);
      out += 0.1;
    });
    return expect(
      allPromise.then((res) => {
        expect(allPromise.status).toEqual(AssetPromiseStatus.Success);
        expect(allPromise.progress).toEqual(1);
        return res;
      })
    ).resolves.toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it("promise all rejected", () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      const promise = new AssetPromise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, 1000);
      });
      promises.push(promise);
    }
    setTimeout(() => {
      promises[0].cancel();
    }, 500);
    // @ts-ignore
    return expect(AssetPromise.all(promises)).rejects.toEqual("Promise Canceled");
  });

  it("test promise cancel", () => {
    const promise = new AssetPromise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 2000);
    });
    return expect(promise.cancel()).rejects.toEqual("Promise Canceled");
  });

  it("test promise cancel resolved", () => {
    const promise = new AssetPromise((resolve) => {
      resolve(0);
    });
    return expect(
      promise.then((res) => {
        promise.cancel();
        return res;
      })
    ).resolves.toEqual(0);
  });

  it("test promise reject", () => {
    const promise = new AssetPromise((resolve, reject) => {
      reject("test");
    });
    return expect(
      promise.catch((e) => {
        expect(promise.status).toEqual(AssetPromiseStatus.Failed);
        throw e;
      })
    ).rejects.toEqual("test");
  });

  it("test multi promise reject", () => {
    const promise = new AssetPromise((resolve, reject) => {
      setTimeout(() => {
        reject("test");
      });
    });
    promise.catch((e) => {
      return e;
    });
    const promise1 = new AssetPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("test 1");
      }, 1000);
    });

    return expect(promise).rejects.toEqual("test");
  });
});
