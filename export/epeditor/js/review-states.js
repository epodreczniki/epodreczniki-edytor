function reviewStateChange(comment, newState) {
    INSERT_REVIEW = true;
    var review = comment.getParentNode();
    var doc = Editor.getActiveDocument();
    var comm = doc.createElementNS(EPE_XML_URI, "epe:comment");
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-author", getUserName());
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-date", getCurrentDate());
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-state", newState);
    var id = generateNextId(comm);
    comm.setAttributeNS(EPE_XML_URI, "epe:id", id);
    review.appendChild(comm);
    INSERT_REVIEW = false;
}

function reviewAddComment(comment) {
    INSERT_REVIEW = true;
    var review = comment.getParentNode();
    var doc = Editor.getActiveDocument();
    var comm = doc.createElementNS(EPE_XML_URI, "epe:comment");
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-author", getUserName());
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-date", getCurrentDate());
    var lastComm = review.selectSingleNode("./*[local-name()='comment'][last()]");
    var state = lastComm.getAttributeNS(EPE_XML_URI, "comment-state");
    comm.setAttributeNS(EPE_XML_URI, "epe:comment-state", state);
    var id = generateNextId(comm);
    comm.setAttributeNS(EPE_XML_URI, "epe:id", id);
    var para = doc.createElementNS(CNX_XML_URI, "para");
    para.setAttribute("id", generateNextId(para));
    comm.appendChild(para);
    review.appendChild(comm);
    setCursorFocusOn(para);
    INSERT_REVIEW = false;
}

function getCurrentDate() {
    var d = new Date();
    var n = d.getTime() - 60 * 60 * 1e3;
    d.setTime(n);
    var data = d.getFullYear() + "-" + addZero(d.getMonth() + 1) + "-" + addZero(d.getDate()) + "T" + addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds()) + "-01:00";
    return data;
}

function addZero(number) {
    return number < 10 ? "0" + number : number;
}

function preventReviewSplit(evt) {
    var target = evt.target;
    if (target.getLocalName() == "review") {
        throw new Editor.RevertingException();
    }
}

function focusAfterRevieInsert(evt) {
    var node = evt.childNode;
    if (node.getLocalName() == "review") {
        node = node.selectSingleNode("./*[local-name()='comment']/*[local-name()='para']");
        setTimeout(function() {
            if (!!node && !!node.getParentNode()) setCursorFocusOn(node);
        }, 100);
    }
    if (node.getLocalName() == "comment") {
        node = node.selectSingleNode("./*[local-name()='para']");
        setTimeout(function() {
            if (!!node && !!node.getParentNode()) setCursorFocusOn(node);
        }, 100);
    }
}