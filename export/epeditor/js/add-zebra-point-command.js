Editor.getScope().declare("addZebraPoint", false);

var addZebraPointCommand = {
    execute: function(scope) {
        var range = Editor.Selection.getRange();
        var document = Editor.getActiveDocument();
        var startContainer = range.getStartContainer();
        var zebraPoint = document.createElementNS(EP_XML_URI, "ep:zebra-point");
        zebraPoint.setAttributeNS(EP_XML_URI, "ep:id", "");
        addId(zebraPoint);
        if (startContainer.getLocalName() == "section") {
            range.insertNode(zebraPoint);
            return true;
        }
        var testNode = startContainer.selectSingleNode("./ancestor::*[parent::*[local-name()='section' and parent::*[local-name()='content']]]");
        if (testNode != null && testNode.getLocalName() == "title") {
            testNode.getParentNode().getParentNode().insertBefore(zebraPoint, testNode.getParentNode());
            return true;
        }
        if (testNode != null) {
            testNode.getParentNode().insertBefore(zebraPoint, testNode);
            return true;
        }
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        if (!canvas) return false;
        var xmlSelect = scope.get("xmlSelection");
        var range = xmlSelect.getRange();
        if (range != null && range.getStartContainer().getLocalName() != "content") {
            return true;
        }
        return false;
    },
    getChecked: function(scope) {
        return scope.get("addZebraPoint");
    },
    getLabel: function(scope) {
        return "Wstaw punkt zebry";
    }
};

Editor.addCommand("addZebraPointCommand", addZebraPointCommand);

function moveZebra(evt) {
    if (evt.target === null) return;
    if (evt.nextSibling != null && evt.childNode.getLocalName() == "zebra-point" && (evt.nextSibling.getPreviousSibling() == null || evt.nextSibling.getPreviousSibling().getLocalName() == "title" || evt.nextSibling.getPreviousSibling().getLocalName() == "parameters" || evt.nextSibling.getPreviousSibling().getLocalName() == "bookmark")) {
        var zebraPoint = Editor.getActiveDocument().createElementNS(EP_XML_URI, "ep:zebra-point");
        zebraPoint.setAttributeNS(EP_XML_URI, "ep:id", "");
        addId(zebraPoint);
        evt.target.getParentNode().insertBefore(zebraPoint, evt.target);
        evt.cancelEvent = true;
    }
}