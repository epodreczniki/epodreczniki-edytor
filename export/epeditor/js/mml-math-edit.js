$(document).ready(function() {
    parent.Editor.getModalDialog().resizeTo(666, 500);
    var node = getWindow().dialogNode;
    var form = $("#mml-math-form");
    form.find(".input-container textarea").val(getXml(node));
    updateOutput();
    form.find(".functional_buttons .save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons .cancel").on("click", function(evt) {
        var dialog = parent.Editor.getModalDialog();
        var dialogNode = node;
        if (isMathEmpty(dialogNode)) {
            var parentNode = dialogNode.getParentNode();
            if (parentNode.getLocalName() == "equation") {
                dialogNode = parentNode;
                parentNode = parentNode.getParentNode();
            }
            parentNode.removeChild(dialogNode);
        }
        getWindow().dialogNode = null;
        dialog.close();
        return false;
    });
    form.find(".functional_buttons .preview").on("click", updateOutput);
    form.find(".functional_buttons .format").on("click", formatTextarea);
    formValidator();
    $(window).unbind("keydown", saveOnEnter);
});

function isMathEmpty(node) {
    return node !== null && node.getChildNodes().getLength() == 0;
}

function getXml(node) {
    var xml = node.getXML().replace(/xmlns\:mml\=\"http:\/\/www\.w3\.org\/1998\/Math\/MathML\"/, 'xmlns="http://www.w3.org/1998/Math/MathML"').replace(/\<mml:/g, "<").replace(/\<\/mml:/g, "</");
    return vkbeautify.xml(xml);
}

function formatTextarea() {
    if (formValidator()) {
        var form = $("#mml-math-form");
        var xml = form.find(".input-container textarea").val();
        xml = vkbeautify.xml(xml);
        form.find(".input-container textarea").val(xml);
    }
    return false;
}

function updateOutput() {
    if (formValidator()) {
        var form = $("#mml-math-form");
        var xml = form.find(".input-container textarea").val();
        form.find(".output-container").html(xml);
    }
    return false;
}

function saveAndCloseDialog() {
    if (formValidator()) {
        var value = $("#mml-math-form .input-container textarea").val();
        value = vkbeautify.xmlmin(value);
        setXMLNode(value);
        closeDialog();
    }
    return false;
}

function formValidator() {
    var form = $("#mml-math-form");
    var node = getWindow().dialogNode;
    var xmlString = vkbeautify.xmlmin(form.find(".input-container textarea").val());
    var valid = isWellFormed(xmlString) && tryToAdd(xmlString);
    if (valid) {
        form.addClass("valid_input");
        form.removeClass("invalid_input");
        form.find(".error-info").css("visibility", "hidden");
    } else {
        form.removeClass("valid_input");
        form.addClass("invalid_input");
        form.find(".error-info").css("visibility", "visible");
    }
    return valid;
}

function isWellFormed(xml) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    return xmlDoc.getElementsByTagName("parsererror").length <= 0;
}

function setXMLNode(value) {
    var node = getWindow().dialogNode;
    var xmlMath = parent.Editor.XML.createNativeXMLDocument(value).firstChild;
    removeChilds(node);
    createXopusElemnt(node, xmlMath);
}

setXMLNode = parent.Editor.wrapInTransaction(setXMLNode);

function isValid(node) {
    if (node.getNodeType() != 1) return true;
    if (!node.isValid()) return false;
    for (var i = 0; i < node.getChildNodes().getLength(); i++) {
        if (!isValid(node.getChildNodes().item(i))) return false;
    }
    return true;
}

function tryToAdd(value) {
    var node = getWindow().dialogNode;
    var xmlMath = parent.Editor.XML.createNativeXMLDocument(value).firstChild;
    var result = false;
    try {
        parent.Editor.runInTransaction(function() {
            removeChilds(node);
            createXopusElemnt(node, xmlMath);
            if (isValid(node)) result = true;
            throw new parent.Editor.RevertingException();
        });
    } catch (e) {
        return result;
    }
    return result;
}

function createXopusElemnt(xopusNode, xml) {
    var doc = parent.Editor.getActiveDocument();
    for (var i = 0; i < xml.childNodes.length; i++) {
        var child = xml.childNodes.item(i);
        var imported = doc.importNode(child, true);
        xopusNode.appendChild(imported);
    }
}

function removeChilds(node) {
    var childs = node.getChildNodes();
    for (var i = 0; i < childs.getLength(); i++) {
        var child = childs.item(i);
        node.removeChild(child);
    }
}