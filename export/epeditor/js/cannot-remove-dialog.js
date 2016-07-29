$(document).ready(function() {
    var node = getWindow().dialogNode;
    $("#element-name").text(node.getLocalName());
});