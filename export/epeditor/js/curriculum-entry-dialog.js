var curriculumMap = null;

var searchQuickMap = null;

var exists = [];

var currentPage = 1;

$(document).ready(function() {
    var node = getWindow().dialogNode;
    var form = $("#curriculum-entry-form");
    parent.Editor.getModalDialog().resizeTo(700, 500);
    loadExists();
    loadCurriculumMap();
    $("#school").on("change", onSchoolChange);
    $("#subject").on("change", onSubjectChange);
    $("#search").on("keyup", updateList);
    form.find(".functional_buttons button.save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons button.cancel").on("click", closeDialog);
});

function loadExists() {
    var node = getWindow().dialogNode;
    var existingNodes = node.selectNodes("./*[local-name()='core-curriculum-entry']/*[local-name()='core-curriculum-ability']");
    for (var i = 0; i < existingNodes.getLength(); i++) {
        exists.push(existingNodes.item(i).getAttributeNS(EP_XML_URI, "key"));
    }
}

function loadCurriculumMap() {
    $.get("../CORE_CURRICULUM_MAP.xml", function(data) {
        curriculumMap = $(data).find("uspp entry");
        initForm();
    });
}

function makeOption(value, text) {
    return $("<option></option>").attr("value", value).text(text);
}

function initForm() {
    var map = new Map();
    curriculumMap.each(function() {
        var e = $(this).find("core-curriculum-school");
        map.set(e.attr("key"), e.text());
    });
    var school = $("#school");
    school.empty();
    map.forEach(function(v, k) {
        if (v.indexOf("Szkoły ponadgimnazjalne") > -1) v = "Szkoły ponadgimnazjalne";
        school.append(makeOption(k, v));
    });
    var cookie = getCurriculumEntryCookie();
    if (cookie.school == "") {
        cookie.school = school.val();
        setCurriculumEntryCookie(cookie);
    }
    school.val(cookie.school);
    onSchoolChange();
}

function saveAndCloseDialog() {
    var node = getWindow().dialogNode;
    var value = $("#list .active .key").text();
    if (validateInput()) {
        parent.blockCoreAbility = false;
        setXmlNodes(node, value);
        parent.blockCoreAbility = true;
        closeDialog();
    }
    return false;
}

function validateInput() {
    var value = $("#list .active .key").text();
    return value !== null && value != "";
}

function setXmlNodes(node, value) {
    var entryNode = curriculumMap.filter("[key='" + value + "']");
    var entry = entryNode.html();
    entry = '<core-curriculum-entry xmlns="' + EP_XML_URI + '">' + entry + "</core-curriculum-entry>";
    var xml = parent.Editor.XML.createNativeXMLDocument(entry).firstChild;
    var imported = node.getOwnerDocument().importNode(xml, true);
    imported = node.appendChild(imported);
    node.makeValid();
    imported.selectSingleNode("./*[local-name()='core-curriculum-stage']").setAttributeNS(EP_XML_URI, "key", entryNode.find("core-curriculum-stage").attr("key"));
    imported.selectSingleNode("./*[local-name()='core-curriculum-school']").setAttributeNS(EP_XML_URI, "key", entryNode.find("core-curriculum-school").attr("key"));
    imported.selectSingleNode("./*[local-name()='core-curriculum-subject']").setAttributeNS(EP_XML_URI, "key", entryNode.find("core-curriculum-subject").attr("key"));
    if (entryNode.find("core-curriculum-version").length > 0) imported.selectSingleNode("./*[local-name()='core-curriculum-version']").setAttributeNS(EP_XML_URI, "key", entryNode.find("core-curriculum-version").attr("key"));
    if (entryNode.find("core-curriculum-ability").length > 0) imported.selectSingleNode("./*[local-name()='core-curriculum-ability']").setAttributeNS(EP_XML_URI, "key", entryNode.find("core-curriculum-ability").attr("key"));
}

setXmlNodes = parent.Editor.wrapInTransaction(setXmlNodes);

