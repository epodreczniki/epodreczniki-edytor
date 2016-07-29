var BOOKMARK_DELIMITER = " / ";
var DIALOG_WIDTH = 900;
var DIALOG_HEIGHT = 600;

function getCollectionId() {

    //return "83809/2";
    return getWindow().getCollectionId();
}

function getModuleId() {

    //return "iohYyvR5RX";
    return getWindow().getModuleId().split('/')[0];
}
var collectionListURI = "/edit/common/api/interlinks";

var collectionURI = "/content/collection/{0}/{1}/collection.xml";
// real env
var referablesURI = "/edit/common/api/object/collection/{0}/{1}/referables/xml";
// temp solution:
// var referablesURI = "/portal/other/etx/epeditor/tempreference.xml"
var collectionLoaded = false;
var referablesMap = null;
var theJSTree = null;


$(document).ready(function () {

	if(getCollectionId() == null || getCollectionId() == "undefined")
	{	
		 $("#loader").hide();
		 $("#column2").hide();
		 return false;
	}
	else
	{
		$("#noCollection").hide();
	}
    console.log('host',window.location.host);
    if (window.location.host.contains('epo.pl')) {
        collectionURI = '//preview.epo.pl' + collectionURI;
        collectionListURI = '//www.epo.pl' + collectionListURI;
        referablesURI = '//www.epo.pl' + referablesURI;
    }
    if (window.location.host.contains('localhost')) {
        collectionURI = 'http://localhost:8080' + collectionURI;
        referablesURI = 'http://localhost:8080' + referablesURI;
        collectionListURI = 'http://localhost:8080' + collectionListURI;
    }
    console.log(collectionListURI);
    $("#dialog").find(".functional_buttons button.save").on("click", saveAndCloseDialog);
    $("#dialog").find(".functional_buttons button.cancel").on("click", closeDialog);
    $("#module-references").find("li").on("click", onListClick);
    theJSTree = $('#jstree_main');
    theJSTree.jstree(true);
    getLocalReferables();
    initChosen();
    
    getCollectionList();
    $("#coll-list").on("change", updateTree);
});


function loadTree(collectionXML) {
    var _this = this;

    var treeData = createTreeData(collectionXML);
    //console.log("load tree treeData",treeData);
    var config = {
        "core": {
            "animation": 0,
            "check_callback": true,
            "data": treeData
        },
        "types": {
            "root": {
                "icon": "../css/libs/images/glyphicons-briefcase.png",
                "valid_children": ["collection", "module"]
            },
            "collection": {
                "icon": "../css/libs/images/glyphicons-folder-open.png",
                "valid_children": ["collection", "module"]
            },
            "module": {
                "icon": "../css/libs/images/glyphicons-file.png",
                "valid_children": []
            }
        },
        "state": { "key": "theJSTreeForBookmarksDialog"},
        "plugins": [/*"wholerow",*/"types", "state"]
    };
    theJSTree.jstree("destroy");
    theJSTree.on("state_ready.jstree", function () {


        var currentLink = "";
        var id = "";
        if (getWindow().dialogNode.selectSingleNode("./@*[local-name()='document']")) {
            id = getWindow().dialogNode.selectSingleNode("./@*[local-name()='document']").getValue();
            if (referablesMap[id]) {
                currentLink += referablesMap[id]["children"] ? referablesMap[id]["text"] : referablesMap[id];
            } else {
                currentLink += id;
            }
        }
        if (getWindow().dialogNode.selectSingleNode("./@*[local-name()='target-id']")) {
            if (currentLink != "") {
                currentLink += BOOKMARK_DELIMITER;
            }
            currentLink += getBookmarkText(getWindow().dialogNode.selectSingleNode("./@*[local-name()='target-id']").getValue());
        }
        if (currentLink == "") {
            $("#currentLink").parent().css("display", "none");
            _this.theJSTree.jstree(true).open_all();

        } else {
            $("#currentLink").html(currentLink);
        }
        _this.theJSTree.jstree(true).deselect_all();
        if (id != "") {
            _this.theJSTree.jstree(true).select_node(_this.theJSTree.jstree(true).get_node(id));
        } else {
            //_this.theJSTree.jstree(true).select_node(_this.theJSTree.jstree(true).get_node(getModuleId()));
        }
    }).on("after_open.jstree", function (opened_node) {
        $("#" + getModuleId() + " a").addClass("disabledModule");
    }).jstree(config);


    theJSTree.on("changed.jstree", function (e, data) {

        $("#" + getModuleId() + " a").addClass("disabledModule");

        var item = data.selected;
        if (item.length == 0) {
            getReferablesForModule("");
            $("#result-container #list li").removeClass("active");
            return;
        }


        var itemData = _this.theJSTree.jstree(true).get_node(item).original;
        var itemType = _this.theJSTree.jstree(true).get_type(item);

        if ((itemType == "root") || (itemType == "collection")) {
            $("#selectedModuleTitle").attr("data-id", "").html("");
            $("#result-container #list li").removeClass("active");

            getReferablesForModule("");
        } else {   //"module"
            if (getModuleId() == itemData.id) {  // local module - do not allow to choose
                $("#selectedModuleTitle").attr("data-id", "").html("");
                $("#result-container #list li").removeClass("active");
                getReferablesForModule("");
            } else {    // remote module
                $("#selectedModuleTitle").attr("data-id", itemData.id).html(itemData.text);
                $("#result-container #list li").removeClass("active");
                $("#module-references #list li").addClass("active");
                getReferablesForModule(itemData.id);
            }

        }

    });

    $("#loader").hide();
    $("#dialog").css('opacity', 0);
    $("#dialog").show();
    //parent.Editor.getModalDialog().resizeTo( $("#column1").outerWidth(true) + $("#column2").outerWidth(true),DIALOG_HEIGHT);
    var dialogHeight = ($(parent).height() - 100) < DIALOG_HEIGHT ? $(parent).height() - 100 : DIALOG_HEIGHT;
    parent.Editor.getModalDialog().resizeTo(DIALOG_WIDTH, dialogHeight);
    $("#dialog").hide();
    $("#dialog").css('opacity', 1);

    $("#dialog").fadeIn("slow");
    hideAjaxLoader($("#coll-list"));
}

