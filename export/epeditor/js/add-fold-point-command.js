Editor.getScope().declare("addFoldPoint", false);

var addFoldPointCommand = {
    execute: function(scope) {
        var range = Editor.Selection.getRange();
        var document = Editor.getActiveDocument();
        var foldPoint = document.createElementNS(EP_XML_URI, "ep:fold-point");
        foldPoint.setAttributeNS(EP_XML_URI, "ep:id", "");
        addId(foldPoint);
        range.insertNode(foldPoint);
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        if (!canvas) return false;
        var xmlSelect = scope.get("xmlSelection");
        var range = xmlSelect.getRange();
        if (range != null) {
            if (range.getStartContainer() == range.getEndContainer() && range.getStartOffset() == range.getEndOffset()) {
                var curiosity = range.getStartContainer().selectSingleNode("./ancestor-or-self::*[local-name()='note'][@*[local-name()='type']='curiosity']");
                if (curiosity != null) {
                    if (curiosity.selectSingleNode(".//*[local-name()='fold-point']") == null) return true;
                }
            }
        }
        return false;
    },
    getChecked: function(scope) {
        return scope.get("addFoldPoint");
    },
    getLabel: function(scope) {
        return "Wstaw punkt zwijania ciekawostki";
    }
};

Editor.addCommand("addFoldPointCommand", addFoldPointCommand);