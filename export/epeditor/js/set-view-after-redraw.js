var prevShowPage = null;

var prevReview = null;

function setViewToCurrentPage(evt) {
    var showPage = evt.target.getActiveCanvas().getViewParam("showPage");
    if (showPage != null && showPage != "" && prevShowPage != showPage) {
        prevShowPage = showPage;
        window.location.hash = "#" + showPage;
    }
    if (showPage == "" && prevShowPage != null) window.location.hash = "#" + prevShowPage;
}

function setViewToCurrentReview(evt) {
    var currentReview = evt.target.getActiveCanvas().getViewParam("fullReviewMode");
    if (currentReview != null && currentReview != "" && prevReview != currentReview) {
        prevReview = currentReview;
        window.location.hash = "#" + currentReview;
    }
    if (currentReview == "" && prevReview != null) prevReview = currentReview;
}