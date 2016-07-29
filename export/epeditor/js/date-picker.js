function setEPDateValues(node, value, type, bc) {
    var values = value.split(".");
    node.selectSingleNode("./@*[local-name() = 'type']").setNodeValue(type);
    var tmp = node.selectSingleNode("./*[local-name() = 'date-start']");
    var redundantNode;
    if (tmp === null) return;
    switch (type) {
      case "date":
        setChildOrCreate(tmp, "month", values[1]);
        setChildOrCreate(tmp, "day", values[0]);
        setChildOrCreate(tmp, "year", (bc ? "-" : "") + values[2]);
        redundantNode = node.selectSingleNode("./*[local-name() = 'date-end']");
        if (redundantNode !== null) node.removeChild(redundantNode);
        break;

      case "year":
      case "around-year":
        setChildOrCreate(tmp, "year", (bc ? "-" : "") + value);
        redundantNode = tmp.selectSingleNode("./*[local-name() = 'day']");
        if (redundantNode !== null) tmp.removeChild(redundantNode);
        redundantNode = tmp.selectSingleNode("./*[local-name() = 'month']");
        if (redundantNode !== null) tmp.removeChild(redundantNode);
        redundantNode = node.selectSingleNode("./*[local-name() = 'date-end']");
        if (redundantNode !== null) node.removeChild(redundantNode);
        break;

      case "century":
      case "beginning-of-century":
      case "end-of-century":
      case "turn-of-century":
      case "middle-of-century":
        var value = deromanize(value);
        if (bc) {
            value = -value;
            setChildOrCreate(tmp, "year", value * 100);
            tmp = getChildOrCreate(node, "date-end");
            setChildOrCreate(tmp, "year", (value + 1) * 100 - 1);
        } else {
            setChildOrCreate(tmp, "year", (value - 1) * 100 + 1);
            tmp = getChildOrCreate(node, "date-end");
            setChildOrCreate(tmp, "year", value * 100);
        }
        tmp = node.selectSingleNode("./*[local-name() = 'date-start']");
        redundantNode = tmp.selectSingleNode("./*[local-name() = 'day']");
        if (redundantNode !== null) tmp.removeChild(redundantNode);
        redundantNode = tmp.selectSingleNode("./*[local-name() = 'month']");
        if (redundantNode !== null) tmp.removeChild(redundantNode);
        break;
    }
}

setEPDateValues = parent.Editor.wrapInTransaction(setEPDateValues);

function saveAndCloseDialog() {
    var node = getWindow().dialogNode;
    var form = $("#date_form");
    var value = form.find(".form_grid .value input").filter(function() {
        return this.value.length !== 0;
    }).val();
    var type = cssToEpDateType(form.find(".date_type .value .active").attr("id"));
    var bc = form.find(".form_grid .value .e_buttons button.bc.active").length > 0;
    if (validateDateValue(value, type)) {
        setEPDateValues(node, value, type, bc);
        closeDialog();
    }
    return false;
}

function formValidator() {
    var form = $("#date_form");
    var value = form.find(".form_grid .value input").filter(function() {
        return this.value.length !== 0;
    });
    var type = cssToEpDateType(form.find(".date_type .value .active").attr("id"));
    if (validateDateValue(value.val(), type)) {
        value.addClass("validInput");
        value.removeClass("invalidInput");
    } else {
        value.addClass("invalidInput");
        value.removeClass("validInput");
    }
}

function cssToEpDateType(cssVal) {
    switch (cssVal) {
      case "date":
      case "year":
      case "century":
        return cssVal;

      case "about_year":
        return "around-year";

      case "century_start":
        return "beginning-of-century";

      case "century_end":
        return "end-of-century";

      case "century_middle":
        return "middle-of-century";

      case "between_centuries":
        return "turn-of-century";
    }
    return null;
}

function epDateTypeToCss(epVal) {
    switch (epVal) {
      case "date":
      case "year":
      case "century":
        return epVal;

      case "around-year":
        return "about_year";

      case "beginning-of-century":
        return "century_start";

      case "end-of-century":
        return "century_end";

      case "turn-of-century":
        return "between_centuries";

      case "middle-of-century":
        return "century_middle";
    }
    return null;
}

