function insert_menu(element, node, options, optionLabels) {
    var container = element.parentNode;
    container.className = "dontShowMenuButton";
    if (element.parentNode.parentNode.getAttribute("class").indexOf("style-choose") > -1) {
        var options = [ "style1", "style2" ];
        var optionLabels = [ "Styl 1", "Styl 2" ];
        attrib = "ed:active-style";
    } else if (element.parentNode.parentNode.getAttribute("class").indexOf("note") > -1) {
        var options = [ "curiosity", "tip" ];
        var optionLabels = [ "ciekawostka", "wskazowka" ];
        attrib = "type";
    }
    var menu = document.createElement("div");
    menu.className = "menuItemList";
    menu.appendChild(document.createTextNode("Wybierz typ:"));
    for (i = 0; i < options.length; i++) {
        var buttonElement = document.createElement("div");
        buttonElement.className = "menuItem";
        var nodeType = options[i];
        buttonElement.onclick = getChangeTypeFunction(buttonElement, node, nodeType, attrib);
        var label = document.createTextNode(optionLabels[i]);
        buttonElement.appendChild(label);
        menu.appendChild(buttonElement);
    }
    container.insertBefore(menu, element);
    return true;
}

function getChangeTypeFunction(buttonElement, xopusNode, nodeType, attrib) {
    return function() {
        changeType(buttonElement, xopusNode, nodeType, attrib);
    };
}

function changeType(element, node, selectedType, attrib) {
    node.setAttribute(attrib, selectedType);
    var container = element.parentNode.parentNode;
    container.className = "showMenuButton";
    container.removeChild(element.parentNode);
    return true;
}

insert_node = Editor.wrapInTransaction(changeType);