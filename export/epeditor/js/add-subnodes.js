function addSubnodes(evt) {
    var node = evt.childNode;
    var child = null;
    if (node === null) return;
    switch (node.getLocalName()) {
      case "tooltip":
      case "license":
        if (node.getNamespaceURI() == EP_XML_URI) {
            child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, "url");
            node.setAttributeNodeNS(child);
        }
        break;

      case "problem":
            child = node.getOwnerDocument().createElementNS(CNX_XML_URI, "para");
            child = node.appendChild(child);
            break;
        
      case "code":
        child = node.getOwnerDocument().createElementNS(CNX_XML_URI, "title");
        child = node.appendChild(child);
        break;

      case "procedure-instruction":
        child = node.getOwnerDocument().createElementNS(EP_XML_URI, "step");
        node.appendChild(child);
        break;

      case "experiment":
      case "observation":
        child = node.getOwnerDocument().createElementNS(CNX_XML_URI, "title");
        child = node.appendChild(child);
        [ "problem", "hypothesis", "instruments", "instructions", "conclusions" ].forEach(function(e) {
            var child = node.getOwnerDocument().createElementNS(EP_XML_URI, e);
            node.appendChild(child);
            addId(child);
        });
        break;
    }
}

addSubnodes = Editor.wrapInTransaction(addSubnodes);