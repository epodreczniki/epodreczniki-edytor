function mathmlOpenDialog(evt) {
    var node = evt.childNode;
    if (node.getLocalName() == "math") openMathMLDialog(null, node);
}

function openMathMLDialog(element, node) {
    if (hasAncestorInArray(node, [ "core-curriculum-entry" ])) return true;
    dialogNode = node;
    dialogEditor = Editor;
    dialogWindow = Editor.getModalDialog();
    dialogWindow.resizeTo(666, 500);
    dialogWindow.open("html-extra/mml-math-edit.html", "Wyrażenie matematyczne", function() {
        if (isMathEmpty(dialogNode)) {
            var parent = dialogNode.getParentNode();
            if (parent.getLocalName() == "equation") {
                dialogNode = parent;
                parent = parent.getParentNode();
            }
            parent.removeChild(dialogNode);
        }
        dialogNode = null;
    }, true);
    return true;
}

function isMathEmpty(node) {
    return node !== null && node.getChildNodes().getLength() == 0;
}