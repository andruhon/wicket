import {jQuery, isUndef} from "./WicketUtils";
import {Log} from "./Log";

export class FunctionsExecuter {

    /**
     * Response that should be used by a function when it finishes successfully
     * in synchronous manner
     * @type {number}
     */
    public static DONE = 1;

    /**
     * Response that should be used by a function when it finishes abnormally
     * in synchronous manner
     * @type {number}
     */
    public static FAIL = 2;

    /**
     * Response that may be used by a function when it executes asynchronous
     * code and must wait `notify()` to be executed.
     * @type {number}
     */
    public static ASYNC = 3;

    /**
     * An artificial number used as a limit of the call stack depth to avoid
     * problems like "too much recursion" in the browser.
     * The depth is not easy to be calculated because the memory used by the
     * stack depends on many factors
     * @type {number}
     */
    public static DEPTH_LIMIT = 1000;

    private readonly functions: (() => any)[];
    private current: number;
    private depth: number;

    /**
     * Functions executer takes array of functions and executes them.
     * The functions are executed one by one as far as the return value is FunctionsExecuter.DONE.
     * If the return value is FunctionsExecuter.ASYNC or undefined then the execution of
     * the functions will be resumed once the `notify` callback function is called.
     * This is needed because header contributions need to do asynchronous download of JS and/or CSS
     * and they have to let next function to run only after the download.
     * After the FunctionsExecuter is initialized, the start methods triggers the first function.
     *
     * @param functions {Array} - an array of functions to execute
     */
    constructor(functions: (() => any)[]) {

        this.functions = functions;

        /**
         * The index of the currently executed function
         * @type {number}
         */
        this.current = 0;

        /**
         * Tracks the depth of the call stack when `notify` is used for
         * asynchronous notification that a function execution has finished.
         * Should be reset to 0 when at some point to avoid problems like
         * "too much recursion". The reset may break the atomicity by allowing
         * another instance of FunctionExecuter to run its functions
         * @type {number}
         */
        this.depth = 0; // we need to limit call stack depth
    };

    processNext() {
        if (this.current < this.functions.length) {
            let f, run;

            f = this.functions[this.current];
            run = function () {
                try {
                    const n = jQuery.proxy(this.notify, this);
                    return f(n);
                } catch (e) {
                    Log.error("FunctionsExecuter.processNext: " + e);
                    return FunctionsExecuter.FAIL;
                }
            };
            run = jQuery.proxy(run, this);
            this.current++;

            if (this.depth > FunctionsExecuter.DEPTH_LIMIT) {
                // to prevent stack overflow (see WICKET-4675)
                this.depth = 0;
                window.setTimeout(run, 1);
            } else {
                const retValue = run();
                if (isUndef(retValue) || retValue === FunctionsExecuter.ASYNC) {
                    this.depth++;
                }
                return retValue;
            }
        }
    }

    start() {
        let retValue = FunctionsExecuter.DONE;
        while (retValue === FunctionsExecuter.DONE) {
            retValue = this.processNext();
        }
    }

    notify() {
        this.start();
    }

}