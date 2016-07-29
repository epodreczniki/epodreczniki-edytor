function insertBookmark(evt) {
    if (evt.childNode.getLocalName() == "bookmark") {
        if (INSERT_BOOKMARK == 0) {
            INSERT_BOOKMARK = 1;
            throw new Editor.RevertingException();
        } else {
            INSERT_BOOKMARK = 0;
        }
    }
}

function bookmarkInsertionStopped(evt) {
    if (INSERT_BOOKMARK == 1 && Editor.Selection.getRange() != null) {
        INSERT_BOOKMARK = 2;
        var range = Editor.Selection.getRange();
        range.setEnd(range.getStartContainer(), range.getStartOffset());
        Editor.Selection.setRange(range);
        var document = Editor.getActiveDocument();
        var bookmark = document.createElementNS(EP_XML_URI, "ep:bookmark");
        range.insertNode(bookmark);
        addId(bookmark);
    }
}