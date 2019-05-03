export class Log {

    public static enabled() {
        return false;
    }

    public static info(msg: any): void {
        if (Log.enabled()) {
            console.info("Wicket.Ajax:", msg)
        }
    }

    public static error(msg: any): void {
        console.error('Wicket.Ajax: ', msg)
    }

    public static log(msg: any): void {
        if (Log.enabled()) {
            console.log('Wicket.Ajax: ', msg)
        }
    }

}

