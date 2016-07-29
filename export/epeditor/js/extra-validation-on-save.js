var isValidating = false;

function validateDocument(xmlDocument) {
    isValidating = true;
    var root = xmlDocument.selectSingleNode("/*");
    if (!hasContentEditableRole()) {
        return setMetadata(root) && setInlineQuote(root);
    }
    if (!quizExercisesCheckOnSave(xmlDocument)) {
        return false;
    }
    unpackSetAnswers(root);
    saveCorrectExerciseAnswers(root);
    setInlineQuote(root);
    var result = setMetadata(root) && clearWomiMetadata(root) && hasGalleryReferences(root) && hasProprerStudentWork(root) && hasWomiAndGalleryUniqueContentTypes(root) && hasProperRecipient(root) && duplicatedIdCheck(root) && emptyBibEntry(root) && consistencyCheck(root);
    isValidating = false;
    return result;
}

function setMetadata(root) {
    var metadata = root.selectSingleNode("./*[local-name()='metadata']");
    metadata.selectSingleNode("./*[local-name()='revised']").textContent = formatDate(new Date());
    return true;
}

function clearWomiMetadata(root) {
    var womis = root.selectNodes(".//*[local-name()='reference' and ./*[namespace-uri()='" + EPE_XML_URI + "']]");
    for (var i = 0; i < womis.length; i++) {
        var womi = womis.item(i);
        var metadata = womi.selectNodes("./*[namespace-uri()='" + EPE_XML_URI + "']");
        for (var j = 0; j < metadata.length; j++) {
            womi.removeChild(metadata.item(j));
        }
    }
    return true;
}

function saveCorrectExerciseAnswers(root) {
    var keys = root.selectNodes("//*[local-name()='alternative']/*[local-name()='item']/*[local-name()='key']");
    for (var i = 0; i < keys.length; i++) {
        var key = keys.item(i);
        if (key.nodeName == "q:key") {
            var answers = key.parentNode.selectNodes("./*[local-name()='answer']");
            var ids = "";
            for (var j = 0; j < answers.length; j++) {
                if (answers.item(j).getAttribute("epe:correct") == "true") {
                    ids = ids.concat(answers.item(j).getAttribute("id"), ",");
                }
                answers.item(j).removeAttributeNS(EPE_XML_URI, "correct");
            }
            if (ids.length > 0) {
                ids = ids.slice(0, -1);
            }
            key.setAttribute("answer", ids);
        }
    }
}

function unpackSetAnswers(root) {
    var items = root.selectNodes("//*[local-name()='alternative']/*[local-name()='item']");
    for (var j = 0; j < items.length; j++) {
        var sets = items.item(j).selectNodes("./*[local-name()='set']");
        for (var i = 0; i < sets.length; i++) {
            var set = sets.item(i);
            while (set.firstChild) {
                set.firstChild.setAttributeNS(EP_XML_URI, "ep:in-set", i + 1);
                set.parentNode.insertBefore(set.firstChild, set);
            }
            set.parentNode.removeChild(set);
        }
    }
}

