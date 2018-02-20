import Event from './Event';

const TimerDuration = 5000;

export default class Timer extends Event {
    private _expiration: number;
    private _timerHandle: number;

    constructor() {
        super();
    }

    public init(duration: number) {
        this.cancel();

        if (duration <= 0) {
            duration = 1;
        }

        this._expiration = Date.now() + duration;

        // we're using a fairly short timer and then checking the expiration in the 
        // callback to handle scenarios where the browser device sleeps, and then 
        // the timers end up getting delayed.
        var timerDuration = TimerDuration;
        if (duration < timerDuration) {
            timerDuration = duration;
        }
        this._timerHandle = setInterval(this._callback.bind(this), timerDuration);
    }

    public cancel() {
        if (this._timerHandle) {
            clearInterval(this._timerHandle);
            this._timerHandle = null;
        }
    }

    private _callback() {
        var diff = this._expiration - Date.now();
        if (diff >= 0) {
            this.cancel();
            super.raise();
        }
    }
}