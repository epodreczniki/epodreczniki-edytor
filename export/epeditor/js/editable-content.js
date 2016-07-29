function toggleEditableContent(element) {
    $(element).closest(".contents-container").find(".editable-contents-container").toggleClass("hidden");
    return false;
}

function addWomiContent(element, node) {
    if ($(element).closest(".contents-container").length == 0) {
        var womiContainer = $(element).closest(".womi-container");
        setTimeout(function() {
            var tmp = womiContainer.siblings(".contents-container").find(".editable-contents-container");
            if (tmp.length == 0) tmp = womiContainer.find(".contents-container").find(".editable-contents-container");
            tmp.removeClass("hidden");
        }, 100);
    } else {
        $(element).closest(".contents-container").find(".editable-contents-container").removeClass("hidden");
    }
    var content = node.getOwnerDocument().createElementNS(EP_XML_URI, "content");
    var epeNode = node.selectSingleNode("./*[namespace-uri()='" + EPE_XML_URI + "']");
    if (epeNode) node.insertBefore(content, epeNode); else node.appendChild(content);
    node.makeValid();
    return false;
}

function rmWomiContent(element, node) {
    var reference = node.getParentNode();
    reference.removeChild(node);
    return false;
}