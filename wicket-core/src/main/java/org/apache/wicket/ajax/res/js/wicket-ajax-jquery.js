/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/*
 * *** DO NOT EDIT ***
 * This is a generated JS code, please DO NOT EDIT.
 * Edit TC files in wicket-core/src/main/typescript instead
 * *** DO NOT EDIT ***
 */
var Wicket = (function (exports) {
    'use strict';

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Logging functionality.
     */
    var Log = /** @class */ (function () {
        function Log() {
        }
        Log.enabled = function () {
            return Wicket.Ajax.DebugWindow && Wicket.Ajax.DebugWindow.enabled;
        };
        Log.info = function (msg) {
            if (Log.enabled()) {
                Wicket.Ajax.DebugWindow.logInfo(msg);
            }
        };
        Log.error = function (msg) {
            if (Log.enabled()) {
                Wicket.Ajax.DebugWindow.logError(msg);
            }
            else if (typeof (console) !== "undefined" && typeof (console.error) === 'function') {
                console.error('Wicket.Ajax: ', msg);
            }
        };
        Log.log = function (msg) {
            if (Log.enabled()) {
                Wicket.Ajax.DebugWindow.log(msg);
            }
        };
        return Log;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // TODO import jQuery definition
    // declare const jQuery: any;
    var jQuery = window.jQuery;
    function isUndef(target) {
        return (typeof (target) === 'undefined' || target === null);
    }
    function $(arg) {
        if (isUndef(arg)) {
            return null;
        }
        if (arguments.length > 1) {
            var e = [];
            for (var i = 0; i < arguments.length; i++) {
                e.push($(arguments[i]));
            }
            return e;
        }
        else if (typeof arg === 'string') {
            return document.getElementById(arg);
        }
        else {
            return arg;
        }
    }
    /**
     * returns if the element belongs to current document
     * if the argument is not element, function returns true
     */
    function $$(element) {
        if (element === window) {
            return true;
        }
        if (typeof (element) === "string") {
            element = $(element);
        }
        if (isUndef(element) || isUndef(element.tagName)) {
            return false;
        }
        var id = element.getAttribute('id');
        if (isUndef(id) || id === "") {
            return element.ownerDocument === document;
        }
        else {
            return document.getElementById(id) === element;
        }
    }
    /**
     * Merges two objects. Values of the second will overwrite values of the first.
     *
     * @param {Object} object1 - the first object to merge
     * @param {Object} object2 - the second object to merge
     * @return {Object} a new object with the values of object1 and object2
     */
    function merge(object1, object2) {
        return jQuery.extend({}, object1, object2);
    }
    /**
     * Takes a function and returns a new one that will always have a particular context, i.e. 'this' will be the passed context.
     *
     * @param {Function} fn - the function which context will be set
     * @param {Object} context - the new context for the function
     * @return {Function} the original function with the changed context
     */
    function bind(fn, context) {
        return jQuery.proxy(fn, context);
    }
    /**
     * Helper method that serializes HtmlDocument to string and then
     * creates a DOMDocument by parsing this string.
     * It is used as a workaround for the problem described at https://issues.apache.org/jira/browse/WICKET-4332
     * @param htmlDocument (DispHtmlDocument) the document object created by IE from the XML response in the iframe
     */
    function htmlToDomDocument(htmlDocument) {
        var xmlAsString = htmlDocument.body.outerText;
        xmlAsString = xmlAsString.replace(/^\s+|\s+$/g, ''); // trim
        xmlAsString = xmlAsString.replace(/(\n|\r)-*/g, ''); // remove '\r\n-'. The dash is optional.
        var xmldoc = parseXML(xmlAsString);
        return xmldoc;
    }
    function parseXML(text) {
        var xmlDocument;
        if (window.DOMParser) {
            var parser = new DOMParser();
            xmlDocument = parser.parseFromString(text, "text/xml");
        }
        else if (window.ActiveXObject) {
            try {
                xmlDocument = new ActiveXObject("Msxml2.DOMDocument.6.0");
            }
            catch (err6) {
                try {
                    xmlDocument = new ActiveXObject("Msxml2.DOMDocument.5.0");
                }
                catch (err5) {
                    try {
                        xmlDocument = new ActiveXObject("Msxml2.DOMDocument.4.0");
                    }
                    catch (err4) {
                        try {
                            xmlDocument = new ActiveXObject("MSXML2.DOMDocument.3.0");
                        }
                        catch (err3) {
                            try {
                                xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
                            }
                            catch (err2) {
                                Log.error("Cannot create DOM document: " + err2);
                            }
                        }
                    }
                }
            }
            if (xmlDocument) {
                xmlDocument.async = "false";
                if (!xmlDocument.loadXML(text)) {
                    Log.error("Error parsing response: " + text);
                }
            }
        }
        return xmlDocument;
    }
    /**
     * Converts a NodeList to an Array
     *
     * @param nodeList The NodeList to convert
     * @returns {Array} The array with document nodes
     */
    function nodeListToArray(nodeList) {
        var arr = [], nodeId;
        if (nodeList && nodeList.length) {
            for (nodeId = 0; nodeId < nodeList.length; nodeId++) {
                arr.push(nodeList.item(nodeId));
            }
        }
        return arr;
    }
    /**
     * An abstraction over native window.location.replace() to be able to suppress it for unit tests
     *
     * @param url The url to redirect to
     */
    function redirect(url) {
        window.location = url;
    }

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function create() {
        return function () {
            this.initialize.apply(this, arguments);
        };
    }

    var Class = /*#__PURE__*/Object.freeze({
        create: create
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    exports.Browser = {
        _isKHTML: null,
        isKHTML: function () {
            var wb = exports.Browser;
            if (wb._isKHTML === null) {
                wb._isKHTML = (/Konqueror|KHTML/).test(window.navigator.userAgent) && !/Apple/.test(window.navigator.userAgent);
            }
            return wb._isKHTML;
        },
        _isSafari: null,
        isSafari: function () {
            var wb = exports.Browser;
            if (wb._isSafari === null) {
                wb._isSafari = !/Chrome/.test(window.navigator.userAgent) && /KHTML/.test(window.navigator.userAgent) && /Apple/.test(window.navigator.userAgent);
            }
            return wb._isSafari;
        },
        _isChrome: null,
        isChrome: function () {
            var wb = exports.Browser;
            if (wb._isChrome === null) {
                wb._isChrome = (/KHTML/).test(window.navigator.userAgent) && /Apple/.test(window.navigator.userAgent) && /Chrome/.test(window.navigator.userAgent);
            }
            return wb._isChrome;
        },
        _isOpera: null,
        isOpera: function () {
            var wb = exports.Browser;
            if (wb._isOpera === null) {
                wb._isOpera = !exports.Browser.isSafari() && typeof (window["opera"]) !== "undefined";
            }
            return wb._isOpera;
        },
        _isIE: null,
        isIE: function () {
            var wb = exports.Browser;
            if (wb._isIE === null) {
                wb._isIE = !exports.Browser.isSafari() && (typeof (document.all) !== "undefined" || window.navigator.userAgent.indexOf("Trident/") > -1) && typeof (window["opera"]) === "undefined";
            }
            return wb._isIE;
        },
        _isIEQuirks: null,
        isIEQuirks: function () {
            var wb = exports.Browser;
            if (wb._isIEQuirks === null) {
                // is the browser internet explorer in quirks mode (we could use document.compatMode too)
                wb._isIEQuirks = exports.Browser.isIE() && window.document.documentElement.clientHeight === 0;
            }
            return wb._isIEQuirks;
        },
        _isIELessThan9: null,
        isIELessThan9: function () {
            var wb = exports.Browser;
            if (wb._isIELessThan9 === null) {
                var index = window.navigator.userAgent.indexOf("MSIE");
                var version = parseFloat(window.navigator.userAgent.substring(index + 5));
                wb._isIELessThan9 = exports.Browser.isIE() && version < 9;
            }
            return wb._isIELessThan9;
        },
        _isIELessThan11: null,
        isIELessThan11: function () {
            var wb = exports.Browser;
            if (wb._isIELessThan11 === null) {
                wb._isIELessThan11 = !exports.Browser.isSafari() && typeof (document.all) !== "undefined" && typeof (window["opera"]) === "undefined";
            }
            return wb._isIELessThan11;
        },
        _isIE11: null,
        isIE11: function () {
            var wb = exports.Browser;
            if (wb._isIE11 === null) {
                var userAgent = window.navigator.userAgent;
                var isTrident = userAgent.indexOf("Trident") > -1;
                var is11 = userAgent.indexOf("rv:11") > -1;
                wb._isIE11 = isTrident && is11;
            }
            return wb._isIE11;
        },
        _isGecko: null,
        isGecko: function () {
            var wb = exports.Browser;
            if (wb._isGecko === null) {
                wb._isGecko = (/Gecko/).test(window.navigator.userAgent) && !exports.Browser.isSafari();
            }
            return wb._isGecko;
        }
    };

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var idCounter = 0;
    function getId(element) {
        var $el = jQuery(element);
        var id = $el.prop("id");
        if (typeof (id) === "string" && id.length > 0) {
            return id;
        }
        else {
            id = "wicket-generated-id-" + idCounter++;
            $el.prop("id", id);
            return id;
        }
    }
    function keyCode(evt) {
        return fix(evt).keyCode;
    }
    /**
     * Prevent event from bubbling up in the element hierarchy.
     * @param evt {Event} - the event to stop
     * @param immediate {Boolean} - true if the event should not be handled by other listeners registered
     *      on the same HTML element. Optional
     */
    function stop(evt, immediate) {
        evt = fix(evt);
        if (immediate) {
            evt.stopImmediatePropagation();
        }
        else {
            evt.stopPropagation();
        }
        return evt;
    }
    /**
     * If no event is given as argument (IE), window.event is returned.
     */
    function fix(evt) {
        return jQuery.event.fix(evt || window.event);
    }
    function fire(element, event) {
        event = (event === 'mousewheel' && exports.Browser.isGecko()) ? 'DOMMouseScroll' : event;
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
    function add(element, type, fn, data, selector) {
        if (type === 'domready') {
            jQuery(fn);
        }
        else if (type === 'load' && element === window) {
            jQuery(window).on('load', function () {
                jQuery(fn);
            });
        }
        else {
            type = (type === 'mousewheel' && exports.Browser.isGecko()) ? 'DOMMouseScroll' : type;
            var el = element;
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
    function remove(element, type, fn) {
        jQuery(element).off(type, fn);
    }
    /**
     * Adds a subscriber for the passed topic.
     *
     * @param topic {String} - the channel name for which this subscriber will be notified
     *        If '*' then it will be notified for all topics
     * @param subscriber {Function} - the callback to call when an event with this type is published
     */
    function subscribe(topic, subscriber) {
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
    function unsubscribe(topic, subscriber) {
        if (topic) {
            if (subscriber) {
                jQuery(document).off(topic, subscriber);
            }
            else {
                jQuery(document).off(topic);
            }
        }
        else {
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
    function publish(topic) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
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
    var Topic;
    (function (Topic) {
        Topic["DOM_NODE_REMOVING"] = "/dom/node/removing";
        Topic["DOM_NODE_ADDED"] = "/dom/node/added";
        Topic["AJAX_CALL_INIT"] = "/ajax/call/init";
        Topic["AJAX_CALL_BEFORE"] = "/ajax/call/before";
        Topic["AJAX_CALL_PRECONDITION"] = "/ajax/call/precondition";
        Topic["AJAX_CALL_BEFORE_SEND"] = "/ajax/call/beforeSend";
        Topic["AJAX_CALL_SUCCESS"] = "/ajax/call/success";
        Topic["AJAX_CALL_COMPLETE"] = "/ajax/call/complete";
        Topic["AJAX_CALL_AFTER"] = "/ajax/call/after";
        Topic["AJAX_CALL_FAILURE"] = "/ajax/call/failure";
        Topic["AJAX_CALL_DONE"] = "/ajax/call/done";
        Topic["AJAX_HANDLERS_BOUND"] = "/ajax/handlers/bound";
    })(Topic || (Topic = {}));

    var Event = /*#__PURE__*/Object.freeze({
        get idCounter () { return idCounter; },
        getId: getId,
        keyCode: keyCode,
        stop: stop,
        fix: fix,
        fire: fire,
        add: add,
        remove: remove,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish,
        get Topic () { return Topic; }
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DOM nodes serialization functionality
     *
     * The purpose of these methods is to return a string representation
     * of the DOM tree.
     */
    /* the Dom module */
    function show(e, display) {
        e = $(e);
        if (e !== null) {
            if (isUndef(display)) {
                // no explicit 'display' value is requested so
                // use jQuery. It has special logic to decide which is the
                // best value for an HTMLElement
                jQuery(e).show();
            }
            else {
                e.style.display = display;
            }
        }
    }
    /** hides an element */
    function hide(e) {
        e = $(e);
        if (e !== null) {
            jQuery(e).hide();
        }
    }
    /**
     * Add or remove one or more classes from each element in the
     * set of matched elements, depending on either the class's presence
     * or the value of the switch argument.
     *
     * @param {String} elementId The markup id of the element that will be manipulated.
     * @param {String} cssClass One or more class names (separated by spaces)
     *        to be toggled for each element in the matched set.
     * @param {Boolean} Switch A Boolean (not just truthy/falsy) value to
     *        determine whether the class should be added or removed.
     */
    function toggleClass(elementId, cssClass, Switch) {
        jQuery('#' + elementId).toggleClass(cssClass, Switch);
    }
    /** call-counting implementation of DOM.show() */
    function showIncrementally(e) {
        e = $(e);
        if (e === null) {
            return;
        }
        var count = e.getAttribute("showIncrementallyCount");
        count = parseInt(isUndef(count) ? 0 : count, 10);
        if (count >= 0) {
            show(e);
        }
        e.setAttribute("showIncrementallyCount", count + 1);
    }
    /** call-counting implementation of DOM.hide() */
    function hideIncrementally(e) {
        e = $(e);
        if (e === null) {
            return;
        }
        var count = e.getAttribute("showIncrementallyCount");
        count = parseInt(String(isUndef(count) ? 0 : count - 1), 10);
        if (count <= 0) {
            hide(e);
        }
        e.setAttribute("showIncrementallyCount", count);
    }
    function get(arg) {
        return $(arg);
    }
    /**
     * returns if the element belongs to current document
     * if the argument is not element, function returns true
     */
    function inDoc(element) {
        return $$(element);
    }
    /**
     * A cross-browser method that replaces the markup of an element. The behavior
     * is similar to calling element.outerHtml=text in internet explorer. However
     * this method also takes care of executing javascripts within the markup on
     * browsers that don't do that automatically.
     * Also this method takes care of replacing table elements (tbody, tr, td, thead)
     * on browser where it's not supported when using outerHTML (IE).
     *
     * This method sends notifications to all subscribers for channels with names
     * '/dom/node/removing' with the element that is going to be replaced and
     * '/dom/node/added' with the newly created element (the replacement).
     *
     * Note: the 'to be replaced' element must have an 'id' attribute
     */
    function replace(element, text) {
        var we = Event;
        var topic = we.Topic;
        we.publish(topic.DOM_NODE_REMOVING, element);
        if (element.tagName.toLowerCase() === "title") {
            // match the text between the tags
            var titleText = />(.*?)</.exec(text)[1];
            document.title = titleText;
            return;
        }
        else {
            // jQuery 1.9+ expects '<' as the very first character in text
            var cleanedText = jQuery.trim(text);
            var $newElement = jQuery(cleanedText);
            jQuery(element).replaceWith($newElement);
        }
        var newElement = $(element.id);
        if (newElement) {
            we.publish(topic.DOM_NODE_ADDED, newElement);
        }
    }
    // Method for serializing DOM nodes to string
    // original taken from Tacos (http://tacoscomponents.jot.com)
    function serializeNodeChildren(node) {
        if (isUndef(node)) {
            return "";
        }
        var result = [];
        if (node.childNodes.length > 0) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var thisNode = node.childNodes[i];
                switch (thisNode.nodeType) {
                    case 1: // ELEMENT_NODE
                    case 5: // ENTITY_REFERENCE_NODE
                        result.push(this.serializeNode(thisNode));
                        break;
                    case 8: // COMMENT
                        result.push("<!--");
                        result.push(thisNode.nodeValue);
                        result.push("-->");
                        break;
                    case 4: // CDATA_SECTION_NODE
                        result.push("<![CDATA[");
                        result.push(thisNode.nodeValue);
                        result.push("]]>");
                        break;
                    case 3: // TEXT_NODE
                    case 2: // ATTRIBUTE_NODE
                        result.push(thisNode.nodeValue);
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            result.push(node.textContent || node.text);
        }
        return result.join("");
    }
    function serializeNode(node) {
        if (isUndef(node)) {
            return "";
        }
        var result = [];
        result.push("<");
        result.push(node.nodeName);
        if (node.attributes && node.attributes.length > 0) {
            for (var i = 0; i < node.attributes.length; i++) {
                // serialize the attribute only if it has meaningful value that is not inherited
                if (node.attributes[i].nodeValue && node.attributes[i].specified) {
                    result.push(" ");
                    result.push(node.attributes[i].name);
                    result.push("=\"");
                    result.push(node.attributes[i].value);
                    result.push("\"");
                }
            }
        }
        result.push(">");
        result.push(serializeNodeChildren(node));
        result.push("</");
        result.push(node.nodeName);
        result.push(">");
        return result.join("");
    }
    // Utility function that determines whether given element is part of the current document
    function containsElement(element) {
        var id = element.getAttribute("id");
        if (id) {
            return $(id) !== null;
        }
        else {
            return false;
        }
    }
    /**
     * Reads the text from the node's children nodes.
     * Used instead of jQuery.text() because it is very slow in IE10/11.
     * WICKET-5132, WICKET-5510
     * @param node {DOMElement} the root node
     */
    function text(node) {
        if (isUndef(node)) {
            return "";
        }
        var result = [];
        if (node.childNodes.length > 0) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var thisNode = node.childNodes[i];
                switch (thisNode.nodeType) {
                    case 1: // ELEMENT_NODE
                    case 5: // ENTITY_REFERENCE_NODE
                        result.push(this.text(thisNode));
                        break;
                    case 3: // TEXT_NODE
                    case 4: // CDATA_SECTION_NODE
                        result.push(thisNode.nodeValue);
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            result.push(node.textContent || node.text);
        }
        return result.join("");
    }

    var DOM = /*#__PURE__*/Object.freeze({
        show: show,
        hide: hide,
        toggleClass: toggleClass,
        showIncrementally: showIncrementally,
        hideIncrementally: hideIncrementally,
        get: get,
        inDoc: inDoc,
        replace: replace,
        serializeNodeChildren: serializeNodeChildren,
        serializeNode: serializeNode,
        containsElement: containsElement,
        text: text
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var Focus = /** @class */ (function () {
        function Focus() {
        }
        Focus.focusin = function (event) {
            event = fix(event);
            var target = event.target;
            if (target) {
                var WF = Focus;
                WF.refocusLastFocusedComponentAfterResponse = false;
                var id = target.id;
                WF.lastFocusId = id;
                Log.info("focus set on " + id);
            }
        };
        Focus.focusout = function (event) {
            event = fix(event);
            var target = event.target;
            var WF = Focus;
            if (target && WF.lastFocusId === target.id) {
                var id = target.id;
                if (WF.refocusLastFocusedComponentAfterResponse) {
                    // replaced components seem to blur when replaced only on Safari - so do not modify lastFocusId so it gets refocused
                    Log.info("focus removed from " + id + " but ignored because of component replacement");
                }
                else {
                    WF.lastFocusId = null;
                    Log.info("focus removed from " + id);
                }
            }
        };
        Focus.getFocusedElement = function () {
            var lastFocusId = Focus.lastFocusId;
            if (lastFocusId) {
                var focusedElement = $(lastFocusId);
                Log.info("returned focused element: " + focusedElement);
                return focusedElement;
            }
        };
        Focus.setFocusOnId = function (id) {
            var WF = Focus;
            if (id) {
                WF.refocusLastFocusedComponentAfterResponse = true;
                WF.focusSetFromServer = true;
                WF.lastFocusId = id;
                Log.info("focus set on " + id + " from server side");
            }
            else {
                WF.refocusLastFocusedComponentAfterResponse = false;
                Log.info("refocus focused component after request stopped from server side");
            }
        };
        // mark the focused component so that we know if it has been replaced or not by response
        Focus.markFocusedComponent = function () {
            var WF = Focus;
            var focusedElement = WF.getFocusedElement();
            if (focusedElement) {
                // create a property of the focused element that would not remain there if component is replaced
                focusedElement.wasFocusedBeforeComponentReplacements = true;
                WF.refocusLastFocusedComponentAfterResponse = true;
                WF.focusSetFromServer = false;
            }
            else {
                WF.refocusLastFocusedComponentAfterResponse = false;
            }
        };
        // detect if the focused component was replaced
        Focus.checkFocusedComponentReplaced = function () {
            var WF = Focus;
            if (WF.refocusLastFocusedComponentAfterResponse) {
                var focusedElement = WF.getFocusedElement();
                if (focusedElement) {
                    if (typeof (focusedElement.wasFocusedBeforeComponentReplacements) !== "undefined") {
                        // focus component was not replaced - no need to refocus it
                        WF.refocusLastFocusedComponentAfterResponse = false;
                    }
                }
                else {
                    // focused component dissapeared completely - no use to try to refocus it
                    WF.refocusLastFocusedComponentAfterResponse = false;
                    WF.lastFocusId = "";
                }
            }
        };
        Focus.requestFocus = function () {
            // if the focused component is replaced by the ajax response, a re-focus might be needed
            // (if focus was not changed from server) but if not, and the focus component should
            // remain the same, do not re-focus - fixes problem on IE6 for combos that have
            // the popup open (refocusing closes popup)
            var WF = Focus;
            if (WF.refocusLastFocusedComponentAfterResponse && WF.lastFocusId) {
                var toFocus_1 = $(WF.lastFocusId);
                if (toFocus_1) {
                    Log.info("Calling focus on " + WF.lastFocusId);
                    var safeFocus_1 = function () {
                        try {
                            toFocus_1.focus();
                        }
                        catch (ignore) {
                            // WICKET-6209 IE fails if toFocus is disabled
                        }
                    };
                    if (WF.focusSetFromServer) {
                        // WICKET-5858
                        window.setTimeout(safeFocus_1, 0);
                    }
                    else {
                        // avoid loops like - onfocus triggering an event the modifies the tag => refocus => the event is triggered again
                        var temp_1 = toFocus_1.onfocus;
                        toFocus_1.onfocus = null;
                        // IE needs setTimeout (it seems not to call onfocus sync. when focus() is called
                        window.setTimeout(function () {
                            safeFocus_1();
                            toFocus_1.onfocus = temp_1;
                        }, 0);
                    }
                }
                else {
                    WF.lastFocusId = "";
                    Log.info("Couldn't set focus on element with id '" + WF.lastFocusId + "' because it is not in the page anymore");
                }
            }
            else if (WF.refocusLastFocusedComponentAfterResponse) {
                Log.info("last focus id was not set");
            }
            else {
                Log.info("refocus last focused component not needed/allowed");
            }
            Focus.refocusLastFocusedComponentAfterResponse = false;
        };
        Focus.lastFocusId = "";
        Focus.refocusLastFocusedComponentAfterResponse = false;
        Focus.focusSetFromServer = false;
        return Focus;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Form serialization
     *
     * To post a form using Ajax Wicket first needs to serialize it, which means composing a string
     * from form elments names and values. The string will then be set as body of POST request.
     */
    /* the Form module */
    function encode(text) {
        if (window.encodeURIComponent) {
            return window.encodeURIComponent(text);
        }
        else {
            return window.escape(text);
        }
    }
    /**
     * Serializes HTMLFormSelectElement to URL encoded key=value string.
     *
     * @param select {HTMLFormSelectElement} - the form element to serialize
     * @return an object of key -> value pair where 'value' can be an array of Strings if the select is .multiple,
     *		or empty object if the form element is disabled.
     */
    function serializeSelect(select) {
        var result = [];
        if (select) {
            var $select = jQuery(select);
            if ($select.length > 0 && $select.prop('disabled') === false) {
                var name_1 = $select.prop('name');
                var values = $select.val();
                if (jQuery.isArray(values)) {
                    for (var v = 0; v < values.length; v++) {
                        var value = values[v];
                        result.push({ name: name_1, value: value });
                    }
                }
                else {
                    result.push({ name: name_1, value: values });
                }
            }
        }
        return result;
    }
    /**
     * Serializes a form element to an array with a single element - an object
     * with two keys - <em>name</em> and <em>value</em>.
     *
     * Example: [{"name": "searchTerm", "value": "abc"}].
     *
     * Note: this function intentionally ignores image and submit inputs.
     *
     * @param input {HtmlFormElement} - the form element to serialize
     * @return the URL encoded key=value pair or empty string if the form element is disabled.
     */
    function serializeInput(input) {
        var result = [];
        if (input && input.type) {
            var $input = jQuery(input);
            if (input.type === 'file') {
                for (var f = 0; f < input.files.length; f++) {
                    result.push({ "name": input.name, "value": input.files[f] });
                }
            }
            else if (!(input.type === 'image' || input.type === 'submit')) {
                result = $input.serializeArray();
            }
        }
        return result;
    }
    /**
     * A hash of HTML form element to exclude from serialization
     * As key the element's id is being used.
     * As value - the string "true".
     */
    var excludeFromAjaxSerialization = {};
    /**
     * Serializes a form element by checking its type and delegating the work to
     * a more specific function.
     *
     * The form element will be ignored if it is registered as excluded in
     * <em>Wicket.Form.excludeFromAjaxSerialization</em>
     *
     * @param element {HTMLFormElement} - the form element to serialize. E.g. HTMLInputElement
     * @param serializeRecursively {Boolean} - a flag indicating whether to collect (submit) the
     * 			name/value pairs for all HTML form elements children of the HTML element with
     * 			the JavaScript listener
     * @return An array with a single element - an object with two keys - <em>name</em> and <em>value</em>.
     */
    function serializeElement(element, serializeRecursively) {
        if (!element) {
            return [];
        }
        else if (typeof (element) === 'string') {
            element = $(element);
        }
        if (excludeFromAjaxSerialization && element.id && excludeFromAjaxSerialization[element.id] === "true") {
            return [];
        }
        var tag = element.tagName.toLowerCase();
        if (tag === "select") {
            return serializeSelect(element);
        }
        else if (tag === "input" || tag === "textarea") {
            return serializeInput(element);
        }
        else {
            var result = [];
            if (serializeRecursively) {
                var elements = nodeListToArray(element.getElementsByTagName("input"));
                elements = elements.concat(nodeListToArray(element.getElementsByTagName("select")));
                elements = elements.concat(nodeListToArray(element.getElementsByTagName("textarea")));
                for (var i = 0; i < elements.length; ++i) {
                    var el = elements[i];
                    if (el.name && el.name !== "") {
                        result = result.concat(serializeElement(el, serializeRecursively));
                    }
                }
            }
            return result;
        }
    }
    function serializeForm(form) {
        var result = [], elements;
        if (form) {
            if (form.tagName.toLowerCase() === 'form') {
                elements = form.elements;
            }
            else {
                do {
                    form = form.parentNode;
                } while (form.tagName.toLowerCase() !== "form" && form.tagName.toLowerCase() !== "body");
                elements = nodeListToArray(form.getElementsByTagName("input"));
                elements = elements.concat(nodeListToArray(form.getElementsByTagName("select")));
                elements = elements.concat(nodeListToArray(form.getElementsByTagName("textarea")));
            }
        }
        for (var i = 0; i < elements.length; ++i) {
            var el = elements[i];
            if (el.name && el.name !== "") {
                result = result.concat(serializeElement(el, false));
            }
        }
        return result;
    }
    function serialize(element, dontTryToFindRootForm) {
        if (typeof (element) === 'string') {
            element = $(element);
        }
        if (element.tagName.toLowerCase() === "form") {
            return serializeForm(element);
        }
        else {
            // try to find a form in DOM parents
            var elementBck = element;
            if (dontTryToFindRootForm !== true) {
                do {
                    element = element.parentNode;
                } while (element.tagName.toLowerCase() !== "form" && element.tagName.toLowerCase() !== "body");
            }
            if (element.tagName.toLowerCase() === "form") {
                return serializeForm(element);
            }
            else {
                // there is not form in dom hierarchy
                // simulate it
                var form = document.createElement("form");
                var parent_1 = elementBck.parentNode;
                parent_1.replaceChild(form, elementBck);
                form.appendChild(elementBck);
                var result = serializeForm(form);
                parent_1.replaceChild(elementBck, form);
                return result;
            }
        }
    }

    var Form = /*#__PURE__*/Object.freeze({
        encode: encode,
        serializeSelect: serializeSelect,
        serializeInput: serializeInput,
        excludeFromAjaxSerialization: excludeFromAjaxSerialization,
        serializeElement: serializeElement,
        serializeForm: serializeForm,
        serialize: serialize
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function parse(text) {
        return parseXML(text);
    }

    var Xml = /*#__PURE__*/Object.freeze({
        parse: parse
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Functions executer takes array of functions and executes them.
     * The functions are executed one by one as far as the return value is FunctionsExecuter.DONE.
     * If the return value is FunctionsExecuter.ASYNC or undefined then the execution of
     * the functions will be resumed once the `notify` callback function is called.
     * This is needed because header contributions need to do asynchronous download of JS and/or CSS
     * and they have to let next function to run only after the download.
     * After the FunctionsExecuter is initialized, the start methods triggers the first function.
     */
    var FunctionsExecuter = /** @class */ (function () {
        /**
         * @param functions {Array} - an array of functions to execute
         */
        function FunctionsExecuter(functions) {
            this.functions = functions;
            this.current = 0;
            this.depth = 0; // we need to limit call stack depth
        }
        FunctionsExecuter.prototype.processNext = function () {
            if (this.current < this.functions.length) {
                var f_1, run = void 0;
                f_1 = this.functions[this.current];
                run = function () {
                    try {
                        var n = jQuery.proxy(this.notify, this);
                        return f_1(n);
                    }
                    catch (e) {
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
                }
                else {
                    var retValue = run();
                    if (isUndef(retValue) || retValue === FunctionsExecuter.ASYNC) {
                        this.depth++;
                    }
                    return retValue;
                }
            }
        };
        FunctionsExecuter.prototype.start = function () {
            var retValue = FunctionsExecuter.DONE;
            while (retValue === FunctionsExecuter.DONE) {
                retValue = this.processNext();
            }
        };
        FunctionsExecuter.prototype.notify = function () {
            this.start();
        };
        /**
         * Response that should be used by a function when it finishes successfully
         * in synchronous manner
         * @type {number}
         */
        FunctionsExecuter.DONE = 1;
        /**
         * Response that should be used by a function when it finishes abnormally
         * in synchronous manner
         * @type {number}
         */
        FunctionsExecuter.FAIL = 2;
        /**
         * Response that may be used by a function when it executes asynchronous
         * code and must wait `notify()` to be executed.
         * @type {number}
         */
        FunctionsExecuter.ASYNC = 3;
        /**
         * An artificial number used as a limit of the call stack depth to avoid
         * problems like "too much recursion" in the browser.
         * The depth is not easy to be calculated because the memory used by the
         * stack depends on many factors
         * @type {number}
         */
        FunctionsExecuter.DEPTH_LIMIT = 1000;
        return FunctionsExecuter;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Parses the header contribution element (returns a DOM tree with the contribution)
    function parse$1(headerNode) {
        // the header contribution is stored as CDATA section in the header-contribution element.
        // even though we need to parse it (and we have aleady parsed the response), header
        // contribution needs to be treated separately. The reason for this is that
        // Konqueror crashes when it there is a <script element in the parsed string. So we
        // need to replace that first
        // get the header contribution text and unescape it if necessary
        var text$1 = text(headerNode);
        if (exports.Browser.isKHTML()) {
            // konqueror crashes if there is a <script element in the xml, but <SCRIPT is fine.
            text$1 = text$1.replace(/<script/g, "<SCRIPT");
            text$1 = text$1.replace(/<\/script>/g, "</SCRIPT>");
        }
        // build a DOM tree of the contribution
        var xmldoc = parse(text$1);
        return xmldoc;
    }
    // checks whether the passed node is the special "parsererror"
    // created by DOMParser if there is a error in XML parsing
    // TODO: move out of the API section
    function _checkParserError(node) {
        var result = false;
        if (!isUndef(node.tagName) && node.tagName.toLowerCase() === "parsererror") {
            Log.error("Error in parsing: " + node.textContent);
            result = true;
        }
        return result;
    }
    // Processes the parsed header contribution
    function processContribution(context, headerNode) {
        var xmldoc = this.parse(headerNode);
        var rootNode = xmldoc.documentElement;
        // Firefox and Opera reports the error in the documentElement
        if (this._checkParserError(rootNode)) {
            return;
        }
        // go through the individual elements and process them according to their type
        for (var i = 0; i < rootNode.childNodes.length; i++) {
            var node = rootNode.childNodes[i];
            // Chromium reports the error as a child node
            if (this._checkParserError(node)) {
                return;
            }
            if (!isUndef(node.tagName)) {
                var name_1 = node.tagName.toLowerCase();
                // it is possible that a reference is surrounded by a <wicket:link
                // in that case, we need to find the inner element
                if (name_1 === "wicket:link") {
                    for (var j = 0; j < node.childNodes.length; ++j) {
                        var childNode = node.childNodes[j];
                        // try to find a regular node inside wicket:link
                        if (childNode.nodeType === 1) {
                            node = childNode;
                            name_1 = node.tagName.toLowerCase();
                            break;
                        }
                    }
                }
                // process the element
                if (name_1 === "link") {
                    this.processLink(context, node);
                }
                else if (name_1 === "script") {
                    this.processScript(context, node);
                }
                else if (name_1 === "style") {
                    this.processStyle(context, node);
                }
                else if (name_1 === "meta") {
                    this.processMeta(context, node);
                }
            }
            else if (node.nodeType === 8) { // comment type
                this.processComment(context, node);
            }
        }
    }
    // Process an external stylesheet element
    function processLink(context, node) {
        context.steps.push(function (notify) {
            var res = containsElement$1(node, "href");
            var oldNode = res.oldNode;
            if (res.contains) {
                // an element with same href attribute is in document, skip it
                return FunctionsExecuter.DONE;
            }
            else if (oldNode) {
                // remove another external element with the same id but different href
                oldNode.parentNode.removeChild(oldNode);
            }
            // create link element
            var css = createElement("link");
            // copy supplied attributes only.
            var attributes = jQuery(node).prop("attributes");
            var $css = jQuery(css);
            jQuery.each(attributes, function () {
                $css.attr(this.name, this.value);
            });
            // add element to head
            addElement(css);
            // cross browser way to check when the css is loaded
            // taken from http://www.backalleycoder.com/2011/03/20/link-tag-css-stylesheet-load-event/
            // this makes a second GET request to the css but it gets it either from the cache or
            // downloads just the first several bytes and realizes that the MIME is wrong and ignores the rest
            var img = document.createElement('img');
            var notifyCalled = false;
            img.onerror = function () {
                if (!notifyCalled) {
                    notifyCalled = true;
                    notify();
                }
            };
            img.src = css.href;
            if (img.complete) {
                if (!notifyCalled) {
                    notifyCalled = true;
                    notify();
                }
            }
            return FunctionsExecuter.ASYNC;
        });
    }
    // Process an inline style element
    function processStyle(context, node) {
        context.steps.push(function (notify) {
            // if element with same id is already in document, skip it
            if (containsElement(node)) {
                return FunctionsExecuter.DONE;
            }
            // serialize the style to string
            var content = serializeNodeChildren(node);
            // create stylesheet
            if (exports.Browser.isIELessThan11()) {
                try {
                    document.createStyleSheet().cssText = content;
                    return FunctionsExecuter.DONE;
                }
                catch (ignore) {
                    var run = function () {
                        try {
                            document.createStyleSheet().cssText = content;
                        }
                        catch (e) {
                            Log.error("Wicket.Head.Contributor.processStyle: " + e);
                        }
                        notify();
                    };
                    window.setTimeout(run, 1);
                    return FunctionsExecuter.ASYNC;
                }
            }
            else {
                // create style element
                var style = createElement("style");
                // copy id attribute
                style.id = node.getAttribute("id");
                var textNode = document.createTextNode(content);
                style.appendChild(textNode);
                addElement(style);
            }
            // continue to next step
            return FunctionsExecuter.DONE;
        });
    }
    // Process a script element (both inline and external)
    function processScript(context, node) {
        context.steps.push(function (notify) {
            if (!node.getAttribute("src") && containsElement(node)) {
                // if an inline element with same id is already in document, skip it
                return FunctionsExecuter.DONE;
            }
            else {
                var res = containsElement$1(node, "src");
                var oldNode = res.oldNode;
                if (res.contains) {
                    // an element with same src attribute is in document, skip it
                    return FunctionsExecuter.DONE;
                }
                else if (oldNode) {
                    // remove another external element with the same id but different src
                    oldNode.parentNode.removeChild(oldNode);
                }
            }
            // determine whether it is external javascript (has src attribute set)
            var src = node.getAttribute("src");
            if (src !== null && src !== "") {
                // convert the XML node to DOM node
                var scriptDomNode_1 = document.createElement("script");
                var attrs = node.attributes;
                for (var a = 0; a < attrs.length; a++) {
                    var attr = attrs[a];
                    scriptDomNode_1[attr.name] = attr.value;
                }
                var onScriptReady_1 = function () {
                    notify();
                };
                // first check for feature support
                if (typeof (scriptDomNode_1.onload) !== 'undefined') {
                    scriptDomNode_1.onload = onScriptReady_1;
                }
                else if (typeof (scriptDomNode_1.onreadystatechange) !== 'undefined') {
                    scriptDomNode_1.onreadystatechange = function () {
                        if (scriptDomNode_1.readyState === 'loaded' || scriptDomNode_1.readyState === 'complete') {
                            onScriptReady_1();
                        }
                    };
                }
                else if (exports.Browser.isGecko()) {
                    // Firefox doesn't react on the checks above but still supports 'onload'
                    scriptDomNode_1.onload = onScriptReady_1;
                }
                else {
                    // as a final resort notify after the current function execution
                    window.setTimeout(onScriptReady_1, 10);
                }
                addElement(scriptDomNode_1);
                return FunctionsExecuter.ASYNC;
            }
            else {
                // serialize the element content to string
                var text = serializeNodeChildren(node);
                // get rid of prefix and suffix, they are not eval-d correctly
                text = text.replace(/^\n\/\*<!\[CDATA\[\*\/\n/, "");
                text = text.replace(/\n\/\*\]\]>\*\/\n$/, "");
                var id = node.getAttribute("id");
                var type = node.getAttribute("type");
                if (typeof (id) === "string" && id.length > 0) {
                    // add javascript to document head
                    addJavascript(text, id, "", type);
                }
                else {
                    try {
                        // do the evaluation in global scope
                        window.eval(text);
                    }
                    catch (e) {
                        Log.error("Wicket.Head.Contributor.processScript: " + e + ": eval -> " + text);
                    }
                }
                // continue to next step
                return FunctionsExecuter.DONE;
            }
        });
    }
    function processMeta(context, node) {
        context.steps.push(function (notify) {
            var meta = createElement("meta"), $meta = jQuery(meta), attrs = jQuery(node).prop("attributes"), name = node.getAttribute("name");
            if (name) {
                jQuery('meta[name="' + name + '"]').remove();
            }
            jQuery.each(attrs, function () {
                $meta.attr(this.name, this.value);
            });
            addElement(meta);
            return FunctionsExecuter.DONE;
        });
    }
    // process (conditional) comments
    function processComment(context, node) {
        context.steps.push(function (notify) {
            var comment = document.createComment(node.nodeValue);
            addElement(comment);
            return FunctionsExecuter.DONE;
        });
    }

    var Contributor = /*#__PURE__*/Object.freeze({
        parse: parse$1,
        _checkParserError: _checkParserError,
        processContribution: processContribution,
        processLink: processLink,
        processStyle: processStyle,
        processScript: processScript,
        processMeta: processMeta,
        processComment: processComment
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Creates an element in document
    function createElement(name) {
        if (isUndef(name) || name === '') {
            Log.error('Cannot create an element without a name');
            return;
        }
        return document.createElement(name);
    }
    // Adds the element to page head
    function addElement(element) {
        var headItems = document.querySelector('head meta[name="wicket.header.items"]');
        if (headItems) {
            headItems.parentNode.insertBefore(element, headItems);
        }
        else {
            var head = document.querySelector("head");
            if (head) {
                head.appendChild(element);
            }
        }
    }
    // Returns true, if the page head contains element that has attribute with
    // name mandatoryAttribute same as the given element and their names match.
    //
    // e.g. Wicket.Head.containsElement(myElement, "src") return true, if there
    // is an element in head that is of same type as myElement, and whose src
    // attribute is same as myElement.src.
    function containsElement$1(element, mandatoryAttribute) {
        var attr = element.getAttribute(mandatoryAttribute);
        if (isUndef(attr) || attr === "") {
            return {
                contains: false
            };
        }
        var elementTagName = element.tagName.toLowerCase();
        var elementId = element.getAttribute("id");
        var head = document.getElementsByTagName("head")[0];
        if (elementTagName === "script") {
            head = document;
        }
        var nodes = head.getElementsByTagName(elementTagName);
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            // check node names and mandatory attribute values
            // we also have to check for attribute name that is suffixed by "_".
            // this is necessary for filtering script references
            if (node.tagName.toLowerCase() === elementTagName) {
                var loadedUrl = node.getAttribute(mandatoryAttribute);
                var loadedUrl_ = node.getAttribute(mandatoryAttribute + "_");
                if (loadedUrl === attr || loadedUrl_ === attr) {
                    return {
                        contains: true
                    };
                }
                else if (elementId && elementId === node.getAttribute("id")) {
                    return {
                        contains: false,
                        oldNode: node
                    };
                }
            }
        }
        return {
            contains: false
        };
    }
    // Adds a javascript element to page header.
    // The fakeSrc attribute is used to filter out duplicate javascript references.
    // External javascripts are loaded using xmlhttprequest. Then a javascript element is created and the
    // javascript body is used as text for the element. For javascript references, wicket uses the src
    // attribute to filter out duplicates. However, since we set the body of the element, we can't assign
    // also a src value. Therefore we put the url to the src_ (notice the underscore)  attribute.
    // Wicket.Head.containsElement is aware of that and takes also the underscored attributes into account.
    function addJavascript(content, id, fakeSrc, type) {
        var script = createElement("script");
        if (id) {
            script.id = id;
        }
        // WICKET-5047: encloses the content with a try...catch... block if the content is javascript
        // content is considered javascript if mime-type is empty (html5's default) or is 'text/javascript'
        if (!type || type.toLowerCase() === "text/javascript") {
            type = "text/javascript";
            content = 'try{' + content + '}catch(e){Wicket.Log.error(e);}';
        }
        script.setAttribute("src_", fakeSrc);
        script.setAttribute("type", type);
        // set the javascript as element content (these canHave... is an IE stuff)
        if (null === script.canHaveChildren || script.canHaveChildren) {
            var textNode = document.createTextNode(content);
            script.appendChild(textNode);
        }
        else {
            script.text = content;
        }
        addElement(script);
    }
    // Goes through all script elements contained by the element and add them to head
    function addJavascripts(element, contentFilter) {
        function add(element) {
            var src = element.getAttribute("src");
            var type = element.getAttribute("type");
            // if it is a reference, just add it to head
            if (src !== null && src.length > 0) {
                var e = document.createElement("script");
                if (type) {
                    e.setAttribute("type", type);
                }
                e.setAttribute("src", src);
                addElement(e);
            }
            else {
                var content = serializeNodeChildren(element);
                if (isUndef(content) || content === "") {
                    content = element.text;
                }
                if (typeof (contentFilter) === "function") {
                    content = contentFilter(content);
                }
                addJavascript(content, element.id, "", type);
            }
        }
        if (typeof (element) !== "undefined" &&
            typeof (element.tagName) !== "undefined" &&
            element.tagName.toLowerCase() === "script") {
            add(element);
        }
        else {
            // we need to check if there are any children, because Safari
            // aborts when the element is a text node
            if (element.childNodes.length > 0) {
                var scripts = element.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; ++i) {
                    add(scripts[i]);
                }
            }
        }
    }

    var Head = /*#__PURE__*/Object.freeze({
        Contributor: Contributor,
        createElement: createElement,
        addElement: addElement,
        containsElement: containsElement$1,
        addJavascript: addJavascript,
        addJavascripts: addJavascripts
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Channel management
     *
     * Wicket Ajax requests are organized in channels. A channel maintain the order of
     * requests and determines, what should happen when a request is fired while another
     * one is being processed. The default behavior (stack) puts the all subsequent requests
     * in a queue, while the drop behavior limits queue size to one, so only the most
     * recent of subsequent requests is executed.
     * The name of channel determines the policy. E.g. channel with name foochannel|s is
     * a stack channel, while barchannel|d is a drop channel.
     *
     * The Channel class is supposed to be used through the ChannelManager.
     */
    var Channel = /** @class */ (function () {
        function Channel(name) {
            var res = name.match(/^([^|]+)\|(d|s|a)$/);
            if (isUndef(res)) {
                this.name = '0'; // '0' is the default channel name
                this.type = 's'; // default to stack/queue
            }
            else {
                this.name = res[1];
                this.type = res[2];
            }
            this.callbacks = [];
            this.busy = false;
        }
        Channel.prototype.schedule = function (callback) {
            if (this.busy === false) {
                this.busy = true;
                try {
                    return callback();
                }
                catch (exception) {
                    this.busy = false;
                    Log.error("An error occurred while executing Ajax request:" + exception);
                }
            }
            else {
                var busyChannel = "Channel '" + this.name + "' is busy";
                if (this.type === 's') { // stack/queue
                    Log.info(busyChannel + " - scheduling the callback to be executed when the previous request finish.");
                    this.callbacks.push(callback);
                }
                else if (this.type === 'd') { // drop
                    Log.info(busyChannel + " - dropping all previous scheduled callbacks and scheduling a new one to be executed when the current request finish.");
                    this.callbacks = [];
                    this.callbacks.push(callback);
                }
                else if (this.type === 'a') { // active
                    Log.info(busyChannel + " - ignoring the Ajax call because there is a running request.");
                }
                return null;
            }
        };
        Channel.prototype.done = function () {
            var callback = null;
            if (this.callbacks.length > 0) {
                callback = this.callbacks.shift();
            }
            if (callback !== null && typeof (callback) !== "undefined") {
                Log.info("Calling postponed function...");
                // we can't call the callback from this call-stack
                // therefore we set it on timer event
                window.setTimeout(callback, 1);
            }
            else {
                this.busy = false;
            }
        };
        return Channel;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Channel manager maintains a map of channels.
     */
    var ChannelManager = /** @class */ (function () {
        function ChannelManager() {
            this.channels = [];
        }
        // Schedules the callback to channel with given name.
        ChannelManager.prototype.schedule = function (channel, callback) {
            var parsed = new Channel(channel);
            var c = this.channels[parsed.name];
            if (isUndef(c)) {
                c = parsed;
                this.channels[c.name] = c;
            }
            else {
                c.type = parsed.type;
            }
            return c.schedule(callback);
        };
        // Tells the ChannelManager that the current callback in channel with given name
        // has finished processing and another scheduled callback can be executed (if any).
        ChannelManager.prototype.done = function (channel) {
            var parsed = new Channel(channel);
            var c = this.channels[parsed.name];
            if (!isUndef(c)) {
                c.done();
                if (!c.busy) {
                    delete this.channels[parsed.name];
                }
            }
        };
        ChannelManager.FunctionsExecuter = FunctionsExecuter;
        return ChannelManager;
    }());
    var channelManager = new ChannelManager();

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Ajax call fires a Wicket Ajax request and processes the response.
     * The response can contain
     *   - javascript that should be invoked
     *   - body of components being replaced
     *   - header contributions of components
     *   - a redirect location
     */
    var Call = /** @class */ (function () {
        function Call() {
        }
        /**
         * Initializes the default values for Ajax request attributes.
         * The defaults are not set at the server side to save some bytes
         * for the network transfer
         *
         * @param attrs {Object} - the ajax request attributes to enrich
         * @private
         */
        Call.prototype._initializeDefaults = function (attrs) {
            // (ajax channel)
            if (typeof (attrs.ch) !== 'string') {
                attrs.ch = '0|s';
            }
            // (wicketAjaxResponse) be default the Ajax result should be processed for <ajax-response>
            if (typeof (attrs.wr) !== 'boolean') {
                attrs.wr = true;
            }
            // (dataType) by default we expect XML responses from the Ajax behaviors
            if (typeof (attrs.dt) !== 'string') {
                attrs.dt = 'xml';
            }
            if (typeof (attrs.m) !== 'string') {
                attrs.m = 'GET';
            }
            if (attrs.async !== false) {
                attrs.async = true;
            }
            if (!jQuery.isNumeric(attrs.rt)) {
                attrs.rt = 0;
            }
            if (attrs.pd !== true) {
                attrs.pd = false;
            }
            if (!attrs.sp) {
                attrs.sp = "bubble";
            }
            if (!attrs.sr) {
                attrs.sr = false;
            }
        };
        /**
         * Extracts the HTML element that "caused" this Ajax call.
         * An Ajax call is usually caused by JavaScript event but maybe be also
         * caused by manual usage of the JS API..
         *
         * @param attrs {Object} - the ajax request attributes
         * @return {HTMLElement} - the DOM element
         * @private
         */
        Call.prototype._getTarget = function (attrs) {
            var target;
            if (attrs.event) {
                target = attrs.event.target;
            }
            else if (!jQuery.isWindow(attrs.c)) {
                target = $(attrs.c);
            }
            else {
                target = window;
            }
            return target;
        };
        /**
         * A helper function that executes an array of handlers (before, success, failure)
         *
         * @param handlers {Array[Function]} - the handlers to execute
         * @package
         */
        Call.prototype._executeHandlers = function (handlers) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (jQuery.isArray(handlers)) {
                // cut the handlers argument
                // let args = Array.prototype.slice.call(arguments).slice(1);
                // assumes that the Ajax attributes is always the first argument
                var attrs = args[0];
                var that = this._getTarget(attrs);
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    if (jQuery.isFunction(handler)) {
                        handler.apply(that, args);
                    }
                    else {
                        new Function(handler).apply(that, args);
                    }
                }
            }
        };
        /**
         * Converts an object (hash) to an array suitable for consumption
         * by jQuery.param()
         *
         * @param {Object} parameters - the object to convert to an array of
         *      name -> value pairs.
         * @see jQuery.param
         * @see jQuery.serializeArray
         * @private
         */
        Call.prototype._asParamArray = function (parameters) {
            var result = [], value, name;
            if (jQuery.isArray(parameters)) {
                result = parameters;
            }
            else if (jQuery.isPlainObject(parameters)) {
                for (name in parameters) {
                    if (name && parameters.hasOwnProperty(name)) {
                        value = parameters[name];
                        result.push({ name: name, value: value });
                    }
                }
            }
            for (var i = 0; i < result.length; i++) {
                if (result[i] === null) {
                    result.splice(i, 1);
                    i--;
                }
            }
            return result;
        };
        /**
         * Executes all functions to calculate any dynamic extra parameters
         *
         * @param attrs The Ajax request attributes
         * @returns {String} A query string snippet with any calculated request
         *  parameters. An empty string if there are no dynamic parameters in attrs
         * @private
         */
        Call.prototype._calculateDynamicParameters = function (attrs) {
            var deps = attrs.dep, params = [];
            for (var i = 0; i < deps.length; i++) {
                var dep = deps[i], extraParam = void 0;
                if (jQuery.isFunction(dep)) {
                    extraParam = dep(attrs);
                }
                else {
                    extraParam = new Function('attrs', dep)(attrs);
                }
                extraParam = this._asParamArray(extraParam);
                params = params.concat(extraParam);
            }
            return params;
        };
        /**
         * Executes or schedules for execution #doAjax()
         *
         * @param {Object} attrs - the Ajax request attributes configured at the server side
         */
        Call.prototype.ajax = function (attrs) {
            this._initializeDefaults(attrs);
            var res = channelManager.schedule(attrs.ch, bind(function () {
                this.doAjax(attrs);
            }, this));
            return res !== null ? res : true;
        };
        /**
         * Is an element still present for Ajax requests.
         */
        Call.prototype._isPresent = function (id) {
            if (isUndef(id)) {
                // no id so no check whether present
                return true;
            }
            var element = $(id);
            if (isUndef(element)) {
                // not present
                return false;
            }
            // present if no attributes at all or not a placeholder
            return (!element.hasAttribute || !element.hasAttribute('data-wicket-placeholder'));
        };
        /**
         * Handles execution of Ajax calls.
         *
         * @param {Object} attrs - the Ajax request attributes configured at the server side
         */
        Call.prototype.doAjax = function (attrs) {
            var 
            // the headers to use for each Ajax request
            headers = {
                'Wicket-Ajax': 'true',
                'Wicket-Ajax-BaseURL': getAjaxBaseUrl()
            }, url = attrs.u, 
            // the request (extra) parameters
            data = this._asParamArray(attrs.ep), self = this, 
            // the precondition to use if there are no explicit ones
            defaultPrecondition = [function (attributes) {
                    return self._isPresent(attributes.c) && self._isPresent(attributes.f);
                }], 
            // a context that brings the common data for the success/fialure/complete handlers
            context = {
                attrs: attrs,
                // initialize the array for steps (closures that execute each action)
                steps: []
            }, we = Event, topic = we.Topic;
            if (Focus.lastFocusId) {
                // WICKET-6568 might contain non-ASCII
                headers["Wicket-FocusedElementId"] = encode(Focus.lastFocusId);
            }
            self._executeHandlers(attrs.bh, attrs);
            we.publish(topic.AJAX_CALL_BEFORE, attrs);
            var preconditions = attrs.pre || [];
            preconditions = defaultPrecondition.concat(preconditions);
            if (jQuery.isArray(preconditions)) {
                var that = this._getTarget(attrs);
                for (var p = 0; p < preconditions.length; p++) {
                    var precondition = preconditions[p];
                    var result = void 0;
                    if (jQuery.isFunction(precondition)) {
                        result = precondition.call(that, attrs);
                    }
                    else {
                        result = new Function(precondition).call(that, attrs);
                    }
                    if (result === false) {
                        Log.info("Ajax request stopped because of precondition check, url: " + attrs.u);
                        self.done(attrs);
                        return false;
                    }
                }
            }
            we.publish(topic.AJAX_CALL_PRECONDITION, attrs);
            if (attrs.f) {
                // serialize the form with id == attrs.f
                var form = $(attrs.f);
                data = data.concat(serializeForm(form));
                // set the submitting component input name
                if (attrs.sc) {
                    var scName = attrs.sc;
                    data = data.concat({ name: scName, value: 1 });
                }
            }
            else if (attrs.c && !jQuery.isWindow(attrs.c)) {
                // serialize just the form component with id == attrs.c
                var el = $(attrs.c);
                data = data.concat(serializeElement(el, attrs.sr));
            }
            // collect the dynamic extra parameters
            if (jQuery.isArray(attrs.dep)) {
                var dynamicData = this._calculateDynamicParameters(attrs);
                if (attrs.m.toLowerCase() === 'post') {
                    data = data.concat(dynamicData);
                }
                else {
                    var separator = url.indexOf('?') > -1 ? '&' : '?';
                    url = url + separator + jQuery.param(dynamicData);
                }
            }
            var wwwFormUrlEncoded; // undefined is jQuery's default
            if (attrs.mp) {
                try {
                    var formData = new FormData();
                    for (var i = 0; i < data.length; i++) {
                        formData.append(data[i].name, data[i].value || "");
                    }
                    data = formData;
                    wwwFormUrlEncoded = false;
                }
                catch (exception) {
                    Log.error("Ajax multipat not supported:" + exception);
                }
            }
            // execute the request
            var jqXHR = jQuery.ajax({
                url: url,
                type: attrs.m,
                context: self,
                processData: wwwFormUrlEncoded,
                contentType: wwwFormUrlEncoded,
                beforeSend: function (jqXHR, settings) {
                    self._executeHandlers(attrs.bsh, attrs, jqXHR, settings);
                    we.publish(topic.AJAX_CALL_BEFORE_SEND, attrs, jqXHR, settings);
                    if (attrs.i) {
                        // show the indicator
                        showIncrementally(attrs.i);
                    }
                },
                data: data,
                dataType: attrs.dt,
                async: attrs.async,
                timeout: attrs.rt,
                cache: false,
                headers: headers,
                success: function (data, textStatus, jqXHR) {
                    if (attrs.wr) {
                        self.processAjaxResponse(data, textStatus, jqXHR, context);
                    }
                    else {
                        self._executeHandlers(attrs.sh, attrs, jqXHR, data, textStatus);
                        we.publish(topic.AJAX_CALL_SUCCESS, attrs, jqXHR, data, textStatus);
                    }
                },
                error: function (jqXHR, textStatus, errorMessage) {
                    if (jqXHR.status === 301 && jqXHR.getResponseHeader('Ajax-Location')) {
                        self.processAjaxResponse(data, textStatus, jqXHR, context);
                    }
                    else {
                        self.failure(context, jqXHR, errorMessage, textStatus);
                    }
                },
                complete: function (jqXHR, textStatus) {
                    context.steps.push(jQuery.proxy(function (notify) {
                        if (attrs.i && context.isRedirecting !== true) {
                            hideIncrementally(attrs.i);
                        }
                        self._executeHandlers(attrs.coh, attrs, jqXHR, textStatus);
                        we.publish(topic.AJAX_CALL_COMPLETE, attrs, jqXHR, textStatus);
                        self.done(attrs);
                        return FunctionsExecuter.DONE;
                    }, self));
                    var executer = new FunctionsExecuter(context.steps);
                    executer.start();
                }
            });
            // execute after handlers right after the Ajax request is fired
            self._executeHandlers(attrs.ah, attrs);
            we.publish(topic.AJAX_CALL_AFTER, attrs);
            return jqXHR;
        };
        /**
         * Method that processes a manually supplied <ajax-response>.
         *
         * @param data {XmlDocument} - the <ajax-response> XML document
         */
        Call.prototype.process = function (data) {
            var context = {
                attrs: {},
                steps: []
            };
            var xmlDocument = parse(data);
            this.loadedCallback(xmlDocument, context);
            var executer = new FunctionsExecuter(context.steps);
            executer.start();
        };
        /**
         * Method that processes the <ajax-response> in the context of an XMLHttpRequest.
         *
         * @param data {XmlDocument} - the <ajax-response> XML document
         * @param textStatus {String} - the response status as text (e.g. 'success', 'parsererror', etc.)
         * @param jqXHR {Object} - the jQuery wrapper around XMLHttpRequest
         * @param context {Object} - the request context with the Ajax request attributes and the FunctionExecuter's steps
         */
        Call.prototype.processAjaxResponse = function (data, textStatus, jqXHR, context) {
            if (jqXHR.readyState === 4) {
                // first try to get the redirect header
                var redirectUrl = void 0;
                try {
                    redirectUrl = jqXHR.getResponseHeader('Ajax-Location');
                }
                catch (ignore) { // might happen in older mozilla
                }
                // the redirect header was set, go to new url
                if (typeof (redirectUrl) !== "undefined" && redirectUrl !== null && redirectUrl !== "") {
                    // In case the page isn't really redirected. For example say the redirect is to an octet-stream.
                    // A file download popup will appear but the page in the browser won't change.
                    this.success(context);
                    var withScheme = /^[a-z][a-z0-9+.-]*:\/\//; // checks whether the string starts with a scheme
                    // support/check for non-relative redirectUrl like as provided and needed in a portlet context
                    if (redirectUrl.charAt(0) === '/' || withScheme.test(redirectUrl)) {
                        context.isRedirecting = true;
                        redirect(redirectUrl);
                    }
                    else {
                        var urlDepth = 0;
                        while (redirectUrl.substring(0, 3) === "../") {
                            urlDepth++;
                            redirectUrl = redirectUrl.substring(3);
                        }
                        // Make this a string.
                        var calculatedRedirect = window.location.pathname;
                        while (urlDepth > -1) {
                            urlDepth--;
                            var i = calculatedRedirect.lastIndexOf("/");
                            if (i > -1) {
                                calculatedRedirect = calculatedRedirect.substring(0, i);
                            }
                        }
                        calculatedRedirect += "/" + redirectUrl;
                        if (exports.Browser.isGecko()) {
                            // firefox 3 has problem with window.location setting relative url
                            calculatedRedirect = window.location.protocol + "//" + window.location.host + calculatedRedirect;
                        }
                        context.isRedirecting = true;
                        redirect(calculatedRedirect);
                    }
                }
                else {
                    // no redirect, just regular response
                    if (Log.enabled()) {
                        var responseAsText = jqXHR.responseText;
                        Log.info("Received ajax response (" + responseAsText.length + " characters)");
                        Log.info("\n" + responseAsText);
                    }
                    // invoke the loaded callback with an xml document
                    return this.loadedCallback(data, context);
                }
            }
        };
        // Processes the response
        Call.prototype.loadedCallback = function (envelope, context) {
            // To process the response, we go through the xml document and add a function for every action (step).
            // After this is done, a FunctionExecuter object asynchronously executes these functions.
            // The asynchronous execution is necessary, because some steps might involve loading external javascript,
            // which must be asynchronous, so that it doesn't block the browser, but we also have to maintain
            // the order in which scripts are loaded and we have to delay the next steps until the script is
            // loaded.
            try {
                var root = envelope.getElementsByTagName("ajax-response")[0];
                if (isUndef(root) && envelope.compatMode === 'BackCompat') {
                    envelope = htmlToDomDocument(envelope);
                    root = envelope.getElementsByTagName("ajax-response")[0];
                }
                // the root element must be <ajax-response
                if (isUndef(root) || root.tagName !== "ajax-response") {
                    this.failure(context, null, "Could not find root <ajax-response> element", null);
                    return;
                }
                var steps = context.steps;
                // go through the ajax response and execute all priority-invocations first
                for (var i = 0; i < root.childNodes.length; ++i) {
                    var childNode = root.childNodes[i];
                    if (childNode.tagName === "header-contribution") {
                        this.processHeaderContribution(context, childNode);
                    }
                    else if (childNode.tagName === "priority-evaluate") {
                        this.processEvaluation(context, childNode);
                    }
                }
                // go through the ajax response and for every action (component, js evaluation, header contribution)
                // ad the proper closure to steps
                var stepIndexOfLastReplacedComponent = -1;
                for (var c = 0; c < root.childNodes.length; ++c) {
                    var node = root.childNodes[c];
                    if (node.tagName === "component") {
                        if (stepIndexOfLastReplacedComponent === -1) {
                            this.processFocusedComponentMark(context);
                        }
                        stepIndexOfLastReplacedComponent = steps.length;
                        this.processComponent(context, node);
                    }
                    else if (node.tagName === "evaluate") {
                        this.processEvaluation(context, node);
                    }
                    else if (node.tagName === "redirect") {
                        this.processRedirect(context, node);
                    }
                }
                if (stepIndexOfLastReplacedComponent !== -1) {
                    this.processFocusedComponentReplaceCheck(steps, stepIndexOfLastReplacedComponent);
                }
                // add the last step, which should trigger the success call the done method on request
                this.success(context);
            }
            catch (exception) {
                this.failure(context, null, exception, null);
            }
        };
        // Adds a closure to steps that should be invoked after all other steps have been successfully executed
        Call.prototype.success = function (context) {
            context.steps.push(jQuery.proxy(function (notify) {
                Log.info("Response processed successfully.");
                var attrs = context.attrs;
                this._executeHandlers(attrs.sh, attrs, null, null, 'success');
                publish(Topic.AJAX_CALL_SUCCESS, attrs, null, null, 'success');
                Focus.requestFocus();
                // continue to next step (which should make the processing stop, as success should be the final step)
                return FunctionsExecuter.DONE;
            }, this));
        };
        // On ajax request failure
        Call.prototype.failure = function (context, jqXHR, errorMessage, textStatus) {
            context.steps.push(jQuery.proxy(function (notify) {
                if (errorMessage) {
                    Log.error("Wicket.Ajax.Call.failure: Error while parsing response: " + errorMessage);
                }
                var attrs = context.attrs;
                this._executeHandlers(attrs.fh, attrs, jqXHR, errorMessage, textStatus);
                publish(Topic.AJAX_CALL_FAILURE, attrs, jqXHR, errorMessage, textStatus);
                return FunctionsExecuter.DONE;
            }, this));
        };
        Call.prototype.done = function (attrs) {
            this._executeHandlers(attrs.dh, attrs);
            publish(Topic.AJAX_CALL_DONE, attrs);
            channelManager.done(attrs.ch);
        };
        // Adds a closure that replaces a component
        Call.prototype.processComponent = function (context, node) {
            context.steps.push(function (notify) {
                // get the component id
                var compId = node.getAttribute("id");
                // get existing component
                var element = $(compId);
                if (isUndef(element)) {
                    Log.error("Wicket.Ajax.Call.processComponent: Component with id [[" +
                        compId + "]] was not found while trying to perform markup update. " +
                        "Make sure you called component.setOutputMarkupId(true) on the component whose markup you are trying to update.");
                }
                else {
                    var text$1 = text(node);
                    // replace the component
                    replace(element, text$1);
                }
                // continue to next step
                return FunctionsExecuter.DONE;
            });
        };
        /**
         * Adds a closure that evaluates javascript code.
         * @param context {Object} - the object that brings the executer's steps and the attributes
         * @param node {XmlElement} - the <[priority-]evaluate> element with the script to evaluate
         */
        Call.prototype.processEvaluation = function (context, node) {
            // used to match evaluation scripts which manually call FunctionsExecuter's notify() when ready
            var scriptWithIdentifierR = new RegExp("\\(function\\(\\)\\{([a-zA-Z_]\\w*)\\|((.|\\n)*)?\\}\\)\\(\\);$");
            /**
             * A regex used to split the text in (priority-)evaluate elements in the Ajax response
             * when there are scripts which require manual call of 'FunctionExecutor#notify()'
             * @type {RegExp}
             */
            var scriptSplitterR = new RegExp("\\(function\\(\\)\\{[\\s\\S]*?}\\)\\(\\);", 'gi');
            // get the javascript body
            var text$1 = text(node);
            // aliases to improve performance
            var steps = context.steps;
            var log = Log;
            var evaluateWithManualNotify = function (parameters, body) {
                return function (notify) {
                    var toExecute = "(function(" + parameters + ") {" + body + "})";
                    try {
                        // do the evaluation in global scope
                        var f = window.eval(toExecute);
                        f(notify);
                    }
                    catch (exception) {
                        log.error("Wicket.Ajax.Call.processEvaluation: Exception evaluating javascript: " + exception + ", text: " + text$1);
                    }
                    return FunctionsExecuter.ASYNC;
                };
            };
            var evaluate = function (script) {
                return function (notify) {
                    // just evaluate the javascript
                    try {
                        // do the evaluation in global scope
                        window.eval(script);
                    }
                    catch (exception) {
                        log.error("Wicket.Ajax.Call.processEvaluation: Exception evaluating javascript: " + exception + ", text: " + text$1);
                    }
                    // continue to next step
                    return FunctionsExecuter.DONE;
                };
            };
            // test if the javascript is in form of identifier|code
            // if it is, we allow for letting the javascript decide when the rest of processing will continue
            // by invoking identifier();. This allows usage of some asynchronous/deferred logic before the next script
            // See WICKET-5039
            if (scriptWithIdentifierR.test(text$1)) {
                var scripts = [];
                var scr = void 0;
                while ((scr = scriptSplitterR.exec(text$1)) !== null) {
                    scripts.push(scr[0]);
                }
                for (var s = 0; s < scripts.length; s++) {
                    var script = scripts[s];
                    if (script) {
                        var scriptWithIdentifier = script.match(scriptWithIdentifierR);
                        if (scriptWithIdentifier) {
                            steps.push(evaluateWithManualNotify(scriptWithIdentifier[1], scriptWithIdentifier[2]));
                        }
                        else {
                            steps.push(evaluate(script));
                        }
                    }
                }
            }
            else {
                steps.push(evaluate(text$1));
            }
        };
        // Adds a closure that processes a header contribution
        Call.prototype.processHeaderContribution = function (context, node) {
            var c = Contributor;
            c.processContribution(context, node);
        };
        // Adds a closure that processes a redirect
        Call.prototype.processRedirect = function (context, node) {
            var text$1 = text(node);
            Log.info("Redirecting to: " + text$1);
            context.isRedirecting = true;
            redirect(text$1);
        };
        // mark the focused component so that we know if it has been replaced by response
        Call.prototype.processFocusedComponentMark = function (context) {
            context.steps.push(function (notify) {
                Focus.markFocusedComponent();
                // continue to next step
                return FunctionsExecuter.DONE;
            });
        };
        // detect if the focused component was replaced
        Call.prototype.processFocusedComponentReplaceCheck = function (steps, lastReplaceComponentStep) {
            // add this step imediately after all components have been replaced
            steps.splice(lastReplaceComponentStep + 1, 0, function (notify) {
                Focus.checkFocusedComponentReplaced();
                // continue to next step
                return FunctionsExecuter.DONE;
            });
        };
        return Call;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Throttler entry see {@link Throttler} for details
     */
    var ThrottlerEntry = /** @class */ (function () {
        function ThrottlerEntry(func) {
            this.func = func;
            this.timestamp = new Date().getTime();
            this.timeoutVar = undefined;
        }
        ThrottlerEntry.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        ThrottlerEntry.prototype.getFunc = function () {
            return this.func;
        };
        ThrottlerEntry.prototype.setFunc = function (func) {
            this.func = func;
        };
        ThrottlerEntry.prototype.getTimeoutVar = function () {
            return this.timeoutVar;
        };
        ThrottlerEntry.prototype.setTimeoutVar = function (timeoutVar) {
            this.timeoutVar = timeoutVar;
        };
        return ThrottlerEntry;
    }());

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Throttler's purpose is to make sure that ajax requests wont be fired too often.
     */
    var Throttler = /** @class */ (function () {
        /* "postponeTimerOnUpdate" is an optional parameter. If it is set to true, then the timer is
       reset each time the throttle function gets called. Use this behaviour if you want something
       to happen at X milliseconds after the *last* call to throttle.
       If the parameter is not set, or set to false, then the timer is not reset. */
        function Throttler(postponeTimerOnUpdate) {
            this.postponeTimerOnUpdate = postponeTimerOnUpdate || false;
        }
        Throttler.prototype.throttle = function (id, millis, func) {
            var entries = Throttler.entries;
            var entry = entries[id];
            var me = this;
            if (typeof (entry) === 'undefined') {
                entry = new ThrottlerEntry(func);
                entry.setTimeoutVar(window.setTimeout(function () {
                    me.execute(id);
                }, millis));
                entries[id] = entry;
            }
            else {
                entry.setFunc(func);
                if (this.postponeTimerOnUpdate) {
                    window.clearTimeout(entry.getTimeoutVar());
                    entry.setTimeoutVar(window.setTimeout(function () {
                        me.execute(id);
                    }, millis));
                }
            }
        };
        Throttler.prototype.execute = function (id) {
            var entries = Throttler.entries;
            var entry = entries[id];
            if (typeof (entry) !== 'undefined') {
                var func = entry.getFunc();
                entries[id] = undefined;
                return func();
            }
        };
        Throttler.entries = [];
        return Throttler;
    }());
    var throttler = new Throttler();

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The Ajax.Request class encapsulates a XmlHttpRequest.
     */
    /* the Ajax module */
    var baseUrl = undefined;
    /**
     * A safe getter for Wicket's Ajax base URL.
     * If the value is not defined or is empty string then
     * return '.' (current folder) as base URL.
     * Used for request header and parameter
     */
    function getAjaxBaseUrl() {
        return '.';
    }
    function _handleEventCancelation(attrs) {
        var evt = attrs.event;
        if (evt) {
            if (attrs.pd) {
                try {
                    evt.preventDefault();
                }
                catch (ignore) {
                    // WICKET-4986
                    // jquery fails 'member not found' with calls on busy channel
                }
            }
            if (attrs.sp === "stop") {
                stop(evt);
            }
            else if (attrs.sp === "stopImmediate") {
                stop(evt, true);
            }
        }
    }
    function get$1(attrs) {
        attrs.m = 'GET';
        return ajax(attrs);
    }
    function post(attrs) {
        attrs.m = 'POST';
        return ajax(attrs);
    }
    function ajax(attrs) {
        attrs.c = attrs.c || window;
        attrs.e = attrs.e || ['domready'];
        if (!jQuery.isArray(attrs.e)) {
            attrs.e = [attrs.e];
        }
        jQuery.each(attrs.e, function (idx, evt) {
            add(attrs.c, evt, function (jqEvent, data) {
                var call = new Call();
                var attributes = jQuery.extend({}, attrs);
                if (evt !== "domready") {
                    attributes.event = fix(jqEvent);
                    if (data) {
                        attributes.event.extraData = data;
                    }
                }
                call._executeHandlers(attributes.ih, attributes);
                publish(Topic.AJAX_CALL_INIT, attributes);
                var throttlingSettings = attributes.tr;
                if (throttlingSettings) {
                    var postponeTimerOnUpdate = throttlingSettings.p || false;
                    var throttler = new Throttler(postponeTimerOnUpdate);
                    throttler.throttle(throttlingSettings.id, throttlingSettings.d, bind(function () {
                        call.ajax(attributes);
                    }, this));
                }
                else {
                    call.ajax(attributes);
                }
                if (evt !== "domready") {
                    _handleEventCancelation(attributes);
                }
            }, null, attrs.sel);
        });
    }
    function process(data) {
        var call = new Call();
        call.process(data);
    }

    var Ajax = /*#__PURE__*/Object.freeze({
        baseUrl: baseUrl,
        getAjaxBaseUrl: getAjaxBaseUrl,
        _handleEventCancelation: _handleEventCancelation,
        get: get$1,
        post: post,
        ajax: ajax,
        process: process,
        redirect: redirect,
        Channel: Channel
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var TimerHandles = {};
    /**
     * Manages the functionality needed by AbstractAjaxTimerBehavior and its subclasses
     */
    var Timer = {
        /**
         * Schedules a timer
         * @param {string} timerId - the identifier for the timer
         * @param {function} f - the JavaScript function to execute after the timeout
         * @param {number} delay - the timeout
         */
        'set': function (timerId, f, delay) {
            // if (typeof(TimerHandles) === 'undefined') {
            //     TimerHandles = {};
            // }
            Timer.clear(timerId);
            TimerHandles[timerId] = setTimeout(function () {
                Timer.clear(timerId);
                f();
            }, delay);
        },
        /**
         * Clears a timer by its id
         * @param {string} timerId - the identifier of the timer
         */
        clear: function (timerId) {
            if (TimerHandles && TimerHandles[timerId]) {
                clearTimeout(TimerHandles[timerId]);
                delete TimerHandles[timerId];
            }
        },
        /**
         * Clear all remaining timers.
         */
        clearAll: function () {
            var WTH = TimerHandles;
            if (WTH) {
                for (var th in WTH) {
                    if (WTH.hasOwnProperty(th)) {
                        Timer.clear(th);
                    }
                }
            }
        }
    };

    /*
     * Licensed to the Apache Software Foundation (ASF) under one or more
     * contributor license agreements.  See the NOTICE file distributed with
     * this work for additional information regarding copyright ownership.
     * The ASF licenses this file to You under the Apache License, Version 2.0
     * (the "License"); you may not use this file except in compliance with
     * the License.  You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * Wicket Ajax Support
     *
     * @author Igor Vaynberg
     * @author Matej Knopp
     */
    /* TODO old implementation had these checks */
    /*if (typeof(Wicket) === 'undefined') {
        window.Wicket = {};
    }

    if (typeof(Wicket.Head) === 'object') {
        return;
    }*/
    /**
     * A special event that is used to listen for immediate changes in input fields.
     */
    jQuery.event.special.inputchange = {
        keys: {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            END: 35,
            HOME: 36
        },
        keyDownPressed: false,
        setup: function () {
            if (exports.Browser.isIE()) {
                // WICKET-5959: IE >= 11 supports "input" events, but triggers too often
                // to be reliable
                jQuery(this).on('keydown', function (event) {
                    jQuery.event.special.inputchange.keyDownPressed = true;
                });
                jQuery(this).on("cut paste", function (evt) {
                    var self = this;
                    if (false === jQuery.event.special.inputchange.keyDownPressed) {
                        window.setTimeout(function () {
                            jQuery.event.special.inputchange.handler.call(self, evt);
                        }, 10);
                    }
                });
                jQuery(this).on("keyup", function (evt) {
                    jQuery.event.special.inputchange.keyDownPressed = false; // reset
                    jQuery.event.special.inputchange.handler.call(this, evt);
                });
            }
            else {
                jQuery(this).on("input", jQuery.event.special.inputchange.handler);
            }
        },
        teardown: function () {
            jQuery(this).off("input keyup cut paste", jQuery.event.special.inputchange.handler);
        },
        handler: function (evt) {
            var WE = Event;
            var k = jQuery.event.special.inputchange.keys;
            var kc = WE.keyCode(WE.fix(evt));
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
                    var args = Array.prototype.slice.call(arguments, 0);
                    return jQuery(this).trigger(evt.type, args);
            }
        }
    };
    // MISC FUNCTIONS
    /**
     * Track focussed element.
     */
    add(window, 'focusin', Focus.focusin);
    add(window, 'focusout', Focus.focusout);
    /**
     * Clear any scheduled Ajax timers when leaving the current page
     */
    add(window, "unload", function () {
        Timer.clearAll();
    });

    exports.$ = $;
    exports.$$ = $$;
    exports.Ajax = Ajax;
    exports.Channel = Channel;
    exports.ChannelManager = ChannelManager;
    exports.Class = Class;
    exports.DOM = DOM;
    exports.Event = Event;
    exports.Focus = Focus;
    exports.Form = Form;
    exports.Head = Head;
    exports.Log = Log;
    exports.Throttler = Throttler;
    exports.ThrottlerEntry = ThrottlerEntry;
    exports.Timer = Timer;
    exports.TimerHandles = TimerHandles;
    exports.Xml = Xml;
    exports.bind = bind;
    exports.channelManager = channelManager;
    exports.merge = merge;
    exports.throttler = throttler;

    return exports;

}({}));