function formatDate(date) {
    var dst = date.toString();
    dst = dst.substring(dst.lastIndexOf("(") + 1, dst.lastIndexOf(")"));
    return "{0}-{1}-{2} {3}:{4} {5}".format(date.getFullYear(), (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1), (date.getDate() < 10 ? "0" : "") + date.getDate(), (date.getHours() < 10 ? "0" : "") + date.getHours(), (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(), dst);
}

function hasGalleryReferences(root) {
    var gallery = root.selectSingleNode("//*[local-name()='gallery' and count(./*[local-name()='reference']) <=1]");
    if (gallery === null) return true;
    openDialog(null, gallery, "html-extra/cannot-save/gallery.html", "Błąd walidacji");
    return false;
}

function hasProprerStudentWork(root) {
    var studentWorkList = root.selectNodes("//*[local-name()='student-work']");
    for (var i = 0; i < studentWorkList.length; i++) {
        var studentWork = studentWorkList.item(i);
        if (studentWork.children.length == 0) {
            openDialog(null, studentWork, "html-extra/cannot-save/student-work.html", "Błąd walidacji");
            return false;
        }
        console.log("is exercise-set before", studentWork.getAttribute("ep:type"), studentWork.getAttribute("ep:type") == "exercise-set", studentWork.getAttributeNode("ep:type"));
        if (studentWork.selectNodes("./@*[local-name()='type' and .='exercise-set']").length > 0) {
            if (studentWork.children.length < 2 || studentWork.firstChild.localName != "problem") {
                openDialog(null, studentWork, "html-extra/cannot-save/exercise-set.html", "Błąd walidacji");
                return false;
            }
            console.log("localName != exercise before");
            for (var j = 1; j < studentWork.children.length; j++) {
                if (studentWork.children[j].localName != "exercise") {
                    openDialog(null, studentWork, "html-extra/cannot-save/exercise-set.html", "Błąd walidacji");
                    return false;
                }
            }
        }
    }
    console.log("return true");
    return true;
}

function hasWomiAndGalleryUniqueContentTypes(root) {
    var womis = root.selectNodes("//*[local-name()='reference']");
    var galleries = root.selectNodes("//*[local-name()='gallery']");
    return hasUniqueContent(womis) && hasUniqueContent(galleries);
}

function hasUniqueContent(nodes) {
    var clear = true;
    for (var i = 0; clear && i < nodes.length; i++) {
        var node = nodes.item(i);
        var contentNodes = node.selectNodes("./*[local-name()='content']");
        if (contentNodes.length > 4) {
            clear = false;
            break;
        }
        if (contentNodes.length <= 1) continue;
        var formats = [];
        for (var j = 0; j < contentNodes.length; j++) formats.push(contentNodes.item(j).getAttributeNS(EP_XML_URI, "format"));
        formats = formats.filter(function(itm, i, a) {
            return i == a.indexOf(itm);
        });
        if (contentNodes.length != formats.length) {
            openDialog(null, node, "html-extra/cannot-save/unique-content-format.html", "Błąd walidacji");
            clear = false;
        }
    }
    return clear;
}

function hasExerciseWomiCorrectType(root) {
    var womis = root.selectNodes("//*[local-name()='exercise']/*[local-name()='reference']");
    for (var i = 0; i < womis.length; i++) {
        var womi = womis.item(i);
        var womiType = womi.selectSingleNode("*[local-name()='womiType']");
        if (womiType == null || womiType.textContent != "interactive") {
            openDialog(null, womi, "html-extra/cannot-save/exercise-womi-type.html", "Błąd walidacji");
            return false;
        }
    }
    return true;
}

function hasProperRecipient(root) {
    var metadata = root.selectSingleNode("./*[local-name()='metadata']");
    var result = true;
    var isMetaTeacher = metadata.selectSingleNode("./*[local-name()='e-textbook-module']/@*[local-name()='recipient' and . = 'teacher']") !== null;
    if (isMetaTeacher) {
        var content = root.selectSingleNode("./*[local-name()='content']");
        var wrongSection = content.selectSingleNode("./*[local-name()='section'][@*[local-name()='recipient' and . = 'student']]");
        if (wrongSection !== null) {
            result = false;
            var s = Editor.getScope();
            if (metadataViewCommand.getChecked(s)) metadataViewCommand.execute(s);
            openDialog(null, wrongSection, "html-extra/cannot-save/section-recipient-student.html", "Błąd walidacji");
        }
    }
    var isMetaExpanding = metadata.selectSingleNode("./*[local-name()='e-textbook-module']/@*[local-name()='content-status' and . = 'expanding']") !== null;
    if (isMetaExpanding) {
        var content = root.selectSingleNode("./*[local-name()='content']");
        var wrongSection = content.selectSingleNode("./*[local-name()='section'][@*[local-name()='content-status' and . = 'canon']]");
        if (wrongSection !== null) {
            result = false;
            var s = Editor.getScope();
            if (metadataViewCommand.getChecked(s)) metadataViewCommand.execute(s);
            openDialog(null, wrongSection, "html-extra/cannot-save/section-contentstatus-canon.html", "Błąd walidacji");
        }
    }
    return result;
}

function quizExercisesCheckOnSave(xmlDocument) {
    var doc = Editor.getActiveDocument();
    var imported = doc.importNode(xmlDocument.documentElement, true);
    var exercises = imported.selectNodes("//*[local-name()='exercise' and @*[local-name()='interactivity']='random_quiz']");
    for (var i = 0; i < exercises.getLength(); i++) {
        var e = exercises.item(i);
        var validator = new ExerciseValidator(e);
        if (!validator.isValid()) {
            openDialog(null, null, "html-extra/cannot-save/exercise.html", "Błąd walidacji");
            var sectionId = openNodePage(e.getAttribute("id"));
            sleepAndTriggerClickOnExercise(sectionId);
            return false;
        }
    }
    cleanUpOldExerciseValidationMarkup();
    return true;
}

function openNodePage(id) {
    var doc = Editor.getActiveDocument();
    var section = doc.selectSingleNode("/*[local-name()='document']/*[local-name()='content']/*[local-name()='section' and descendant-or-self::*[./@*[local-name()='id' and .='" + id + "']]]");
    if (section.selectSingleNode("./*[local-name()='parameters']/*[local-name()='start-new-page' and .='true']") === null) section = section.selectSingleNode("preceding-sibling::*[local-name()='section' and ./*[local-name()='parameters']/*[local-name()='start-new-page' and .='true'] ]");
    if (section === null) return null;
    var sectionId = section.getAttribute("id");
    prevShowPage = sectionId + "_page";
    Editor.getActiveCanvas().setViewParam("showPage", sectionId + "_page");
    setViewToCurrentPage({
        target: Editor
    });
    return sectionId;
}

function sleepAndTriggerClickOnExercise(sectionId) {
    setTimeout(function() {
        var sectionSelector = !!sectionId ? "#" + sectionId + "_page " : "";
        var tmp = $(sectionSelector + ".exercise .validation button.check");
        if (tmp.length == 0) sleepAndTriggerClickOnExercise(sectionId); else {
            $(sectionSelector + ".exercise .validation .status").removeClass("invalid");
            tmp.trigger("click");
            sleepAndFocusOnExercise(sectionSelector);
        }
    }, 100);
}

function sleepAndFocusOnExercise(sectionSelector) {
    setTimeout(function() {
        var tmp = $(sectionSelector + ".exercise .validation .status.invalid:first");
        if (tmp.length == 0) sleepAndFocusOnExercise(sectionSelector); else window.location.hash = "#" + tmp.closest("[id]").attr("id");
    }, 100);
}

function cleanUpOldExerciseValidationMarkup() {
    var e = $(".exercise");
    e.find(".validation .status").removeClass("invalid");
    e.find(".validation-messages").addClass("hidden");
}

function duplicatedIdCheck(root) {
    var doc = Editor.getActiveDocument();
    var duplicatedSectionsNative = root.selectNodes("//*[local-name()='section' and @*[local-name()='id'] = (preceding::*[local-name()='section']/@*[local-name()='id'])]");
    var duplicatedSectionsXopus = doc.getDocumentElement().selectNodes("//*[local-name()='section' and @*[local-name()='id'] = (preceding::*[local-name()='section']/@*[local-name()='id'])]");
    for (var i = 0; i < duplicatedSectionsXopus.getLength(); i++) {
        var sectionXopus = duplicatedSectionsXopus.item(i);
        var id = generateNextId(sectionXopus);
        sectionXopus.setAttribute("id", id);
        var sectionNative = duplicatedSectionsNative.item(i);
        sectionNative.setAttribute("id", id);
    }
    var duplicatedParagraphsNative = root.selectNodes("//*[local-name()='para' and @*[local-name()='id'] = (preceding::*[local-name()='para']/@*[local-name()='id'])]");
    var duplicatedParagraphsXopus = doc.getDocumentElement().selectNodes("//*[local-name()='para' and @*[local-name()='id'] = (preceding::*[local-name()='para']/@*[local-name()='id'])]");
    for (var i = 0; i < duplicatedParagraphsXopus.getLength(); i++) {
        var paraXopus = duplicatedParagraphsXopus.item(i);
        var id = generateNextId(paraXopus);
        paraXopus.setAttribute("id", id);
        var paraNative = duplicatedParagraphsNative.item(i);
        paraNative.setAttribute("id", id);
    }
    return true;
}

function emptyBibEntry(root) {
    var entry = root.selectSingleNode("./*[local-name()='file']/*[local-name()='entry' and not(./*)]");
    if (!!entry) {
        openDialog(null, entry, "html-extra/cannot-save/empty-entry.html", "Błąd walidacji");
        return false;
    }
    return true;
}

function validateStretchAttribute(root) {
    var para = root.selectSingleNode("./*[local-name()='content']/*[local-name()='section']/*[local-name()='section']//*[local-name()='para' and ./@*[local-name()='stretch']]");
    if (!!para) {
        openDialog(null, para, "html-extra/cannot-save/para-stretch-param.html", "Błąd walidacji");
        return false;
    }
    var exercise = root.selectSingleNode("./*[local-name()='content']/*[local-name()='section']/*[local-name()='section']//*[local-name()='exercise' and ./@*[local-name()='stretch']]");
    if (!!exercise) {
        openDialog(null, exercise, "html-extra/cannot-save/exercise-stretch-param.html", "Błąd walidacji");
        return false;
    }
    var section = root.selectSingleNode("./*[local-name()='content']/*[local-name()='section' and count(./*[local-name()='section'])<=1 and ./*[local-name()='parameters']/*[local-name()='stretch']]");
    if (!!section) {
        openDialog(null, section, "html-extra/cannot-save/section-stretch-param.html", "Błąd walidacji");
        return false;
    }
    return true;
}

function setInlineQuote(root) {
    var quotes = root.selectNodes("//*[local-name()='quote' and not(./*[local-name()='para'])]");
    for (var i = 0; i < quotes.length; i++) {
        quotes.item(i).setAttribute("display", "inline");
    }
    return true;
}
