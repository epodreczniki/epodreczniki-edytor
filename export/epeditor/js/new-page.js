function prependParametersIfNotExists(node) {
    var parameters = node.selectSingleNode("./*[local-name()='parameters']");
    if (parameters === null) {
        parameters = node.getOwnerDocument().createElementNS(EP_XML_URI, "parameters");
        parameters = node.prependChild(parameters);
        node.makeValid();
    }
}

prependParametersIfNotExists = Editor.wrapInTransaction(prependParametersIfNotExists);

function setNewPage(element, node) {
    prependParametersIfNotExists(node);
    var parameters = node.selectSingleNode("./*[local-name()='parameters']");
    var startNewPage = parameters.selectSingleNode("./*[local-name()='start-new-page']");
    var columns = parameters.selectSingleNode("./*[local-name()='columns']");
    if (startNewPage === null) {
        startNewPage = node.getOwnerDocument().createElementNS(EP_XML_URI, "start-new-page");
        startNewPage = parameters.insertAfter(startNewPage, columns);
        startNewPage.setTextContent("true");
    } else {
        var value = startNewPage.getTextContent() == "true" ? "false" : "true";
        startNewPage.setTextContent(value);
    }
}

setNewPage = Editor.wrapInTransaction(setNewPage);