function getBookmarkText(id) {
    var keys = Object.keys(referablesMap);
    for (var key in keys) {
        if (referablesMap[keys[key]]) {
            var bookmarks = referablesMap[keys[key]]["children"];
            if (bookmarks) {
                for (var bookmark in bookmarks) {
                    if (bookmarks[bookmark]["id"] == id) return bookmarks[bookmark]["text"];
                }
            }
        }
    }
    
    /// check local nodes
    var localBookmarkNode = getWindow().dialogNode.getOwnerDocument().
			selectSingleNode("//*[local-name()='bookmark' and ./@*[local-name()='id' and .='" + id + "']]");
		
		if(localBookmarkNode) 
			return localBookmarkNode.getAttributeNS(EP_XML_URI, "name");
    
    return id;
}

function setBookmarkModuleId(id) {
    if (id) {
        var node = getWindow().dialogNode;
        setAttrOrCreate(node, "document", id);

    }
}

function setBookmarkTargetId(id) {
    if (id) {
        var node = getWindow().dialogNode;
        setAttrOrCreate(node, "target-id", id);

    }
}

function getAttrOrCreate(node, name) {
    if (node === null) return node;
    var r = node.selectSingleNode("./@*[local-name() = '" + name + "']");
    if (r !== null) return r;

    var child = node.getOwnerDocument().createAttribute(name);
    node.setAttributeNode(child);

    return child;
}

function getAttrOrCreateNS(node, name, ns) {
    if (node === null) return node;
    var r = node.selectSingleNode("./@*[local-name() = '" + name + "']");
    if (r !== null && r.getNamespaceURI()==ns) return r;

    var child = node.getOwnerDocument().createAttributeNS(ns, name);
    node.setAttributeNode(child);

    return child;
}

function setAttrOrCreate(node, name, value) {
    var tmp = getAttrOrCreate(node, name);
    if (tmp === null) return null;

    tmp.setTextContent(value);
    return tmp;
}

function setAttrOrCreateNS(node, name, value, ns) {
    var tmp = getAttrOrCreateNS(node, name, ns);
    if (tmp === null) return null;

    tmp.setTextContent(value);
    return tmp;
}

function removeAttr(node, name) {
    if (node === null) return node;
    var r = node.selectSingleNode("./@*[local-name() = '" + name + "']");
    if (r == null) return r;
    node.removeAttribute(r.getName());
}

function createTreeData(collection) {
    var tmpJson = xmlToJson(collection);
    return jsonToTreeData(tmpJson);
}


