$(document).ready(function() {
    var form = $("#service-container");
    var node = getWindow().dialogNode;
    form.find(".service .functional_buttons .cancel").on("click", closeDialog);
    form.find(".service .functional_buttons .def-conc").on("click", defToConcPopup);
    form.find(".service .functional_buttons .conc-def").on("click", concToDefPopup);
    registerPlainXMLService(form.find(".plain-xml"), node);
});

$(document).ready(function() {
    var form = $("#popup");
    console.log(form);
    form.find(".functional_buttons .cancel").on("click", closeDialog);
    form.find(".functional_buttons .def-conc").on("click", defToConc);
    form.find(".functional_buttons .conc-def").on("click", concToDef);
});

function defToConcPopup() {
    openPopup("html-extra/popup/def-to-conc.html");
}

function concToDefPopup() {
    openPopup("html-extra/popup/conc-to-def.html");
}

function defToConc() {
    var document = parent.Editor.getActiveDocument();
    var definitions = document.selectNodes(".//*[local-name()='definition']");
    for (var i = 0; i < definitions.getLength(); i++) {
        var definition = document.selectSingleNode(".//*[local-name()='definition']");
        definitionToConcept(definition, document);
    }
    closeDialog();
}

defToConc = parent.Editor.wrapInTransaction(defToConc);

function concToDef() {
    var document = parent.Editor.getActiveDocument();
    var concepts = document.selectNodes(".//*[local-name()='concept']");
    for (var i = 0; i < concepts.getLength(); i++) {
        var concept = document.selectSingleNode(".//*[local-name()='concept']");
        conceptToDefinition(concept, document);
    }
    closeDialog();
}

concToDef = parent.Editor.wrapInTransaction(concToDef);

function onHeaderClick() {
    var service = $(this).closest(".service");
    service.find(".content").toggleClass("hidden");
    return false;
}

function registerPlainXMLService(serviceElement, node) {
    var xml = vkbeautify.xml(node.getXML());
    serviceElement.find(".content .output").text(xml);
    serviceElement.find(".functional_buttons .save").on("click", function() {
        selectText($(this).closest(".content").find(".output")[0]);
        return false;
    });
}

function selectText(node) {
    var s = window.getSelection();
    if (s.rangeCount > 0) s.removeAllRanges();
    var range = document.createRange();
    range.selectNode(node);
    s.addRange(range);
}

function openPopup(htmlFile) {
    dialogWindow = parent.Editor.getModalDialog();
    dialogWindow.resizeTo(560, 400);
    dialogWindow.open(htmlFile, "Uwaga", function() {
        dialogNode = null;
    }, true);
}