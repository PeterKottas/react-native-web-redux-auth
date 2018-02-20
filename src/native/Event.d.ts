export default class Event {
    private _callbacks;
    constructor();
    addHandler(cb: Function): void;
    removeHandler(cb: Function): void;
    raise(...params: object[]): void;
}
