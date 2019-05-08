import {Channel} from "./Channel";
import {isUndef} from "./WicketUtils";
import {FunctionsExecuter} from "./FunctionsExecuter";

/**
 * Channel manager maintains a map of channels.
 */
export class ChannelManager {

    channels:Channel[];

    public static FunctionsExecuter = FunctionsExecuter;

    constructor() {
        this.channels = [];
    }

    // Schedules the callback to channel with given name.
    public schedule (channel: string, callback: () => any): any {
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
    public done (channel: string): void {
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

export const channelManager = new ChannelManager();