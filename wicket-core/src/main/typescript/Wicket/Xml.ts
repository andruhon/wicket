import {Log} from "./Log";

export function parse (text) {
    var xmlDocument;
    if ((window as any).DOMParser) {
        var parser = new DOMParser();
        xmlDocument = parser.parseFromString(text, "text/xml");
    } else if ((window as any).ActiveXObject) {
        try {
            xmlDocument = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch (err6) {
            try {
                xmlDocument = new ActiveXObject("Msxml2.DOMDocument.5.0");
            } catch (err5) {
                try {
                    xmlDocument = new ActiveXObject("Msxml2.DOMDocument.4.0");
                } catch (err4) {
                    try {
                        xmlDocument = new ActiveXObject("MSXML2.DOMDocument.3.0");
                    } catch (err3) {
                        try {
                            xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
                        } catch (err2) {
                            Log.error("Cannot create DOM document: " + err2);
                        }
                    }
                }
            }
        }

        if (xmlDocument) {
            xmlDocument.async = "false";
            if (!xmlDocument.loadXML(text)) {
                Log.error("Error parsing response: "+text);
            }
        }
    }

    return xmlDocument;
}