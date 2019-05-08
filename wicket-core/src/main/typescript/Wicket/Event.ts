import {jQuery} from "./WicketUtils";
import {Browser} from "./Browser";
import {Log} from "./Log";

export let idCounter = 0;

export function getId(element) {
    const $el = jQuery(element);
    let id = $el.prop("id");

    if (typeof (id) === "string" && id.length > 0) {
        return id;
    } else {
        id = "wicket-generated-id-" + idCounter++;
        $el.prop("id", id);
        return id;
    }
}

export function keyCode(evt) {
    return fix(evt).keyCode;
}

/**
 * Prevent event from bubbling up in the element hierarchy.
 * @param evt {Event} - the event to stop
 * @param immediate {Boolean} - true if the event should not be handled by other listeners registered
 *      on the same HTML element. Optional
 */
export function stop(evt, immediate?) {
    evt = fix(evt);
    if (immediate) {
        evt.stopImmediatePropagation();
    } else {
        evt.stopPropagation();
    }
    return evt;
}

/**
 * If no event is given as argument (IE), window.event is returned.
 */
export function fix(evt) {
    return jQuery.event.fix(evt || window.event);
}

export function fire(element, event) {
    event = (event === 'mousewheel' && Browser.isGecko()) ? 'DOMMouseScroll' : event;
    jQuery(element).trigger(event);
}

/**
 * Binds an event listener for an element
 *
 * Also supports the special 'domready' event on window.
 * 'domready' is event fired when the DOM is complete, but
 * before loading external resources (images, scripts, ...)
 *
 * @param element {HTMLElement} The host HTML element
 * @param type {String} The type of the DOM event
 * @param fn {Function} The event handler to unbind
 * @param data {Object} Extra data for the event
 * @param selector {String} A selector string to filter the descendants of the selected
 *      elements that trigger the event. If the selector is null or omitted,
 *      the event is always triggered when it reaches the selected element.
 */
export function add(element, type, fn, data?, selector?) {
    if (type === 'domready') {
        jQuery(fn);
    } else if (type === 'load' && element === window) {
        jQuery(window).on('load', function () {
            jQuery(fn);
        });
    } else {
        type = (type === 'mousewheel' && Browser.isGecko()) ? 'DOMMouseScroll' : type;
        let el = element;
        if (typeof (element) === 'string') {
            el = document.getElementById(element);
        }

        if (!el && Log) {
            Log.error('Cannot bind a listener for event "' + type +
                '" on element "' + element + '" because the element is not in the DOM');
        }

        jQuery(el).on(type, selector, data, fn);
    }
    return element;
}

/**
 * Unbinds an event listener for an element
 *
 * @param element {HTMLElement} The host HTML element
 * @param type {String} The type of the DOM event
 * @param fn {Function} The event handler to unbind
 */
export function remove(element, type, fn) {
    jQuery(element).off(type, fn);
}

/**
 * Adds a subscriber for the passed topic.
 *
 * @param topic {String} - the channel name for which this subscriber will be notified
 *        If '*' then it will be notified for all topics
 * @param subscriber {Function} - the callback to call when an event with this type is published
 */
export function subscribe(topic, subscriber) {
    if (topic) {
        jQuery(document).on(topic, subscriber);
    }
}

/**
 * Un-subscribes a subscriber from a topic.
 * @param topic {String} - the topic name. If omitted un-subscribes all
 *      subscribers from all topics
 * @param subscriber {Function} - the handler to un-subscribe. If omitted then
 *      all subscribers are removed from this topic
 */
export function unsubscribe(topic, subscriber) {
    if (topic) {
        if (subscriber) {
            jQuery(document).off(topic, subscriber);
        } else {
            jQuery(document).off(topic);
        }
    } else {
        jQuery(document).off();
    }
}

/**
 * Sends a notification to all subscribers for the given topic.
 * Subscribers for topic '*' receive the actual topic as first parameter,
 * otherwise the topic is not passed to subscribers which listen for specific
 * event types.
 *
 * @param topic {String} - the channel name for which all subscribers will be notified.
 * @param args
 */
export function publish(topic, ...args) {
    if (topic) {
        // cut the topic argument
        // var args = Array.prototype.slice.call(inArgs).slice(1);

        jQuery(document).triggerHandler(topic, args);
        jQuery(document).triggerHandler('*', args);
    }
}

/**
 * The names of the topics on which Wicket notifies
 */
export enum Topic {
    DOM_NODE_REMOVING = '/dom/node/removing',
    DOM_NODE_ADDED = '/dom/node/added',
    AJAX_CALL_INIT = '/ajax/call/init',
    AJAX_CALL_BEFORE = '/ajax/call/before',
    AJAX_CALL_PRECONDITION = '/ajax/call/precondition',
    AJAX_CALL_BEFORE_SEND = '/ajax/call/beforeSend',
    AJAX_CALL_SUCCESS = '/ajax/call/success',
    AJAX_CALL_COMPLETE = '/ajax/call/complete',
    AJAX_CALL_AFTER = '/ajax/call/after',
    AJAX_CALL_FAILURE = '/ajax/call/failure',
    AJAX_CALL_DONE = '/ajax/call/done',
    AJAX_HANDLERS_BOUND = '/ajax/handlers/bound'
}
