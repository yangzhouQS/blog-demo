class Obserble {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static timeOut(time) {
    const handle = setTimeout(() => {
      observer.next();
      observer.complete();
    }, time)

    return new Obserble(function subscribe(observer) {
      return {
        unsubscribe() {
          clearTimeout(handle);
        }
      }
    });
  }

  static fromEvent(dom, eventName) {
    return new Obserble(function subscribe(observer) {
      for (let num = 0; true; num++) {
        observer.next(num);
      }
    })
  }
}

const obs = Obserble.timeOut(500)
obs.subscribe({
  next(v) {
    console.log('next')
  },
  complete() {
    console.log('done')
  },
  error(e) {
    console.log(e)
  }
})
