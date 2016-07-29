$(document).ready(function() {
    getWindow().dialogNode = getWindow().dialogNode.selectSingleNode("./*[local-name()='alternatives']/*[local-name()='alternative' and //*[local-name()='format' and .='classicmobile'] ]");
    var node = getWindow().dialogNode;
    var form = $("#exercise_form");
    form.find(".value button").on("click", setActive);
    form.find(".quiz-group .type .value button").on("click", hideCorrectInSet);
    form.find(".quiz-group .behaviour .value button").on("click", hideCorrectInSet);
    form.find(".quiz-group .type .value button").on("click", hidePresentationStyle);
    form.find(".functional_buttons .save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons .cancel").on("click", function() {
        setTimeout(function() {
            $(getWindow().exerciseTmp.elementNode).closest(".validation").find(".check").trigger("click");
        }, 20);
        closeDialog();
        return false;
    });
    initForm(node, form);
});

function initForm(node, form) {
    var tmpNode;
    var value = node.selectSingleNode("./*[local-name()='item']").getAttribute("type");
    form.find(".type ." + value).trigger("click");
    value = node.selectSingleNode("./*[local-name()='config']/*[local-name()='behaviour']").getTextContent();
    form.find(".behaviour ." + value).trigger("click");
    value = node.selectSingleNode("./*[local-name()='config']/*[local-name()='presented-answers']").getTextContent();
    form.find(".presented-answers .value input").val(value);
    tmpNode = node.selectSingleNode("./*[local-name()='config']/*[local-name()='correct-in-set']");
    if (!!tmpNode) form.find(".correct-in-set .value input").val(tmpNode.getTextContent());
    tmpNode = node.selectSingleNode("./*[local-name()='config']/*[local-name()='presentation-style']");
    if (!!tmpNode) form.find(".presentation-style .value input").prop("checked", tmpNode.getTextContent() == "true-false");
}

function setActive() {
    var e = $(this);
    e.closest(".value").find("button").removeClass("active");
    e.addClass("active");
    return false;
}

function hideCorrectInSet() {
    var e = $("#exercise_form .quiz-group .category.correct-in-set");
    var hide = $("#exercise_form .quiz-group .category.type button.active").attr("name") == "single-response" || $("#exercise_form .quiz-group .category.behaviour button.active").attr("name") != "randomize";
    if (hide) {
        e.closest(".category").addClass("hidden");
    } else {
        e.closest(".category").removeClass("hidden");
    }
}

function hidePresentationStyle() {
    var e = $("#exercise_form .quiz-group .category.presentation-style");
    if ($(this).attr("name") == "single-response") {
        e.closest(".category").addClass("hidden");
    } else {
        e.closest(".category").removeClass("hidden");
    }
}

function saveAndCloseDialog() {
    var node = getWindow().dialogNode;
    setXMLNode(node);
    return false;
}

function setXMLNode(node) {
    var form = $("#exercise_form");
    var data = getQuizData();
    if (!validateQuiz(data)) return;
    updateQuiz(node, data);
    node.makeValid();
    $(".functional_buttons .cancel").click();
}

setXMLNode = parent.Editor.wrapInTransaction(setXMLNode);

function updateQuiz(node, data) {
    var item = updateGeneralQuizNode(node, data);
    if (data.behaviour == "randomize") {
        updateQAQuizMarkup(item, data);
    } else {
        updateSetQuizMarkup(item, data);
    }
}

function getQuizData() {
    var result = {};
    var categories = $("#exercise_form .quiz-group");
    $.each([ "type", "behaviour" ], function(i, v) {
        result[v] = categories.find("." + v + " .value button.active").attr("name");
    });
    $.each([ "presented-answers", "correct-in-set" ], function(i, v) {
        result[v] = categories.find("." + v + " .value input").val();
    });
    result["presentation-style"] = categories.find(".presentation-style .value input").prop("checked");
    return result;
}

function validateQuiz(data) {
    var result = true;
    var categories = $("#exercise_form .quiz-group");
    var isSingleResponse = data.type == "single-response";
    var correctInSetMatchRegex = /^([0-9]+-)?[1-9][0-9]*$/.test(data["correct-in-set"]);
    if (!isSingleResponse && !correctInSetMatchRegex) {
        categories.find(".correct-in-set").addClass("invalidInput");
        result = false;
    } else if (!isSingleResponse) {
        var splited = data["correct-in-set"].split("-");
        if (splited.length == 2 && splited[0] > splited[1]) {
            categories.find(".correct-in-set").addClass("invalidInput");
            result = false;
        }
    }
    if (!isDecimal(data["presented-answers"])) {
        categories.find(".presented-answers").addClass("invalidInput");
        result = false;
    }
    if (!isSingleResponse && +data["correct-in-set"].split("-")[0] > data["presented-answers"]) {
        categories.find(".correct-in-set").addClass("invalidInput");
        categories.find(".presented-answers").addClass("invalidInput");
        result = false;
    }
    if (result) {
        categories.find(".correct-in-set").removeClass("invalidInput");
        categories.find(".presented-answers").removeClass("invalidInput");
    }
    return result;
}

function updateGeneralQuizNode(node, data) {
    var doc = node.getOwnerDocument();
    var config = node.selectSingleNode("./*[local-name()='config']");
    node.removeChild(config);
    var formats = node.selectSingleNode("./*[local-name()='formats']");
    config = doc.createElementNS(EP_XML_URI, "config");
    node.insertAfter(config, formats);
    var behaviour = doc.createElementNS(EP_XML_URI, "behaviour");
    config.appendChild(behaviour);
    behaviour.setTextContent(data["behaviour"]);
    var presentedAnswers = doc.createElementNS(EP_XML_URI, "presented-answers");
    config.appendChild(presentedAnswers);
    presentedAnswers.setTextContent(data["presented-answers"]);
    if (data.type == "multiple-response") {
        if (data["behaviour"] == "randomize") {
            var correctInSet = doc.createElementNS(EP_XML_URI, "correct-in-set");
            config.appendChild(correctInSet);
            correctInSet.setTextContent(data["correct-in-set"]);
        }
        if (data["presentation-style"]) {
            var presentationStyle = doc.createElementNS(EP_XML_URI, "presentation-style");
            config.appendChild(presentationStyle);
            presentationStyle.setTextContent("true-false");
        }
    }
    var item = node.selectSingleNode("./*[local-name()='item']");
    item.setAttribute("type", data.type);
    return item;
}

function updateQAQuizMarkup(node, data) {
    var doc = node.getOwnerDocument();
    var question = node.selectSingleNode("./*[local-name()='question']");
    var sets = node.selectNodes("./*[local-name()='set']");
    for (var i = sets.getLength() - 1; i >= 0; i--) {
        var answer = null, epeset = sets.item(i);
        while (answer = epeset.getLastChild()) {
            answer = node.insertAfter(answer, question);
            var hint = answer.selectSingleNode("./*[local-name()='hint']");
            if (!!hint && (!hint.getTextContent() || hint.getTextContent().getLength == 0)) answer.removeChild(hint);
        }
        node.removeChild(epeset);
    }
}

function updateSetQuizMarkup(node, data) {
    var doc = node.getOwnerDocument();
    var question = node.selectSingleNode("./*[local-name()='question']");
    var epeset = node.selectSingleNode("./*[local-name()='set']");
    if (!epeset) {
        epeset = doc.createElementNS(EPE_XML_URI, "set");
        node.insertAfter(epeset, question);
        var answers = node.selectNodes("./*[local-name()='answer']");
        for (var i = 0; i < answers.getLength(); i++) epeset.appendChild(answers.item(i));
    }
}