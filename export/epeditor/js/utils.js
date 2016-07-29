var XOPUS_ID_PREFIX = "_";

var INSERT_REVIEW = false;

var INSERT_BOOKMARK = 0;

var EP_XML_URI = "http://epodreczniki.pl/";

var CNX_XML_URI = "http://cnx.rice.edu/cnxml";

var EPE_XML_URI = "http://epodreczniki.pl/editor";

var MD_XML_URI = "http://cnx.rice.edu/mdml";

var MML_XML_URI = "http://www.w3.org/1998/Math/MathML";

var QML_XML_URI = "http://cnx.rice.edu/qml/1.0";

var BIB_XML_URI = "http://bibtexml.sf.net/";

var REVIEWER_ROLE = "reviewer";

var AUTHOR_ROLE = "author";

var EDITOR_ROLE = "editor";

var PUBLISHER_ROLE = "publisher";

var ADMIN_ROLE = "admin";

if (!Array.prototype.contains) {
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.containsAny) {
    Array.prototype.containsAny = function(arr) {
        var i = this.length;
        while (i--) {
            var j = arr.length;
            while (j--) {
                if (this[i] === arr[j]) {
                    return true;
                }
            }
        }
        return false;
    };
}

if (!String.prototype.contains) {
    String.prototype.contains = function(s, i) {
        return this.indexOf(s, i) != -1;
    };
}

function moduleId(node) {
    if (node == null) return null;
    return node.getOwnerDocument().getDocumentElement().getAttribute("id");
}

function hasIdValidPrefix(node, id) {
    if (node == null) return null;
    id = typeof id !== "undefined" ? id : node.selectSingleNode("./@*[local-name()='id']").getTextContent();
    return id.indexOf(moduleId(node)) == 0;
}

function idExists(node, id) {
    if (node == null || id == null) return null;
    return node.selectSingleNode("//@*[local-name()='id' and .='" + id + "']") != null;
}

var dialogNode = null;

var dialogEditor = null;

var exerciseTmp = {};

function openDialog(element, node, htmlFile, title) {
    dialogNode = node;
    dialogEditor = Editor;
    dialogWindow = Editor.getModalDialog();
    dialogWindow.resizeTo(560, 400);
    dialogWindow.open(htmlFile, title, function() {
        dialogNode = null;
    }, true);
    return true;
}

function openDialogCheckConditions(element, node, htmlFile, title) {
    var canOpen = true;
    canOpen = canOpen && !hasAncestorInArray(node, [ "bookmark", "file" ]);
    canOpen = canOpen && !hasAncestorGlossary(node);
    if (canOpen) openDialog(element, node, htmlFile, title);
}

function getCurrentView(value) {
    return Editor.getActiveCanvas().getActiveView();
}

function getChildOrCreate(node, name) {
    if (node === null) return node;
    var r = node.selectSingleNode("./*[local-name() = '" + name + "']");
    if (r !== null) return r;
    if (!node.canAppendChild()) return null;
    var child = node.getOwnerDocument().createElementNS(EP_XML_URI, name);
    r = node.appendChild(child);
    if (r === null) return null;
    return r;
}

function setChildOrCreate(node, name, value) {
    var tmp = getChildOrCreate(node, name);
    if (tmp === null) return null;
    tmp.setTextContent(value);
    return tmp;
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

var blockCoreAbility = true;

function onImgLoad(element) {
    $(element).removeClass("downloading-content");
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function isDecimal(s) {
    return s.trim().length > 0 && !isNaN(s);
}

function setCursorFocusOn(element) {
    var doc = Editor.getActiveDocument();
    var range = doc.createRange();
    range.setStart(element, 0);
    range.setEnd(element, 0);
    Editor.Selection.setRange(range);
}

function stopEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
}