function preventSubtreeChangingAfterModified(evt) {
    var views = [ "XML View" ];
    if (evt.duringUndoOrRedo || views.indexOf(getCurrentView()) < 0) return;
    var nodes = [ "birth", "death" ];
    var attributes = [];
    var p = evt.target;
    if (p.getNodeType() == 2) {
        if (attributes.indexOf(p.getLocalName()) >= 0) {
            throw new Editor.RevertingException();
        }
    }
    while (p !== null && p.getNodeType() != 9) {
        if (p.getNodeType() < 3 && nodes.indexOf(p.getLocalName()) >= 0) {
            throw new Editor.RevertingException();
        }
        p = getParent(p);
    }
}

function preventSubtreeChangingBeforeModified(evt) {
    if (evt.duringUndoOrRedo) return;
    var ancestorComment = evt.target.selectSingleNode("./ancestor-or-self::*[local-name()='comment']");
    if (!hasContentEditableRole()) {
        if (INSERT_REVIEW == false && ancestorComment == null && (loadingWomiMetadata == 0 || evt.target.getLocalName() != "reference" && evt.target.getLocalName() != "instance-id")) {
            throw new Editor.RevertingException();
        }
    }
    if (ancestorComment != null) {
        var previousComment = ancestorComment.selectSingleNode("./preceding-sibling::*[local-name()='comment']");
        var lastComment = ancestorComment.selectSingleNode("./following-sibling::*[local-name()='comment'][last()]");
        if (previousComment == null) {
            if (lastComment == null) lastComment = ancestorComment;
            if (lastComment.hasAttributeNS(EPE_XML_URI, "comment-state")) {
                if ((!getUserRoles().contains(REVIEWER_ROLE) || lastComment.getAttributeNS(EPE_XML_URI, "comment-state") != "opened") && loadingWomiMetadata == 0) {
                    throw new Editor.RevertingException();
                }
            }
        } else {
            if (lastComment == null) {
                if (ancestorComment.getAttributeNS(EPE_XML_URI, "comment-author") != getUserName() && !isValidating) {
                    throw new Editor.RevertingException();
                }
            } else {
                throw new Editor.RevertingException();
            }
        }
    }
}

function getParent(node) {
    if (node === null) return null;
    if (node.getNodeType() == 2) return node.getOwnerElement();
    return node.getParentNode();
}

function hasDescendantGlossary(node) {
    if (node.getNodeType() != 1) return null;
    if (node.hasAttributeNS(EP_XML_URI, "glossary") && node.getAttributeNS(EP_XML_URI, "glossary") == "true") return node;
    var childs = node.getChildNodes();
    for (var i = 0; i < childs.getLength(); i++) {
        var r = hasDescendantGlossary(childs.item(i));
        if (r !== null) return r;
    }
    return null;
}

function hasAncestorGlossary(target) {
    var p = target;
    if (p.getNodeType() == 2) p = getParent(p);
    while (p !== null && p.getNodeType() != 9) {
        if (p.getNodeType() == 1 && (p.hasAttributeNS(EP_XML_URI, "glossary") && p.getAttributeNS(EP_XML_URI, "glossary") == "true")) return p;
        p = getParent(p);
    }
    return null;
}

function hasAncestorInArray(target, arr) {
    var p = target;
    if (p.getNodeType() == 2) p = getParent(p);
    while (p !== null && p.getNodeType() != 9) {
        if (p.getNodeType() == 1 && arr.indexOf(p.getLocalName()) >= 0) return p;
        p = getParent(p);
    }
    return null;
}

function hasDescendantInArray(node, arr) {
    if (node.getNodeType() != 1) return null;
    if (arr.indexOf(node.getLocalName()) >= 0) return node;
    var childs = node.getChildNodes();
    for (var i = 0; i < childs.getLength(); i++) {
        var r = hasDescendantInArray(childs.item(i), arr);
        if (r !== null) return r;
    }
    return null;
}

function preventIfAncestorGlossary(target) {
    var node = hasAncestorGlossary(target);
    if (node === target && loadingWomiMetadata == 0) {
        openDialog(null, target, "html-extra/cannot-remove.html", "Uwaga");
        throw new Editor.RevertingException();
    } else if (node !== null && loadingWomiMetadata == 0) {
        openDialog(null, node, "html-extra/cannot-remove-ancestor.html", "Uwaga");
        throw new Editor.RevertingException();
    }
}

function preventIfDescendantGlossary(target) {
    var node = hasDescendantGlossary(target);
    if (node === target) {
        openDialog(null, target, "html-extra/cannot-remove.html", "Uwaga");
        throw new Editor.RevertingException();
    } else if (node !== null) {
        openDialog(null, target, "html-extra/cannot-remove-descendant.html", "Uwaga");
        throw new Editor.RevertingException();
    }
}

function preventIfDescendantInArray(target, array) {
    var node = hasDescendantInArray(target, array);
    if (node === target) {
        openDialog(null, target, "html-extra/cannot-remove.html", "Uwaga");
        throw new Editor.RevertingException();
    } else if (node !== null) {
        openDialog(null, target, "html-extra/cannot-remove-descendant.html", "Uwaga");
        throw new Editor.RevertingException();
    }
}

function preventIfAncestorInArray(target, array) {
    var node = hasAncestorInArray(target, array);
    if (node === target && loadingWomiMetadata == 0) {
        openDialog(null, node, "html-extra/cannot-remove.html", "Uwaga");
        throw new Editor.RevertingException();
    } else if (node !== null && loadingWomiMetadata == 0) {
        openDialog(null, node, "html-extra/cannot-remove-ancestor.html", "Uwaga");
        throw new Editor.RevertingException();
    }
}