function getCollection() {
    //console.log("EPO: loadModuleXML");
    var collectionId = getCollectionId().split('/')[0];
    var version = getCollectionId().split('/')[1];

    getCollectionXmlById(collectionId, version);
}

function getCollectionXmlById(collectionId, version) {
    var collectionUrl = collectionURI.format(collectionId, version);
    $.ajax({
        type: "get",
        url: collectionUrl,
        dataType: "xml",

        success: function (data) {

            collectionLoaded = true;
            loadTree(data);

        },
        error: function (jqXHR, textStatus, errorMessage) {
            var stack = $(jqXHR.responseText);
            var err = _.where(stack, {className: 'error'});
            if (err == "") err = errorMessage;
            console.log(textStatus, errorMessage);
            parent.Editor.alert('Problem przy ładowaniu kolekcji ' + collectionId + ', wersja :' + version + ": " + err);
            collectionLoaded = false;
            hideAjaxLoader($("#coll-list"));
        }
    });
}

function getReferables() {

    var collectionId = getCollectionId().split('/')[0];
    var version = getCollectionId().split('/')[1];

    getReferablesXmlById(collectionId, version);
}

function getReferablesXmlById(collectionId, version) {
    var collectionUrl = referablesURI.format(collectionId, version);
    showAjaxLoader($("#coll-list"));

    $.ajax({
        type: "get",
        url: collectionUrl,
        dataType: "xml",

        success: function (data) {

            referablesMap = referablesXmlToMap(data)
            //console.log("referablesXmlToMap(xml)", referablesMap );
            getCollectionXmlById(collectionId, version);

        },
        error: function (jqXHR, textStatus, errorMessage) {
            var stack = $(jqXHR.responseText);
            var err = _.where(stack, {className: 'error'});
            if (err == "") err = errorMessage;
            console.log(textStatus, errorMessage);
            parent.Editor.alert('Problem przy ładowaniu referencji ' + collectionId + ', wersja :' + version + ": " + err);
            hideAjaxLoader($("#coll-list"));

        }
    });
}

function getReferablesForModule(moduleid) {
    $("#bookmarksList").html("");
    var bookmarks = null;
    var bookmarksList = [];
    if (referablesMap[moduleid]) bookmarks = referablesMap[moduleid]["children"];
    if (bookmarks) {
        for (var i = 0; i < bookmarks.length; i++) {
            $("#bookmarksList").append($("<li><a class='remoteBookmark' href='#' targetid='" +
                bookmarks[i]["id"] + "'>" +
                bookmarks[i]["text"] +
                "</a></li>"));
            bookmarksList.push($("<li><p data-id='" +
                bookmarks[i]["id"] + "'>" +
                bookmarks[i]["text"] +
                "</p></li>"))
        }

    }
    pagination($("#remote-references"), bookmarksList, $("#remote-references #list"), 1);
}

function getLocalReferables() {
    var node = getWindow().dialogNode;
    var localBookmarks = node.getOwnerDocument().getDocumentElement().selectNodes("//*[local-name()='bookmark']");
    var bookmarksList = [];
    $("#localBookmarksList").html("");
    for (var i = 0; i < localBookmarks.getLength(); i++) {
        $("#localBookmarksList").append($("<li><a class='localBookmark' href='#' targetid='" +
            localBookmarks.item(i).selectSingleNode("./@*[local-name()='id']").getValue() + "'>" +
            localBookmarks.item(i).selectSingleNode("./@*[local-name()='name']").getValue() +
            "</a></li>"));
        bookmarksList.push($("<li><p data-id='" +
            localBookmarks.item(i).selectSingleNode("./@*[local-name()='id']").getValue() + "'>" +
            localBookmarks.item(i).selectSingleNode("./@*[local-name()='name']").getValue() +
            "</p></li>"));

    }
    pagination($("#local-references"), bookmarksList, $("#local-references #list"), 1);
}

// Changes XML to JSON with http://davidwalsh.name/convert-xml-json patched to preserve order by PG
function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        obj["children"] = [];
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            if (item.nodeType == 3) {
                if (item.nodeValue.replace(/(\r\n|\n|\r|\t)/gm, "").trim() == "") continue
            }
            var jitem = {nodeName: item.nodeName, nodeBody: xmlToJson(item)};
            obj["children"].push(jitem);
        }
    }

    return obj;
}