function onSchoolChange() {
    var schoolKey = $("#school option:selected").attr("value");
    var subject = $("#subject");
    var map = new Map();
    curriculumMap.each(function() {
        if ($(this).find("core-curriculum-school").attr("key") != schoolKey) return;
        var e = $(this).find("core-curriculum-subject");
        map.set(e.attr("key"), e.text());
    });
    subject.empty();
    map.forEach(function(v, k) {
        subject.append(makeOption(k, v));
    });
    var cookie = getCurriculumEntryCookie();
    if (cookie.subject == "" || cookie.school != schoolKey) {
        cookie.subject = subject.val();
    }
    setCurriculumEntryCookie(cookie);
    subject.val(cookie.subject);
    onSubjectChange();
    return false;
}

function onSubjectChange() {
    var schoolKey = $("#school option:selected").attr("value");
    var subjectKey = $("#subject option:selected").attr("value");
    searchQuickMap = curriculumMap.filter(function() {
        return $(this).find("core-curriculum-school").attr("key") == schoolKey && $(this).find("core-curriculum-subject").attr("key") == subjectKey;
    });
    updateCurriculumEntryCookie(schoolKey, subjectKey);
    updateList();
}

function makeSearchResultElement(k, v) {
    var result = $("<li></li>");
    result.append($("<p class='key'></p>").text(k));
    result.append($("<p class='value'></p>").append($(v).find("core-curriculum-ability").html()));
    if (exists.indexOf(k) >= 0) {
        result.addClass("exists");
        result.attr("title", "Podstawa programowa jest już dodana");
    }
    return result;
}

function updateList() {
    var searchRegex = new RegExp($("#search").val(), "i");
    var list = $("#list");
    var map = [];
    searchQuickMap.each(function() {
        var b = searchRegex.test($(this).find("core-curriculum-ability").attr("key")) || searchRegex.test($(this).attr("key")) || searchRegex.test($(this).find("core-curriculum-ability").text());
        if (!b) return;
        var e = $(this);
        map.push(e);
    });
    pagination($("#column2"), map, currentPage, list);
}

function onListClick() {
    var list = $("#list");
    if ($(this).hasClass("exists")) return false;
    list.find("li").each(function() {
        $(this).removeClass("active");
    });
    $(this).addClass("active");
    return false;
}

function setCurriculumEntryCookie(value) {
    setCookie("curriculum-entry", JSON.stringify(value), 1e4);
}

function getCurriculumEntryCookie() {
    var cookie = getCookie("curriculum-entry");
    if (cookie == "") {
        cookie = JSON.stringify({
            school: "",
            subject: ""
        });
        setCookie("curriculum-entry", cookie, 1e4);
    }
    return JSON.parse(cookie);
}

function updateCurriculumEntryCookie(school, subject) {
    var cookie = getCurriculumEntryCookie();
    cookie.school = school;
    cookie.subject = subject;
    setCurriculumEntryCookie(cookie);
}

function pagination(containerSelector, model, currentPage, list) {
    var elementsOnPage = 10;
    var maxPage = Math.ceil(model.length / elementsOnPage);
    containerSelector.find(".next").click(function() {
        currentPage++;
        if (currentPage > maxPage) currentPage = maxPage;
        update();
        return false;
    });
    containerSelector.find(".prev").click(function() {
        currentPage--;
        if (currentPage < 1) currentPage = 1;
        update();
        return false;
    });
    this.getSubModel = function() {
        var result = [];
        for (var i = (currentPage - 1) * elementsOnPage; i < currentPage * elementsOnPage && i < model.length; i++) {
            result.push(model[i]);
        }
        return result;
    };
    this.update = function() {
        containerSelector.find(".current-page").text(currentPage);
        var subModel = getSubModel();
        list.empty();
        subModel.forEach(function(v) {
            var k = $(v).attr("key");
            list.append(makeSearchResultElement(k, v));
        });
        list.find("li").on("click", onListClick);
    };
    update();
}