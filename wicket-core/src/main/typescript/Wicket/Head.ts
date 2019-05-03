import * as Wicket from "../Wicket";
import * as Contributor from "./Head/Contributor";
import {isUndef} from "../Wicket";

export {Contributor};

// Creates an element in document
export function createElement (name) {
    if (isUndef(name) || name === '') {
        Wicket.Log.error('Cannot create an element without a name');
        return;
    }
    return document.createElement(name);
}

// Adds the element to page head
export function addElement (element) {
    var headItems = document.querySelector('head meta[name="wicket.header.items"]');
    if (headItems) {
        headItems.parentNode.insertBefore(element, headItems);
    } else {
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
export function containsElement (element, mandatoryAttribute) {
    var attr = element.getAttribute(mandatoryAttribute);
    if (isUndef(attr) || attr === "") {
        return {
            contains: false
        };
    }

    var elementTagName = element.tagName.toLowerCase();
    var elementId = element.getAttribute("id");
    var head: any = document.getElementsByTagName("head")[0];

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
            var loadedUrl_ = node.getAttribute(mandatoryAttribute+"_");
            if (loadedUrl === attr || loadedUrl_ === attr) {
                return {
                    contains: true
                };
            } else if (elementId && elementId === node.getAttribute("id")) {
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
export function addJavascript (content, id, fakeSrc, type) {
    var script = createElement("script");
    if (id) {
        script.id = id;
    }

    // WICKET-5047: encloses the content with a try...catch... block if the content is javascript
    // content is considered javascript if mime-type is empty (html5's default) or is 'text/javascript'
    if (!type || type.toLowerCase() === "text/javascript") {
        type = "text/javascript";
        content = 'try{'+content+'}catch(e){Wicket.Log.error(e);}';
    }

    script.setAttribute("src_", fakeSrc);
    script.setAttribute("type", type);

    // set the javascript as element content
    if (null === script.canHaveChildren || script.canHaveChildren) {
        var textNode = document.createTextNode(content);
        script.appendChild(textNode);
    } else {
        script.text = content;
    }
    addElement(script);
}

// Goes through all script elements contained by the element and add them to head
export function addJavascripts (element, contentFilter) {
    function add(element) {
        var src = element.getAttribute("src");
        var type = element.getAttribute("type");

        // if it is a reference, just add it to head
        if (src !== null && src.length > 0) {
            var e = document.createElement("script");
            if (type) {
                e.setAttribute("type",type);
            }
            e.setAttribute("src", src);
            addElement(e);
        } else {
            var content = Wicket.DOM.serializeNodeChildren(element);
            if (isUndef(content) || content === "") {
                content = element.text;
            }

            if (typeof(contentFilter) === "function") {
                content = contentFilter(content);
            }

            addJavascript(content, element.id, "", type);
        }
    }
    if (typeof(element) !== "undefined" &&
        typeof(element.tagName) !== "undefined" &&
        element.tagName.toLowerCase() === "script") {
        add(element);
    } else {
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
