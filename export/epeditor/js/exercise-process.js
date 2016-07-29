function exerciseProcess(evt) {
    var doc = Editor.getActiveDocument();
    var keys = doc.getElementsByTagNameNS(QML_XML_URI, "key");
    for (var i = 0; i < keys.getLength(); i++) {
        var corrects = keys.item(i).getAttribute("answer").split(",");
        for (var j = 0; j < corrects.length; j++) {
            var id = corrects[j].replace(/ /g, "");
            if (id == "") continue;
            var answer = keys.item(i).getParentNode().selectSingleNode(".//*[@id='" + id + "']");
            answer.setAttributeNS(EPE_XML_URI, "epe:correct", "true");
        }
    }
    var incorrectAnswers = doc.selectNodes(".//*[local-name()='answer' and not(attribute::*[local-name()='correct'])]");
    for (var i = 0; i < incorrectAnswers.getLength(); i++) {
        incorrectAnswers.item(i).setAttributeNS(EPE_XML_URI, "epe:correct", "false");
    }
    var items = doc.selectNodes(".//*[local-name()='alternative']/*[local-name()='item']");
    for (var i = 0; i < items.getLength(); i++) {
        var answersInSets = items.item(i).selectNodes(".//*[local-name()='answer' and attribute::*[local-name()='in-set']]");
        var setSize = 1;
        for (var j = 1; j < answersInSets.getLength(); j++) {
            var ans = answersInSets.item(j);
            var prevAns = answersInSets.item(j - 1);
            if (ans.getAttributeNS(EP_XML_URI, "in-set") == prevAns.getAttributeNS(EP_XML_URI, "in-set")) {
                setSize++;
            } else {
                var set = doc.createElementNS(EPE_XML_URI, "epe:set");
                items.item(i).insertBefore(set, ans);
                for (var k = setSize; k > 0; k--) {
                    set.appendChild(answersInSets.item(j - k));
                }
                setSize = 1;
            }
        }
        if (setSize > 1) {
            var set = doc.createElementNS(EPE_XML_URI, "epe:set");
            items.item(i).insertAfter(set, answersInSets.item(answersInSets.getLength() - 1));
            for (var k = setSize; k > 0; k--) {
                set.appendChild(answersInSets.item(answersInSets.getLength() - k));
            }
        }
    }
}

exerciseProcess = Editor.wrapInTransaction(exerciseProcess);

function updateDateEnd(evt) {
    var doc = Editor.getActiveDocument();
    var dates = doc.getElementsByTagNameNS(EP_XML_URI, "date");
    for (var i = 0; i < dates.getLength(); i++) {
        var date = dates.item(i);
        if (date.selectSingleNode("*[local-name() = 'date-end']") == null) {
            var date_end = doc.createElementNS(EP_XML_URI, "date-end");
            var year = doc.createElementNS(EP_XML_URI, "year");
            date_end.appendChild(year);
            date.appendChild(date_end);
            date.makeValid();
        }
    }
}

updateDateEnd = Editor.wrapInTransaction(updateDateEnd);