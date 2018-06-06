import Event from './Event';
export default class Timer extends Event {
    private _expiration;
    private _timerHandle;
    constructor();
    init(duration: number): void;
    cancel(): void;
    private _callback;
}
