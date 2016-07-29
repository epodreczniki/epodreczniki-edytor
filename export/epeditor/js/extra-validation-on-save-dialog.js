$(document).ready(function() {
    var node = getWindow().dialogNode;
    var showPage = getShowPage(node);
    if (showPage !== null) goToCurrentPage(showPage);
});

function getFirstAncestorId(node) {
    var id = null, p = node;
    while (p !== null && p.nodeType != 9) {
        id = node.selectSingleNode("./@*[local-name()='id']");
        if (id !== null) return id.value;
        p = p.parentNode;
    }
}

function getShowPage(node) {
    var id = getFirstAncestorId(node);
    var section = node.selectSingleNode("/*[local-name()='document']/*[local-name()='content']/*[local-name()='section' and .//@*[local-name()='id' and .='" + id + "']]");
    if (section.selectSingleNode("./*[local-name()='parameters']/*[local-name()='start-new-page' and .='true']") === null) section = section.selectSingleNode("preceding-sibling::*[local-name()='section' and ./*[local-name()='parameters']/*[local-name()='start-new-page' and .='true'] ]");
    return section.selectSingleNode("./@*[local-name()='id']").value;
}

function goToCurrentPage(showPage) {
    parent.Editor.getActiveCanvas().setViewParam("showPage", showPage + "_page");
}