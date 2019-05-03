import * as Wicket from "../Wicket"
import {isUndef} from "../Wicket";

export class Channel {

    busy: boolean;
    public name: string;
    type: string;
    callbacks: (() => any)[];

    public constructor(name: string) {
        let res = name.match(/^([^|]+)\|(d|s|a)$/);
        if (isUndef(res)) {
            this.name = '0'; // '0' is the default channel name
            this.type = 's'; // default to stack/queue
        } else {
            this.name = res[1];
            this.type = res[2];
        }
        this.callbacks = [];
        this.busy = false;
    }

    public schedule(callback: () => any) {
        if (this.busy === false) {
            this.busy = true;
            try {
                return callback();
            } catch (exception) {
                this.busy = false;
                Wicket.Log.error("An error occurred while executing Ajax request:" + exception);
            }
        } else {
            var busyChannel = "Channel '" + this.name + "' is busy";
            if (this.type === 's') { // stack/queue
                Wicket.Log.info(busyChannel + " - scheduling the callback to be executed when the previous request finish.");
                this.callbacks.push(callback);
            } else if (this.type === 'd') { // drop
                Wicket.Log.info(busyChannel + " - dropping all previous scheduled callbacks and scheduling a new one to be executed when the current request finish.");
                this.callbacks = [];
                this.callbacks.push(callback);
            } else if (this.type === 'a') { // active
                Wicket.Log.info(busyChannel + " - ignoring the Ajax call because there is a running request.");
            }
            return null;
        }
    }

    public done() {
        let callback = null;

        if (this.callbacks.length > 0) {
            callback = this.callbacks.shift();
        }

        if (callback !== null && typeof (callback) !== "undefined") {
            Wicket.Log.info("Calling postponed function...");
            // we can't call the callback from this call-stack
            // therefore we set it on timer event
            window.setTimeout(callback, 1);
        } else {
            this.busy = false;
        }
    }

}