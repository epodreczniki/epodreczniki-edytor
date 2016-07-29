Editor.getScope().declare("addBookmark", false);

var addBookmarkCommand = {
    execute: function(scope) {
        var range = Editor.Selection.getRange();
        var document = Editor.getActiveDocument();
        var bookmark = document.createElementNS(EP_XML_URI, "ep:bookmark");
        bookmark.setAttributeNS(EP_XML_URI, "ep:id", "");
        bookmark.setAttributeNS(EP_XML_URI, "ep:name", "");
        addId(bookmark);
        range.insertNode(bookmark);
        var s = Editor.getScope();
        s.set("showProperties", true);
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        if (!canvas) return false;
        var xmlSelect = scope.get("xmlSelection");
        var range = xmlSelect.getRange();
        if (range != null) {
            return range.getStartContainer() == range.getEndContainer() && range.getStartOffset() == range.getEndOffset();
        } else {
            return false;
        }
    },
    getChecked: function(scope) {
        return scope.get("addBookmark");
    },
    getLabel: function(scope) {
        return "Wstaw zakładkę";
    }
};

Editor.addCommand("addBookmarkCommand", addBookmarkCommand);