function generateNextId(node) {
    var id = XOPUS_ID_PREFIX + Date.now() + "_";
    if (!hasIdValidPrefix(node, id)) {
        id = moduleId(node) + id;
    }
    var tmp = 0;
    while (idExists(node, id + tmp)) tmp++;
    return id + tmp;
}

function addId(target) {
    if (target === null || target.getNodeType() != 1 || target.getLocalName() == "reference" || target.getLocalName().contains("-reference") || target.getLocalName() == "gallery" || target.getNamespaceURI() == MML_XML_URI) return;
    var id = generateNextId(target);
    [ CNX_XML_URI, EP_XML_URI, EPE_XML_URI ].forEach(function(ns) {
        if (target.getAllowedAttributes().containsNS(ns, "id") || target.hasAttributeNS(ns, "id") && target.getAttributeNS(ns, "id").length == 0) {
            target.setAttributeNS(ns, "id", id);
        }
    });
    if (target.getAllowedAttributes().contains("id") || target.hasAttribute("id") && target.getAttribute("id").length == 0) {
        target.setAttribute("id", id);
    }
}

function addInstanceId(target) {
    if (target === null || target.getNodeType() != 1) return;
    var id = generateNextId(target);
    [ CNX_XML_URI, EP_XML_URI, EPE_XML_URI ].forEach(function(ns) {
        if (target.getAllowedAttributes().containsNS(ns, "instance-id") || target.hasAttributeNS(ns, "instance-id")) {
            target.setAttributeNS(ns, "instance-id", id);
        }
    });
    if (target.getAllowedAttributes().contains("instance-id") || target.hasAttribute("instance-id")) {
        target.setAttribute("instance-id", id);
    }
}

function pasteSetIdsContentSeparator(evt) {
    for (var i = 0, ll = evt.contents.length; i < ll; i++) {
        var content = evt.contents[i];
        if (!!content) setIdsRec(content);
    }
}

function setIdsRec(target) {
    if (target === null || target.getNodeType() != 1 || target.getNamespaceURI() == MML_XML_URI) return;
    regenerateId(target);
    var children = target.getChildNodes();
    for (var i = 0; i < children.getLength(); i++) {
        setIdsRec(children.item(i));
    }
}

function regenerateId(target) {
    if (target === null || target.getNodeType() != 1 || target.getNamespaceURI() == MML_XML_URI) return;
    var id = generateNextId(target);
    if (/^(|.*\-)reference$/.test(target.getLocalName())) {
        [ CNX_XML_URI, EP_XML_URI, EPE_XML_URI ].forEach(function(ns) {
            if (target.getAllowedAttributes().containsNS(ns, "instance-id") || target.hasAttributeNS(ns, "instance-id")) {
                target.setAttributeNS(ns, "instance-id", id);
            }
        });
        if (target.getAllowedAttributes().contains("instance-id") || target.hasAttribute("instance-id")) {
            target.setAttribute("instance-id", id);
        }
    } else {
        [ CNX_XML_URI, EP_XML_URI, EPE_XML_URI ].forEach(function(ns) {
            if (target.getAllowedAttributes().containsNS(ns, "id") || target.hasAttributeNS(ns, "id")) {
                target.setAttributeNS(ns, "id", id);
            }
        });
        if (target.getAllowedAttributes().contains("id") || target.hasAttribute("id")) {
            target.setAttribute("id", id);
        }
    }
}

function updateListId(evt) {
    if (evt.target.getLocalName() == "list") {
        addId(evt.target);
    }
}