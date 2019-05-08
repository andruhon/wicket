export let TimerHandles = {};

/**
 * Manages the functionality needed by AbstractAjaxTimerBehavior and its subclasses
 */
export const Timer = {
    /**
     * Schedules a timer
     * @param {string} timerId - the identifier for the timer
     * @param {function} f - the JavaScript function to execute after the timeout
     * @param {number} delay - the timeout
     */
    'set': function(timerId, f, delay) {
        // if (typeof(TimerHandles) === 'undefined') {
        //     TimerHandles = {};
        // }

        Timer.clear(timerId);
        TimerHandles[timerId] = setTimeout(function() {
            Timer.clear(timerId);
            f();
        }, delay);
    },

    /**
     * Clears a timer by its id
     * @param {string} timerId - the identifier of the timer
     */
    clear: function(timerId) {
        if (TimerHandles && TimerHandles[timerId]) {
            clearTimeout(TimerHandles[timerId]);
            delete TimerHandles[timerId];
        }
    },

    /**
     * Clear all remaining timers.
     */
    clearAll: function() {
        const WTH = TimerHandles;
        if (WTH) {
            for (let th in WTH) {
                if (WTH.hasOwnProperty(th)) {
                    Timer.clear(th);
                }
            }
        }
    }
};