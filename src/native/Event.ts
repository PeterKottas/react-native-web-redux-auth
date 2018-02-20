export default class Event {
    private _callbacks: Function[];

    constructor() {
        this._callbacks = [];
    }

    addHandler(cb: Function) {
        this._callbacks.push(cb);
    }

    removeHandler(cb: Function) {
        var idx = this._callbacks.findIndex(item => item === cb);
        if (idx >= 0) {
            this._callbacks.splice(idx, 1);
        }
    }

    raise(...params: object[]) {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](...params);
        }
    }
}