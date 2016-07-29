function getCollectionId() {
    var canvas = parent.Editor.getActiveCanvas();
    var doc = canvas.getCanvasElement().ownerDocument;
    var w = doc.parentWindow || doc.defaultView ;
    return w.getCollectionId();
}
var localReferences;
var remoteReferences;

$(document).ready( function() {
    var referablesURI = "//www.epo.pl/edit/common/api/object/collection/" + getCollectionId() + "/referables/xml";

    var form = $("#glossary-reference-form");
    var node = getWindow().dialogNode;
    setCurrentReferenceName(node);
    setElementName(node);
    getLocalReferences(node);
    getReferences(node, referablesURI);

    $("#search").on("keyup", updateLocalList);
    $("#search").on("keyup", updateRemoteList);

    form.find(".functional_buttons button.save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons button.cancel").on("click", closeDialog);

		if(node.getLocalName()=="tooltip-reference" || node.getLocalName()=="disabled-alternative-reference") {
			form.find("#local-references").css("width", "520px");
			form.find("#remote-references").css("display", "none");
		}
});

function isInQuoteSource(node) {
	return node.getParentNode() && node.getParentNode().getLocalName()=="source";
}

function getBibNodeForQuoteSource(node) {
	var bib_entry = null;
	if(isInQuoteSource(node)) {
			var id = node.getAttributeNS(EP_XML_URI, "id");
			bib_entry = node.getOwnerDocument().selectSingleNode("./*[local-name()='document']/*[local-name()='file']/*[local-name()='entry' and ./@*[local-name()='id' and .='" + id + "']]");
	}
	
	return bib_entry;
}

function setCurrentReferenceName(node) {
    var reference_name = node.getAttributeNS(EP_XML_URI, "target-name"), bib_entry;
    if(reference_name == "" && (bib_entry = getBibNodeForQuoteSource(node))) {
			reference_name = bib_entry.getAttributeNS(EP_XML_URI, "target-name");
		}
    console.log(node);
    console.log(reference_name);
    if(reference_name != "") {
        $("#current-reference-container").show();
        $(".reference-name").text(reference_name);
		}
}

function updateCurrentReferenceName(node, name) {
	if(isInQuoteSource(node) && !!name && name != "") {
		$("#current-reference-container").show();
		$(".reference-name").text(name);
	}
}

function setElementName(node) {
    var form = $("#glossary-reference-form");
    var element_name = $(".element-name");
    element_name.text(getElementLabel(node.getLocalName().replace('-reference', '')));
}

function getLocalReferences(node) {
    var name = node.getLocalName().replace('-reference', '');
    var xmlDoc = node.getOwnerDocument().getDocumentElement();
    localReferences = xmlDoc.selectNodes(getSearchXpath(name));
    updateLocalList();
}

function getElementLabel(name) {
    switch (name) {
        case 'glossary':
            return "definicje, reguły";
        case 'biography':
            return "biogramy";
        case 'bibliography':
            return "bibliografie";
        case 'concept':
            return "pojęcia";
        case 'event':
            return "wydarzenia";
        case 'tooltip':
            return "dymek";
        case 'disabled-alternative':
            return "opis alternatywny";
    }
}

function getSearchXpath(name) {
    switch (name) {
        case 'glossary':
            return "//*[local-name()='definition' or local-name()='rule']";
        case 'bibliography':
			return "//*[local-name()='entry' and namespace-uri()='" + BIB_XML_URI + "']";
        case 'disabled-alternative':
            return "//*[local-name()='tooltip' and @*[local-name()='type']='disabled-alternative']";
        default:
            return "//*[local-name()='"+ name + "']";
    }
}

function getReferences(node, referencesURI) {
    var name = node.getLocalName().replace('-reference', '');
    if(name == "glossary")
        name = "definition,rule";
    $.get(referencesURI, function(data) {
        remoteReferences = $(data).find(name);
        updateRemoteList();
        updateCurrentReferenceName(node,
					$(data).find("#"+node.getAttributeNS(EP_XML_URI,"id")).attr("name"));
    }).fail(function() {
        console.log( "AJAX error: Cannot get references.xml" );
    });
}

function updateLocalList() {
    var searchRegex = new RegExp($("#search").val(),"i");
    var list = $("#local-references #list");

    var map = [];
    for (var i=0 ; i<localReferences.getLength(); i++) {
        var item = localReferences.item(i);
        var name = item.selectSingleNode("*[local-name()='title' or local-name()='term' or local-name()='name']");
        if(!name)
					name = item.selectSingleNode("@*[local-name()='target-name']");
        var textContent = "";
        if(name != null)
            textContent = name.getTextContent();
        if(searchRegex.test(textContent))
            map.push(item);
    }
    map.sort(compareXopusNodes);
    pagination($("#local-references"), map, list, 1);
}

function compareXmlNodes(a,b) {
    if (a.attr("sorting-key") < b.attr("sorting-key"))
        return -1;
    if (a.attr("sorting-key") > b.attr("sorting-key"))
        return 1;
    return 0;
}

function compareXopusNodes(a,b) {
    var aName = a.selectSingleNode("*[local-name()='sorting-key']");
    var aContent = "";
    if(aName != null)
        aContent = aName.getTextContent();
    else {
        aName = a.selectSingleNode("*[local-name()='title' or local-name()='term' or local-name()='name']");
        if(aName != null)
            aContent = aName.getTextContent();
    }

    var bName = b.selectSingleNode("*[local-name()='sorting-key']");
    var bContent = "";
    if(bName != null)
        bContent = bName.getTextContent();
    else {
        bName = b.selectSingleNode("*[local-name()='title' or local-name()='term' or local-name()='name']");
        if(bName != null)
            bContent = bName.getTextContent();
    }
    if (aContent < bContent)
        return -1;
    if (aContent > bContent)
        return 1;
    return 0;
}