function jsonToTreeData(elem, level) {
    var obj = {};
    if (level == undefined) {
        level = 0;
    }
    if (elem["children"] && !elem["nodeName"]) {
        // 'empty' root element
        var item = elem["children"][0];
        return jsonToTreeData(item);
    }
    var referable = null;
    if (elem["nodeName"] == "col:collection") {
        var collection = elem["nodeBody"];
        var metadata = {};
        var content = {};
        for (var i = 0; i < collection["children"].length; i++) {
            if (collection["children"][i]["nodeName"] == "col:metadata") {
                metadata = collection["children"][i]["nodeBody"]["children"];
            }
            if (collection["children"][i]["nodeName"] == "col:content") {
                content = collection["children"][i]["nodeBody"]["children"];
            }
        }

        for (i = 0; i < metadata.length; i++) {
            if (metadata[i]["nodeName"] == "md:content-id") {
                obj["id"] = metadata[i]["nodeBody"]["children"][0]["nodeBody"];
            }
            if (metadata[i]["nodeName"] == "md:title") {
                if (metadata[i]["nodeBody"]["children"] == undefined) {
                    obj["text"] = "Bez tytułu";
                } else {
                    obj["text"] = metadata[i]["nodeBody"]["children"][0]["nodeBody"];
                }
            }
        }
        obj["type"] = "root";
        obj["children"] = [];
        for (i = 0; i < content.length; i++) {
            if (content[i]["nodeName"] == "col:module") {
                referable = referablesMap[content[i]["nodeBody"]["@attributes"]["document"]];
                if (referable && referable["type"] == "generated") {
                    //console.log("Omitting generated module:",referable["text"], referable["id"]);
                    continue;
                }
            }
            obj["children"].push(jsonToTreeData(content[i], "" + level + "_" + i));
        }
    }

    if (elem["nodeName"] == "col:subcollection") {
        var collection = elem["nodeBody"];
        var metadata = {};
        for (var i = 0; i < collection["children"].length; i++) {
            if (collection["children"][i]["nodeName"] == "md:title") {
                metadata = collection["children"][i]["nodeBody"]["children"];
            }
            if (collection["children"][i]["nodeName"] == "col:content") {
                content = collection["children"][i]["nodeBody"]["children"];
            }
        }

        for (i = 0; i < metadata.length; i++) {
            if (metadata[i]["nodeName"] == "#text") {
                obj["text"] = metadata[i]["nodeBody"];
                obj["id"] = metadata[i]["nodeBody"] + "_" + level + "_" + i;
            }
        }
        obj["type"] = "collection";
        obj["children"] = [];
        for (i = 0; i < content.length; i++) {
            if (content[i]["nodeName"] == "col:module") {
                referable = referablesMap[content[i]["nodeBody"]["@attributes"]["document"]];
                if (referable && referable["type"] == "generated") {
                    //console.log("Omitting generated module:",referable["text"], referable["id"]);
                    continue;
                }
            }
            obj["children"].push(jsonToTreeData(content[i], "" + level + "_" + i));
        }
    }

    if (elem["nodeName"] == "col:module") {
        var module = elem["nodeBody"];
        obj["id"] = module["@attributes"]["document"];
        var metadata = {};
        if (module["children"][0]["nodeName"] == "md:title") {
            metadata = module["children"][0]["nodeBody"]["children"];
        } else {
            metadata = module["children"][1]["nodeBody"]["children"];
        }
        for (var i = 0; i < metadata.length; i++) {
            if (metadata[i]["nodeName"] == "#text") {
                obj["text"] = metadata[i]["nodeBody"];
            }
        }
        obj["type"] = "module";
        //console.log("check: ",obj["id"],getModuleId());
        if (obj["id"] == getModuleId()) {
            //console.log("disabling:", obj["id"] );
            obj["state"] = { disabled: true };
        }
    }

    // let's get newest possible titles for collection and modules:
    var mapElem = referablesMap[obj["id"]];
    if (mapElem != null) {
        if (mapElem["children"] || mapElem["type"]) {
            obj["text"] = mapElem["text"];
        } else {
            obj["text"] = mapElem;
        }
    }

    return obj;
}

