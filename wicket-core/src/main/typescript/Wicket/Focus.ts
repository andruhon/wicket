import * as Wicket from "../Wicket";

export class Focus {
    public static lastFocusId = "";
    public static refocusLastFocusedComponentAfterResponse = false;
    public static focusSetFromServer = false;

    public static focusin(event) {
        event = Wicket.Event.fix(event);

        var target = event.target;
        if (target) {
            var WF = Focus;
            WF.refocusLastFocusedComponentAfterResponse = false;
            var id = target.id;
            WF.lastFocusId = id;
            Wicket.Log.info("focus set on " + id);
        }
    }

    public static focusout(event) {
        event = Wicket.Event.fix(event);

        var target = event.target;
        var WF = Focus;
        if (target && WF.lastFocusId === target.id) {
            var id = target.id;
            if (WF.refocusLastFocusedComponentAfterResponse) {
                // replaced components seem to blur when replaced only on Safari - so do not modify lastFocusId so it gets refocused
                Wicket.Log.info("focus removed from " + id + " but ignored because of component replacement");
            } else {
                WF.lastFocusId = null;
                Wicket.Log.info("focus removed from " + id);
            }
        }
    }

    public static getFocusedElement() {
        var lastFocusId = Focus.lastFocusId;
        if (lastFocusId) {
            var focusedElement = Wicket.$(lastFocusId);
            Wicket.Log.info("returned focused element: " + focusedElement);
            return focusedElement;
        }
    }

    public static setFocusOnId(id) {
        var WF = Focus;
        if (id) {
            WF.refocusLastFocusedComponentAfterResponse = true;
            WF.focusSetFromServer = true;
            WF.lastFocusId = id;
            Wicket.Log.info("focus set on " + id + " from server side");
        } else {
            WF.refocusLastFocusedComponentAfterResponse = false;
            Wicket.Log.info("refocus focused component after request stopped from server side");
        }
    }

    // mark the focused component so that we know if it has been replaced or not by response
    public static markFocusedComponent() {
        var WF = Focus;
        var focusedElement = WF.getFocusedElement();
        if (focusedElement) {
            // create a property of the focused element that would not remain there if component is replaced
            focusedElement.wasFocusedBeforeComponentReplacements = true;
            WF.refocusLastFocusedComponentAfterResponse = true;
            WF.focusSetFromServer = false;
        } else {
            WF.refocusLastFocusedComponentAfterResponse = false;
        }
    }

    // detect if the focused component was replaced
    public static checkFocusedComponentReplaced() {
        var WF = Focus;
        if (WF.refocusLastFocusedComponentAfterResponse) {
            var focusedElement = WF.getFocusedElement();
            if (focusedElement) {
                if (typeof (focusedElement.wasFocusedBeforeComponentReplacements) !== "undefined") {
                    // focus component was not replaced - no need to refocus it
                    WF.refocusLastFocusedComponentAfterResponse = false;
                }
            } else {
                // focused component dissapeared completely - no use to try to refocus it
                WF.refocusLastFocusedComponentAfterResponse = false;
                WF.lastFocusId = "";
            }
        }
    }

    public static requestFocus() {
        // if the focused component is replaced by the ajax response, a re-focus might be needed
        // (if focus was not changed from server) but if not, and the focus component should
        // remain the same, do not re-focus - fixes problem on IE6 for combos that have
        // the popup open (refocusing closes popup)
        var WF = Focus;
        if (WF.refocusLastFocusedComponentAfterResponse && WF.lastFocusId) {
            var toFocus = Wicket.$(WF.lastFocusId);

            if (toFocus) {
                Wicket.Log.info("Calling focus on " + WF.lastFocusId);

                var safeFocus = function () {
                    try {
                        toFocus.focus();
                    } catch (ignore) {
                        // WICKET-6209 IE fails if toFocus is disabled
                    }
                };

                if (WF.focusSetFromServer) {
                    // WICKET-5858
                    window.setTimeout(safeFocus, 0);
                } else {
                    // avoid loops like - onfocus triggering an event the modifies the tag => refocus => the event is triggered again
                    var temp = toFocus.onfocus;
                    toFocus.onfocus = null;

                    // IE needs setTimeout (it seems not to call onfocus sync. when focus() is called
                    window.setTimeout(function () {
                        safeFocus();
                        toFocus.onfocus = temp;
                    }, 0);
                }
            } else {
                WF.lastFocusId = "";
                Wicket.Log.info("Couldn't set focus on element with id '" + WF.lastFocusId + "' because it is not in the page anymore");
            }
        } else if (WF.refocusLastFocusedComponentAfterResponse) {
            Wicket.Log.info("last focus id was not set");
        } else {
            Wicket.Log.info("refocus last focused component not needed/allowed");
        }
        Focus.refocusLastFocusedComponentAfterResponse = false;
    }
}