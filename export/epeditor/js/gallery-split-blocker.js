function insertIntoGallery(evt) {
    var prohibited = [ "link", "code", "term", "foreign", "sup", "sub", "emphasis", "quote" ];
    if (evt.childNode.getNodeName() == "ep:gallery") {
        if (prohibited.contains(evt.target.getNodeName())) {
            throw new Editor.RevertingException();
        }
    } else {
        if (evt.childNode.getNodeName() == "ep:bookmark" && evt.target.getNodeName() == "ep:gallery") {
            throw new Editor.RevertingException();
        }
    }
}