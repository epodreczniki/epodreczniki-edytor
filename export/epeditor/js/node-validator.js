function validateNode(evt) {
    var target = evt.target;
    switch (target.getLocalName()) {
      case "section":
        var hasChilds = target.selectSingleNode("./*[local-name() = 'para']") != null && target.selectSingleNode("./*[local-name() = 'title']") != null;
    }
}