var searchURI = "http://www.epo.pl/edit/tiles/searchforxopus";

var foldersURI = "http://www.epo.pl/edit/tiles/foldersforxopus";

var WOMIURI = "http://www.epo.pl";

var WOMI_IMAGE_URL = "http://rt.epo.pl/repo/womi/";

var WOMI_IMAGE_URL = "http://rt.epo.pl/repo/womi/";

var PAGE_SIZE = "10";

var currentPage = 1;

var totalPages = 1;

var mainFoldersList = [];

var folderList = [];

var folderTree = [];

var loadedCookie = null;

function initChosen() {
    var config = {
        ".chosen-select": {
            search_contains: true
        }
    };
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

$(document).ready(function() {
    var node = getWindow().dialogNode;
    loadedCookie = getFolderCookie();
    initFoldersLists(loadedCookie);
    var dialog = parent.document.getElementsByClassName("modaldialog-dialog");
    parent.Editor.getModalDialog().resizeTo(900, 530);
    if (!!parent.dialogArguments) parent.dialogArguments.title = "Wybór WOMI";
    folders();
    go();
    initChosen();
    var form = $("#search");
    form.find(".functional_buttons .save").on("click", insertWOMI);
    form.find(".functional_buttons .search").on("click", function(evt) {
        currentPage = 1;
        go();
        return false;
    });
    form.find("#tags").keyup(function(evt) {
        if (evt.keyCode == 13) {
            currentPage = 1;
            go();
            return false;
        }
    });
    form.find(".functional_buttons .cancel").on("click", function(evt) {
        var dialog = parent.Editor.getModalDialog();
        var dialogNode = node;
        if (isExerciseEmpty(dialogNode)) {
            var parentNode = dialogNode.getParentNode();
            parentNode.removeChild(dialogNode);
        }
        dialogNode = parent.dialogArguments.node;
        var idNode = dialogNode ? dialogNode.selectSingleNode("./@*[local-name()='id']") : null;
        if (dialogNode && idNode && idNode.getNodeValue() == "") {
            var parentNode = dialogNode.getParentNode();
            parentNode.removeChild(dialogNode);
        }
        getWindow().dialogNode = null;
        dialog.close();
        return false;
    });
    form.find(".prev").on("click", function() {
        currentPage = currentPage - 1;
        if (currentPage < 1) currentPage = 1;
        go();
        return false;
    });
    form.find(".next").on("click", function() {
        currentPage = currentPage + 1;
        if (currentPage > totalPages) currentPage = totalPages;
        go();
        return false;
    });
    $("#list").on("click", "li", select);
    $("#list").on("dblclick", "li", choose);
    $("#cbmainfolder").on("change", updateSubfolders);
    $("#cbfolder").on("change", function() {
        var cookie = getFolderCookie();
        var selected = $(this).find("option:selected");
        cookie.folder = {
            id: selected.attr("value"),
            name: selected.text()
        };
        setFolderCookie(cookie);
        return false;
    });
    $("#total_pages").html(totalPages);
    $("#page_number").on("change", function(event) {
        if (isPositiveInt($(this).val())) {
            currentPage = parseInt($(this).val());
            go();
        } else {
            $(this).val(currentPage);
        }
    });
});

function updateSubfolders() {
    var branch = mainFoldersList[$("#cbmainfolder").find("option:selected").index() - 1];
    fillFoldersCB(branch);
    if (!loadedCookie) {
        var cookie = getFolderCookie();
        var selected = $("#cbmainfolder option:selected");
        cookie.mainfolder = {
            id: selected.attr("value"),
            name: selected.text()
        };
        setFolderCookie(cookie);
    }
    return false;
}

function jsonWOMIFeed(results) {
    for (var i = 0; i < results.items.length; ++i) {
        var result = results.items[i];
        addItem(result, WOMI_IMAGE_URL + result.id + "/image/pdf?res=480");
    }
    totalPages = parseInt(results.count / PAGE_SIZE) + (results.count % PAGE_SIZE > 0 ? 1 : 0);
    $("#total_pages").html(totalPages);
    hideAjaxLoader($("#list"));
}

function getMainFolders(root) {
    var mainFolders = [];
    for (var i = 0; i < root.subfolders.length; ++i) {
        var result = root.subfolders[i];
        mainFolders.push({
            name: result.name,
            id: result.id,
            subfolders: result.subfolders
        });
    }
    return mainFolders;
}

Array.prototype.extend = function(other_array) {
    other_array.forEach(function(v) {
        this.push(v);
    }, this);
};

function space(level) {
    if (level == 0) return "";
    var output = "+-";
    for (var i = 1; i < level; i++) {
        output += "--";
    }
    return output + " ";
}

function getFolders(mainFolder, level) {
    var folders = [];
    if (level == undefined) level = 0;
    for (var i = 0; i < mainFolder.subfolders.length; ++i) {
        var result = mainFolder.subfolders[i];
        folders.push({
            name: space(level) + result.name,
            id: result.id
        });
        folders.extend(getFolders(result, level + 1));
    }
    return folders;
}

function fillFoldersCB(branch) {
    folderList = [];
    if (!branch) {
        $.each(mainFoldersList, function(number, entry) {
            folderList.extend(getFolders(entry));
        });
    } else {
        folderList = getFolders(branch);
    }
    var folder = $("#cbfolder");
    folder.empty();
    folder.append('<option value="all">Wszystkie</option>');
    $.each(folderList, function(number, entry) {
        folder.append("<option value=" + entry.id + ">" + entry.name + "</option>");
    });
    folder.trigger("chosen:updated");
}

function fillMainFoldersCB(root) {
    mainFoldersList = getMainFolders(root);
    var mainFolder = $("#cbmainfolder");
    mainFolder.empty();
    mainFolder.append('<option value="all">Wszystkie</option>');
    $.each(mainFoldersList, function(number, entry) {
        mainFolder.append("<option value=" + entry.id + ">" + entry.name + "</option>");
    });
}

function jsonFoldersFeed(results) {
    folderTree = results;
    fillMainFoldersCB(folderTree);
    $("#cbmainfolder").val(loadedCookie.mainfolder.id).trigger("chosen:updated");
    updateSubfolders();
    hideAjaxLoader($("#cbmainfolder"));
    setFolderTreeToStorage(folderTree);
    setFolderCookie(loadedCookie);
    $("#cbfolder").val(loadedCookie.folder.id).trigger("chosen:updated");
    loadedCookie = null;
}

function cleanup() {
    $("#list li").remove();
}

function addItem(womi, uri) {
    var list = $("#list");
    var li = $("<li/>").append($('<div title="kategoria" class="category"/>'), $('<div title="tytuł" class="title"/>'), $('<div title="nazwa" class="name"/>'), $('<div title="info" class="info"/>'), $('<div title="podgląd" class="preview"/>'));
    li.find(".category").addClass(womi["media-type"]);
    li.find(".title").text(womi.title == null ? "" : womi.title.length > 38 ? womi.title.substr(0, 35) + "..." : womi.title);
    li.find(".name").text(womi.name == null ? "" : womi.name.length > 38 ? womi.name.substr(0, 35) + "..." : womi.name);
    li.find(".preview").on("click", function() {
        openWOMI(WOMIURI + "/preview/reader/w/" + womi.id + "/v/1/embed");
        return false;
    });
    li.attr("title", womi.name);
    li.attr("id", womi.id);
    li.data("womi", womi);
    list.append(li);
    addHoveringPanels(li, womi, uri);
}

function addHoveringPanels(li, womi, uri) {
    var tooltip;
    tooltip = $('<div class="info-when-hovering-text">			<p><span>Identyfikator: </span><span class="id">' + womi.id + '</span></p>			<p><span>Tytuł: </span><span class="title">' + (womi.title == null ? "" : womi.title) + '</span></p>			<p><span>Nazwa: </span><span class="name">' + (womi.name == null ? "" : womi.name) + '</span></p>			<p><span>Typ WOMI: </span><span class="womi-type">' + getWOMITypeName(womi["media-type"]) + '</span></p>			<p><span>Autor: </span><span class="author">' + womi.author + '</span></p>			<p><span>Słowa kluczowe: </span><span class="key-word">' + womi.keywords + "</span></p>		</div>");
    li.find(".info").tooltipster({
        content: tooltip
    });
    tooltip = $('<div class="name-when-hovering-text">			<p><span>Nazwa: </span><span class="name">' + womi.name + "</span></p>		</div>");
    li.find(".name").tooltipster({
        content: tooltip
    });
    tooltip = $('<div class="title-when-hovering-text">			<p><span>Tytuł: </span><span class="title">' + (womi.title == null ? "" : womi.title) + "</span></p>		</div>");
    li.find(".title").tooltipster({
        content: tooltip
    });
    tooltip = $('<div class="type-when-hovering-text">			<p><span>Typ WOMI: </span><span class="womi-type">' + getWOMITypeName(womi["media-type"]) + "</span></p>		</div>");
    li.find(".category").tooltipster({
        content: tooltip
    });
    tooltip = $('<div class="image-when-hovering-text">			<p><img src="' + uri + '"/></p>		</div>');
    li.find(".preview").tooltipster({
        content: tooltip
    });
}

function getWOMITypeName(type) {
    switch (type) {
      case "IMAGE":
        return "Ilustracja";

      case "ICON":
        return "Ikona";

      case "VIDEO":
        return "Film";

      case "AUDIO":
        return "Klip dźwiękowy";

      case "OINT":
        return "Obiekt interaktywny";
    }
    return "Nieznany";
}

function showImg(uri) {
    $("#image-when-clicked").remove();
    $("body").append("<p id='image-when-clicked'><img src='" + uri + "' style='height: 450px;' /></p>");
    $("#image-when-clicked").css("position", "absolute").css("top", "10px").css("left", "30px").fadeIn("slow").click(function() {
        $(this).remove();
    });
}

function openWOMI(uri) {
    window.open(uri, "_blank");
}

function folders() {
    var script2 = document.createElement("script");
    script2.setAttribute("type", "text/javascript");
    script2.setAttribute("src", foldersURI + "?jsonFeed=jsonFoldersFeed");
    document.getElementsByTagName("head")[0].appendChild(script2);
}

function search(q) {
    if (q.length > 0 && !isDecimal(q)) {
        if (q.lastIndexOf("_") == -1) {
            q = q + "*";
        }
        q = q.replace(/_/gi, " ");
        q = q.replace(/^[0-9]+/g, "");
        q = "&all=" + q;
    }
    var folderId = 1;
    var mainfolderId = "all";
    var subfolderId = "all";
    if ($("#cbmainfolder").val()) mainfolderId = $("#cbmainfolder").val();
    if ($("#cbfolder").val()) subfolderId = $("#cbfolder").val();
    if (mainfolderId != "all") folderId = mainfolderId;
    if (subfolderId != "all") folderId = subfolderId;
    var uri = isDecimal(q) ? searchURI + "?jsonFeed=jsonWOMIFeed&womiId=" + q : searchURI + "?jsonFeed=jsonWOMIFeed&folder=" + folderId + "&pageSize=" + PAGE_SIZE + "&pageIndex=" + (currentPage - 1) + q;
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", uri);
    document.getElementsByTagName("head")[0].appendChild(script);
    cleanup();
    $("#page_number").val(currentPage);
    showAjaxLoader($("#list"));
}

function go() {
    search(document.getElementById("tags").value);
    return false;
}

function choose() {
    var target = $(this).attr("id");
    setXMLNode(getWindow().dialogNode, target);
    var node;
    if (getWindow().dialogNode != null && getWindow().dialogNode.getLocalName() == "exercise") {
        node = getWindow().dialogNode.selectSingleNode("//*[local-name()='reference']");
        var listWithOneNode = node.selectNodes("self::*");
        window.parent[1].loadWomiMetadata(listWithOneNode);
        getWindow().dialogNode = node;
        getWindow().dialogEditor = parent.Editor;
        var dialog = parent.document.getElementsByClassName("modaldialog-dialog");
        dialog[0].id = "";
        parent.Editor.getModalDialog().close();
        return;
    }
    node = parent.dialogArguments.node;
    var womi = $("#" + target).data("womi");
    setNodeAttributes(node, womi);
    var result = {};
    result["id"] = womi.id;
    parent.choose(result);
    var listWithOneNode = node.selectNodes("self::*");
    window.parent[1].loadWomiMetadata(listWithOneNode);
    parent.dialogNode = node;
    parent.dialogEditor = parent.Editor;
    var dialog = parent.document.getElementsByClassName("modaldialog-dialog");
    dialog[0].id = "";
    parent.Editor.getModalDialog().open("html-extra/womi-dialog.html", "Atrybuty womi", function() {
        parent.dialogNode = null;
    }, false);
}

function setNodeAttributes(node, womi) {
    var xmlDoc = node.getOwnerDocument();
    var child = xmlDoc.createElementNS(EPE_XML_URI, "title");
    var title = womi.title;
    if (title == null) {
        title = womi.name;
    }
    child.setTextContent(title);
    child = node.appendChild(child);
    child = xmlDoc.createElementNS(EPE_XML_URI, "womiType");
    var womiType = mapWomiType(womi["media-type"]);
    child.setTextContent(womiType);
    child = node.appendChild(child);
    node.makeValid();
}

function mapWomiType(type) {
    switch (type) {
      case "IMAGE":
        return "graphics";

      case "ICON":
        return "icon";

      case "VIDEO":
        return "movie";

      case "AUDIO":
        return "sound";

      case "OINT":
        return "interactive";
    }
    return null;
}

function getParent(node) {
    if (node === null) return null;
    if (node.getNodeType() == 2) return node.getOwnerElement();
    return node.getParentNode();
}

function select() {
    $("#list li").removeClass("active");
    $(this).addClass("active");
}

function insertWOMI() {
    $("#list li.active").dblclick();
    return false;
}

var isPositiveInt = function(n) {
    console.log(n + 2);
    if (parseInt(n) > 0) {
        return parseInt(n) == parseFloat(n);
    }
    return false;
};

function showAjaxLoader(element) {
    element.closest(".ajaxable-content").find(".ajax-loader").removeClass("hidden");
}

function hideAjaxLoader(element) {
    element.closest(".ajaxable-content").find(".ajax-loader").addClass("hidden");
}

function getStyle(element, property) {
    if (element.currentStyle) {
        property = property.replace(/\-(.)/g, function(m, l) {
            return l.toUpperCase();
        });
        var value = element.currentStyle.getAttribute(property);
    } else if (window.getComputedStyle) var value = document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
    switch (property) {
      case "height":
        if (value == "auto") value = element.clientHeight + "px";
        break;

      case "width":
        if (value == "auto") value = element.clientWidth + "px";
        break;
    }
    return value;
}

function setXMLNode(node, id) {
    if (node != null && node.getLocalName() == "exercise") {
        var womi;
        switch (getWindow().exerciseTmp.type) {
          case "womi1":
            node.setAttributeNS(EP_XML_URI, "interactivity", "womi_with_alternatives");
            womi = node.getOwnerDocument().createElementNS(EP_XML_URI, "reference");
            womi = node.appendChild(womi);
            break;

          case "womi2":
            node.setAttributeNS(EP_XML_URI, "interactivity", "static");
            womi = appendWomi2Structure(node);
            break;
        }
        node.setAttribute("type", "WOMI");
        appendWomiSubnodes(womi);
        womi.setAttributeNS(EP_XML_URI, "id", id);
        node.makeValid();
    }
}

setXMLNode = parent.Editor.wrapInTransaction(setXMLNode);

function appendWomi2Structure(node) {
    var doc = node.getOwnerDocument();
    var alternative, formats, womi;
    var alternativesContainer = doc.createElementNS(EP_XML_URI, "alternatives");
    node.appendChild(alternativesContainer);
    alternative = doc.createElementNS(EP_XML_URI, "alternative");
    alternative.setAttributeNS(EP_XML_URI, "id", generateNextId(alternative));
    alternativesContainer.appendChild(alternative);
    formats = doc.createElementNS(EP_XML_URI, "formats");
    alternative.appendChild(formats);
    appendFormat(formats, "classicmobile");
    womi = node.getOwnerDocument().createElementNS(EP_XML_URI, "reference");
    womi.setAttributeNS(EP_XML_URI, "instance-id", generateNextId(alternative));
    alternative.appendChild(womi);
    alternative = doc.createElementNS(EP_XML_URI, "alternative");
    alternative.setAttributeNS(EP_XML_URI, "id", generateNextId(alternative));
    alternativesContainer.appendChild(alternative);
    formats = doc.createElementNS(EP_XML_URI, "formats");
    alternative.appendChild(formats);
    appendFormat(formats, "static");
    appendFormat(formats, "static-mono");
    [ "problem", "solution", "commentary" ].forEach(function(e) {
        var tmp = node.getOwnerDocument().createElementNS(CNX_XML_URI, e);
        alternative.appendChild(tmp);
        tmp.setAttribute("id", generateNextId(alternative));
    });
    return womi;
}

function appendFormat(node, textContent) {
    var format = node.getOwnerDocument().createElementNS(EP_XML_URI, "format");
    node.appendChild(format);
    format.setTextContent(textContent);
}

function isExerciseEmpty(node) {
    return !!node && node.getChildNodes().getLength() == 0;
}

function appendWomiSubnodes(womi) {
    var hideCaption = womi.getOwnerDocument().createElementNS(EP_XML_URI, "hide-caption");
    hideCaption.setTextContent("all");
    womi.appendChild(hideCaption);
}

function getFolderCookie() {
    var cookie = getCookie("womi-folder");
    if (cookie == "") {
        cookie = JSON.stringify({
            mainfolder: {
                id: "all",
                name: "Wszystkie"
            },
            folder: {
                id: "all",
                name: "Wszystkie"
            }
        });
        setFolderCookie({
            mainfolder: {
                id: "all",
                name: "Wszystkie"
            },
            folder: {
                id: "all",
                name: "Wszystkie"
            }
        });
    }
    try {
        return JSON.parse(cookie);
    } catch (ex) {
        cookie = JSON.stringify({
            mainfolder: {
                id: "all",
                name: "Wszystkie"
            },
            folder: {
                id: "all",
                name: "Wszystkie"
            }
        });
        setFolderCookie({
            mainfolder: {
                id: "all",
                name: "Wszystkie"
            },
            folder: {
                id: "all",
                name: "Wszystkie"
            }
        });
    }
    return JSON.parse(cookie);
}

function setFolderCookie(cookie) {
    setCookie("womi-folder", JSON.stringify(cookie), 1e4);
}

function getFolderTreeFromStorage() {
    var result = null;
    if (typeof Storage != "undefined") result = localStorage.getItem("folderTree");
    return result ? JSON.parse(result) : null;
}

function setFolderTreeToStorage(fTree) {
    if (typeof Storage != "undefined") localStorage.setItem("folderTree", JSON.stringify(fTree));
}

function initFoldersLists(cookie) {
    var fTree = getFolderTreeFromStorage();
    if (fTree) {
        fillMainFoldersCB(fTree);
        $("#cbmainfolder").val(cookie.mainfolder.id).trigger("chosen:updated");
        updateSubfolders();
        $("#cbfolder").val(cookie.folder.id).trigger("chosen:updated");
    } else {
        $("#cbmainfolder").append("<option value=" + cookie.mainfolder.id + ">" + cookie.mainfolder.name + "</option>").val(loadedCookie.mainfolder.id);
        $("#cbfolder").append("<option value=" + cookie.folder.id + ">" + cookie.folder.name + "</option>").val(loadedCookie.folder.id).trigger("chosen:updated");
    }
}
