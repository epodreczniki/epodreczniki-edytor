function bookmarkOpenDialog(evt) {
    var node = evt.childNode;
    if (node.getLocalName() != "link") return;
    dialogNode = node;
    dialogEditor = Editor;
    dialogWindow = Editor.getModalDialog();
    dialogWindow.open("html-extra/bookmark-dialog.html", "Atrybuty łącza", function() {
        if (dialogNode.getAttributes().getLength() == 0) {
            var parentNode = dialogNode.getParentNode();
            while (dialogNode.getFirstChild()) {
                parentNode.insertBefore(dialogNode.getFirstChild(), dialogNode);
            }
            parentNode.removeChild(dialogNode);
        }
        dialogNode = null;
        return false;
    }, true);
    return true;
}