function validateDateValue(value, type) {
    if (value == "") return false;
    var pattern = null;
    switch (type) {
      case "date":
        pattern = new RegExp(/^(([0-2][0-9])|(3[0-1]))\.((0[1-9])|(1[0-2]))\.([1-9][0-9]{0,3})$/);
        break;

      case "year":
      case "around-year":
        pattern = new RegExp(/^[1-9][0-9]*$/);
        break;

      case "century":
      case "beginning-of-century":
      case "end-of-century":
      case "turn-of-century":
      case "middle-of-century":
        pattern = new RegExp(/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/);
        break;
    }
    return pattern != null && pattern.test(value);
}

function dateNodeToString(node) {
    var result = null;
    var tmp = node.selectSingleNode("./*[local-name() = 'date-start']");
    if (tmp === null) return null;
    switch (node.selectSingleNode("./@*[local-name() = 'type']").getNodeValue()) {
      case "date":
        result = tmp.selectSingleNode("./*[local-name() = 'day']").getTextContent() + ".";
        result = result + tmp.selectSingleNode("./*[local-name() = 'month']").getTextContent() + ".";
        result = result + Math.abs(parseInt(tmp.selectSingleNode("./*[local-name() = 'year']").getTextContent()));
        break;

      case "year":
      case "around-year":
        result = Math.abs(parseInt(tmp.selectSingleNode("./*[local-name() = 'year']").getTextContent()));
        break;

      case "century":
      case "beginning-of-century":
      case "turn-of-century":
      case "end-of-century":
      case "middle-of-century":
        result = tmp.selectSingleNode("./*[local-name() = 'year']").getTextContent();
        result = romanize(Math.abs(Math.floor(parseInt(result) / 100)) + (result[0] != "-"));
        break;
    }
    return result;
}

function onBCButtonClick() {
    var bc = $(this).hasClass("bc");
    var type = $("#date_form .date_type .value .active").attr("id");
    setBCButtons(type, bc);
    return false;
}

function setBCButtonsByNode(type) {
    var node = getWindow().dialogNode;
    var bc = parseInt(node.selectSingleNode("./*[local-name() = 'date-start']/*[local-name() = 'year']").getTextContent()) < 0;
    setBCButtons(type, bc);
}

function setBCButtons(type, bc) {
    var form = $("#date_form");
    form.find(".form_grid .value .e_buttons button").removeClass("active");
    if (bc) form.find(".form_grid ." + type + " .value .e_buttons button.bc").addClass("active"); else form.find(".form_grid ." + type + " .value .e_buttons button.ad").addClass("active");
}

function onTypeButtonClicked() {
    var form = $("#date_form");
    var currentInput = form.find(".form_grid .value input").filter(function() {
        return this.value.length !== 0;
    });
    var inputVal = currentInput.val();
    currentInput.val("");
    form.find(".date_type .value .active").removeClass("active");
    $(this).addClass("active");
    form.find(".form_grid .category:not(.date_type)").css("display", "none");
    form.find(".form_grid ." + $(this).attr("id")).css("display", "block");
    form.find(".form_grid ." + $(this).attr("id") + " .value input").val(inputVal);
    setBCButtonsByNode($(this).attr("id"));
    formValidator();
    return false;
}

$(document).ready(function() {
    var node = getWindow().dialogNode;
    var type = epDateTypeToCss(node.selectSingleNode("./@*[local-name() = 'type']").getNodeValue());
    var form = $("#date_form");
    parent.Editor.getModalDialog().resizeTo(form.outerWidth(true), form.outerHeight(true) + 95);
    console.log(form.outerWidth(true), form.outerHeight(true) + 95);
    form.find(".date_type .value #" + type).addClass("active");
    form.find(".form_grid ." + type).css("display", "block");
    form.find(".form_grid ." + type + " .value input").val(dateNodeToString(node));
    form.find(".date_type .value button").on("click", onTypeButtonClicked);
    form.find(".form_grid .value .e_buttons button").on("click", onBCButtonClick);
    form.find(".functional_buttons .save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons .cancel").on("click", closeDialog);
    form.find(".form_grid .value input").on("change", formValidator);
    setBCButtonsByNode(type);
    formValidator();
});

function romanize(num) {
    if (!+num) return false;
    var digits = String(+num).split(""), key = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ], roman = "", i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
    var str = str.toUpperCase(), validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/, token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, key = {
        M: 1e3,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }, num = 0, m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
}