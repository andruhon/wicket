import "./Wicket/Disclaimer";
import {jQuery} from "./Wicket/WicketUtils";
import * as Class from "./Wicket/Class";
import * as DOM from "./Wicket/DOM";
import {Focus} from "./Wicket/Focus";
import * as Event from "./Wicket/Event";
import * as Ajax from "./Wicket/Ajax";
import {Browser} from "./Wicket/Browser";
import * as Xml from "./Wicket/Xml";
import * as Form from "./Wicket/Form";
import * as Head from "./Wicket/Head";
import {TimerHandles, Timer} from "./Wicket/Timer";

/**
 * A special event that is used to listen for immediate changes in input fields.
 */
jQuery.event.special.inputchange = {

    keys : {
        BACKSPACE	: 8,
        TAB			: 9,
        ENTER		: 13,
        ESC			: 27,
        LEFT		: 37,
        UP			: 38,
        RIGHT		: 39,
        DOWN		: 40,
        SHIFT		: 16,
        CTRL		: 17,
        ALT			: 18,
        END			: 35,
        HOME		: 36
    },

    keyDownPressed : false,

    setup: function () {

        if (Browser.isIE()) {
            // WICKET-5959: IE >= 11 supports "input" events, but triggers too often
            // to be reliable

            jQuery(this).on('keydown', function (event) {
                jQuery.event.special.inputchange.keyDownPressed = true;
            });

            jQuery(this).on("cut paste", function (evt) {

                const self = this;

                if (false === jQuery.event.special.inputchange.keyDownPressed) {
                    window.setTimeout(function() {
                        jQuery.event.special.inputchange.handler.call(self, evt);
                    }, 10);
                }
            });

            jQuery(this).on("keyup", function (evt) {
                jQuery.event.special.inputchange.keyDownPressed = false; // reset
                jQuery.event.special.inputchange.handler.call(this, evt);
            });

        } else {

            jQuery(this).on("input", jQuery.event.special.inputchange.handler);
        }
    },

    teardown: function() {
        jQuery(this).off("input keyup cut paste", jQuery.event.special.inputchange.handler);
    },

    handler: function( evt ) {
        const WE = Event;
        const k = jQuery.event.special.inputchange.keys;

        const kc = WE.keyCode(WE.fix(evt));
        switch (kc) {
            case k.ENTER:
            case k.UP:
            case k.DOWN:
            case k.ESC:
            case k.TAB:
            case k.RIGHT:
            case k.LEFT:
            case k.SHIFT:
            case k.ALT:
            case k.CTRL:
            case k.HOME:
            case k.END:
                return WE.stop(evt);
            default:
                evt.type = "inputchange";
                const args = Array.prototype.slice.call(arguments, 0);
                return jQuery(this).trigger(evt.type, args);
        }
    }
};

// MISC FUNCTIONS

/**
 * Track focussed element.
 */
Event.add(window, 'focusin', Focus.focusin);
Event.add(window, 'focusout', Focus.focusout);

/**
 * Clear any scheduled Ajax timers when leaving the current page
 */
Event.add(window, "unload", function() {
    Timer.clearAll();
});

export {$, $$, merge, bind} from "./Wicket/WicketUtils"
export {channelManager, ChannelManager} from "./Wicket/ChannelManager";
export {Log} from "./Wicket/Log";
export {Timer, TimerHandles};
export {Channel} from "./Wicket/Channel";
export {throttler, Throttler} from "./Wicket/Throttler";
export {ThrottlerEntry} from "./Wicket/ThrottlerEntry";
export {Ajax, Class, DOM, Event, Browser, Xml, Form, Head, Focus};




