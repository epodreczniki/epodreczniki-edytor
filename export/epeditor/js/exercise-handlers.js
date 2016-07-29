function beforeInsertAnswer(evt) {
    if (evt.target === null) return;
    if (evt.childNode.getLocalName() == "answer") {
        if (evt.target.getLocalName() == "item") {
            var type = evt.target.getParentNode().selectSingleNode("./*[local-name()='config']/*[local-name()='behaviour']").getTextContent();
            if (type == "randomize-sets" || type == "all-sets") {
                throw new Editor.RevertingException();
            }
        }
    }
}

function insertAnswer(evt) {
    if (evt.target === null) return;
    if (evt.childNode.getLocalName() == "answer") {
        var answer = evt.childNode;
        if (answer.selectSingleNode("./*[local-name()='hint']") == null) {
            var type = answer.selectSingleNode("./ancestor::*[local-name()='item']").getAttribute("type");
            if (type == "single-response") {
                var doc = Editor.getActiveDocument();
                var hint = doc.createElementNS(QML_XML_URI, "hint");
                answer.appendChild(hint);
                answer.makeValid();
            }
        }
    }
}

function updateAnswer(evt) {
    if (evt.target === null) return;
    var answer = null;
    if (evt.target.getLocalName() == "correct") answer = evt.target.getOwnerElement(); else {
        if (evt.target.getLocalName() == "answer") answer = evt.target; else return;
    }
    if (!!answer && answer.getNodeType() == 1 && answer.getAttributeNS(EPE_XML_URI, "correct") == "true") {
        var hint = answer.selectSingleNode("./*[local-name()='hint']");
        if (hint != null) answer.removeChild(hint);
    }
}

function insertAnswerSet(evt) {
    if (evt.target === null) return;
    if (evt.target.getLocalName() == "item" && evt.childNode.getLocalName() == "set") {
        var type = evt.target.getParentNode().selectSingleNode("./*[local-name()='config']/*[local-name()='behaviour']").getTextContent();
        if (type == "randomize") {
            throw new Editor.RevertingException();
        } else {
            var existingAns = evt.target.selectNodes(".//*[local-name()='set']");
            if (existingAns.getLength() != 1) {
                var sizeNode = evt.target.getParentNode().selectSingleNode("./*[local-name()='config']/*[local-name()='presented-answers']");
                var size = parseInt(sizeNode.getTextContent());
                var doc = Editor.getActiveDocument();
                for (var i = 0; i < size; i++) {
                    var answer = doc.createElementNS(QML_XML_URI, "q:answer");
                    if (i == 0) answer.setAttributeNS(EPE_XML_URI, "epe:correct", "true");
                    evt.childNode.appendChild(answer);
                }
            }
        }
    }
}

insertAnswerSet = Editor.wrapInTransaction(insertAnswerSet);

function blockImproperQuizElement(evt) {
    if (evt.target === null) return;
    var improperNodes = [ "problem", "solution", "commentary", "note" ];
    if (evt.target.getLocalName() == "alternative") {
        var item = evt.target.selectSingleNode("./*[local-name()='item']");
        if (!!item && improperNodes.contains(evt.childNode.getLocalName()) && evt.childNode.getNamespaceURI() == CNX_XML_URI) throw new Editor.RevertingException();
    }
}