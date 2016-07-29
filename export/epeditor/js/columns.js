function setWidth(sectionNode, width) {
    var parametersNode = getChildOrCreate(sectionNode, "parameters");
    setChildOrCreate(parametersNode, "width", width);
}

function addColumn2(element, node, count) {
    INSERT_BOOKMARK = 2;
    count = count < 1 ? 1 : count;
    if (count >= 4) return;
    var tmpNode = getChildOrCreate(node, "parameters");
    var columnsNode = getChildOrCreate(tmpNode, "columns");
    columnsNode.setTextContent(count + 1);
    var subsection;
    if (count == 1) {
        subsection = node.selectSingleNode("./*[local-name()='section']");
        var childsToMove = node.selectNodes("./*[not(local-name()='parameters' or local-name()='title' or (local-name()='section' and ./*[local-name()='parameters']/*[local-name()='width']))]");
        for (var i = 0; i < childsToMove.getLength(); i++) subsection.appendChild(childsToMove.item(i));
        if (childsToMove.getLength() == 0) {
            var tmpNode = node.getOwnerDocument().createElementNS(CNX_XML_URI, "para");
            subsection.appendChild(tmpNode);
            addId(tmpNode);
        }
    }
    node.makeValid();
}

addColumn2 = Editor.wrapInTransaction(addColumn2);

function addColumn1(element, node, count) {
    INSERT_BOOKMARK = 2;
    count = count < 1 ? 1 : count;
    if (count >= 4) return;
    var tmpNode = getChildOrCreate(node, "parameters");
    var columnsNode = getChildOrCreate(tmpNode, "columns");
    var refChild = node.selectSingleNode("./*[local-name()='section']");
    var existingSubsections = node.selectNodes("./*[local-name()='section']");
    var existingSubsectionsId = new Array(existingSubsections.getLength());
    for (var i = 0; i < existingSubsections.getLength(); i++) existingSubsectionsId[i] = existingSubsections.item(i).getAttribute("id");
    var subsection;
    if (count == 1) {
        subsection = node.getOwnerDocument().createElementNS(CNX_XML_URI, "section");
        var childsToMove = node.selectNodes("./*[not(local-name()='parameters' or local-name()='title')]");
        node.insertBefore(subsection, refChild);
        addId(subsection);
    }
    subsection = node.getOwnerDocument().createElementNS(CNX_XML_URI, "section");
    var parametersNode = getChildOrCreate(subsection, "parameters");
    setChildOrCreate(parametersNode, "width", 0);
    node.appendChild(subsection);
    addId(subsection);
    var tmpNode = node.getOwnerDocument().createElementNS(CNX_XML_URI, "para");
    subsection.appendChild(tmpNode);
    addId(tmpNode);
    var subsectionsToResize = node.selectNodes("./*[local-name()='section']");
    var width = Math.floor(100 / (count + 1));
    for (var i = 0; i < subsectionsToResize.getLength(); i++) {
        if (existingSubsectionsId.indexOf(subsectionsToResize.item(i).getAttribute("id")) < 0 || subsectionsToResize.item(i).selectSingleNode("./*[local-name()='parameters']/*[local-name()='width']") !== null) {
            setWidth(subsectionsToResize.item(i), width);
        }
    }
    node.makeValid();
}

addColumn1 = Editor.wrapInTransaction(addColumn1);

function addColumn(element, node, count) {
    INSERT_BOOKMARK = 2;
    Editor.runInTransaction(function() {
        var tmpNode = node.selectSingleNode("./*[local-name()='parameters']");
        if (tmpNode === null) {
            tmpNode = node.getOwnerDocument().createElementNS(EP_XML_URI, "parameters");
            tmpNode = node.prependChild(tmpNode);
        }
        var tmpNode2 = tmpNode.selectSingleNode("./*[local-name()='columns']");
        if (tmpNode2 === null) {
            tmpNode2 = node.getOwnerDocument().createElementNS(EP_XML_URI, "columns");
            tmpNode2 = tmpNode.prependChild(tmpNode2);
        }
    });
    addColumn1(element, node, count);
    addColumn2(element, node, count);
    return false;
}

addColumn = Editor.wrapInTransaction(addColumn);

function rmColumn1(element, node, count) {
    if (count == 1) return false;
    var mainSection = node.getParentNode();
    mainSection.removeChild(node);
    var tmpNode = getChildOrCreate(mainSection, "parameters");
    var columnsNode = getChildOrCreate(tmpNode, "columns");
    columnsNode.setTextContent(count - 1);
    if (count > 2) {
        var subsectionsToResize = mainSection.selectNodes("./*[local-name()='section']");
        var width = Math.floor(100 / (count - 1));
        for (var i = 0; i < subsectionsToResize.getLength(); i++) {
            if (subsectionsToResize.item(i).selectSingleNode("./*[local-name()='parameters']/*[local-name()='width']") !== null) {
                setWidth(subsectionsToResize.item(i), width);
            }
        }
    }
    return mainSection;
}

rmColumn1 = Editor.wrapInTransaction(rmColumn1);

function rmColumn2(mainSection, count) {
    if (count == 2) {
        var sectionToMove = mainSection.selectSingleNode("./*[local-name()='section']/*[local-name()='parameters']/*[local-name()='width']").getParentNode().getParentNode();
        var childsToMove = sectionToMove.selectNodes("./*[not(local-name()='parameters' or local-name()='title')]");
        for (var i = 0; i < childsToMove.getLength(); i++) {
            mainSection.appendChild(childsToMove.item(i));
        }
        mainSection.makeValid();
    }
}

rmColumn2 = Editor.wrapInTransaction(rmColumn2);

function rmColumn3(mainSection, count) {
    if (count == 2) {
        var sectionToMove = mainSection.selectSingleNode("./*[local-name()='section']/*[local-name()='parameters']/*[local-name()='width']").getParentNode().getParentNode();
        mainSection.removeChild(sectionToMove);
    }
}

rmColumn3 = Editor.wrapInTransaction(rmColumn3);

function rmColumn0(node, count) {
    if (count >= 2) {
        var childsToMove = node.selectNodes("./*[not(local-name()='parameters' or local-name()='title')]");
        var sectionToAppend = node.getPreviousSibling();
        if (sectionToAppend.getLocalName() == "section") {
            for (var i = 0; i < childsToMove.getLength(); i++) sectionToAppend.appendChild(childsToMove.item(i));
        } else {
            sectionToAppend = node.getNextSibling();
            var refNode = sectionToAppend.selectSingleNode("./*[not(local-name()='parameters' or local-name()='title')]");
            for (var i = 0; i < childsToMove.getLength(); i++) sectionToAppend.insertBefore(childsToMove.item(i), refNode);
        }
    }
}

rmColumn0 = Editor.wrapInTransaction(rmColumn0);

function rmColumn(element, node, count) {
    rmColumn0(node, count);
    var mainSection = rmColumn1(element, node, count);
    rmColumn2(mainSection, count);
    rmColumn3(mainSection, count);
    return false;
}

rmColumn = Editor.wrapInTransaction(rmColumn);