function referablesXmlToMap(xml, currentMap) {

    if (currentMap == undefined) currentMap = {};

    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            var isBookmark = false;
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                if (attribute.nodeName == "collection-id") obj["id"] = attribute.nodeValue;      //collection
                if (attribute.nodeName == "collection-title") obj["text"] = attribute.nodeValue; //collection
                if (attribute.nodeName == "id") obj["id"] = attribute.nodeValue;                 //module
                if (attribute.nodeName == "title") obj["text"] = attribute.nodeValue;            //module
                if (attribute.nodeName == "name") {
                    obj["text"] = attribute.nodeValue;
                    isBookmark = true;
                } //bookmark
                if (attribute.nodeName == "type") obj["type"] = attribute.nodeValue;             //module (generated)
            }
            if (isBookmark) return obj;
        }
    } else if (xml.nodeType == 3) { // text

    }

    // do children
    if (xml.hasChildNodes()) {

        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            if (item.nodeType == 3) {
                continue;
            }
            if ((item.nodeName == "reference-table") || (item.nodeName == "bookmarks") || (item.nodeName == "module")) referablesXmlToMap(item, currentMap);
            if (item.nodeName == "bookmark") {
                if (obj["children"] == undefined) obj["children"] = [];
                obj["children"].push(referablesXmlToMap(item, []))
            }
        }
    }
    if (obj != {}) {
        if (obj["children"] || obj["type"]) {
            currentMap[obj["id"]] = obj;
        } else {
            currentMap[obj["id"]] = obj["text"];
        }

    }

    return currentMap;
}

function pagination(containerSelector, model, list, page) {

    var currentPage = page;
    var elementsOnPage = 5;
    var maxPage = Math.ceil(model.length / elementsOnPage);
    if (maxPage == 0) maxPage = 1;
    containerSelector.find(".next").off("click");
    containerSelector.find(".next").click(function () {
        //console.log("currentPage",currentPage);
        currentPage++;
        if (currentPage > maxPage)
            currentPage = maxPage;
        containerSelector.update();
        return false;
    });
    containerSelector.find(".prev").off("click");
    containerSelector.find(".prev").click(function () {
        //console.log("currentPage",currentPage);
        currentPage--;
        if (currentPage < 1)
            currentPage = 1;
        containerSelector.update();
        return false;
    });

    containerSelector.getSubModel = function () {
        var result = [];
        for (var i = (currentPage - 1) * elementsOnPage; i < currentPage * elementsOnPage && i < model.length; i++) {
            result.push(model[i]);
        }
        return result;
    };

    containerSelector.update = function () {
        containerSelector.find(".current-page").text(currentPage);
        var subModel = containerSelector.getSubModel();
        list.empty();
        subModel.forEach(function (node) {
            list.append(node);
        });
        list.find("li").on("click", onListClick);
    };

    containerSelector.update();
}

function onListClick() {
    //console.log('click li', this);
    var resultContainer = $("#result-container");
    resultContainer.find(".active").removeClass("active");
    $(this).addClass("active");
    if ($("#local-references .active p").length > 0) {
        theJSTree.jstree(true).deselect_all();
        $(this).addClass("active");
    }
    return false;
}

function validateInput(selectedElement) {
    return selectedElement !== null && selectedElement.text() != "" && selectedElement.attr("data-id") != "";
}

function saveAndCloseDialog() {
    var node = getWindow().dialogNode;
    var selectedElement = $(".active p");

    if (validateInput(selectedElement)) {
        clearNodeAttributes(node);

        if ($("#coll-list").find("option:selected").attr("value") != "current") {
            var coll = $("#coll-list").find("option:selected");
            var tmp = coll.attr("value").split('/');
            
            var collId = tmp[0]; //ep:collection-id
            var version = tmp[1]; //ep:collection-version
            var collRecipient = coll.data("recipient");//ep:collection-recipient
            
            setBookmarkCollectionAttributes(collId, version, collRecipient);
        }
        if ($("#module-references .active p").length > 0) {
            removeAttr(node, "target-id");
            setBookmarkModuleId(selectedElement.attr("data-id"));

        }
        if ($("#local-references .active p").length > 0) {
            removeAttr(node, "document");
            setBookmarkTargetId(selectedElement.attr("data-id"));

        }
        if ($("#remote-references .active p").length > 0) {
            setBookmarkModuleId($("#selectedModuleTitle").attr("data-id"));
            setBookmarkTargetId(selectedElement.attr("data-id"));

        }

        closeDialog();
    }
    return false;
}
saveAndCloseDialog = parent.Editor.wrapInTransaction(saveAndCloseDialog);

