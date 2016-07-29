function focusOnManualOrganization(evt) {
    if (evt.target.getNamespaceURI() != BIB_XML_URI || evt.target.getLocalName() != "manual" || evt.childNode.getLocalName() != "organization") return;
    setTimeout(function() {
        setCursorFocusOn(evt.childNode);
    }, 10);
}

function insertAtrticleNumber(evt) {
    if (evt.target.getNamespaceURI() != BIB_XML_URI || evt.target.getLocalName() != "entry" || evt.childNode.getLocalName() != "article") return;
    var doc = Editor.getActiveDocument();
    var numberNode = doc.createElementNS(BIB_XML_URI, "number");
    evt.childNode.appendChild(numberNode);
}