import {ThrottlerEntry} from "./ThrottlerEntry";

export class Throttler {

    private postponeTimerOnUpdate: boolean;
    public static entries: ThrottlerEntry[] = [];

    /* "postponeTimerOnUpdate" is an optional parameter. If it is set to true, then the timer is
   reset each time the throttle function gets called. Use this behaviour if you want something
   to happen at X milliseconds after the *last* call to throttle.
   If the parameter is not set, or set to false, then the timer is not reset. */
    constructor(postponeTimerOnUpdate) {
        this.postponeTimerOnUpdate = postponeTimerOnUpdate;
    }

    throttle(id, millis: number, func: () => any) {
        var entries = Throttler.entries;
        var entry = entries[id];
        var me = this;
        if (typeof (entry) === 'undefined') {
            entry = new ThrottlerEntry(func);
            entry.setTimeoutVar(window.setTimeout(function () {
                me.execute(id);
            }, millis));
            entries[id] = entry;
        } else {
            entry.setFunc(func);
            if (this.postponeTimerOnUpdate) {
                window.clearTimeout(entry.getTimeoutVar());
                entry.setTimeoutVar(window.setTimeout(function () {
                    me.execute(id);
                }, millis));
            }
        }
    }

    execute(id) {
        var entries = Throttler.entries;
        var entry = entries[id];
        if (typeof (entry) !== 'undefined') {
            var func = entry.getFunc();
            entries[id] = undefined;
            return func();
        }
    }

}