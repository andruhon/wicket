import "./Wicket/Disclaimer";
import * as Class from "./Wicket/Class";
import * as DOM from "./Wicket/DOM";
import * as Event from "./Wicket/Event";
import * as Ajax from "./Wicket/Ajax";
import {ChannelManager} from "./Wicket/ChannelManager";
import {Browser} from "./Wicket/Browser";
import {Throttler} from "./Wicket/Throttler";
import * as Xml from "./Wicket/Xml";
import * as Form from "./Wicket/Form";
import * as Head from "./Wicket/Head";

declare var jQuery: any;

export function isUndef(target: any): boolean {
    return (typeof(target) === 'undefined' || target === null);
}

export function $ (arg) {
    return DOM.get(arg);
}

/**
 * returns if the element belongs to current document
 * if the argument is not element, function returns true
 */
export function $$ (element) {
    return DOM.inDoc(element);
}

/**
 * Merges two objects. Values of the second will overwrite values of the first.
 *
 * @param {Object} object1 - the first object to merge
 * @param {Object} object2 - the second object to merge
 * @return {Object} a new object with the values of object1 and object2
 */
export function merge (object1, object2) {
    return jQuery.extend({}, object1, object2);
}

/**
 * Takes a function and returns a new one that will always have a particular context, i.e. 'this' will be the passed context.
 *
 * @param {Function} fn - the function which context will be set
 * @param {Object} context - the new context for the function
 * @return {Function} the original function with the changed context
 */
export function bind (fn, context) {
    return jQuery.proxy(fn, context);
}

/**
 * A safe getter for Wicket's Ajax base URL.
 * If the value is not defined or is empty string then
 * return '.' (current folder) as base URL.
 * Used for request header and parameter
 */
export function getAjaxBaseUrl () {
    let baseUrl = Ajax.baseUrl || '.';
    return baseUrl;
}

/**
 * Helper method that serializes HtmlDocument to string and then
 * creates a DOMDocument by parsing this string.
 * It is used as a workaround for the problem described at https://issues.apache.org/jira/browse/WICKET-4332
 * @param htmlDocument (DispHtmlDocument) the document object created by IE from the XML response in the iframe
 */
export function htmlToDomDocument (htmlDocument) {
    var xmlAsString = htmlDocument.body.outerText;
    xmlAsString = xmlAsString.replace(/^\s+|\s+$/g, ''); // trim
    xmlAsString = xmlAsString.replace(/(\n|\r)-*/g, ''); // remove '\r\n-'. The dash is optional.
    let xmldoc = Xml.parse(xmlAsString);
    return xmldoc;
}

/**
 * Converts a NodeList to an Array
 *
 * @param nodeList The NodeList to convert
 * @returns {Array} The array with document nodes
 */
export function nodeListToArray (nodeList) {
    let arr = [],
        nodeId;
    if (nodeList && nodeList.length) {
        for (nodeId = 0; nodeId < nodeList.length; nodeId++) {
            arr.push(nodeList.item(nodeId));
        }
    }
    return arr;
}

export let channelManager = new ChannelManager();

export {Log} from "./Wicket/Log";
export {Channel} from "./Wicket/Channel";
export {Throttler} from "./Wicket/Throttler";
export {ThrottlerEntry} from "./Wicket/ThrottlerEntry";
export {Focus} from "./Wicket/Focus";
export {Class, DOM, Event, Browser, Xml, Form, Head};




