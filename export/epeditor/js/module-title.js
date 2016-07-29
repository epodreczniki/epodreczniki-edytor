function updateModuleTitle(evt) {
    var node = evt.target.getParentNode();
    if (node === null) return;
    var nodeToUpdate = null;
    if (isNodeModulesTitle(node)) {
        nodeToUpdate = node.selectSingleNode("/*[local-name()='document']/*[local-name()='metadata']/*[local-name()='title']");
    } else if (isNodeMetadataTitle(node)) {
        nodeToUpdate = node.selectSingleNode("/*[local-name()='document']/*[local-name()='title']");
    }
    if (nodeToUpdate !== null) nodeToUpdate.setTextContent(node.getTextContent());
}

function isNodeModulesTitle(node) {
    return node.getLocalName() == "title" && node.getParentNode() !== null && node.getParentNode().getLocalName() == "document";
}

function isNodeMetadataTitle(node) {
    return node.getLocalName() == "title" && node.getParentNode() !== null && node.getParentNode().getLocalName() == "metadata";
}