function updateRemoteList() {
    var searchRegex = new RegExp($("#search").val(),"i");
    var list = $("#remote-references #list");

    var map = [];
    remoteReferences.each(function() {
        if(searchRegex.test($(this).attr("name")))
            map.push($(this));
    });
    map.sort(compareXmlNodes);
    pagination($("#remote-references"), map, list, 1);
}

function pagination (containerSelector, model, list, page) {
    var currentPage= page;
    var elementsOnPage = 10;
    var maxPage = Math.ceil(model.length/elementsOnPage);
    if (maxPage==0) maxPage=1;
    containerSelector.find(".next").click(function () {
        currentPage++;
        if(currentPage>maxPage)
            currentPage=maxPage;
        containerSelector.update();
        return false;
    });
    containerSelector.find(".prev").click(function () {
        currentPage--;
        if(currentPage<1)
            currentPage=1;
        containerSelector.update();
        return false;
    });

    containerSelector.getSubModel = function() {
        var result = []
        for(var i=(currentPage-1)*elementsOnPage; i< currentPage*elementsOnPage && i < model.length; i++) {
            result.push(model[i]);
        }
        return result;
    }

    containerSelector.update = function() {
        containerSelector.find(".current-page").text(currentPage);
        var subModel = containerSelector.getSubModel();
        list.empty();
        subModel.forEach( function (node) {
            list.append(makeSearchResultElement(node));
        });
        list.find("li").on("click", onListClick);
    }

    containerSelector.update();
}

function makeSearchResultElement(node) {
    var result = $("<li></li>");
    var item = $("<p></p>");

    if(typeof node.getAttribute === 'function') {
        item.attr("data-id", node.selectSingleNode("@*[local-name()='id']").getTextContent());
        var name = node.selectSingleNode("*[local-name()='title' or local-name()='term' or local-name()='name']");
        if(!name)
					name = node.selectSingleNode("@*[local-name()='target-name']");
        var textContent = "<brak tytułu>";
        if(name != null)
            textContent = name.getTextContent();
        item.text(textContent);
    }
    if(typeof node.attr === 'function') {
        item.attr("data-id", node.attr("id"));
        item.text(node.attr("name"));
    }
    result.append(item);
    return result;
}

function onListClick() {
    console.log('click li');
    var resultContainer = $("#result-container");
    resultContainer.find(".active").removeClass("active");
    $(this).addClass("active");
    return false;
}

function saveAndCloseDialog() {
    var node = getWindow().dialogNode;
    var selectedElement = $(".active p");
    if(validateInput(selectedElement)) {
        setXmlNodes(node, selectedElement);
        closeDialog();
    }
    return false;
}

function closeDialog() {
    var dialog = parent.Editor.getModalDialog();
    var dialogNode = getWindow().dialogNode;
    if(dialogNode.getAttributes().getLength()==2) {
        var parentNode = dialogNode.getParentNode();
        while (dialogNode.getFirstChild()) {
            parentNode.insertBefore(dialogNode.getFirstChild(), dialogNode);
        }
        parentNode.removeChild(dialogNode);
    }
    if(dialogNode.getLocalName()=='disabled-alternative-reference' &&
       dialogNode.getAttributeNS(EP_XML_URI, "id") == '') {
        dialogNode.getParentNode().removeChild(dialogNode);
    }
    getWindow().dialogNode = null;
    dialog.close();
    return false;
}

function validateInput(selectedElement) {
    return selectedElement !== null && selectedElement.text() != "" && selectedElement.attr("data-id") != "";
}

function setXmlNodes(node, selectedElement) {
    if(node.hasAttributeNS(EP_XML_URI, "id")) {
        console.log("setAttributeNS id ", selectedElement.attr("data-id"));
        node.setAttributeNS(EP_XML_URI, "id", selectedElement.attr("data-id"));
    } else {
        console.log("setAttributeNodeNS id ", selectedElement.attr("data-id"));
        var child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, "id");
        child.setTextContent(selectedElement.attr("data-id"));
        node.setAttributeNodeNS(child);
    }
    if(isInQuoteSource(node)) {
			node.setAttributeNS(EP_XML_URI, "inline", "true");
    } else {
			if(node.hasAttributeNS(EP_XML_URI, "target-name")) {
					node.setAttributeNS(EP_XML_URI, "target-name", selectedElement.text());
                    console.log("setAttributeNS target-name ", selectedElement.text());
			} else {
					console.log("setAttributeNodeNS target-name ", selectedElement.text());
					var child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, "target-name");
					child.setTextContent(selectedElement.text());
					node.setAttributeNodeNS(child);
			}
		}

    var isLocal = "false";
    if(selectedElement.closest("#local-references").length > 0)
        isLocal = "true";
    if(node.hasAttributeNS(EP_XML_URI, "local-reference")) {
        node.setAttributeNS(EP_XML_URI, "local-reference", isLocal);
    } else {
        console.log("setAttributeNodeNS local-reference ", isLocal);
        var child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, "local-reference");
        child.setTextContent(isLocal);
        node.setAttributeNodeNS(child);
    }
    node.makeValid();
}
setXmlNodes = parent.Editor.wrapInTransaction(setXmlNodes);
