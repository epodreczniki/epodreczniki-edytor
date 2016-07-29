function toggleParameterFoldable(element, node) {
    prependParametersIfNotExists(node);
    var parameters = node.selectSingleNode("./*[local-name()='parameters']");
    var foldable = getChildOrCreate(parameters, "foldable");
    if (foldable.getTextContent() == "true") {
        foldable.setTextContent("false");
        $(element).removeClass("value-true");
    } else {
        foldable.setTextContent("true");
        $(element).addClass("value-true");
    }
    parameters.makeValid();
    return false;
}

toggleParameterFoldable = Editor.wrapInTransaction(toggleParameterFoldable);

function toggleParameterStretch(element, node) {
    prependParametersIfNotExists(node);
    var parameters = node.selectSingleNode("./*[local-name()='parameters']");
    var stretch = getChildOrCreate(parameters, "stretch");
    var columns = parameters.selectSingleNode("./*[local-name() = 'columns']");
    if (stretch.getTextContent() == "full-width") {
        stretch.setTextContent("extended-width");
        $(element).removeClass("full-width");
        $(element).addClass("extended-width");
    } else if (stretch.getTextContent() == "extended-width") {
        if (columns != null && columns != "" && parseInt(columns.getTextContent()) > 1) {
            stretch.setTextContent("extended-shifted-width");
            $(element).removeClass("extended-width-width");
            $(element).addClass("extended-shifted-width");
        } else {
            stretch.setTextContent("default-width");
            parameters.removeChild(stretch);
            $(element).removeClass("extended-shifted-width");
        }
    } else if (stretch.getTextContent() == "extended-shifted-width") {
        stretch.setTextContent("default-width");
        parameters.removeChild(stretch);
        $(element).removeClass("extended-shifted-width");
    } else if (stretch.getTextContent() == "default-width" || stretch.getTextContent() == "") {
        stretch.setTextContent("full-width");
        $(element).removeClass("default-width");
        $(element).addClass("full-width");
    }
    parameters.makeValid();
    return false;
}

toggleParameterStretch = Editor.wrapInTransaction(toggleParameterStretch);

function toggleParameterStretchTitle(element, node) {
    prependParametersIfNotExists(node);
    var parameters = node.selectSingleNode("./*[local-name()='parameters']");
    var stretch = getChildOrCreate(parameters, "stretch-title");
    if (stretch.getTextContent() == "full-width") {
        stretch.setTextContent("extended-width");
        $(element).removeClass("full-width");
        $(element).addClass("extended-width");
    } else if (stretch.getTextContent() == "extended-width") {
        stretch.setTextContent("default-width");
        parameters.removeChild(stretch);
        $(element).removeClass("extended-shifted-width");
    } else if (stretch.getTextContent() == "default-width" || stretch.getTextContent() == "") {
        stretch.setTextContent("full-width");
        $(element).removeClass("default-width");
        $(element).addClass("full-width");
    }
    parameters.makeValid();
    return false;
}

toggleParameterStretchTitle = Editor.wrapInTransaction(toggleParameterStretchTitle);

function blockSectionInsertIntoColumnSection(evt) {
    if (evt.target === null) return;
    var parentColumns = evt.target.selectSingleNode("*[local-name()='parameters']/*[local-name()='columns']");
    var childWidth = evt.childNode.selectSingleNode("*[local-name()='parameters']/*[local-name()='width']");
    if (evt.childNode.getLocalName() == "section" && evt.target.getLocalName() == "section" && parentColumns != null && parseInt(parentColumns.getTextContent()) > 1 && childWidth == null) {
        evt.cancelEvent = true;
    }
}