$(document).ready(function() {
    var node = getWindow().dialogNode;
    var form = $("#column-width_form");
    setFormValues(form, node);
    form.find(".functional_buttons button.save").on("click", saveAndCloseDialog);
});

function saveAndCloseDialog() {
    if (validateInput()) {
        setXmlNodes();
        closeDialog();
    }
}

function setFormValues(form, node) {
    var columnsNodes = node.selectNodes("./*[local-name()='section']/*[local-name()='parameters']/*[local-name()='width']");
    var columnHtml = form.find(".column");
    var columnsContainer = form.find(".form_column-width");
    for (var i = 0; i < columnsNodes.getLength(); i++) {
        var columnNode = columnsNodes.item(i);
        var newColumnHtml = columnHtml.clone();
        var value = columnNode.getTextContent();
        newColumnHtml.find(".label span").text(i + 1);
        newColumnHtml.find("input.column-width_value").attr("id", "col-" + i);
        newColumnHtml.find("input.column-width_value").val(value + "%");
        columnsContainer.append(newColumnHtml);
    }
    columnHtml.remove();
    validateInput();
    columnsContainer.on("change", function() {
        validateInput();
        return false;
    });
}

function validateInput() {
    var inputs = $("#column-width_form .column input.column-width_value");
    var suma = 0;
    var ok = true;
    inputs.each(function() {
        var tmp = parseInt($(this).val());
        if (/^[1-9][0-9]?%$/.test($(this).val()) && tmp >= 1) suma += tmp; else ok = false;
    });
    if (!(ok && (suma == 100 || suma == 99))) {
        inputs.addClass("invalidInput");
        inputs.removeClass("validInput");
        return false;
    }
    inputs.addClass("validInput");
    inputs.removeClass("invalidInput");
    return true;
}

function setXmlNodes() {
    var node = getWindow().dialogNode;
    var columnsNodes = node.selectNodes("./*[local-name()='section']/*[local-name()='parameters']/*[local-name()='width']");
    for (var i = 0; i < columnsNodes.getLength(); i++) {
        var columnNode = columnsNodes.item(i);
        var value = $("#col-" + i).val();
        columnNode.setTextContent(value.substring(0, value.length - 1));
    }
}

setXmlNodes = parent.Editor.wrapInTransaction(setXmlNodes);