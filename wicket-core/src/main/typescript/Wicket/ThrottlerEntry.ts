export class ThrottlerEntry {

    private func: () => any;
    private readonly timestamp: number;
    private timeoutVar: number;

    constructor(func: () => any) {
        this.func = func;
        this.timestamp = new Date().getTime();
        this.timeoutVar = undefined;
    }

    getTimestamp(): number {
        return this.timestamp;
    }

    getFunc(): () => any {
        return this.func;
    }

    setFunc(func: () => any) {
        this.func = func;
    }

    getTimeoutVar(): number {
        return this.timeoutVar;
    }

    setTimeoutVar(timeoutVar: number) {
        this.timeoutVar = timeoutVar;
    }
}