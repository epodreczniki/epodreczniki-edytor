function reformatReviews(evt) {
    var reviewPanel = $(".review-panel");
    var reviews = reviewPanel.find(".review");
    var endOfLast = 0;
    reviews.each(function() {
        var e = $(this);
        var ref = getRef(e.data("cmnr"));
        if (ref.length == 0) {
            e.css("display", "none");
        } else {
            var refPos = getYPosition(ref[0]);
            e.css("display", "block");
            e.css("top", Math.max(endOfLast, refPos));
            endOfLast = endOfElem(e);
        }
        setButtonsVisibility(e);
    });
    reviewPanel.height(Math.max($(".with-reviews").outerHeight(true), endOfLast));
    $(".report-panel").find(".review").each(function() {
        setButtonsVisibility($(this));
    });
}

function setButtonsVisibility(review) {
    var resolveButton = review.find(".review-button-resolve");
    var closeButton = review.find(".review-button-close");
    var reopenButton = review.find(".review-button-reopen");
    resolveButton.css("display", "none");
    closeButton.css("display", "none");
    reopenButton.css("display", "none");
    if (getUserRoles().contains(REVIEWER_ROLE)) {
        closeButton.css("display", "inline");
        reopenButton.css("display", "inline");
    }
    if (getUserRoles().contains(AUTHOR_ROLE) || getUserRoles().contains(EDITOR_ROLE) || getUserRoles().contains(PUBLISHER_ROLE)) {
        resolveButton.css("display", "inline");
    }
}

function endOfElem(elem) {
    if (elem.css("display") == "none") return 0;
    var emptyParaHeight = 0;
    elem.find(".first-comment .comment-contents .para").each(function() {
        var e = $(this);
        if (!e.height()) emptyParaHeight += parseInt(e.css("font-size")) + parseInt(e.css("margin-bottom"));
    });
    return getYPosition(elem[0]) + elem.outerHeight(true) + emptyParaHeight + 4;
}

function getYPosition(element) {
    var yPosition = 0;
    while (element) {
        yPosition += element.offsetTop;
        element = element.offsetParent;
    }
    return yPosition;
}

function getRef(att) {
    return $(".with-reviews").find("span").filter(function() {
        return $(this).data("cmnr") == att;
    });
}

function reformatImageLoaded() {
    setTimeout(function() {
        function imageLoaded() {
            reformatReviews(null);
        }
        $(document).delegate("img", "load", imageLoaded);
        if ($("img").length > 0) imageLoaded.call(this);
    }, 1e3);
}

function toggleHideClosedReviews() {
    var tmp = "true";
    if (Editor.getActiveCanvas().getViewParam("hideClosedReview") == "true") tmp = "false";
    Editor.getActiveCanvas().setViewParam("hideClosedReview", tmp);
}

function focusOnReview(val) {
    setTimeout(function() {
        var reviewCounter = $(".review-counter").filter(function() {
            return $(this).text() == val;
        });
        console.log(reviewCounter.closest(".review").find(".first-comment"));
        reviewCounter.closest(".review").find(".first-comment").attr("tabindex", -1).focus();
    }, 1500);
}