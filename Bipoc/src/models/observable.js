export default class Observable {
    observers;
    self;
    constructor() {
        this.observers = [];
        this.self = {};
    }
    attachObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers(changedData) {
        for (const observer of this.observers) {
            observer.notify(changedData);
        }
    }
    watch(subject, parent) {
        const myproxy = new Proxy(subject, {
            set(target, key, value) {
                console.log(`Got set for ${String(key)}`);
                parent.notifyObservers(target);
                return Reflect.set(target, key, value);
            },
        });
        myproxy.parent = parent;
        return myproxy;
    }
}
