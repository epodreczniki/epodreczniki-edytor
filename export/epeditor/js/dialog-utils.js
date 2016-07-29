function getDocument() {
    var canvas = parent.Editor.getActiveCanvas();
    return canvas.getCanvasElement().ownerDocument;
}

function getWindow() {
    var doc = getDocument();
    var win = doc.parentWindow || doc.defaultView;
    if (win.dialogEditor && win.dialogNode) return win;
    return parent;
}

function getAttrOrCreate(node, name) {
    if (node === null) return node;
    var r = node.selectSingleNode("./*@[local-name() = '" + name + "']");
    if (r !== null) return r;
    var child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, name);
    r = node.setAttributeNode(child);
    if (r === null) return null;
    return r;
}

function setAttrOrCreate(node, name, value) {
    var tmp = getAttrOrCreate(node, name);
    if (tmp === null) return null;
    tmp.setTextContent(value);
    return tmp;
}

function closeDialog(evt) {
    if (evt !== undefined) {
        evt.preventDefault();
    }
    getWindow().dialogEditor.getModalDialog().close();
}

function saveOnEnter(evt) {
    switch (evt.which) {
      case 13:
        $(".functional_buttons .save").click();
        return false;
    }
    return true;
}

function closeOnEsc(evt) {
    switch (evt.which) {
      case 27:
        closeDialog();
        return false;
    }
    return true;
}

$(document).ready(function() {
    $(window).keydown(saveOnEnter);
    $(window).keydown(closeOnEsc);
    $("input, textarea, button").first().focus();
});

$(window).bind("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key != "ś" && event.key != "Ś") {
        switch (String.fromCharCode(event.which).toLowerCase()) {
          case "s":
            event.preventDefault();
            break;
        }
    }
});