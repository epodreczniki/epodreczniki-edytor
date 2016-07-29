$(document).ready(function() {
    var node = getWindow().dialogNode;
    var form = $("#exercise_form");
    form.find(".value button").on("click", setActive);
    form.find(".exercise_type .value button").on("click", onExerciveTypeButtonClick);
    form.find(".quiz-group .type .value button").on("click", hideCorrectInSet);
    form.find(".quiz-group .behaviour .value button").on("click", hideCorrectInSet);
    form.find(".quiz-group .type .value button").on("click", hidePresentationStyle);
    form.find(".functional_buttons .save").on("click", saveAndCloseDialog);
    form.find(".functional_buttons .cancel").on("click", function(evt) {
        var dialog = parent.Editor.getModalDialog();
        var dialogNode = node;
        if (isExerciseEmpty(dialogNode)) {
            var parentNode = dialogNode.getParentNode();
            parentNode.removeChild(dialogNode);
        }
        getWindow().dialogNode = null;
        dialog.close();
        return false;
    });
});

function isExerciseEmpty(node) {
    return node !== null && node.getChildNodes().getLength() == 0;
}

function onExerciveTypeButtonClick() {
    var button = $(this);
    $("#exercise_form .category").addClass("hidden");
    switch (button.attr("name")) {
      case "ex":
        $("#exercise_form .interactivity").removeClass("hidden");
        break;

      case "random_quiz":
        $("#exercise_form .quiz-group .category").removeClass("hidden");
        $("#exercise_form .quiz-group .category.type .value button.active").trigger("click");
    }
    return false;
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
    var type = form.find(".exercise_type .value button.active").attr("name");
    var haveToClose = false;
    switch (type) {
      case "ex":
        var interactivity = form.find(".interactivity .value button.active").attr("name");
        node.setAttributeNS(EP_XML_URI, "interactivity", interactivity);
        [ "problem", "solution", "commentary" ].forEach(function(e) {
            var tmp = node.getOwnerDocument().createElementNS(CNX_XML_URI, e);
            node.appendChild(tmp);
        });
        haveToClose = true;
        break;

      case "womi1":
      case "womi2":
        getWindow().exerciseTmp.type = type;
        parent.Editor.getModalDialog().open("html-extra/lister-dialog.html", "Parametry womi", null, false);
        break;

      case "random_quiz":
        var data = getQuizData();
        data["exercise-type"] = type;
        if (!validateQuiz(data)) return;
        createQuiz(node, data);
        haveToClose = true;
        break;
    }
    if (haveToClose) {
        node.makeValid();
        $(".functional_buttons .cancel").click();
    }
}

setXMLNode = parent.Editor.wrapInTransaction(setXMLNode);

function createQuiz(node, data) {
    node.setAttributeNS(EP_XML_URI, "interactivity", data["exercise-type"]);
    var item = makeGeneralQuizNode(node, data);
    if (data.behaviour == "randomize") {
        makeQAQuizMarkup(item, data);
    } else {
        makeSetQuizMarkup(item, data);
    }
    makeGeneralQuizNodeEnd(item);
    cloneAlternative(item.getParentNode());
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

function makeGeneralQuizNode(node, data) {
    var doc = node.getOwnerDocument();
    var alternatives = doc.createElementNS(EP_XML_URI, "alternatives");
    node.appendChild(alternatives);
    var alternative = doc.createElementNS(EP_XML_URI, "alternative");
    alternatives.appendChild(alternative);
    var formats = doc.createElementNS(EP_XML_URI, "formats");
    alternative.appendChild(formats);
    var format = doc.createElementNS(EP_XML_URI, "format");
    formats.appendChild(format);
    format.setTextContent("classicmobile");
    var config = doc.createElementNS(EP_XML_URI, "config");
    alternative.appendChild(config);
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
    var item = doc.createElementNS(QML_XML_URI, "item");
    alternative.appendChild(item);
    item.setAttribute("type", data.type);
    return item;
}

function makeGeneralQuizNodeEnd(node) {
    var doc = node.getOwnerDocument();
    var hint = doc.createElementNS(QML_XML_URI, "hint");
    appendSectionPara(hint);
    node.appendChild(hint);
    var feedback = doc.createElementNS(QML_XML_URI, "feedback");
    appendSectionPara(feedback);
    node.appendChild(feedback);
    var key = doc.createElementNS(QML_XML_URI, "key");
    key.setAttribute("answer", ",");
    node.appendChild(key);
    $.each([ "yes", "no" ], function(k, v) {
        feedback = doc.createElementNS(QML_XML_URI, "feedback");
        appendSectionPara(feedback);
        feedback.setAttribute("correct", v);
        key.appendChild(feedback);
    });
}

function makeQAQuizMarkup(node, data) {
    var doc = node.getOwnerDocument();
    var question = doc.createElementNS(QML_XML_URI, "question");
    appendSectionPara(question);
    node.appendChild(question);
    makeAnswersMarkup(node, data);
}

function makeSetQuizMarkup(node, data) {
    var doc = node.getOwnerDocument();
    var question = doc.createElementNS(QML_XML_URI, "question");
    appendSectionPara(question);
    node.appendChild(question);
    var epeset = doc.createElementNS(EPE_XML_URI, "set");
    node.appendChild(epeset);
    makeAnswersMarkup(epeset, data);
}

function makeAnswersMarkup(node, data) {
    var doc = node.getOwnerDocument();
    var n = data["presented-answers"];
    var correct = !data["correct-in-set"] ? 1 : +data["correct-in-set"].split("-")[0];
    for (var i = 0; i < n; i++) {
        var answer = doc.createElementNS(QML_XML_URI, "answer");
        var response = doc.createElementNS(QML_XML_URI, "response");
        answer.appendChild(response);
        appendSectionPara(response);
        if (i >= correct) {
            answer.setAttributeNS(EPE_XML_URI, "correct", "false");
            if (data.type == "single-response") {
                var hint = doc.createElementNS(QML_XML_URI, "hint");
                answer.appendChild(hint);
                appendSectionPara(hint);
            }
        } else {
            answer.setAttributeNS(EPE_XML_URI, "correct", "true");
        }
        node.appendChild(answer);
    }
}

function appendSectionPara(node) {
    var doc = node.getOwnerDocument();
    var section = doc.createElementNS(EP_XML_URI, "section");
    node.appendChild(section);
    var para = doc.createElementNS(EP_XML_URI, "para");
    section.appendChild(para);
}

function cloneAlternative(alternative) {
    var newAlternative = alternative.cloneNode(true);
    alternative.getParentNode().appendChild(newAlternative);
    var formats = newAlternative.selectSingleNode("./*[local-name()='formats']");
    var format = formats.selectSingleNode("./*[local-name()='format']");
    format.setTextContent("static");
    format = format.cloneNode(true);
    format.setTextContent("static-mono");
    formats.appendChild(format);
}