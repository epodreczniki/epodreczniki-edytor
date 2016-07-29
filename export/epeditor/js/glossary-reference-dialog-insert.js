function glossaryReferenceOpenDialog(evt) {
    var node = evt.childNode;
    if (node.getLocalName() == null || !node.getLocalName().contains("-reference") || node.getAttributeNS(EP_XML_URI, "id") != "") return;
    dialogNode = node;
    dialogEditor = Editor;
    dialogWindow = Editor.getModalDialog();
    dialogWindow.resizeTo(560, 400);
    dialogWindow.open("html-extra/glossary-reference-dialog.html", "Odwołanie", function(evt) {
        if (dialogNode.getAttributes().getLength() == 2) {
            var parentNode = dialogNode.getParentNode();
            while (dialogNode.getFirstChild()) {
                parentNode.insertBefore(dialogNode.getFirstChild(), dialogNode);
            }
            parentNode.removeChild(dialogNode);
        }
        dialogNode = null;
        return false;
    }, true);
}