declare const Wicket: any;

/**
 * Logging functionality.
 */
export class Log {

    public static enabled() {
        return Wicket.Ajax.DebugWindow && Wicket.Ajax.DebugWindow.enabled;
    }

    public static info(msg: any): void {
        if (Log.enabled()) {
            Wicket.Ajax.DebugWindow.logInfo(msg);
        }
    }

    public static error(msg: any): void {
        if (Log.enabled()) {
            Wicket.Ajax.DebugWindow.logError(msg);
        } else if (typeof(console) !== "undefined" && typeof(console.error) === 'function') {
            console.error('Wicket.Ajax: ', msg);
        }
    }

    public static log(msg: any): void {
        if (Log.enabled()) {
            Wicket.Ajax.DebugWindow.log(msg);
        }
    }

}

