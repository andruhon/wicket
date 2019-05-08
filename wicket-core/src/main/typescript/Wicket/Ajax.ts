import {jQuery, bind, redirect} from "./WicketUtils"
import * as Event from "./Event";
import {Call} from "./Ajax/Call";
import {Throttler} from "./Throttler";

/**
 * The Ajax.Request class encapsulates a XmlHttpRequest.
 */
/* the Ajax module */

export var baseUrl = undefined;

export {Channel} from "./Channel";

/**
 * A safe getter for Wicket's Ajax base URL.
 * If the value is not defined or is empty string then
 * return '.' (current folder) as base URL.
 * Used for request header and parameter
 */
export function getAjaxBaseUrl () {
    return baseUrl || '.';
}

export function _handleEventCancelation(attrs) {
    let evt = attrs.event;
    if (evt) {
        if (attrs.pd) {
            try {
                evt.preventDefault();
            } catch (ignore) {
                // WICKET-4986
                // jquery fails 'member not found' with calls on busy channel
            }
        }

        if (attrs.sp === "stop") {
            Event.stop(evt);
        } else if (attrs.sp === "stopImmediate") {
            Event.stop(evt, true);
        }
    }
}

export function get(attrs) {
    attrs.m = 'GET';

    return ajax(attrs);
}

export function post(attrs) {
    attrs.m = 'POST';

    return ajax(attrs);
}

export function ajax(attrs) {

    attrs.c = attrs.c || window;
    attrs.e = attrs.e || ['domready'];

    if (!jQuery.isArray(attrs.e)) {
        attrs.e = [attrs.e];
    }

    jQuery.each(attrs.e, function (idx, evt) {
        Event.add(attrs.c, evt, function (jqEvent, data) {
            let call = new Call();
            let attributes = jQuery.extend({}, attrs);

            if (evt !== "domready") {
                attributes.event = Event.fix(jqEvent);
                if (data) {
                    attributes.event.extraData = data;
                }
            }

            call._executeHandlers(attributes.ih, attributes);
            Event.publish(Event.Topic.AJAX_CALL_INIT, attributes);

            let throttlingSettings = attributes.tr;
            if (throttlingSettings) {
                let postponeTimerOnUpdate = throttlingSettings.p || false;
                let throttler = new Throttler(postponeTimerOnUpdate);
                throttler.throttle(throttlingSettings.id, throttlingSettings.d,
                    bind(function () {
                        call.ajax(attributes);
                    }, this));
            } else {
                call.ajax(attributes);
            }
            if (evt !== "domready") {
                _handleEventCancelation(attributes);
            }
        }, null, attrs.sel);
    });
}

export function process(data) {
    let call = new Call();
    call.process(data);
}

export {redirect};