function clearNodeAttributes(node) {
	var attributes = node.getAttributes();
	for(var i=0; i<attributes.getLength(); i++) {
		node.removeAttributeNode(attributes.item(i));
	}
}

function closeDialog() {
    var dialog = parent.Editor.getModalDialog();
    var dialogNode = getWindow().dialogNode;
    if (dialogNode.getAttributes().getLength() == 0) {
        var parentNode = dialogNode.getParentNode();
        while (dialogNode.getFirstChild()) {
            parentNode.insertBefore(dialogNode.getFirstChild(), dialogNode);
        }
        parentNode.removeChild(dialogNode);
    }
    getWindow().dialogNode = null;
    dialog.close();
    return false;
}

function initChosen() {
	 var config = {
         '.chosen-select': {search_contains: true}
      //'.chosen-select-deselect'  : {allow_single_deselect:true},
      //'.chosen-select-no-single' : {disable_search_threshold:10},
      //'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      //'.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
}

function getCollectionList() {
	$.ajax({
		type: "get",
		url: collectionListURI,
		dataType: "xml",

		success: fillCollectionList,
		error: function (jqXHR, textStatus, errorMessage) {
				var stack = $(jqXHR.responseText);
				var err = _.where(stack, {className: 'error'});
				if (err == "") err = errorMessage;
				console.log(textStatus, errorMessage);
				parent.Editor.alert('Problem przy ładowaniu listy kolekcji ' + getCollectionId().split('/')[0] + ', wersja :' + getCollectionId().split('/')[1] + ": " + err);
				collectionLoaded = false;
		}
	});
}

function fillCollectionList (collections) {
	var collectionList=$("#coll-list");
	collectionList.empty();
	collectionList.append('<option value="current">Obecna kolekcja</option>');

	var list = collections.firstChild.childNodes;
	$.each(list, function(i, it) {
			if(it.nodeName == "collection") {
					var meta = it.getElementsByTagNameNS("*","metadata")[0];
                    var etextbook = it.getElementsByTagNameNS("*","e-textbook")[0];

					var id = meta.getElementsByTagNameNS("*","content-id")[0].textContent + "/" + meta.getElementsByTagNameNS("*","version")[0].textContent;
					var name = it.getElementsByTagNameNS("*","display-name")[0].textContent;
					var recipient = etextbook.getAttributeNS(EP_XML_URI,"recipient") + "-" + etextbook.getAttributeNS(EP_XML_URI,"content-status");

					collectionList.append('<option value="' + id + '" data-recipient="' + recipient + '">' + name + '</option>');
			}
	});

	hideAjaxLoader(collectionList);

	var node = getWindow().dialogNode;
	var val = '/';
	if(node !=null && node.selectSingleNode("@*[local-name()='collection-id']") != null &&
		node.selectSingleNode("@*[local-name()='collection-version']") != null) {
		val = node.selectSingleNode("@*[local-name()='collection-id']").getTextContent() + "/" + node.selectSingleNode("@*[local-name()='collection-version']").getTextContent();
	}

	if(val == '/') {
		val = 'current';
		$("#remote-references").show();
	} else {
		$("#remote-references").hide();
	}

	collectionList.val(val).trigger("chosen:updated").trigger("change");
	$("#coll_list_chosen").css("width", "268px").show();
}

function hideAjaxLoader(element) {
	element.closest(".ajaxable-content").find(".ajax-loader").addClass("hidden");
}

function showAjaxLoader(element) {
	element.closest(".ajaxable-content").find(".ajax-loader").removeClass("hidden");
}

function updateTree() {
	var coll = $(this).find("option:selected").attr("value");
	if(coll == "current") {
		coll = getCollectionId();
		$("#remote-references").show();
	} else {
		$("#remote-references").hide();
	}

	var collectionId = coll.split('/')[0];
	var version = coll.split('/')[1];
	getReferablesXmlById(collectionId, version);
}

function setBookmarkCollectionAttributes(collId, version, collRecipient) {
	var node = getWindow().dialogNode;

	setAttrOrCreateNS(node, "collection-id", collId, EP_XML_URI);
	setAttrOrCreateNS(node, "collection-version", version, EP_XML_URI); 
	setAttrOrCreateNS(node, "collection-recipient", collRecipient, EP_XML_URI);
}
