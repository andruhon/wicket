import {Channel} from "./Channel";
import {isUndef} from "../Wicket";
import {FunctionsExecuter} from "./FunctionsExecuter";

export class ChannelManager {

    channels:Channel[];
    public static FunctionsExecuter = FunctionsExecuter;

    constructor() {
        this.channels = [];
    }

    // Schedules the callback to channel with given name.
    schedule (channel: string, callback: () => any) {
        let parsed = new Channel(channel);
        let c = this.channels[parsed.name];
        if (isUndef(c)) {
            c = parsed;
            this.channels[c.name] = c;
        } else {
            c.type = parsed.type;
        }
        return c.schedule(callback);
    }

    // Tells the ChannelManager that the current callback in channel with given name
    // has finished processing and another scheduled callback can be executed (if any).
    done (channel: string) {
        let parsed = new Channel(channel);
        let c: Channel = this.channels[parsed.name];
        if (!isUndef(c)) {
            c.done();
            if (!c.busy) {
                delete this.channels[parsed.name];
            }
        }
    }

}