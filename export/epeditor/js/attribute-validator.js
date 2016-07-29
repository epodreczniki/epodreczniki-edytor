function validateAttribute(evt) {
    var target = evt.target;
    switch (evt.attrNode.getLocalName()) {
      case "id":
        if (hasIdValidPrefix(target) || evt.target.getLocalName() == "reference" || evt.target.getLocalName().contains("-reference")) {
            break;
        }
        Editor.getModalDialog().open("html-extra/validation-dialog-example.html", "Uwaga!", null, true);
        throw new Editor.RevertingException();
        break;
    }
}