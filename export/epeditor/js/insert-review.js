function insertReview(evt) {
    if (evt.target === null) return;
    if (evt.target.getNodeName() == "epe:review" && evt.childNode.getNodeName() == "epe:comment" && evt.target.selectNodes("./*[local-name()='comment']").getLength() == 1) {
        var comm = evt.target.selectSingleNode("./*[local-name()='comment']");
        comm.setAttributeNS(EPE_XML_URI, "epe:comment-author", getUserName());
        comm.removeAttribute("id");
        comm.setAttributeNS(EPE_XML_URI, "epe:id", generateNextId(comm));
        var doc = Editor.getActiveDocument();
        var para = doc.createElementNS(CNX_XML_URI, "para");
        para.setAttribute("id", generateNextId(para));
        comm.appendChild(para);
        showReviewPanel();
    }
}

function showNoReviews() {
    var s = Editor.getScope();
    if (showReviewsCommand.getChecked(s) && Editor.getActiveCanvas().getViewParam("fullReviewMode") != "") showReviewsCommand.execute(s);
}

function showReviewPanel() {
    var s = Editor.getScope();
    if (!showReviewsCommand.getChecked(s)) showReviewsCommand.execute(s);
}

function showReviewReport() {
    var s = Editor.getScope();
    if (showReviewsCommand.getChecked(s) && Editor.getActiveCanvas().getViewParam("fullReviewMode") == "") showReviewsCommand.execute(s);
}

function insertReviewInReview(evt) {
    if (evt.target === null) return;
    if (evt.childNode.getNodeName() == "epe:review") {
        var reviewAncestors = evt.target.selectNodes("./ancestor-or-self::*[local-name()='review']");
        if (reviewAncestors.getLength() > 0) {
            throw new Editor.RevertingException();
        }
    }
}

function authorReviewInsertBlock(evt) {
    if (evt.childNode.getLocalName() == "review") {
        if (!getUserRoles().contains(REVIEWER_ROLE)) {
            throw new Editor.RevertingException();
        }
    }
}

function pasteReview(evt) {
    var i = 0;
    while (evt.contents[i] != undefined) {
        if (evt.contents[i].getLocalName() == "review") {
            var arr = [];
            arr = evt.contents;
            var children = evt.contents[i].selectNodes("./node()[local-name()!='comment']");
            for (var j = children.getLength() - 1; j >= 0; j--) {
                arr.splice(i + 1, 0, children.item(j));
            }
            arr.splice(i, 1);
        } else {
            var descReviews = evt.contents[i].selectNodes(".//*[local-name()='review']");
            for (var k = 0; k < descReviews.getLength(); k++) {
                var review = descReviews.item(k);
                var reviewParent = review.getParentNode();
                var reviewChildren = review.selectNodes("./node()[local-name()!='comment']");
                for (var m = 0; m < reviewChildren.getLength(); m++) {
                    reviewParent.insertBefore(reviewChildren.item(m), review);
                }
                reviewParent.removeChild(review);
            }
        }
        i++;
    }
}