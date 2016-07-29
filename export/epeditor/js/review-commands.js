Editor.getScope().declare("show", false);

var showReviewsCommand = {
    execute: function(scope) {
        var firstReview = Editor.getActiveCanvas().getDocument().selectSingleNode(".//*[local-name()='review']");
        if (firstReview != null) {
            var reviewId = firstReview.getAttributeNS(EPE_XML_URI, "id");
        } else {
            var reviewId = "";
        }
        var button = parent.document.getElementsByClassName("custom-toolbarbutton-icon")[0];
        if (Editor.getActiveCanvas().getViewParam("showReviews") == "true") {
            if (Editor.getActiveCanvas().getViewParam("fullReviewMode") == "" && reviewId != "") {
                Editor.getActiveCanvas().setViewParam("showReviews", "true");
                Editor.getActiveCanvas().setViewParam("fullReviewMode", reviewId);
                scope.set("show", false);
                scope.set("show", true);
                button.style.backgroundImage = "url('../epeditor/icons/showNoReview.gif')";
            } else {
                Editor.getActiveCanvas().setViewParam("showReviews", "false");
                Editor.getActiveCanvas().setViewParam("fullReviewMode", "");
                scope.set("show", false);
                button.style.backgroundImage = "url('../epeditor/icons/showReviewPanel.gif')";
            }
        } else {
            Editor.getActiveCanvas().setViewParam("showReviews", "true");
            Editor.getActiveCanvas().setViewParam("fullReviewMode", "");
            scope.set("show", true);
            button.style.backgroundImage = "url('../epeditor/icons/showReviewRaport.gif')";
        }
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        return !!canvas;
    },
    getChecked: function(scope) {
        return scope.get("show");
    },
    getLabel: function(scope) {
        if (scope.get("show")) {
            if (Editor.getActiveCanvas().getViewParam("fullReviewMode") == "") return "Pokaż raport recenzji"; else return "Ukryj recenzje";
        } else return "Pokaż panel recenzji";
    }
};

Editor.addCommand("showReviewsCommand", showReviewsCommand);

function insertReviewExecute(scope) {
    INSERT_REVIEW = true;
    var range = Editor.Selection.getRange();
    var document = Editor.getActiveDocument();
    var rangeStartReviewAncestors = range.getStartContainer().selectNodes("./ancestor-or-self::*[local-name()='review']");
    var rangeEndReviewAncestors = range.getEndContainer().selectNodes("./ancestor-or-self::*[local-name()='review']");
    if (rangeStartReviewAncestors.getLength() > 0 || rangeEndReviewAncestors.getLength() > 0 || hasAncestorDocumentTitle(range)) {
        INSERT_REVIEW = false;
        return;
    }
    var review = document.createElementNS(EPE_XML_URI, "review");
    review.setAttributeNS(EPE_XML_URI, "epe:id", generateNextId(review));
    var comment = document.createElementNS(EPE_XML_URI, "comment");
    comment.setAttributeNS(EPE_XML_URI, "epe:comment-author", getUserName());
    comment.setAttributeNS(EPE_XML_URI, "epe:comment-date", getCurrentDate());
    comment.setAttributeNS(EPE_XML_URI, "epe:comment-state", "opened");
    var id = generateNextId(comment);
    comment.setAttributeNS(EPE_XML_URI, "epe:id", id);
    var para = document.createElementNS(CNX_XML_URI, "para");
    para.setAttribute("id", generateNextId(para));
    comment.appendChild(para);
    var revied = range.cloneContents();
    review.appendChild(revied);
    review.appendChild(comment);
    range.deleteContents();
    range.insertNode(review);
    INSERT_REVIEW = false;
    s = Editor.getScope();
    if (!showReviewsCommand.getChecked(s)) showReviewsCommand.execute(s);
}

insertReviewExecute = Editor.wrapInTransaction(insertReviewExecute);

function contentsReview(elem) {
    if (elem.getLocalName() == "review") {
        return true;
    } else {
        var children = elem.getChildNodes();
        for (var i = 0; i < children.getLength(); i++) {
            if (contentsReview(children.item(i))) return true;
        }
        return false;
    }
}

Editor.getScope().declare("insertR", false);

var insertReviewCommand = {
    execute: function(scope) {
        insertReviewExecute(scope);
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        if (!canvas) return false;
        var xmlSelect = scope.get("xmlSelection");
        var range = xmlSelect.getRange();
        if (getUserRoles().contains(REVIEWER_ROLE)) {
            if (range == null) {
                return false;
            } else {
                if (range.getStartContainer().getParentNode() == range.getEndContainer().getParentNode()) {
                    var end = range.getEndContainer();
                    var it = range.getStartContainer();
                    for (;it.getIndex() < end.getIndex(); it = it.getNextSibling()) {
                        if (contentsReview(it)) return false;
                    }
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    },
    getChecked: function(scope) {
        return scope.get("insertR");
    },
    getLabel: function(scope) {
        return "Recenzuj fragment";
    }
};

Editor.addCommand("insertReviewCommand", insertReviewCommand);

function hasAncestorDocumentTitle(range) {
    var xpath = "./ancestor-or-self::*[local-name()='title' and parent::*[local-name()='document']]";
    return range.getStartContainer().selectSingleNode(xpath) || range.getEndContainer().selectSingleNode(xpath);
}