$(window).bind("keydown", function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
          case "s":
            event.preventDefault();
            break;

          case "b":
            Editor.runInTransaction(insertBoldEmphasis);
            event.preventDefault();
            event.stopPropagation();
            break;
        }
    }
    if (event.altKey && !event.ctrlKey && !event.shiftKey && String.fromCharCode(event.which).toLowerCase() == "r") {
        insertReviewExecute(null);
        event.preventDefault();
    }
    if (!event.altKey && !event.ctrlKey && event.shiftKey && String.fromCharCode(event.which).toLowerCase() == " ") {
        var range = Editor.Selection.getRange();
        var currentNode = range.getStartContainer();
        if (currentNode.getNodeType() == 3) Editor.runInTransaction(function() {
            var newNbspNode = Editor.getActiveDocument().createElementNS(EP_XML_URI, "nbsp");
            var splitedText = currentNode.splitText(range.getStartOffset());
            splitedText.getParentNode().insertBefore(newNbspNode, splitedText);
        });
        event.preventDefault();
        event.stopPropagation();
    }
    if (!event.altKey && event.ctrlKey && !event.shiftKey && String.fromCharCode(event.which).toLowerCase() == " ") {
        var range = Editor.Selection.getRange();
        var currentNode = range.getStartContainer();
        if (currentNode.getNodeType() == 3) Editor.runInTransaction(function() {
            var newNbspNode = Editor.getActiveDocument().createElementNS(EP_XML_URI, "tab");
            var splitedText = currentNode.splitText(range.getStartOffset());
            splitedText.getParentNode().insertBefore(newNbspNode, splitedText);
        });
        event.preventDefault();
        event.stopPropagation();
    }
});

function insertBoldEmphasis() {
    var range = Editor.Selection.getRange();
    if (range.getStartContainer().getParentNode() != range.getEndContainer().getParentNode()) return;
    var emphasis = Editor.getActiveDocument().createElementNS(CNX_XML_URI, "emphasis");
    emphasis.setAttribute("effect", "bold");
    var cloned = range.cloneContents().getChildNodes();
    var startNode = range.getStartContainer();
    var offset = range.getStartOffset();
    range.deleteContents();
    var ref = startNode.getNodeType() == 3 ? startNode.splitText(offset) : startNode;
    var INLINE_ELEMENTS = [ "emphasis", "sub", "sup" ];
    for (var i = 0; i < cloned.getLength(); i++) {
        var it = cloned.item(i);
        if (INLINE_ELEMENTS.contains(it.getLocalName())) {
            var childs = it.getChildNodes();
            for (var j = 0; j < childs.getLength(); j++) emphasis.appendChild(childs.item(j));
        } else {
            emphasis.appendChild(it);
        }
    }
    ref.getParentNode().insertBefore(emphasis, ref);
    range.setStartBefore(emphasis);
    range.setEndAfter(emphasis);
    Editor.Selection.setRange(range);
}